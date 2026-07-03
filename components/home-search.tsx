"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const typeFilters = [
  { value: "all", label: "Todos os imóveis" },
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

export function HomeSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 100);
    return () => clearTimeout(timer);
  }, []);

  function handleSearch() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (type !== "all") params.set("type", type);
    if (price !== "all") params.set("price", price);
    router.push(`/imoveis?${params.toString()}`);
  }

  return (
    <div className={`hero-card mt-10 w-full max-w-2xl ${inView ? "is-inview" : ""}`}>
      <div className="hero-card-bg hero-card-bg-white" />
      <div className="hero-card-bg hero-card-bg-primary" />
      <div className="hero-card-content relative z-10">
        <Card className="w-full">
          <CardContent className="p-6">
            <Tabs defaultValue="comprar">
              <TabsList variant="line" className="mb-6 w-full">
                <TabsTrigger value="comprar">Comprar</TabsTrigger>
                <TabsTrigger value="alugar">Alugar</TabsTrigger>
                <TabsTrigger value="novo">Imóvel novo</TabsTrigger>
              </TabsList>
            </Tabs>

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
