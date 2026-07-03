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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" aria-hidden="true">
                      <path d="M40 12c-6.6 0-12 5.4-12 12 0 4.8 2.8 9 7 11v5h10v-5c4.2-2 7-6.2 7-11 0-6.6-5.4-12-12-12z" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M28 40c-5.5 0-10 4.5-10 10v8h44v-8c0-5.5-4.5-10-10-10H28z" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                      <path d="M33 58v6M47 58v6M33 64h14" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="58" cy="18" r="6" stroke="#8ed462" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/>
                    </svg>
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" aria-hidden="true">
                      <path d="M10 40h60M40 10v60" stroke="#2c2e2a" strokeWidth="2" strokeLinecap="round" opacity="0.2"/>
                      <path d="M15 25c8-2 16 3 20 10s18 5 25-2" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 50c10 4 22-2 30 5s20 2 28-6" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                      <circle cx="25" cy="25" r="4" stroke="#2c2e2a" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="55" cy="50" r="4" stroke="#8ed462" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="40" cy="38" r="3" fill="#8ed462" opacity="0.3"/>
                    </svg>
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" aria-hidden="true">
                      <path d="M40 8L14 20v18c0 14.4 11.1 27.8 26 30 14.9-2.2 26-15.6 26-30V20L40 8z" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M40 14L18 24v14c0 11.5 9.4 22.2 22 24 12.6-1.8 22-12.5 22-24V24L40 14z" stroke="#2c2e2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.15"/>
                      <path d="M30 40l6 6 14-14" stroke="#8ed462" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" aria-hidden="true">
                      <rect x="16" y="8" width="36" height="48" rx="4" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M24 20h20M24 28h16M24 36h12" stroke="#8ed462" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="52" cy="52" r="14" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M46 52l4 4 8-8" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 56v8h28v-8" stroke="#2c2e2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                    </svg>
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" aria-hidden="true">
                      <circle cx="40" cy="40" r="28" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" opacity="0.15"/>
                      <circle cx="40" cy="40" r="22" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M35 20v40M35 20h10M45 20v10c0 5-3 8-10 8M45 38l-10 22M52 20v40" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" aria-hidden="true">
                      <path d="M20 50c0-11 9-20 20-20s20 9 20 20" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 56c0-14.4 11.1-26 26-26s26 11.6 26 26" stroke="#2c2e2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.2"/>
                      <circle cx="40" cy="26" r="6" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M28 44l8 8 16-16" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                      <path d="M32 62h16" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M36 66h8" stroke="#8ed462" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                    </svg>
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
