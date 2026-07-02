import type { Metadata } from "next";
import SignInClient from "./client";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse o CRM de gerenciamento de imóveis usando sua conta GitHub.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <SignInClient />;
}
