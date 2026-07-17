import type { Metadata } from "next";
import TerrenosClient from "./client";
import { getProperties } from "@/lib/properties-server";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.xn--sienagestoimobiliria-yxb9a.com.br";

export const metadata: Metadata = {
  title: "Terrenos à Venda | Terrenos da Caixa com Desconto",
  description:
    "Encontre terrenos à venda em todo o Brasil. Terrenos da Caixa Econômica Federal com até 90% de desconto. Terrenos residenciais, terrenos comerciais, lotes e mais. Compre seu terreno com a Siena Gestão & Imobiliária.",
  keywords: [
    "terreno à venda",
    "terreno da Caixa",
    "lote à venda",
    "terreno barato",
    "comprar terreno",
    "terreno residencial",
    "terreno comercial",
    "terreno para construir",
    "loteamento",
    "terreno financiado",
    "terreno com FGTS",
    "terreno disponível",
    "terreno no centro",
    "terreno urbano",
  ],
  openGraph: {
    title: "Terrenos à Venda | Terrenos da Caixa com Desconto",
    description:
      "Encontre terrenos à venda em todo o Brasil. Terrenos da Caixa com até 90% de desconto.",
    url: `${SITE_URL}/imoveis/terrenos`,
    siteName: "Siena Gestão & Imobiliária",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Terrenos à Venda" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terrenos à Venda | Terrenos da Caixa com Desconto",
    description:
      "Encontre terrenos à venda em todo o Brasil. Terrenos da Caixa com até 90% de desconto.",
    images: ["/og.svg"],
  },
  alternates: {
    canonical: `${SITE_URL}/imoveis/terrenos`,
  },
};

export default async function TerrenosPage() {
  const properties = await getProperties("terreno");
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: SITE_URL },
          { name: "Imóveis", url: `${SITE_URL}/imoveis` },
          { name: "Terrenos", url: `${SITE_URL}/imoveis/terrenos` },
        ]}
      />
      <TerrenosClient initialProperties={properties} />
    </>
  );
}
