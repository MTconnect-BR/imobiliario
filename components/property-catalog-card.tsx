"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, Bed, Bath, Maximize, ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import type { Property } from "@/lib/properties";
import { formatPrice, getPropertyTypeLabel, getPropertyStatusLabel } from "@/lib/properties";
import { Badge } from "@/components/ui/badge";
import { ImageLightbox } from "@/components/image-lightbox";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = property.images?.length > 0 ? property.images : [property.imageUrl].filter(Boolean);
  const hasMultipleImages = allImages.length > 1;

  const handleImageClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const renderImage = (isHorizontal: boolean) => {
    if (imageError || !allImages[0]) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/40">
          <ImageOff className={isHorizontal ? "h-8 w-8" : "h-10 w-10"} />
          <span className="text-xs font-medium">Sem Imagem</span>
        </div>
      );
    }

    return (
      <>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
        )}
        <Image
          src={allImages[currentImageIndex] || allImages[0]}
          alt={property.title}
          width={600}
          height={338}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          onClick={(e) => handleImageClick(e, currentImageIndex)}
          className={`h-full w-full object-cover transition-all duration-[0.4s] group-hover:scale-105 cursor-pointer ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </>
    );
  };

  if (horizontal) {
    return (
      <>
        <Link href={`/imoveis/${property.id}`}>
          <div className="group flex h-40 overflow-hidden rounded-[10px] border border-border bg-card transition-all duration-[0.4s] hover:shadow-md hover:scale-[1.01]">
            {/* Image */}
            <div className="relative w-48 shrink-0 overflow-hidden bg-muted sm:w-56">
              {renderImage(true)}
              <div className="absolute left-2 top-2">
                <Badge variant={getTypeVariant(property.type)} className="text-xs">
                  {getPropertyTypeLabel(property.type)}
                </Badge>
              </div>
              {/* Image navigation for multiple images */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-1 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-1 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </button>
                  <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                    {currentImageIndex + 1}/{allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between overflow-hidden p-4">
              <div className="min-w-0">
                <h3 className="text-sm font-medium tracking-[-0.06em] text-foreground line-clamp-1">
                  {property.title}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="line-clamp-1">
                    {property.neighborhood}, {property.city} - {property.state}
                  </span>
                </div>
                <p className="mt-2 text-base font-medium tracking-[-0.06em] text-foreground">
                  {formatPrice(property.price)}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Bed className="h-3 w-3" />
                  {property.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-3 w-3" />
                  {property.bathrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="h-3 w-3" />
                  {property.area} m²
                </span>
              </div>
            </div>
          </div>
        </Link>

        {lightboxOpen && (
          <ImageLightbox
            images={allImages}
            initialIndex={lightboxIndex}
            title={property.title}
            description={property.description}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Link href={`/imoveis/${property.id}`}>
        <div className="group overflow-hidden rounded-[10px] border border-border bg-card transition-all duration-[0.4s] hover:shadow-md hover:scale-[1.02]">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {renderImage(false)}
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
            {/* Image navigation for multiple images */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                  {currentImageIndex + 1}/{allImages.length}
                </div>
              </>
            )}
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

      {lightboxOpen && (
        <ImageLightbox
          images={allImages}
          initialIndex={lightboxIndex}
          title={property.title}
          description={property.description}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
