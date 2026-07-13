import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL || "https://imobiliario-one.vercel.app";

  if (!supabaseUrl) {
    return NextResponse.redirect(new URL("/auth/signin?error=supabase_config", redirectUri));
  }

  const params = new URLSearchParams({
    provider: "github",
    redirect_to: `${redirectUri}/api/auth/github/callback`,
  });

  return NextResponse.redirect(`${supabaseUrl}/auth/v1/authorize?${params.toString()}`);
}
