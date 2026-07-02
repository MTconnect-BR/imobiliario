import type { Metadata } from "next";
import PropertyDetailClient from "./client";

export const metadata: Metadata = {
  title: "Detalhes do Imóvel",
  description: "Veja os detalhes completos do imóvel. Informações de preço, área, quartos, localização e mais.",
};

export default function PropertyDetailPage() {
  return <PropertyDetailClient />;
}
