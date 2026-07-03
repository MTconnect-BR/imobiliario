import type { Metadata } from "next";
import { Suspense } from "react";
import ImoveisClient from "./client";

export const metadata: Metadata = {
  title: "Imóveis",
  description: "Encontre imóveis para comprar, alugar ou investir. Casas, apartamentos, terrenos e imóveis comerciais em todo o Brasil.",
};

export default function ImoveisPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p className="text-muted-foreground">Carregando...</p></div>}>
      <ImoveisClient />
    </Suspense>
  );
}
