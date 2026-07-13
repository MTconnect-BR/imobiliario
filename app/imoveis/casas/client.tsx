"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Home, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCatalogCard } from "@/components/property-catalog-card";
import { PropertyGridSkeleton } from "@/components/skeletons";
import { Property } from "@/lib/properties";

const TYPE = "casa";
const LOAD_BATCH = 12;

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

export default function CasasPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [draftSearch, setDraftSearch] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedModalidade, setSelectedModalidade] = useState("all");
  const [selectedOrigem, setSelectedOrigem] = useState("all");
  const [selectedRefCaixa, setSelectedRefCaixa] = useState("");
  const [displayCount, setDisplayCount] = useState(LOAD_BATCH);
  const [showAdvanced, setShowAdvanced] = useState(false);
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
          !p.city.toLowerCase().includes(q) &&
          !p.refCaixa?.toLowerCase().includes(q)
        )
          return false;
      }
      if (selectedState !== "all" && p.state !== selectedState) return false;
      if (selectedModalidade !== "all" && p.modalidade !== selectedModalidade) return false;
      if (selectedOrigem !== "all" && p.tipo_origem !== selectedOrigem) return false;
      if (selectedRefCaixa) {
        const r = selectedRefCaixa.toLowerCase();
        if (!p.refCaixa?.toLowerCase().includes(r)) return false;
      }
      return true;
    });
  }, [properties, searchQuery, selectedState, selectedModalidade, selectedOrigem, selectedRefCaixa]);

  const displayed = useMemo(
    () => filtered.slice(0, displayCount),
    [filtered, displayCount]
  );

  useEffect(() => {
    setDisplayCount(LOAD_BATCH);
  }, [searchQuery, selectedState, selectedModalidade, selectedOrigem, selectedRefCaixa]);

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

  const hasFilters = searchQuery || selectedState !== "all" || selectedModalidade !== "all" || selectedOrigem !== "all" || selectedRefCaixa;

  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 pb-8 pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-primary">Casas</h1>
          <p className="lead mt-4 text-muted-foreground">
            Encontre a casa perfeita para você e sua família.
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
                placeholder="Buscar por título, endereço, bairro, ref..."
                aria-label="Buscar casas"
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

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="rounded-[10px] px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border hover:bg-muted transition-all duration-[0.4s]"
            >
              {showAdvanced ? "Ocultar avançados" : "Mais filtros"}
            </button>

            {hasFilters && (
              <button
                onClick={() => {
                  setDraftSearch("");
                  setSearchQuery("");
                  setSelectedState("all");
                  setSelectedModalidade("all");
                  setSelectedOrigem("all");
                  setSelectedRefCaixa("");
                }}
                className="flex items-center gap-1 h-10 rounded-[10px] px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
                Limpar
              </button>
            )}

            <Link href="/imoveis" className="ml-auto">
              <Button variant="outline" size="sm">Ver todos os imóveis</Button>
            </Link>
          </div>

          {showAdvanced && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <select
                value={selectedModalidade}
                onChange={(e) => setSelectedModalidade(e.target.value)}
                aria-label="Filtrar por modalidade"
                className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
              >
                {modalidadeFilters.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>

              <select
                value={selectedOrigem}
                onChange={(e) => setSelectedOrigem(e.target.value)}
                aria-label="Filtrar por origem"
                className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
              >
                {origemFilters.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              <div className="relative">
                <input
                  type="text"
                  placeholder="REF / Código Caixa"
                  aria-label="Buscar por referência"
                  value={selectedRefCaixa}
                  onChange={(e) => setSelectedRefCaixa(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-10 w-48 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s]"
                />
              </div>
            </div>
          )}
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
              <Home className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <h2 className="text-xl font-medium tracking-[-0.06em]">
                Nenhuma casa encontrada
              </h2>
              <p className="mt-2 text-muted-foreground">
                {hasFilters
                  ? "Tente ajustar os filtros."
                  : "Ainda não há casas cadastradas."}
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
                  Casas
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
