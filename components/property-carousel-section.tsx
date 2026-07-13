"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
  loadMore?: () => Promise<Property[]>;
  hasMore?: boolean;
}

export function PropertyCarouselSection({
  title,
  subtitle,
  properties,
  viewAllHref,
  loadMore,
  hasMore = false,
}: PropertyCarouselSectionProps) {
  const [items, setItems] = useState<Property[]>(properties);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(properties);
  }, [properties]);

  const handleLoadMore = useCallback(async () => {
    if (loading || !loadMore || !hasMore) return;
    setLoading(true);
    try {
      const newItems = await loadMore();
      if (newItems.length > 0) {
        setItems((prev) => [...prev, ...newItems]);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, loadMore, hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !loadMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleLoadMore, loadMore]);

  if (items.length === 0) return null;

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
          opts={{ align: "end", loop: false, containScroll: "trimSnaps" }}
          className="w-full"
        >
          <CarouselContent>
            {items.map((property) => (
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

        {hasMore && (
          <div ref={sentinelRef} className="flex justify-center py-4">
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                Carregando mais...
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
