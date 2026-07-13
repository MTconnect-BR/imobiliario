import type { Metadata } from "next";
import { Suspense } from "react";
import ImoveisClient from "./client";
import { getProperties } from "@/lib/properties-server";

export const metadata: Metadata = {
  title: "Imóveis",
  description: "Encontre imóveis da Caixa. Casas, apartamentos, terrenos e imóveis comerciais com as melhores condições.",
};

export default async function ImoveisPage() {
  const properties = await getProperties();
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p className="text-muted-foreground">Carregando...</p></div>}>
      <ImoveisClient initialProperties={properties} />
    </Suspense>
  );
}
