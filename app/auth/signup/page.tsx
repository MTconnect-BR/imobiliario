import type { Metadata } from "next";
import SignUpClient from "./client";

export const metadata: Metadata = {
  title: "Criar Conta",
  description: "Crie sua conta no sistema de gerenciamento de imóveis via GitHub.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <SignUpClient />;
}
