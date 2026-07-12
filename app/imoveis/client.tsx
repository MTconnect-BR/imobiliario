"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Building2, Navigation, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyCatalogCard } from "@/components/property-catalog-card";
import { PropertyCarouselSection } from "@/components/property-carousel-section";
import {
  Property,
  PropertyType,
  getAllProperties,
  getPropertyTypeLabel,
} from "@/lib/properties";
import { haversineDistance, geocode } from "@/lib/geolocation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const typeFilters: { value: string; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "casa", label: "Casas" },
  { value: "apartamento", label: "Apartamentos" },
  { value: "terreno", label: "Terrenos" },
  { value: "comercial", label: "Comerciais" },
];

const priceRanges = [
  { value: "all", label: "Qualquer preço" },
  { value: "0-300000", label: "Até R$ 300.000" },
  { value: "300000-600000", label: "R$ 300.000 - R$ 600.000" },
  { value: "600000-1000000", label: "R$ 600.000 - R$ 1.000.000" },
  { value: "1000000-999999999", label: "Acima de R$ 1.000.000" },
];

interface NearbyProperty {
  property: Property;
  distance: number;
}

export default function ImoveisPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [reidoapeLoading, setReidoapeLoading] = useState(true);
  const [reidoapeCount, setReidoapeCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [nearbyProperties, setNearbyProperties] = useState<NearbyProperty[]>([]);
  const [geocoding, setGeocoding] = useState(false);
  const geocodeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchParams = useSearchParams();

  // Initialize filters from URL query params (e.g. from homepage search)
  useEffect(() => {
    const s = searchParams.get("search");
    const t = searchParams.get("type");
    const p = searchParams.get("price");
    if (s) setSearchQuery(s);
    if (t) setSelectedType(t);
    if (p) setSelectedPrice(p);
  }, [searchParams]);

  // Load properties on mount: local + Rei do APê (first page)
  useEffect(() => {
    const local = getAllProperties();
    setAllProperties(local);

    async function fetchReidoape() {
      try {
        setReidoapeLoading(true);
        const res = await fetch("/api/reidoape?limit=100&page=1");
        if (!res.ok) return;
        const data = await res.json();
        const external: Property[] = data.properties ?? [];
        setReidoapeCount(data.total ?? 0);
        setAllProperties((prev) => {
          const ids = new Set(prev.map((p) => p.id));
          const newExternal = external.filter((p) => !ids.has(p.id));
          return [...prev, ...newExternal];
        });
      } catch {
        // silently fail — local properties still work
      } finally {
        setReidoapeLoading(false);
      }
    }
    fetchReidoape();
  }, []);

  const availableStates = useMemo(() => {
    const states = [...new Set(allProperties.map((p) => p.state))].sort();
    return states;
  }, [allProperties]);

  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.neighborhood.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (selectedType !== "all" && p.type !== selectedType) return false;

      // Price filter
      if (selectedPrice !== "all") {
        const [min, max] = selectedPrice.split("-").map(Number);
        if (p.price < min || p.price > max) return false;
      }

      return true;
    });
  }, [allProperties, searchQuery, selectedType, selectedPrice]);

  // Proximity search: geocode and find nearby properties when no exact match
  useEffect(() => {
    if (geocodeTimerRef.current) {
      clearTimeout(geocodeTimerRef.current);
    }

    if (filteredProperties.length > 0 || !searchQuery) {
      setNearbyProperties([]);
      return;
    }

    geocodeTimerRef.current = setTimeout(async () => {
      setGeocoding(true);
      try {
        const result = await geocode(searchQuery);
        if (!result) {
          setNearbyProperties([]);
          return;
        }

        const propertiesWithDistance = allProperties
          .filter((p) => p.lat != null && p.lng != null)
          .map((p) => ({
            property: p,
            distance: haversineDistance(result.lat, result.lng, p.lat!, p.lng!),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 12);

        setNearbyProperties(propertiesWithDistance);
      } catch {
        setNearbyProperties([]);
      } finally {
        setGeocoding(false);
      }
    }, 500);

    return () => {
      if (geocodeTimerRef.current) {
        clearTimeout(geocodeTimerRef.current);
      }
    };
  }, [filteredProperties.length, searchQuery, allProperties]);

  const featuredProperties = useMemo(
    () => filteredProperties.slice(0, 10),
    [filteredProperties]
  );

  const propertiesByType = useMemo(() => {
    const types: PropertyType[] = ["casa", "apartamento", "terreno", "comercial"];
    return types.map((type) => ({
      type,
      label: getPropertyTypeLabel(type),
      properties: filteredProperties.filter((p) => p.type === type),
    }));
  }, [filteredProperties]);

  const propertiesByState = useMemo(() => {
    return availableStates.map((state) => ({
      state,
      properties: filteredProperties.filter((p) => p.state === state),
    }));
  }, [filteredProperties, availableStates]);

  const hasFilters =
    searchQuery || selectedType !== "all" || selectedPrice !== "all";

  function clearFilters() {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedPrice("all");
    setNearbyProperties([]);
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="px-6 pb-8 pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-primary">Encontre o imóvel perfeito</h1>
          <p className="lead mt-4 text-muted-foreground">
            Explore nosso catálogo completo de imóveis. Casas, apartamentos,
            terrenos e muito mais.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            {reidoapeLoading ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Carregando imóveis da Caixa...
              </span>
            ) : reidoapeCount > 0 ? (
              <Badge variant="blue">
                {reidoapeCount.toLocaleString("pt-BR")} imóveis da Caixa disponíveis
              </Badge>
            ) : null}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por título, endereço, bairro..."
                aria-label="Buscar imóveis"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-[10px] border border-border bg-card pl-10 pr-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s]"
              />
            </div>

            {/* Type filter */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
              {typeFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedType(filter.value)}
                  aria-pressed={selectedType === filter.value}
                  className={`rounded-[10px] px-4 py-2 text-sm font-medium transition-all duration-[0.4s] ${
                    selectedType === filter.value
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground border border-border hover:bg-muted"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Price filter */}
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              aria-label="Filtrar por faixa de preço"
              className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s] cursor-pointer"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          {filteredProperties.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20">
              <Building2 className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <h2 className="text-xl font-medium tracking-[-0.06em]">
                Nenhum imóvel encontrado
              </h2>
              <p className="mt-2 text-center text-muted-foreground">
                {hasFilters
                  ? "Tente ajustar os filtros ou limpar a busca."
                  : "Ainda não há imóveis cadastrados no catálogo."}
              </p>
              <div className="mt-6 flex gap-3">
                {hasFilters ? (
                  <Button variant="outline" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                ) : (
                  <Link href="/crm">
                    <Button variant="green">Publicar Imóvel</Button>
                  </Link>
                )}
              </div>

              {/* Nearby Properties */}
              {nearbyProperties.length > 0 && (
                <div className="mt-16 w-full">
                  <div className="mb-8 text-center">
                    <Badge variant="blue" className="mb-3 gap-1">
                      <Navigation className="h-3 w-3" />
                      Imóveis próximos
                    </Badge>
                    <h2 className="text-2xl font-medium tracking-[-0.06em] text-foreground md:text-3xl">
                      Não encontramos exatamente &ldquo;{searchQuery}&rdquo;
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Mas temos imóveis nessas proximidades:
                    </p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {nearbyProperties.map(({ property, distance }) => (
                      <PropertyCatalogCard
                        key={property.id}
                        property={property}
                        distance={distance}
                      />
                    ))}
                  </div>
                </div>
              )}

              {geocoding && (
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                  Buscando imóveis nas proximidades...
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Featured Carousel */}
              <PropertyCarouselSection
                title="Destaques"
                subtitle="Imóveis mais recentes"
                properties={featuredProperties}
              />

              {/* By Type - Tabs */}
              {propertiesByType.some((g) => g.properties.length > 0) && (
                <section className="py-8">
                  <h2 className="mb-6 text-2xl font-medium tracking-[-0.06em] text-foreground md:text-3xl">
                    Por Tipo
                  </h2>
                  <Tabs defaultValue="casa">
                    <TabsList className="mb-6">
                      {propertiesByType
                        .filter((g) => g.properties.length > 0)
                        .map((group) => (
                          <TabsTrigger key={group.type} value={group.type}>
                            {group.label}
                            <Badge variant="secondary" className="ml-1.5">
                              {group.properties.length}
                            </Badge>
                          </TabsTrigger>
                        ))}
                    </TabsList>

                    {propertiesByType
                      .filter((g) => g.properties.length > 0)
                      .map((group) => (
                        <TabsContent key={group.type} value={group.type}>
                          <div className="relative">
                            <Carousel
                              opts={{ align: "start", loop: group.properties.length > 3, containScroll: "trimSnaps" }}
                              className="w-full"
                            >
                              <CarouselContent>
                                {group.properties.map((property) => (
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
                        </TabsContent>
                      ))}
                  </Tabs>
                </section>
              )}

              {/* By State */}
              {propertiesByState.length > 0 && (
                <section className="py-8">
                  <h2 className="mb-2 text-2xl font-medium tracking-[-0.06em] text-foreground md:text-3xl">
                    Por Estado
                  </h2>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Imóveis organizados por região
                  </p>
                  {propertiesByState.map((group) => (
                    <PropertyCarouselSection
                      key={group.state}
                      title={group.state}
                      properties={group.properties}
                    />
                  ))}
                </section>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
