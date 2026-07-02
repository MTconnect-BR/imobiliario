"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, loginWithGithub, getSession } from "@/lib/auth";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type SignInValues = z.infer<typeof signInSchema>;

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const error = searchParams.get("error");
  const githubStatus = searchParams.get("github");
  const githubLogin = searchParams.get("github_login");
  const redirect = searchParams.get("redirect") || "/crm";

  const handleGithubCallback = useCallback(() => {
    if (githubStatus !== "success") return;

    const userData = getCookie("github_user");
    if (!userData) {
      toast.error("Erro ao processar autenticação GitHub.");
      return;
    }

    try {
      const githubUser = JSON.parse(userData);
      const result = loginWithGithub(githubUser);
      deleteCookie("github_user");

      if (result.success) {
        toast.success("Login via GitHub realizado com sucesso!");
        router.push(redirect);
      } else {
        toast.error(result.error || "Erro ao fazer login.");
      }
    } catch {
      toast.error("Erro ao processar dados do GitHub.");
    }
  }, [githubStatus, redirect, router]);

  useEffect(() => {
    handleGithubCallback();
  }, [handleGithubCallback]);

  useEffect(() => {
    if (!error) return;

    const errorMessages: Record<string, string> = {
      not_member: `Acesso restrito. ${githubLogin ? `O usuário "${githubLogin}" não é membro da organização.` : "Somente membros da organização podem acessar."}`,
      no_code: "Erro ao autenticar com GitHub. Tente novamente.",
      token_exchange_failed: "Erro ao obter token do GitHub. Tente novamente.",
      user_fetch_failed: "Erro ao obter dados do GitHub. Tente novamente.",
      github_config: "Configuração OAuth do GitHub indisponível.",
    };

    toast.error(errorMessages[error] || "Erro desconhecido.");
  }, [error, githubLogin]);

  useEffect(() => {
    const session = getSession();
    if (session) {
      router.push(redirect);
    }
  }, [router, redirect]);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: SignInValues) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(data.email, data.password);
    setLoading(false);

    if (result.success) {
      toast.success("Login realizado com sucesso!");
      router.push(redirect);
    } else {
      toast.error(result.error || "Erro ao fazer login.");
    }
  }

  const inputClass =
    "h-10 w-full rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s]";

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link href="/" className="text-2xl font-medium tracking-[-0.06em] text-foreground">
          Imobiliário
        </Link>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl tracking-[-0.06em]">
            Entrar na sua conta
          </CardTitle>
          <CardDescription>
            Acesse o CRM usando sua conta GitHub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="h-12 w-full text-base font-medium"
            disabled={githubLoading}
            onClick={() => {
              setGithubLoading(true);
              window.location.href = "/api/auth/github";
            }}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {githubLoading ? "Redirecionando..." : "Entrar com GitHub"}
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Somente membros da organização GitHub autorizada podem acessar.
          </p>

          <div className="my-6 flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">ou entre com email</span>
            <Separator className="flex-1" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border accent-[#8ed462]"
                  />
                  Lembrar de mim
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <Button
                type="submit"
                variant="green"
                className="h-12 w-full text-base"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignInClient() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
