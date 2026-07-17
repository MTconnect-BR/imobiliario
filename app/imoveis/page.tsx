import type { Metadata } from "next";
import { Suspense } from "react";
import ImoveisClient from "./client";
import { getProperties } from "@/lib/properties-server";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.xn--sienagestoimobiliria-yxb9a.com.br";

export const metadata: Metadata = {
  title: "Imóveis à Venda | Imóveis da Caixa com Desconto",
  description:
    "Encontre imóveis à venda em todo o Brasil. Imóveis da Caixa Econômica Federal com até 90% de desconto. Casas, apartamentos, terrenos e imóveis comerciais disponíveis. Compre seu imóvel com a Siena Gestão & Imobiliária.",
  keywords: [
    "imóveis à venda",
    "imóveis da Caixa",
    "imóveis populares",
    "imóvel barato",
    "comprar imóvel",
    "imóvel financiado",
    "imóvel com FGTS",
    "imóvel disponível",
    "imóvel desconto",
    "Caixa Econômica Federal",
    "habitação popular",
    "casa popular",
    "apartamento popular",
  ],
  openGraph: {
    title: "Imóveis à Venda | Imóveis da Caixa com Desconto",
    description:
      "Encontre imóveis à venda em todo o Brasil. Imóveis da Caixa com até 90% de desconto.",
    url: `${SITE_URL}/imoveis`,
    siteName: "Siena Gestão & Imobiliária",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Imóveis à Venda" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imóveis à Venda | Imóveis da Caixa com Desconto",
    description:
      "Encontre imóveis à venda em todo o Brasil. Imóveis da Caixa com até 90% de desconto.",
    images: ["/og.svg"],
  },
  alternates: {
    canonical: `${SITE_URL}/imoveis`,
  },
};

export default async function ImoveisPage() {
  const properties = await getProperties();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: SITE_URL },
          { name: "Imóveis", url: `${SITE_URL}/imoveis` },
        ]}
      />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        }
      >
        <ImoveisClient initialProperties={properties} />
      </Suspense>
    </>
  );
}
