import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./client";
import { getPropertyById } from "@/lib/properties-server";
import { BreadcrumbJsonLd, RealEstateListingJsonLd } from "@/components/json-ld";

const SITE_URL = "https://www.xn--sienagestoimobiliria-yxb9a.com.br";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return { title: "Imóvel não encontrado" };
  const title = `${property.title} | Imóvel da Caixa à Venda`;
  const description = `${property.title} em ${property.city}, ${property.state}. ${property.area}m², ${property.bedrooms} quartos, ${property.bathrooms} banheiros. ${property.type === "casa" ? "Casa" : property.type === "apartamento" ? "Apartamento" : property.type === "terreno" ? "Terreno" : "Imóvel comercial"} da Caixa disponível. Confira preço, condições e documentos.`;
  const url = `${SITE_URL}/imoveis/${property.id}`;
  return {
    title,
    description,
    keywords: [
      property.title,
      `${property.type} à venda`,
      `${property.type} da Caixa`,
      property.city,
      property.state,
      `imóvel ${property.city}`,
      `imóvel disponível`,
      `comprar ${property.type}`,
      `Caixa ${property.city}`,
      `imóvel barato ${property.city}`,
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: "Siena Gestão & Imobiliária",
      images: [
        {
          url: "/og.svg",
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.svg"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: SITE_URL },
          { name: "Imóveis", url: `${SITE_URL}/imoveis` },
          { name: property.title, url: `${SITE_URL}/imoveis/${property.id}` },
        ]}
      />
      <RealEstateListingJsonLd
        id={property.id}
        title={property.title}
        description={`${property.title} em ${property.city}, ${property.state}. ${property.area}m², ${property.bedrooms} quartos.`}
        url={`${SITE_URL}/imoveis/${property.id}`}
        price={property.price}
        city={property.city}
        state={property.state}
        area={property.area}
        bedrooms={property.bedrooms}
        bathrooms={property.bathrooms}
        type={property.type}
      />
      <PropertyDetailClient property={property} />
    </>
  );
}
