import type { Metadata } from "next";
import TerrenosClient from "./client";
import { getProperties } from "@/lib/properties-server";

export const metadata: Metadata = {
  title: "Terrenos",
  description: "Encontre terrenos da Caixa disponíveis em todo o Brasil.",
};

export default async function TerrenosPage() {
  const properties = await getProperties("terreno");
  return <TerrenosClient initialProperties={properties} />;
}
