"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Property,
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  formatPrice,
} from "@/lib/properties";
import { Bed, Bath, Maximize, MapPin, Navigation } from "lucide-react";

function getStatusVariant(status: Property["status"]) {
  switch (status) {
    case "disponivel":
      return "green" as const;
    case "vendido":
      return "red" as const;
    case "em_negociacao":
      return "yellow" as const;
  }
}

function getTypeVariant(type: Property["type"]) {
  switch (type) {
    case "casa":
      return "blue" as const;
    case "apartamento":
      return "pink" as const;
    case "terreno":
      return "yellow" as const;
    case "comercial":
      return "default" as const;
  }
}

interface PropertyCatalogCardProps {
  property: Property;
  distance?: number;
}

export function PropertyCatalogCard({ property, distance }: PropertyCatalogCardProps) {
  return (
    <Link href={`/imoveis/${property.id}`}>
      <div className="group overflow-hidden rounded-[10px] border border-border bg-card transition-all duration-[0.4s] hover:shadow-md hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {property.imageUrl ? (
            <Image
              src={property.imageUrl}
              alt={property.title}
              width={600}
              height={338}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[0.4s] group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl text-muted-foreground/30">
              🏠
            </div>
          )}
          <div className="absolute left-3 top-3">
            <Badge variant={getTypeVariant(property.type)}>
              {getPropertyTypeLabel(property.type)}
            </Badge>
          </div>
          <div className="absolute right-3 top-3">
            <Badge variant={getStatusVariant(property.status)}>
              {getPropertyStatusLabel(property.status)}
            </Badge>
          </div>
          {distance !== undefined && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="blue" className="gap-1">
                <Navigation className="h-3 w-3" />
                {distance < 1
                  ? `${Math.round(distance * 1000)} m`
                  : `${distance.toFixed(1)} km`}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-medium tracking-[-0.06em] text-foreground line-clamp-1">
            {property.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">
              {property.neighborhood}, {property.city} - {property.state}
            </span>
          </div>

          <p className="mt-3 text-lg font-medium tracking-[-0.06em] text-foreground">
            {formatPrice(property.price)}
          </p>

          <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {property.bedrooms} {property.bedrooms === 1 ? "quarto" : "quartos"}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {property.bathrooms} {property.bathrooms === 1 ? "banheiro" : "banheiros"}
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5" />
              {property.area} m²
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
