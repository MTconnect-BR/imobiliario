import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORGS = ["mmdj", "enterprise"];

async function exchangeCodeForToken(code: string): Promise<string | null> {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await res.json();
  return data.access_token || null;
}

async function fetchGithubUser(token: string) {
  const res = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

async function checkOrgMembership(
  token: string,
  username: string
): Promise<boolean> {
  for (const org of ALLOWED_ORGS) {
    const res = await fetch(
      `https://api.github.com/orgs/${org}/members/${username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.ok) return true;
  }
  return false;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const redirectBase = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!code) {
    return NextResponse.redirect(
      new URL("/auth/signin?error=no_code", redirectBase)
    );
  }

  // Step 1: Exchange code for access token
  const token = await exchangeCodeForToken(code);
  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/signin?error=token_exchange_failed", redirectBase)
    );
  }

  // Step 2: Fetch GitHub user profile
  const githubUser = await fetchGithubUser(token);
  if (!githubUser) {
    return NextResponse.redirect(
      new URL("/auth/signin?error=user_fetch_failed", redirectBase)
    );
  }

  // Step 3: Check organization membership
  const isMember = await checkOrgMembership(token, githubUser.login);
  if (!isMember) {
    return NextResponse.redirect(
      new URL(
        `/auth/signin?error=not_member&github_login=${encodeURIComponent(githubUser.login)}`,
        redirectBase
      )
    );
  }

  // Step 4: Create session — pass user data via cookie, client picks it up
  const githubUserData = {
    id: githubUser.id,
    login: githubUser.login,
    email: githubUser.email || `${githubUser.login}@users.noreply.github.com`,
    avatar_url: githubUser.avatar_url,
  };

  const response = NextResponse.redirect(
    new URL("/auth/signin?github=success", redirectBase)
  );

  response.cookies.set("github_user", JSON.stringify(githubUserData), {
    httpOnly: false, // Client needs to read this
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60, // 1 minute — just enough for client to pick up
  });

  return response;
}
