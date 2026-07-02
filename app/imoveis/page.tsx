import type { Metadata } from "next";
import ImoveisClient from "./client";

export const metadata: Metadata = {
  title: "Imóveis",
  description: "Encontre imóveis para comprar, alugar ou investir. Casas, apartamentos, terrenos e imóveis comerciais em todo o Brasil.",
};

export default function ImoveisPage() {
  return <ImoveisClient />;
}
