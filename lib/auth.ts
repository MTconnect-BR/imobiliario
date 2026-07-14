import { createBrowserClient } from "@supabase/ssr";

export interface User {
  id: string;
  supabaseId?: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  githubId?: number;
  createdAt: string;
}

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

function createClient() {
  if (supabaseClient) return supabaseClient;
  supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return supabaseClient;
}

export async function getSession(): Promise<{ user?: User; session?: object } | null> {
  const supabase = createClient();

  const timeoutPromise = new Promise<null>((resolve) => {
    setTimeout(() => resolve(null), 8000);
  });

  const sessionPromise = (async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) return null;

    const { user: authUser } = data.session;
    const metadata = authUser.user_metadata || {};

    return {
      user: {
        id: authUser.id,
        supabaseId: authUser.id,
        name: metadata.full_name || metadata.name || authUser.email?.split("@")[0] || "",
        email: authUser.email || "",
        avatarUrl: metadata.avatar_url || metadata.picture,
        githubId: metadata.provider_id ? Number(metadata.provider_id) : undefined,
        createdAt: authUser.created_at,
      },
      session: data.session,
    };
  })();

  return Promise.race([sessionPromise, timeoutPromise]);
}

export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });
  if (error) {
    if (error.message.includes("already")) {
      return { success: false, error: "Este email já está cadastrado." };
    }
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function logout(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function loginWithGithub(githubUser: {
  id: number;
  login: string;
  email: string;
  avatar_url: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const metadata: Record<string, string | number | undefined> = {};
    if (githubUser.login) metadata.full_name = githubUser.login;
    if (githubUser.avatar_url) metadata.avatar_url = githubUser.avatar_url;
    if (githubUser.id) metadata.provider_id = githubUser.id;

    const { error } = await supabase.auth.updateUser({ data: metadata });
    if (error) return { success: false, error: error.message };
  }

  return { success: true };
}

export async function isGithubSession(): Promise<boolean> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user?.app_metadata?.provider === "github";
}
