"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const typeFilters = [
  { value: "all", label: "Todos os imóveis" },
  { value: "casa", label: "Casas" },
  { value: "apartamento", label: "Apartamentos" },
  { value: "terreno", label: "Terrenos" },
  { value: "comercial", label: "Comerciais" },
];

const stateFilters = [
  { value: "all", label: "Todos os estados" },
  { value: "PR", label: "Paraná" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
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

const bedroomFilters = [
  { value: "all", label: "Qualquer" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

export function HomeSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [state, setState] = useState("all");
  const [price, setPrice] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleSearch() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (type !== "all") params.set("type", type);
    if (state !== "all") params.set("state", state);
    if (price !== "all") params.set("price", price);
    if (bedrooms !== "all") params.set("bedrooms", bedrooms);
    router.push(`/imoveis?${params.toString()}`);
  }

  return (
    <div ref={cardRef} className={`hero-card mt-10 w-full max-w-2xl ${inView ? "is-inview" : ""}`}>
      <div className="hero-card-bg hero-card-bg-primary" />
      <div className="hero-card-bg hero-card-bg-white" />
      <div className="hero-card-content relative z-10">
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Busque por imóvel da Caixa
              </label>
            </div>

            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Onde deseja morar?
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Busque rua, bairro ou cidade"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Tipo de imóvel
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none cursor-pointer"
                >
                  {typeFilters.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Faixa de preço
                </label>
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none cursor-pointer"
                >
                  {priceRanges.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Estado
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none cursor-pointer"
                >
                  {stateFilters.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Dormitórios
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none cursor-pointer"
                >
                  {bedroomFilters.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label === "Qualquer" ? "Qualquer" : `${b.label} dormitórios`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              variant="green"
              size="lg"
              className="w-full"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
