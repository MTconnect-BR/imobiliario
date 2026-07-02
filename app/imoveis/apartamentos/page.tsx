import type { Metadata } from "next";
import ApartamentosClient from "./client";

export const metadata: Metadata = {
  title: "Apartamentos",
  description: "Encontre apartamentos para comprar ou alugar. Apartamentos disponíveis em todo o Brasil.",
};

export default function ApartamentosPage() {
  return <ApartamentosClient />;
}
