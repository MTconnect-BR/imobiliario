"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Property,
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  formatPrice,
} from "@/lib/properties";
import { Bed, Bath, Maximize, MapPin, Navigation, ImageOff } from "lucide-react";

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
  horizontal?: boolean;
}

export function PropertyCatalogCard({ property, distance, horizontal }: PropertyCatalogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (horizontal) {
    return (
      <Link href={`/imoveis/${property.id}`}>
        <div className="group flex overflow-hidden rounded-[10px] border border-border bg-card transition-all duration-[0.4s] hover:shadow-md hover:scale-[1.01]">
          {/* Image */}
          <div className="relative w-48 shrink-0 overflow-hidden bg-muted sm:w-64">
            {!imageError && property.imageUrl ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-muted">
                    <div className="shimmer absolute inset-0" />
                  </div>
                )}
                <Image
                  src={property.imageUrl}
                  alt={property.title}
                  width={600}
                  height={338}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`h-full w-full object-cover transition-all duration-[0.4s] group-hover:scale-105 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/40">
                <ImageOff className="h-8 w-8" />
                <span className="text-xs font-medium">Sem Imagem</span>
              </div>
            )}
            <div className="absolute left-2 top-2">
              <Badge variant={getTypeVariant(property.type)} className="text-xs">
                {getPropertyTypeLabel(property.type)}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <h3 className="text-base font-medium tracking-[-0.06em] text-foreground line-clamp-1">
                {property.title}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">
                  {property.neighborhood}, {property.city} - {property.state}
                </span>
              </div>
              <p className="mt-2 text-lg font-medium tracking-[-0.06em] text-foreground">
                {formatPrice(property.price)}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                {property.bedrooms}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                {property.bathrooms}
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

  return (
    <Link href={`/imoveis/${property.id}`}>
      <div className="group overflow-hidden rounded-[10px] border border-border bg-card transition-all duration-[0.4s] hover:shadow-md hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {!imageError && property.imageUrl ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted">
                  <div className="shimmer absolute inset-0" />
                </div>
              )}
              <Image
                src={property.imageUrl}
                alt={property.title}
                width={600}
                height={338}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`h-full w-full object-cover transition-all duration-[0.4s] group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/40">
              <ImageOff className="h-10 w-10" />
              <span className="text-xs font-medium">Sem Imagem</span>
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
