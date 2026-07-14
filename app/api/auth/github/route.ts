import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const origin = request.nextUrl.origin;

  if (!supabaseUrl) {
    return NextResponse.redirect(new URL("/auth/signin?error=supabase_config", origin));
  }

  const params = new URLSearchParams({
    provider: "github",
    redirect_to: `${origin}/api/auth/github/callback`,
  });

  return NextResponse.redirect(`${supabaseUrl}/auth/v1/authorize?${params.toString()}`);
}
