import type { Metadata } from "next";
import ComerciaisClient from "./client";
import { getProperties } from "@/lib/properties-server";

export const metadata: Metadata = {
  title: "Comerciais",
  description: "Encontre imóveis comerciais da Caixa disponíveis em todo o Brasil.",
};

export default async function ComerciaisPage() {
  const properties = await getProperties("comercial");
  return <ComerciaisClient initialProperties={properties} />;
}
