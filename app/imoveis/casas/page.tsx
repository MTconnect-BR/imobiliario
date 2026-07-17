import type { Metadata } from "next";
import CasasClient from "./client";
import { getProperties } from "@/lib/properties-server";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.xn--sienagestoimobiliria-yxb9a.com.br";

export const metadata: Metadata = {
  title: "Casas à Venda | Casas da Caixa com Desconto",
  description:
    "Encontre casas à venda em todo o Brasil. Casas da Caixa Econômica Federal com até 90% de desconto. Casas populares, casas de condomínio, sobrados e mais. Compre sua casa própria com a Siena Gestão & Imobiliária.",
  keywords: [
    "casa à venda",
    "casa da Caixa",
    "casa popular",
    "casa barata",
    "comprar casa",
    "casa de condomínio",
    "sobrado",
    "casa com quintal",
    "casa 3 quartos",
    "casa 2 quartos",
    "casa financiada",
    "casa com FGTS",
    "imóvel da Caixa",
    "casa disponível",
  ],
  openGraph: {
    title: "Casas à Venda | Casas da Caixa com Desconto",
    description: "Encontre casas à venda em todo o Brasil. Casas da Caixa com até 90% de desconto.",
    url: `${SITE_URL}/imoveis/casas`,
    siteName: "Siena Gestão & Imobiliária",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Casas à Venda" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casas à Venda | Casas da Caixa com Desconto",
    description: "Encontre casas à venda em todo o Brasil. Casas da Caixa com até 90% de desconto.",
    images: ["/og.svg"],
  },
  alternates: {
    canonical: `${SITE_URL}/imoveis/casas`,
  },
};

export default async function CasasPage() {
  const properties = await getProperties("casa");
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: SITE_URL },
          { name: "Imóveis", url: `${SITE_URL}/imoveis` },
          { name: "Casas", url: `${SITE_URL}/imoveis/casas` },
        ]}
      />
      <CasasClient initialProperties={properties} />
    </>
  );
}
