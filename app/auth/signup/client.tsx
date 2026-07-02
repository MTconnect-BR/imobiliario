"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function SignUpClient() {
  const [githubLoading, setGithubLoading] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link href="/" className="text-2xl font-medium tracking-[-0.06em] text-foreground">
          Imobiliário
        </Link>
      </div>

      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Shield className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl tracking-[-0.06em]">
            Criar conta
          </CardTitle>
          <CardDescription>
            A conta é criada automaticamente via GitHub. Somente membros da organização autorizada podem se cadastrar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
            {githubLoading ? "Redirecionando..." : "Criar conta com GitHub"}
          </Button>

          <div className="rounded-[10px] bg-muted p-4">
            <h4 className="mb-2 text-sm font-medium tracking-[-0.04em]">
              Como funciona?
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>1. Clique no botão acima para autenticar com GitHub</li>
              <li>2. Autorize o acesso à sua conta GitHub</li>
              <li>3. Verificaremos se você é membro da organização</li>
              <li>4. Sua conta será criada automaticamente</li>
            </ul>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Somente contas vinculadas à organização GitHub autorizada são permitidas.
          </p>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Entrar
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
