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
          Imóveis da Caixa com as melhores condições.
          Casas, apartamentos, terrenos e mais — tudo com transparência e segurança.
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" aria-hidden="true">
                      <path d="M64 15 Q64 21 69 21 Q64 21 64 27 Q64 21 59 21 Q64 21 64 15" fill="#8ed462"/>
                      <path d="M16 49 Q16 53 20 53 Q16 53 16 57 Q16 53 12 53 Q16 53 16 49" fill="#8ed462" opacity="0.6"/>
                      <path d="M26 24 L54 24 L66 38 L40 66 L14 38 Z" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 38 H66" stroke="#8ed462" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M26 24 L32 38 L40 24 L48 38 L54 24" stroke="#8ed462" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M32 38 L40 66 L48 38" stroke="#8ed462" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M40 24 V38" stroke="#2c2e2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25"/>
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" aria-hidden="true">
                      <path d="M15 15v45h50" stroke="#2c2e2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                      <path d="M15 25h50M15 40h50M15 55h50" stroke="#2c2e2a" strokeWidth="0.8" strokeLinecap="round" opacity="0.15"/>
                      <path d="M25 15v45M40 15v45M55 15v45" stroke="#2c2e2a" strokeWidth="0.8" strokeLinecap="round" opacity="0.15"/>
                      <path d="M15 48 L 25 44 L 40 42 L 55 36 L 65 34" stroke="#8ed462" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                      <circle cx="25" cy="44" r="1.5" fill="#8ed462" opacity="0.5"/>
                      <circle cx="40" cy="42" r="1.5" fill="#8ed462" opacity="0.5"/>
                      <circle cx="55" cy="36" r="1.5" fill="#8ed462" opacity="0.5"/>
                      <path d="M15 58 L 25 50 L 40 35 L 55 22 L 65 15" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="25" cy="50" r="3" fill="#8ed462" stroke="#ffffff" strokeWidth="1"/>
                      <circle cx="40" cy="35" r="3" fill="#8ed462" stroke="#ffffff" strokeWidth="1"/>
                      <circle cx="55" cy="22" r="3" fill="#8ed462" stroke="#ffffff" strokeWidth="1"/>
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" aria-hidden="true">
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" aria-hidden="true">
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" aria-hidden="true">
                      <circle cx="40" cy="40" r="28" stroke="#2c2e2a" stroke-width="2.5" stroke-linecap="round" opacity="0.15"/>
                      <circle cx="40" cy="40" r="22" stroke="#8ed462" stroke-width="2.5" stroke-linecap="round"/>
                      <path d="M40 18v44" stroke="#8ed462" stroke-width="2.5" stroke-linecap="round"/>
                      <path d="M47 29 C47 23, 33 23, 33 33 C33 39, 47 41, 47 47 C47 57, 33 57, 33 51" stroke="#8ed462" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
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
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" aria-hidden="true">
                      <path d="M22 62c0-7 8-12 18-12s18 5 18 12" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
                      <circle cx="40" cy="30" r="9" stroke="#2c2e2a" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
                      <path d="M28 30a12 12 0 0 1 24 0" stroke="#8ed462" strokeWidth="2.5" strokeLinecap="round"/>
                      <rect x="26" y="26" width="3" height="8" rx="1.5" fill="#8ed462"/>
                      <rect x="51" y="26" width="3" height="8" rx="1.5" fill="#8ed462"/>
                      <path d="M28 33c0 5 4 8 8 8" stroke="#8ed462" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="37" cy="41" r="1.5" fill="#8ed462"/>
                      <circle cx="58" cy="54" r="10" fill="#8ed462" stroke="#ffffff" strokeWidth="2"/>
                      <path d="M54 54l3 3 5-5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
