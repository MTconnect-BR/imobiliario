import Link from "next/link";
import { HomeSearch } from "@/components/home-search";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Home() {
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
        <HomeSearch />
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

      {/* Carousel 1 — Por que escolher */}
      <section className="bg-primary px-6 py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl">
          <Carousel opts={{ align: "start", loop: false, dragFree: false, containScroll: "trimSnaps", duration: 20 }}>
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

            <CarouselContent>
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-[#f5f1e4] p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    O que nos <strong>diferencia</strong>?
                  </h3>
                  <div className="flex flex-1 items-center justify-center">
                    <img src="/icons/carousel/person-support.svg" alt="" className="h-40 w-40" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal/70">
                    Atendimento personalizado do início ao fim. Um consultor
                    dedicado acompanha cada etapa da sua busca, da primeira
                    visita ao fechamento. Você nunca é apenas mais um número.
                  </p>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-[#f5f1e4] p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    Vantagens da <strong>plataforma</strong>
                  </h3>
                  <div className="flex flex-1 items-center justify-center">
                    <img src="/icons/carousel/chart-analytics.svg" alt="" className="h-40 w-40" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal/70">
                    Conhecimento local em cada bairro e mercado. Insights
                    regionais que fazem a diferença na sua decisão. Cobertura
                    nacional com parceiros em todo o Brasil.
                  </p>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-[#f5f1e4] p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    Por que <strong>confiar</strong> na Imobiliário?
                  </h3>
                  <div className="flex flex-1 items-center justify-center">
                    <img src="/icons/carousel/shield-trust.svg" alt="" className="h-40 w-40" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal/70">
                    Transparência total: cada imóvel é verificado por nossos
                    especialistas. Documentação, história e condições reais —
                    sem surpresas. Padrões rigorosos de qualidade.
                  </p>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-[#f5f1e4] p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    <strong>Segurança</strong> Jurídica
                  </h3>
                  <div className="flex flex-1 items-center justify-center">
                    <img src="/icons/carousel/document-legal.svg" alt="" className="h-40 w-40" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal/70">
                    Documentação verificada por especialistas. Processos
                    seguros do início ao fechamento, com assessoria jurídica
                    completa em cada etapa.
                  </p>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-[#f5f1e4] p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    <strong>Financiamento</strong> Facilitado
                  </h3>
                  <div className="flex flex-1 items-center justify-center">
                    <img src="/icons/carousel/coin-financing.svg" alt="" className="h-40 w-40" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal/70">
                    Parcerias com os principais bancos do Brasil. Crédito
                    imobiliário com as melhores condições do mercado e
                    aprovação rápida.
                  </p>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-[#f5f1e4] p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    <strong>Suporte</strong> Pós-Venda
                  </h3>
                  <div className="flex flex-1 items-center justify-center">
                    <img src="/icons/carousel/headset-support.svg" alt="" className="h-40 w-40" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal/70">
                    Acompanhamento contínuo após a compra. Assistência com
                    manutenção, questões legais e qualquer necessidade que
                    surgir.
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Carousel 2 — Como funciona */}
      <section className="bg-[#8ed462] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Carousel opts={{ align: "start", loop: false, dragFree: false, containScroll: "trimSnaps", duration: 20 }}>
            <div className="mb-10 flex items-center justify-between">
              <h2 className="tracking-[-0.06em] text-charcoal">
                Como funciona a <strong>Imobiliário</strong>?
              </h2>
              <div className="flex gap-2">
                <CarouselPrevious
                  variant="outline"
                  size="icon"
                  className="relative inset-auto h-10 w-10 rounded-full border-charcoal text-charcoal hover:bg-charcoal hover:text-white disabled:opacity-40"
                />
                <CarouselNext
                  variant="outline"
                  size="icon"
                  className="relative inset-auto h-10 w-10 rounded-full border-charcoal text-charcoal hover:bg-charcoal hover:text-white disabled:opacity-40"
                />
              </div>
            </div>

            <CarouselContent>
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-white p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    <strong>Busque</strong>
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-charcoal/70">
                      Encontre o imóvel perfeito pelo nosso search inteligente
                      com filtros por tipo, preço e localização. Resultados
                      precisos em segundos.
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-white p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    <strong>Agende</strong>
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-charcoal/70">
                      Visite presencialmente ou faça um tour virtual 360° antes
                      de tomar sua decisão. Conheça cada detalhe do imóvel.
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-white p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    <strong>Negocie</strong>
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-charcoal/70">
                      Condições especiais e total transparência em cada etapa
                      da negociação. Sem surpresas, sem letras miúdas.
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-white p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    <strong>Financie</strong>
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-charcoal/70">
                      Crédito imobiliário com as melhores taxas. Parceria com
                      os principais bancos do Brasil para facilitar seu
                      financiamento.
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-white p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    <strong>Compre</strong>
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-charcoal/70">
                      Fechamento seguro com assessoria jurídica completa e
                      documentação verificada. Cuidamos de cada detalhe para
                      você.
                    </p>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full min-h-[400px] flex-col justify-between gap-4 rounded-[10px] bg-white p-8 sm:min-h-[500px]">
                  <h3 className="text-xl font-medium tracking-[-0.06em] text-charcoal">
                    <strong>Apoio</strong>
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-charcoal/70">
                      Suporte contínuo pós-compra. Estamos sempre disponíveis
                      quando você precisar. Manutenção, questões legais e muito
                      mais.
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
