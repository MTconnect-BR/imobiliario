"use client";

import { Building } from "lucide-react";
import PropertyListClient from "@/components/property-list-client";
import { Property } from "@/lib/properties";

interface ApartamentosClientProps {
  initialProperties: Property[];
}

export default function ApartamentosClient({ initialProperties }: ApartamentosClientProps) {
  return (
    <PropertyListClient
      initialProperties={initialProperties}
      config={{
        title: "Apartamentos",
        subtitle: "Apartamentos modernos nas melhores localizações.",
        emptyIcon: Building,
        emptyTitle: "Nenhum apartamento encontrado",
        searchAriaLabel: "Buscar apartamentos",
      }}
    />
  );
}
