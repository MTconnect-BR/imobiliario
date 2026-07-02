import type { Metadata } from "next";
import CasasClient from "./client";

export const metadata: Metadata = {
  title: "Casas",
  description: "Encontre casas para comprar ou alugar. Casas disponíveis em todo o Brasil.",
};

export default function CasasPage() {
  return <CasasClient />;
}
