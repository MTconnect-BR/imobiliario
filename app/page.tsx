import Link from "next/link";
import { HomeSearch } from "@/components/home-search";

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
