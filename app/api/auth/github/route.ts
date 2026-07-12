import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL || "https://imobiliario-one.vercel.app";

  if (!clientId) {
    return NextResponse.redirect(
      new URL("/auth/signin?error=github_config", redirectUri)
    );
  }

  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
  githubAuthUrl.searchParams.set("client_id", clientId);
  githubAuthUrl.searchParams.set("scope", "read:org user:email");
  githubAuthUrl.searchParams.set(
    "redirect_uri",
    `${redirectUri}/api/auth/github/callback`
  );

  return NextResponse.redirect(githubAuthUrl.toString());
}
