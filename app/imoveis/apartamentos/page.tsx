import type { Metadata } from "next";
import ApartamentosClient from "./client";
import { getProperties } from "@/lib/properties-server";

export const metadata: Metadata = {
  title: "Apartamentos",
  description: "Encontre apartamentos da Caixa disponíveis em todo o Brasil.",
};

export default async function ApartamentosPage() {
  const properties = await getProperties("apartamento");
  return <ApartamentosClient initialProperties={properties} />;
}
