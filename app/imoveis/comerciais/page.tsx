import type { Metadata } from "next";
import ComerciaisClient from "./client";

export const metadata: Metadata = {
  title: "Comerciais",
  description: "Encontre imóveis comerciais para compra ou aluguel. Imóveis comerciais disponíveis em todo o Brasil.",
};

export default function ComerciaisPage() {
  return <ComerciaisClient />;
}
