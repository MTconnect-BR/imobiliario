"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Building, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCatalogCard } from "@/components/property-catalog-card";
import { PropertyGridSkeleton } from "@/components/skeletons";
import { Property } from "@/lib/properties";

const TYPE = "apartamento";
const LOAD_BATCH = 12;

export default function ApartamentosPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [draftSearch, setDraftSearch] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [displayCount, setDisplayCount] = useState(LOAD_BATCH);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const res = await fetch(`/api/properties?type=${TYPE}&limit=10000`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setProperties(data.properties ?? []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const states = useMemo(() => {
    return [...new Set(properties.map((p) => p.state))].sort();
  }, [properties]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.address.toLowerCase().includes(q) &&
          !p.neighborhood.toLowerCase().includes(q) &&
          !p.city.toLowerCase().includes(q)
        )
          return false;
      }
      if (selectedState !== "all" && p.state !== selectedState) return false;
      return true;
    });
  }, [properties, searchQuery, selectedState]);

  const displayed = useMemo(
    () => filtered.slice(0, displayCount),
    [filtered, displayCount]
  );

  useEffect(() => {
    setDisplayCount(LOAD_BATCH);
  }, [searchQuery, selectedState]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filtered.length) {
          setDisplayCount((prev) => Math.min(prev + LOAD_BATCH, filtered.length));
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [displayCount, filtered.length]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") setSearchQuery(draftSearch);
  }

  const hasFilters = searchQuery || selectedState !== "all";

  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 pb-8 pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-primary">Apartamentos</h1>
          <p className="lead mt-4 text-muted-foreground">
            Apartamentos modernos nas melhores localizações.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:top-0">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por título, endereço, bairro..."
                aria-label="Buscar apartamentos"
                value={draftSearch}
                onChange={(e) => setDraftSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-10 w-full rounded-[10px] border border-border bg-card pl-10 pr-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s]"
              />
            </div>
            <Button onClick={() => setSearchQuery(draftSearch)} className="h-10 rounded-[10px] px-6">
              Buscar
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              aria-label="Filtrar por estado"
              className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
            >
              <option value="all">Todos os estados</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {hasFilters && (
              <button
                onClick={() => {
                  setDraftSearch("");
                  setSearchQuery("");
                  setSelectedState("all");
                }}
                className="flex items-center gap-1 h-10 rounded-[10px] px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Limpar
              </button>
            )}

            <Link href="/imoveis" className="ml-auto">
              <Button variant="outline" size="sm">Ver todos os imóveis</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <PropertyGridSkeleton count={12} />
            </div>
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Building className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <h2 className="text-xl font-medium tracking-[-0.06em]">
                Nenhum apartamento encontrado
              </h2>
              <p className="mt-2 text-muted-foreground">
                {hasFilters
                  ? "Tente ajustar os filtros."
                  : "Ainda não há apartamentos cadastrados."}
              </p>
              <div className="mt-6">
                <Link href="/crm">
                  <Button variant="green">Publicar Imóvel</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-medium tracking-[-0.06em] text-foreground md:text-3xl">
                  Apartamentos
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filtered.length.toLocaleString("pt-BR")} imóveis encontrados
                </p>
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {displayed.map((property) => (
                  <PropertyCatalogCard key={property.id} property={property} />
                ))}
              </div>

              {displayCount < filtered.length && (
                <div ref={sentinelRef} className="flex justify-center py-10">
                  <button
                    onClick={() => setDisplayCount((prev) => Math.min(prev + LOAD_BATCH, filtered.length))}
                    className="flex items-center gap-2 rounded-[10px] bg-card border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Carregar mais ({displayCount}/{filtered.length})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
