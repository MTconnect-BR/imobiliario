import type { Metadata } from "next";
import TerrenosClient from "./client";

export const metadata: Metadata = {
  title: "Terrenos",
  description: "Encontre terrenos para venda. Terrenos disponíveis em todo o Brasil.",
};

export default function TerrenosPage() {
  return <TerrenosClient />;
}
