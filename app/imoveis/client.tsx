"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Building2, Navigation, Loader2, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyCatalogCard } from "@/components/property-catalog-card";
import { Property } from "@/lib/properties";
import { haversineDistance, geocode } from "@/lib/geolocation";

const typeFilters: { value: string; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "casa", label: "Casas" },
  { value: "apartamento", label: "Apartamentos" },
  { value: "terreno", label: "Terrenos" },
  { value: "comercial", label: "Comerciais" },
];

const stateFilters: { value: string; label: string }[] = [
  { value: "all", label: "Todos os estados" },
  { value: "PR", label: "Paraná" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
];

const bedroomFilters: { value: string; label: string }[] = [
  { value: "all", label: "Qualquer" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const bathroomFilters: { value: string; label: string }[] = [
  { value: "all", label: "Qualquer" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const parkingFilters: { value: string; label: string }[] = [
  { value: "all", label: "Qualquer" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const priceRanges = [
  { value: "all", label: "Qualquer preço" },
  { value: "0-100000", label: "Até R$ 100.000" },
  { value: "100000-200000", label: "R$ 100.000 - R$ 200.000" },
  { value: "200000-300000", label: "R$ 200.000 - R$ 300.000" },
  { value: "300000-500000", label: "R$ 300.000 - R$ 500.000" },
  { value: "500000-1000000", label: "R$ 500.000 - R$ 1.000.000" },
  { value: "1000000-999999999", label: "Acima de R$ 1.000.000" },
];

const sortOptions = [
  { value: "recentes", label: "Mais recentes" },
  { value: "menor_valor", label: "Menor preço" },
  { value: "maior_valor", label: "Maior preço" },
  { value: "maior_desconto", label: "Maior desconto" },
];

const LOAD_BATCH_DESKTOP = 12;
const LOAD_BATCH_MOBILE = 8;

interface NearbyProperty {
  property: Property;
  distance: number;
}

interface CountsData {
  total: number;
  byType: Record<string, number>;
  byState: Record<string, number>;
  byCity: Record<string, number>;
}

export default function ImoveisPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [reidoapeLoading, setReidoapeLoading] = useState(true);
  const [reidoapeCount, setReidoapeCount] = useState(0);
  const [counts, setCounts] = useState<CountsData | null>(null);
  const [displayCount, setDisplayCount] = useState(LOAD_BATCH_DESKTOP);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState("all");
  const [selectedBathrooms, setSelectedBathrooms] = useState("all");
  const [selectedParking, setSelectedParking] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recentes");
  const [neighborhoodQuery, setNeighborhoodQuery] = useState("");
  const [referenceQuery, setReferenceQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [nearbyProperties, setNearbyProperties] = useState<NearbyProperty[]>([]);
  const [geocoding, setGeocoding] = useState(false);
  const geocodeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const searchParams = useSearchParams();

  useEffect(() => {
    const s = searchParams.get("search");
    const t = searchParams.get("type");
    const p = searchParams.get("price");
    const st = searchParams.get("state");
    const b = searchParams.get("bedrooms");
    if (s) setSearchQuery(s);
    if (t) setSelectedType(t);
    if (p) setSelectedPrice(p);
    if (st) setSelectedState(st);
    if (b) setSelectedBedrooms(b);
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/counts")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setCounts(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    async function fetchAllProperties() {
      try {
        setReidoapeLoading(true);
        const firstRes = await fetch(`/api/properties?page=0&limit=100`);
        if (!firstRes.ok) throw new Error("First page failed");
        const firstData = await firstRes.json();
        const totalCount: number = firstData.total ?? 0;
        setReidoapeCount(totalCount);
        const allProps: Property[] = firstData.properties ?? [];

        const totalPages = Math.ceil(totalCount / 100);
        if (totalPages > 1) {
          const remaining = Array.from({ length: totalPages - 1 }, (_, i) => i + 1);
          const batchSize = 20;
          for (let i = 0; i < remaining.length; i += batchSize) {
            const batch = remaining.slice(i, i + batchSize);
            const results = await Promise.all(
              batch.map((p) =>
                fetch(`/api/properties?page=${p}&limit=100`)
                  .then((r) => (r.ok ? r.json() : { properties: [] }))
                  .catch(() => ({ properties: [] }))
              )
            );
            for (const data of results) {
              allProps.push(...(data.properties ?? []));
            }
          }
        }

        const uniqueMap = new Map<string, Property>();
        for (const p of allProps) {
          uniqueMap.set(p.id, p);
        }
        setAllProperties(Array.from(uniqueMap.values()));
      } catch {
        // silently fail
      } finally {
        setReidoapeLoading(false);
      }
    }
    fetchAllProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.neighborhood.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query) ||
          (p.refCaixa && p.refCaixa.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      if (selectedType !== "all" && p.type !== selectedType) return false;
      if (selectedState !== "all" && p.state !== selectedState) return false;

      if (selectedBedrooms !== "all") {
        const min = parseInt(selectedBedrooms, 10);
        if (p.bedrooms < min) return false;
      }

      if (selectedBathrooms !== "all") {
        const min = parseInt(selectedBathrooms, 10);
        if (p.bathrooms < min) return false;
      }

      if (selectedParking !== "all") {
        const min = parseInt(selectedParking, 10);
        if (p.parkingSpaces < min) return false;
      }

      if (selectedPrice !== "all") {
        const [min, max] = selectedPrice.split("-").map(Number);
        if (p.price < min || p.price > max) return false;
      }

      if (neighborhoodQuery) {
        const nq = neighborhoodQuery.toLowerCase();
        if (!p.neighborhood.toLowerCase().includes(nq) && !p.city.toLowerCase().includes(nq)) return false;
      }

      if (referenceQuery) {
        const rq = referenceQuery.toLowerCase();
        if (!p.refCaixa?.toLowerCase().includes(rq) && !p.id.toLowerCase().includes(rq)) return false;
      }

      return true;
    });
  }, [allProperties, searchQuery, selectedType, selectedState, selectedBedrooms, selectedBathrooms, selectedParking, selectedPrice, neighborhoodQuery, referenceQuery]);

  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];
    switch (selectedSort) {
      case "menor_valor":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "maior_valor":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "maior_desconto":
        sorted.sort((a, b) => (b.descontoPct ?? 0) - (a.descontoPct ?? 0));
        break;
      case "recentes":
      default:
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    return sorted;
  }, [filteredProperties, selectedSort]);

  const displayedProperties = useMemo(
    () => sortedProperties.slice(0, displayCount),
    [sortedProperties, displayCount]
  );

  useEffect(() => {
    setDisplayCount(isMobile ? LOAD_BATCH_MOBILE : LOAD_BATCH_DESKTOP);
  }, [searchQuery, selectedType, selectedState, selectedBedrooms, selectedBathrooms, selectedParking, selectedPrice, selectedSort, neighborhoodQuery, referenceQuery, isMobile]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < sortedProperties.length) {
          const batch = isMobile ? LOAD_BATCH_MOBILE : LOAD_BATCH_DESKTOP;
          setDisplayCount((prev) => Math.min(prev + batch, sortedProperties.length));
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [displayCount, sortedProperties.length, isMobile]);

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

  const hasFilters =
    searchQuery || selectedType !== "all" || selectedState !== "all" ||
    selectedBedrooms !== "all" || selectedBathrooms !== "all" ||
    selectedParking !== "all" || selectedPrice !== "all" ||
    neighborhoodQuery || referenceQuery;

  function clearFilters() {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedState("all");
    setSelectedBedrooms("all");
    setSelectedBathrooms("all");
    setSelectedParking("all");
    setSelectedPrice("all");
    setNeighborhoodQuery("");
    setReferenceQuery("");
    setNearbyProperties([]);
  }

  const loadMore = useCallback(() => {
    if (displayCount < sortedProperties.length) {
      const batch = isMobile ? LOAD_BATCH_MOBILE : LOAD_BATCH_DESKTOP;
      setDisplayCount((prev) => Math.min(prev + batch, sortedProperties.length));
    }
  }, [displayCount, sortedProperties.length, isMobile]);

  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 pb-6 pt-28 md:pt-32">
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

      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-3 md:top-0 md:py-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por título, endereço, bairro, ref..."
                aria-label="Buscar imóveis"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-[10px] border border-border bg-card pl-10 pr-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s]"
              />
            </div>

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

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                aria-label="Filtrar por faixa de preço"
                className="h-10 rounded-[10px] border border-border bg-card px-3 py-2 text-sm font-medium tracking-[-0.04em] text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s] cursor-pointer"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                aria-label="Filtrar por estado"
                className="h-10 rounded-[10px] border border-border bg-card px-3 py-2 text-sm font-medium tracking-[-0.04em] text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s] cursor-pointer"
              >
                {stateFilters.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                aria-label="Filtrar por dormitórios"
                className="h-10 rounded-[10px] border border-border bg-card px-3 py-2 text-sm font-medium tracking-[-0.04em] text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s] cursor-pointer"
              >
                {bedroomFilters.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label === "Qualquer" ? `Dormitórios: ${b.label}` : `${b.label} dormitórios`}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`flex items-center gap-2 h-10 rounded-[10px] px-4 text-sm font-medium transition-all duration-[0.4s] ${
                  showAdvanced
                    ? "bg-foreground text-background"
                    : "bg-card text-foreground border border-border hover:bg-muted"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </button>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 h-10 rounded-[10px] px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                  Limpar
                </button>
              )}
            </div>
          </div>

          {showAdvanced && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 border-t border-border pt-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Banheiros
                </label>
                <select
                  value={selectedBathrooms}
                  onChange={(e) => setSelectedBathrooms(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-border bg-card px-3 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
                >
                  {bathroomFilters.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label === "Qualquer" ? `Banheiros: ${b.label}` : `${b.label} banheiros`}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Vagas
                </label>
                <select
                  value={selectedParking}
                  onChange={(e) => setSelectedParking(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-border bg-card px-3 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
                >
                  {parkingFilters.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label === "Qualquer" ? `Vagas: ${p.label}` : `${p.label} vagas`}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Ordenar por
                </label>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-border bg-card px-3 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Bairro ou cidade
                </label>
                <input
                  type="text"
                  placeholder="Ex: Centro, Jardim..."
                  value={neighborhoodQuery}
                  onChange={(e) => setNeighborhoodQuery(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-border bg-card px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  Ref. ou código
                </label>
                <input
                  type="text"
                  placeholder="Ex: IMCX87877..."
                  value={referenceQuery}
                  onChange={(e) => setReferenceQuery(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-border bg-card px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          {displayedProperties.length === 0 && !reidoapeLoading ? (
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
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-medium tracking-[-0.06em] text-foreground md:text-3xl">
                    {hasFilters ? "Resultados" : "Imóveis"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {sortedProperties.length.toLocaleString("pt-BR")} imóveis encontrados
                  </p>
                </div>
              </div>

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {displayedProperties.map((property) => (
                  <PropertyCatalogCard key={property.id} property={property} />
                ))}
              </div>

              {displayCount < sortedProperties.length && (
                <div ref={sentinelRef} className="flex justify-center py-10">
                  <button
                    onClick={loadMore}
                    className="flex items-center gap-2 rounded-[10px] bg-card border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Carregar mais ({displayCount}/{sortedProperties.length})
                  </button>
                </div>
              )}

              {displayCount >= sortedProperties.length && sortedProperties.length > 0 && (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  Todos os {sortedProperties.length.toLocaleString("pt-BR")} imóveis foram carregados
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
