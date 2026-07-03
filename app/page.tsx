"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

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

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");

  function handleSearch() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (type !== "all") params.set("type", type);
    if (price !== "all") params.set("price", price);
    router.push(`/imoveis?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-32 text-center">
        <h1 className="max-w-4xl text-primary">
          Encontre o imóvel perfeito
        </h1>
        <p className="lead mt-6 max-w-2xl">
          A plataforma completa para comprar, alugar e investir em imóveis.
          Descubra oportunidades únicas com as melhores condições do mercado.
        </p>

        {/* Search Panel Card */}
        <Card className="mt-10 w-full max-w-2xl">
          <CardContent className="p-6">
            <Tabs defaultValue="comprar">
              <TabsList variant="line" className="mb-6 w-full">
                <TabsTrigger value="comprar">Comprar</TabsTrigger>
                <TabsTrigger value="alugar">Alugar</TabsTrigger>
                <TabsTrigger value="novo">Imóvel novo</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Location Search */}
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

            {/* Type & Price Row */}
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
      </section>

      {/* Por que nos escolher — green card section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl rounded-[10px] border border-border bg-[#8ed462] px-8 py-20 md:px-16">
          <h2 className="tracking-[-0.06em] text-charcoal">
            Por que nos <strong>escolher</strong>?
          </h2>
          <p className="mt-4 max-w-2xl text-charcoal/80">
            Construímos nossa plataforma em torno de três pilares: transparência,
            eficiência e cuidado. Trabalhamos para que cada cliente encontre o
            imóvel ideal com confiança e segurança.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Atendimento Personalizado
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Um consultor dedicado acompanha cada etapa da sua busca, da
                primeira visita ao fechamento. Você nunca é apenas mais um
                número.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Conhecimento Local
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Nossa equipe conhece cada bairro, cada mercado e cada
                oportunidade. Insights regionais que fazem a diferença na sua
                decisão.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Melhor Custo-Benefício
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Padrões rigorosos de qualidade em todas as regiões, entregando
                resultados comparáveis sem custos excessivos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Cobertura Nacional
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Com parceiros em todo o Brasil, estamos alinhados com seu
                horário e disponíveis quando você precisar.
              </p>
            </div>
            <div className="md:col-span-2 md:max-w-md">
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Transparência Total
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Cada imóvel é verificado por nossos especialistas. Documentação,
                história e condições reais — sem surpresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="bg-primary px-6 py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="tracking-[-0.06em] text-white">
              Por que escolher a <strong>Imobiliário</strong>?
            </h2>
            <div className="flex gap-2">
              <CarouselPrevious
                variant="outline"
                size="icon"
                className="relative inset-auto h-10 w-10 rounded-full border-green text-green hover:bg-green hover:text-charcoal disabled:opacity-40"
              />
              <CarouselNext
                variant="outline"
                size="icon"
                className="relative inset-auto h-10 w-10 rounded-full border-green text-green hover:bg-green hover:text-charcoal disabled:opacity-40"
              />
            </div>
          </div>

          <Carousel opts={{ align: "start", loop: false }}>
            <CarouselContent>
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-[#f5f1e4] p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    O que nos <strong>diferencia</strong>?
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-charcoal/70">
                      Atendimento personalizado do início ao fim. Um consultor
                      dedicado acompanha cada etapa da sua busca, da primeira
                      visita ao fechamento. Você nunca é apenas mais um número.
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-[#f5f1e4] p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    Vantagens da <strong>plataforma</strong>
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-charcoal/70">
                      Conhecimento local em cada bairro e mercado. Insights
                      regionais que fazem a diferença na sua decisão. Cobertura
                      nacional com parceiros em todo o Brasil.
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-[#f5f1e4] p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    Por que <strong>confiar</strong> na Imobiliário?
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-charcoal/70">
                      Transparência total: cada imóvel é verificado por nossos
                      especialistas. Documentação, história e condições reais —
                      sem surpresas. Padrões rigorosos de qualidade.
                    </p>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-sm text-muted-foreground">
        <p className="mb-2">&copy; 2026 Imobiliário. Todos os direitos reservados.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/termos-de-servico" className="underline hover:text-foreground transition-colors">
            Termos de Serviço
          </Link>
          <Link href="/politica-de-privacidade" className="underline hover:text-foreground transition-colors">
            Política de Privacidade
          </Link>
        </div>
      </footer>
    </main>
  );
}
