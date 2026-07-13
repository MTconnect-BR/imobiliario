import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ALLOWED_ORGS = ["MTconnect-BR"];
const ALLOWED_USERS = ["mmdj04"];

async function checkOrgMembership(token: string, username: string): Promise<boolean> {
  for (const org of ALLOWED_ORGS) {
    const res = await fetch(`https://api.github.com/orgs/${org}/members/${username}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" },
    });
    if (res.ok) return true;
  }
  return false;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const redirectBase = process.env.NEXT_PUBLIC_APP_URL || "https://imobiliario-one.vercel.app";

  if (!code) {
    return NextResponse.redirect(new URL("/auth/signin?error=no_code", redirectBase));
  }

  const response = NextResponse.redirect(new URL("/auth/signin?github=success", redirectBase));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.session) {
    return NextResponse.redirect(
      new URL("/auth/signin?error=session_exchange_failed", redirectBase),
    );
  }

  const githubUsername = data.session.user?.user_metadata?.user_name;

  if (githubUsername) {
    const accessToken = data.session.provider_token ?? "";
    const isAllowedUser = ALLOWED_USERS.includes(githubUsername);
    const isOrgMember = isAllowedUser
      ? true
      : await checkOrgMembership(accessToken, githubUsername);

    if (!isOrgMember) {
      await supabase.auth.signOut();
      return NextResponse.redirect(
        new URL(
          `/auth/signin?error=not_member&github_login=${encodeURIComponent(githubUsername)}`,
          redirectBase,
        ),
      );
    }
  }

  return response;
}
