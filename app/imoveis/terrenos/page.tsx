"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property, getAllProperties, getPropertyTypeLabel } from "@/lib/properties";
import { PropertyCarouselSection } from "@/components/property-carousel-section";

const TYPE = "terreno";

export default function TerrenosPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");

  useState(() => {
    setProperties(
      getAllProperties().filter((p) => p.type === TYPE)
    );
  });

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

  const byState = useMemo(() => {
    return states.map((state) => ({
      state,
      items: filtered.filter((p) => p.state === state),
    }));
  }, [filtered, states]);

  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 pb-8 pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-primary">{getPropertyTypeLabel(TYPE)}s</h1>
          <p className="lead mt-4 text-muted-foreground">
            Terrenos e lotes para construir ou investir.
          </p>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur px-6 py-4">
        <div className="mx-auto max-w-6xl flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por título, endereço, bairro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-[10px] border border-border bg-card pl-10 pr-4 py-2 text-sm font-medium tracking-[-0.04em] text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s]"
            />
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="h-10 rounded-[10px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-all duration-[0.4s] cursor-pointer"
          >
            <option value="all">Todos os estados</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <Link href="/imoveis">
            <Button variant="outline" size="sm">Ver todos os imóveis</Button>
          </Link>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Map className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <h3 className="text-xl font-medium tracking-[-0.06em]">
                Nenhum terreno encontrado
              </h3>
              <p className="mt-2 text-muted-foreground">
                {searchQuery || selectedState !== "all"
                  ? "Tente ajustar os filtros."
                  : "Ainda não há terrenos cadastrados."}
              </p>
              <div className="mt-6">
                <Link href="/crm">
                  <Button variant="green">Publicar Imóvel</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <PropertyCarouselSection
                title="Destaques"
                properties={filtered.slice(0, 10)}
              />
              {byState.length > 0 && (
                <section className="py-8">
                  <h2 className="mb-6 text-2xl font-medium tracking-[-0.06em]">
                    Por Estado
                  </h2>
                  {byState.map((group) => (
                    <PropertyCarouselSection
                      key={group.state}
                      title={group.state}
                      properties={group.items}
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
