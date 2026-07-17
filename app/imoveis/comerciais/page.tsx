import type { Metadata } from "next";
import ComerciaisClient from "./client";
import { getProperties } from "@/lib/properties-server";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.xn--sienagestoimobiliria-yxb9a.com.br";

export const metadata: Metadata = {
  title: "Imóveis Comerciais à Venda | Imóveis Comerciais da Caixa",
  description:
    "Encontre imóveis comerciais à venda em todo o Brasil. Salas comerciais, lojas, galpões e imóveis para escritório da Caixa com até 90% de desconto. Compre seu imóvel comercial com a Siena Gestão & Imobiliária.",
  keywords: [
    "imóvel comercial à venda",
    "sala comercial",
    "loja à venda",
    "galpão comercial",
    "escritório à venda",
    "imóvel comercial da Caixa",
    "imóvel comercial barato",
    "comprar imóvel comercial",
    "ponto comercial",
    "imóvel para alugar",
    "imóvel disponível",
    "comércio",
  ],
  openGraph: {
    title: "Imóveis Comerciais à Venda | Imóveis Comerciais da Caixa",
    description:
      "Encontre imóveis comerciais à venda em todo o Brasil. Imóveis da Caixa com até 90% de desconto.",
    url: `${SITE_URL}/imoveis/comerciais`,
    siteName: "Siena Gestão & Imobiliária",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Imóveis Comerciais" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imóveis Comerciais à Venda | Imóveis Comerciais da Caixa",
    description:
      "Encontre imóveis comerciais à venda em todo o Brasil. Imóveis da Caixa com até 90% de desconto.",
    images: ["/og.svg"],
  },
  alternates: {
    canonical: `${SITE_URL}/imoveis/comerciais`,
  },
};

export default async function ComerciaisPage() {
  const properties = await getProperties("comercial");
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: SITE_URL },
          { name: "Imóveis", url: `${SITE_URL}/imoveis` },
          { name: "Comerciais", url: `${SITE_URL}/imoveis/comerciais` },
        ]}
      />
      <ComerciaisClient initialProperties={properties} />
    </>
  );
}
