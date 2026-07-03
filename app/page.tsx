"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const typeFilters = [
  { value: "all", label: "Todos os imoveis" },
  { value: "casa", label: "Casas" },
  { value: "apartamento", label: "Apartamentos" },
  { value: "terreno", label: "Terrenos" },
  { value: "comercial", label: "Comerciais" },
];

const priceRanges = [
  { value: "all", label: "Qualquer preco" },
  { value: "0-300000", label: "Ate R$ 300.000" },
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
          Encontre o imovel perfeito
        </h1>
        <p className="lead mt-6 max-w-2xl">
          A plataforma completa para comprar, alugar e investir em imoveis.
          Descubra oportunidades unicas com as melhores condicoes do mercado.
        </p>

        {/* Search Panel Card */}
        <Card className="mt-10 w-full max-w-2xl">
          <CardContent className="p-6">
            <Tabs defaultValue="comprar">
              <TabsList variant="line" className="mb-6 w-full">
                <TabsTrigger value="comprar">Comprar</TabsTrigger>
                <TabsTrigger value="alugar">Alugar</TabsTrigger>
                <TabsTrigger value="novo">Imovel novo</TabsTrigger>
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
                  Tipo de imovel
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
                  Faixa de preco
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
            Construimos nossa plataforma em torno de tres pilares: transparencia,
            eficiencia e cuidado. Trabalhamos para que cada cliente encontre o
            imovel ideal com confianca e seguranca.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Atendimento Personalizado
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Um consultor dedicado acompanha cada etapa da sua busca, da
                primeira visita ao fechamento. Voce nunca e apenas mais um
                numero.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Conhecimento Local
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Nossa equipe conhece cada bairro, cada mercado e cada
                oportunidade. Insights regionais que fazem a diferenca na sua
                decisao.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Melhor Custo-Beneficio
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Padroes rigorosos de qualidade em todas as regioes, entregando
                resultados comparaveis sem custos excessivos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Cobertura Nacional
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Com parceiros em todo o Brasil, estamos alinhados com seu
                horario e disponiveis quando voce precisar.
              </p>
            </div>
            <div className="md:col-span-2 md:max-w-md">
              <h3 className="text-lg font-medium tracking-[-0.06em] text-charcoal">
                Transparencia Total
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Cada imovel e verificado por nossos especialistas. Documentacao,
                historia e condicoes reais — sem surpresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-6 py-20 text-primary-foreground">
        <div className="mx-auto max-w-3xl text-center">
          <h2>Pronto para encontrar seu imovel?</h2>
          <p className="mt-4 text-lg opacity-90">
            Cadastre-se gratuitamente e comece a explorar as melhores
            oportunidades do mercado.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Input
              placeholder="Digite seu email"
              className="max-w-sm border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button variant="green" size="lg">
              Cadastrar
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-sm text-muted-foreground">
        <p className="mb-2">&copy; 2026 Imobiliario. Todos os direitos reservados.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/termos-de-servico" className="underline hover:text-foreground transition-colors">
            Termos de Servico
          </Link>
          <Link href="/politica-de-privacidade" className="underline hover:text-foreground transition-colors">
            Politica de Privacidade
          </Link>
        </div>
      </footer>
    </main>
  );
}
