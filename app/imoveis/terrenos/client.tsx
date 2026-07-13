"use client";

import { Map } from "lucide-react";
import PropertyListClient from "@/components/property-list-client";
import { Property } from "@/lib/properties";

interface TerrenosClientProps {
  initialProperties: Property[];
}

export default function TerrenosClient({ initialProperties }: TerrenosClientProps) {
  return (
    <PropertyListClient
      initialProperties={initialProperties}
      config={{
        title: "Terrenos",
        subtitle: "Terrenos e lotes para construir ou investir.",
        emptyIcon: Map,
        emptyTitle: "Nenhum terreno encontrado",
        searchAriaLabel: "Buscar terrenos",
      }}
    />
  );
}
