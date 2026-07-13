"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, Home, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCatalogCard } from "@/components/property-catalog-card";
import { PropertyGridSkeleton } from "@/components/skeletons";
import { Property } from "@/lib/properties";

const TYPE = "casa";
const PER_PAGE = 20;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedState, selectedModalidade, selectedOrigem, selectedRefCaixa]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") setSearchQuery(draftSearch);
  }

  function goToPage(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const hasFilters = searchQuery || selectedState !== "all" || selectedModalidade !== "all" || selectedOrigem !== "all" || selectedRefCaixa;

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
        <Button variant="outline" size="icon" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Página anterior">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">...</span>
          ) : (
            <Button key={p} variant={currentPage === p ? "default" : "outline"} size="icon" onClick={() => goToPage(p)}>
              {p}
            </Button>
          )
        )}
        <Button variant="outline" size="icon" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Próxima página">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

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
                  setCurrentPage(1);
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
                onChange={(e) => { setSelectedModalidade(e.target.value); setCurrentPage(1); }}
                aria-label="Filtrar por modalidade"
                className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
              >
                {modalidadeFilters.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>

              <select
                value={selectedOrigem}
                onChange={(e) => { setSelectedOrigem(e.target.value); setCurrentPage(1); }}
                aria-label="Filtrar por origem"
                className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 cursor-pointer"
              >
                {origemFilters.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="REF / Código Caixa"
                aria-label="Buscar por referência"
                value={selectedRefCaixa}
                onChange={(e) => { setSelectedRefCaixa(e.target.value); setCurrentPage(1); }}
                onKeyDown={handleKeyDown}
                className="h-10 w-48 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s]"
              />
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <PropertyGridSkeleton count={10} />
            </div>
          ) : paginated.length === 0 ? (
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
                  {totalPages > 1 && <> — Página {currentPage} de {totalPages}</>}
                </p>
              </div>

              <div className="space-y-4">
                {paginated.map((property) => (
                  <PropertyCatalogCard key={property.id} property={property} horizontal />
                ))}
              </div>

              {renderPagination()}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
