import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./client";
import { getProperties } from "@/lib/properties-server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const properties = await getProperties();
  const property = properties.find((p) => p.id === id || p.reidoapeId?.toString() === id);
  if (!property) return { title: "Imóvel não encontrado" };
  return {
    title: `${property.title} | Imóvel`,
    description: `${property.title} em ${property.city}, ${property.state}. ${property.area}m², ${property.bedrooms} quartos.`,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const properties = await getProperties();
  const property = properties.find((p) => p.id === id || p.reidoapeId?.toString() === id);

  if (!property) notFound();

  const similar = properties
    .filter((p) => p.id !== property.id && p.type === property.type && p.state === property.state)
    .sort((a, b) => {
      const aCity = a.city === property.city ? 1 : 0;
      const bCity = b.city === property.city ? 1 : 0;
      return bCity - aCity;
    })
    .slice(0, 10);

  return <PropertyDetailClient property={property} similarProperties={similar} />;
}
