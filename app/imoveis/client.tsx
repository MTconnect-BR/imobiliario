"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Building2, Navigation, X, ChevronLeft, ChevronRight } from "lucide-react";
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

const modalidadeFilters: { value: string; label: string }[] = [
  { value: "all", label: "Qualquer modalidade" },
  { value: "Novo", label: "Novo" },
  { value: "Venda Direta Online", label: "Venda Direta Online" },
];

const origemFilters: { value: string; label: string }[] = [
  { value: "all", label: "Qualquer origem" },
  { value: "caixa", label: "Caixa" },
  { value: "particular", label: "Particular" },
];

const PER_PAGE = 20;

interface NearbyProperty {
  property: Property;
  distance: number;
}

interface ImoveisClientProps {
  initialProperties: Property[];
}

export default function ImoveisClient({ initialProperties }: ImoveisClientProps) {
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);

  const allProperties = initialProperties;
  const [nearbyProperties, setNearbyProperties] = useState<NearbyProperty[]>([]);
  const [geocoding, setGeocoding] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [draftSearch, setDraftSearch] = useState("");
  const [draftType, setDraftType] = useState("all");
  const [draftState, setDraftState] = useState("all");
  const [draftBedrooms, setDraftBedrooms] = useState("all");
  const [draftBathrooms, setDraftBathrooms] = useState("all");
  const [draftParking, setDraftParking] = useState("all");
  const [draftPrice, setDraftPrice] = useState("all");
  const [draftModalidade, setDraftModalidade] = useState("all");
  const [draftOrigem, setDraftOrigem] = useState("all");
  const [draftRefCaixa, setDraftRefCaixa] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState("all");
  const [selectedBathrooms, setSelectedBathrooms] = useState("all");
  const [selectedParking, setSelectedParking] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedModalidade, setSelectedModalidade] = useState("all");
  const [selectedOrigem, setSelectedOrigem] = useState("all");
  const [selectedRefCaixa, setSelectedRefCaixa] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const s = searchParams.get("search");
    const t = searchParams.get("type");
    const p = searchParams.get("price");
    const st = searchParams.get("state");
    const b = searchParams.get("bedrooms");
    const pg = searchParams.get("page");
    if (s) { setDraftSearch(s); setSearchQuery(s); }
    if (t) { setDraftType(t); setSelectedType(t); }
    if (p) { setDraftPrice(p); setSelectedPrice(p); }
    if (st) { setDraftState(st); setSelectedState(st); }
    if (b) { setDraftBedrooms(b); setSelectedBedrooms(b); }
    if (pg) setCurrentPage(parseInt(pg, 10) || 1);
  }, [searchParams]);

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

      if (selectedModalidade !== "all" && p.modalidade !== selectedModalidade) return false;
      if (selectedOrigem !== "all" && p.tipo_origem !== selectedOrigem) return false;
      if (selectedRefCaixa) {
        const r = selectedRefCaixa.toLowerCase();
        if (!p.refCaixa?.toLowerCase().includes(r)) return false;
      }

      return true;
    });
  }, [allProperties, searchQuery, selectedType, selectedState, selectedBedrooms, selectedBathrooms, selectedParking, selectedPrice, selectedModalidade, selectedOrigem, selectedRefCaixa]);

  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [filteredProperties]);

  const totalPages = Math.ceil(sortedProperties.length / PER_PAGE);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return sortedProperties.slice(start, start + PER_PAGE);
  }, [sortedProperties, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedState, selectedBedrooms, selectedBathrooms, selectedParking, selectedPrice, selectedModalidade, selectedOrigem, selectedRefCaixa]);

  useEffect(() => {
    if (filteredProperties.length > 0 || !searchQuery) {
      setNearbyProperties([]);
      return;
    }

    const timer = setTimeout(async () => {
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

    return () => clearTimeout(timer);
  }, [filteredProperties.length, searchQuery, allProperties]);

  function applyFilters() {
    setSearchQuery(draftSearch);
    setSelectedType(draftType);
    setSelectedState(draftState);
    setSelectedBedrooms(draftBedrooms);
    setSelectedBathrooms(draftBathrooms);
    setSelectedParking(draftParking);
    setSelectedPrice(draftPrice);
    setSelectedModalidade(draftModalidade);
    setSelectedOrigem(draftOrigem);
    setSelectedRefCaixa(draftRefCaixa);
    setCurrentPage(1);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") applyFilters();
  }

  function goToPage(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const hasAppliedFilters =
    searchQuery || selectedType !== "all" || selectedState !== "all" ||
    selectedBedrooms !== "all" || selectedBathrooms !== "all" ||
    selectedParking !== "all" || selectedPrice !== "all" ||
    selectedModalidade !== "all" || selectedOrigem !== "all" || selectedRefCaixa;

  function clearAllFilters() {
    setDraftSearch("");
    setDraftType("all");
    setDraftState("all");
    setDraftBedrooms("all");
    setDraftBathrooms("all");
    setDraftParking("all");
    setDraftPrice("all");
    setDraftModalidade("all");
    setDraftOrigem("all");
    setDraftRefCaixa("");
    setSearchQuery("");
    setSelectedType("all");
    setSelectedState("all");
    setSelectedBedrooms("all");
    setSelectedBathrooms("all");
    setSelectedParking("all");
    setSelectedPrice("all");
    setSelectedModalidade("all");
    setSelectedOrigem("all");
    setSelectedRefCaixa("");
    setCurrentPage(1);
    setNearbyProperties([]);
  }

  function renderPagination() {
    if (totalPages <= 1) return null;

    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return (
      <div className="flex items-center justify-center gap-1 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={p}
              variant={currentPage === p ? "default" : "outline"}
              size="icon"
              onClick={() => goToPage(p)}
            >
              {p}
            </Button>
          )
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="flex min-h-[50vh] flex-col items-center justify-center px-6 pb-6 pt-32 text-center md:pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-primary">Encontre o imóvel perfeito</h1>
          <p className="lead mt-4 text-muted-foreground">
            Explore nosso catálogo completo de imóveis. Casas, apartamentos,
            terrenos e muito mais.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Badge variant="blue">
              {allProperties.length.toLocaleString("pt-BR")} imóveis disponíveis
            </Badge>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-[#2d2d2d]">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por título, endereço, bairro, ref..."
                aria-label="Buscar imóveis"
                value={draftSearch}
                onChange={(e) => setDraftSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="h-10 w-full rounded-[10px] border border-white/20 bg-white/10 pl-10 pr-4 py-2 text-sm font-medium tracking-[-0.04em] text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/20 transition-all duration-[0.4s]"
              />
            </div>
            <Button onClick={applyFilters} className="h-10 rounded-[10px] px-6">
              Buscar
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setDraftType(filter.value);
                    setSelectedType(filter.value);
                    setCurrentPage(1);
                  }}
                  aria-pressed={draftType === filter.value}
                  className={`rounded-[10px] px-4 py-2 text-sm font-medium transition-all duration-[0.4s] ${
                    draftType === filter.value
                      ? "bg-white text-[#2d2d2d]"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <select
              value={draftPrice}
              onChange={(e) => {
                setDraftPrice(e.target.value);
                setSelectedPrice(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filtrar por faixa de preço"
              className="h-10 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium tracking-[-0.04em] text-white focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/20 cursor-pointer"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value} className="bg-[#2d2d2d] text-white">
                  {range.label}
                </option>
              ))}
            </select>

            <select
              value={draftState}
              onChange={(e) => {
                setDraftState(e.target.value);
                setSelectedState(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filtrar por estado"
              className="h-10 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium tracking-[-0.04em] text-white focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/20 cursor-pointer"
            >
              {stateFilters.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#2d2d2d] text-white">
                  {s.label}
                </option>
              ))}
            </select>

            <select
              value={draftBedrooms}
              onChange={(e) => {
                setDraftBedrooms(e.target.value);
                setSelectedBedrooms(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filtrar por dormitórios"
              className="h-10 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium tracking-[-0.04em] text-white focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/20 cursor-pointer"
            >
              {bedroomFilters.map((b) => (
                <option key={b.value} value={b.value} className="bg-[#2d2d2d] text-white">
                  {b.label === "Qualquer" ? `Dormitórios: ${b.label}` : `${b.label} dormitórios`}
                </option>
              ))}
            </select>

            <select
              value={draftBathrooms}
              onChange={(e) => {
                setDraftBathrooms(e.target.value);
                setSelectedBathrooms(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filtrar por banheiros"
              className="h-10 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium tracking-[-0.04em] text-white focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/20 cursor-pointer"
            >
              {bathroomFilters.map((b) => (
                <option key={b.value} value={b.value} className="bg-[#2d2d2d] text-white">
                  {b.label === "Qualquer" ? `Banheiros: ${b.label}` : `${b.label} banheiros`}
                </option>
              ))}
            </select>

            <select
              value={draftParking}
              onChange={(e) => {
                setDraftParking(e.target.value);
                setSelectedParking(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filtrar por vagas"
              className="h-10 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium tracking-[-0.04em] text-white focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/20 cursor-pointer"
            >
              {parkingFilters.map((p) => (
                <option key={p.value} value={p.value} className="bg-[#2d2d2d] text-white">
                  {p.label === "Qualquer" ? `Vagas: ${p.label}` : `${p.label} vagas`}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="rounded-[10px] px-4 py-2 text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:bg-white/10 transition-all duration-[0.4s]"
            >
              {showAdvanced ? "Ocultar avançados" : "Mais filtros"}
            </button>

            {hasAppliedFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 h-10 rounded-[10px] px-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
                Limpar
              </button>
            )}
          </div>

          {showAdvanced && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <select
                value={draftModalidade}
                onChange={(e) => {
                  setDraftModalidade(e.target.value);
                  setSelectedModalidade(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filtrar por modalidade"
                className="h-10 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium tracking-[-0.04em] text-white focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/20 cursor-pointer"
              >
                {modalidadeFilters.map((m) => (
                  <option key={m.value} value={m.value} className="bg-[#2d2d2d] text-white">{m.label}</option>
                ))}
              </select>

              <select
                value={draftOrigem}
                onChange={(e) => {
                  setDraftOrigem(e.target.value);
                  setSelectedOrigem(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filtrar por origem"
                className="h-10 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium tracking-[-0.04em] text-white focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/20 cursor-pointer"
              >
                {origemFilters.map((o) => (
                  <option key={o.value} value={o.value} className="bg-[#2d2d2d] text-white">{o.label}</option>
                ))}
              </select>

              <div className="relative">
                <input
                  type="text"
                  placeholder="REF / Código Caixa"
                  aria-label="Buscar por referência"
                  value={draftRefCaixa}
                  onChange={(e) => setDraftRefCaixa(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="h-10 w-48 rounded-[10px] border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-[-0.04em] text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/20 transition-all duration-[0.4s]"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section ref={resultsRef} className="px-6 pt-8 pb-8">
        <div className="mx-auto max-w-6xl scroll-mt-8">
          {paginatedProperties.length === 0 && nearbyProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Building2 className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <h2 className="text-xl font-medium tracking-[-0.06em]">
                Nenhum imóvel encontrado
              </h2>
              <p className="mt-2 text-center text-muted-foreground">
                {hasAppliedFilters
                  ? "Tente ajustar os filtros ou limpar a busca."
                  : "Ainda não há imóveis cadastrados no catálogo."}
              </p>
              <div className="mt-6 flex gap-3">
                {hasAppliedFilters ? (
                  <Button variant="outline" onClick={clearAllFilters}>
                    Limpar filtros
                  </Button>
                ) : (
                  <Link href="/crm">
                    <Button variant="green">Publicar Imóvel</Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-medium tracking-[-0.06em] text-foreground md:text-3xl">
                    {hasAppliedFilters ? "Resultados" : "Imóveis"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {sortedProperties.length.toLocaleString("pt-BR")} imóveis encontrados
                    {totalPages > 1 && (
                      <> — Página {currentPage} de {totalPages}</>
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {paginatedProperties.map((property) => (
                  <PropertyCatalogCard key={property.id} property={property} horizontal />
                ))}
              </div>

              {renderPagination()}

              {nearbyProperties.length > 0 && (
                <div className="mt-16">
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
                  <div className="space-y-4">
                    {nearbyProperties.map(({ property, distance }) => (
                      <PropertyCatalogCard
                        key={property.id}
                        property={property}
                        distance={distance}
                        horizontal
                      />
                    ))}
                  </div>
                </div>
              )}

              {geocoding && (
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  Buscando imóveis nas proximidades...
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
