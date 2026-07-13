"use client";

import { Home } from "lucide-react";
import PropertyListClient from "@/components/property-list-client";
import { Property } from "@/lib/properties";

interface CasasClientProps {
  initialProperties: Property[];
}

export default function CasasClient({ initialProperties }: CasasClientProps) {
  return (
    <PropertyListClient
      initialProperties={initialProperties}
      config={{
        title: "Casas",
        subtitle: "Encontre a casa perfeita para você e sua família.",
        emptyIcon: Home,
        emptyTitle: "Nenhuma casa encontrada",
        searchAriaLabel: "Buscar casas",
        showAdvancedFilters: true,
      }}
    />
  );
}
