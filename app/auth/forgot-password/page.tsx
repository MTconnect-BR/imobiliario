"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPassword } from "@/lib/auth";
import { toast } from "sonner";

const forgotSchema = z.object({
  email: z.string().email("Email inválido"),
});

type ForgotValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ForgotValues) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = forgotPassword(data.email);
    setLoading(false);

    if (result.success) {
      setSent(true);
      toast.success("Link de redefinição enviado para seu email!");
    } else {
      toast.error(result.error || "Erro ao enviar link.");
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
            Redefinir senha
          </CardTitle>
          <CardDescription>
            {sent
              ? "Verifique sua caixa de entrada e siga as instruções."
              : "Digite seu email para receber o link de redefinição."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8ed462]/20">
                <svg
                  className="h-8 w-8 text-[#8ed462]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                Se o email <strong>{form.getValues("email")}</strong> estiver
                cadastrado, você receberá um link para redefinir sua senha.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSent(false);
                  form.reset();
                }}
              >
                Enviar novamente
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">
                        Email
                      </FormLabel>
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

                <Button
                  type="submit"
                  variant="green"
                  className="h-12 w-full text-base"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar link"}
                </Button>
              </form>
            </Form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/auth/signin"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              ← Voltar para o login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
