import type { Metadata } from "next";
import ApartamentosClient from "./client";
import { getProperties } from "@/lib/properties-server";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.xn--sienagestoimobiliria-yxb9a.com.br";

export const metadata: Metadata = {
  title: "Apartamentos à Venda | Apartamentos da Caixa com Desconto",
  description:
    "Encontre apartamentos à venda em todo o Brasil. Apartamentos da Caixa Econômica Federal com até 90% de desconto. Apartamentos populares, studio, 1 e 2 quartos. Compre seu apartamento com a Siena Gestão & Imobiliária.",
  keywords: [
    "apartamento à venda",
    "apartamento da Caixa",
    "apartamento popular",
    "apartamento barato",
    "comprar apartamento",
    "apartamento 1 quarto",
    "apartamento 2 quartos",
    "apartamento 3 quartos",
    "apartamento financiado",
    "apartamento com FGTS",
    "studio",
    "kitnet",
    "apartamento mobiliado",
    "apartamento disponível",
    "apartamento no centro",
  ],
  openGraph: {
    title: "Apartamentos à Venda | Apartamentos da Caixa com Desconto",
    description:
      "Encontre apartamentos à venda em todo o Brasil. Apartamentos da Caixa com até 90% de desconto.",
    url: `${SITE_URL}/imoveis/apartamentos`,
    siteName: "Siena Gestão & Imobiliária",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Apartamentos à Venda" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apartamentos à Venda | Apartamentos da Caixa com Desconto",
    description:
      "Encontre apartamentos à venda em todo o Brasil. Apartamentos da Caixa com até 90% de desconto.",
    images: ["/og.svg"],
  },
  alternates: {
    canonical: `${SITE_URL}/imoveis/apartamentos`,
  },
};

export default async function ApartamentosPage() {
  const properties = await getProperties("apartamento");
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: SITE_URL },
          { name: "Imóveis", url: `${SITE_URL}/imoveis` },
          { name: "Apartamentos", url: `${SITE_URL}/imoveis/apartamentos` },
        ]}
      />
      <ApartamentosClient initialProperties={properties} />
    </>
  );
}
