"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyCatalogCard } from "@/components/property-catalog-card";
import { Property } from "@/lib/properties";

interface PropertyCarouselSectionProps {
  title: string;
  subtitle?: string;
  properties: Property[];
  viewAllHref?: string;
}

export function PropertyCarouselSection({
  title,
  subtitle,
  properties,
  viewAllHref,
}: PropertyCarouselSectionProps) {
  if (properties.length === 0) return null;

  return (
    <section className="py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-[-0.06em] text-foreground md:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline hover:text-foreground transition-colors"
          >
            Ver todos →
          </Link>
        )}
      </div>

      <div className="relative">
        <Carousel
          opts={{ align: "start", loop: properties.length > 3, containScroll: "trimSnaps" }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {properties.map((property) => (
              <CarouselItem
                key={property.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <PropertyCatalogCard property={property} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 lg:-left-12" />
          <CarouselNext className="-right-4 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
