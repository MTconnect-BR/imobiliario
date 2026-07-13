"use client";

import { Store } from "lucide-react";
import PropertyListClient from "@/components/property-list-client";
import { Property } from "@/lib/properties";

interface ComerciaisClientProps {
  initialProperties: Property[];
}

export default function ComerciaisClient({ initialProperties }: ComerciaisClientProps) {
  return (
    <PropertyListClient
      initialProperties={initialProperties}
      config={{
        title: "Comerciais",
        subtitle: "Imóveis comerciais para seu negócio crescer.",
        emptyIcon: Store,
        emptyTitle: "Nenhum imóvel comercial encontrado",
        searchAriaLabel: "Buscar imóveis comerciais",
      }}
    />
  );
}
