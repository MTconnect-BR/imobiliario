import type { Metadata } from "next";
import CasasClient from "./client";
import { getProperties } from "@/lib/properties-server";

export const metadata: Metadata = {
  title: "Casas",
  description: "Encontre casas da Caixa disponíveis em todo o Brasil.",
};

export default async function CasasPage() {
  const properties = await getProperties("casa");
  return <CasasClient initialProperties={properties} />;
}
