import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-4xl text-primary">
          Encontre o imovel perfeito
        </h1>
        <p className="lead mt-6 max-w-2xl">
          A plataforma completa para comprar, alugar e investir em imoveis.
          Descubra oportunidades unicas com as melhores condicoes do mercado.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button variant="green" size="xl">
            Comece agora
          </Button>
          <Button variant="outline" size="xl">
            Saiba mais
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-primary">
            Por que nos escolher?
          </h2>
          <p className="lead mt-4 text-center">
            Oferecemos a melhor experiencia em busca de imoveis
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Badge variant="green">Mais Vendido</Badge>
                <CardTitle>Busca Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Encontre imoveis com nossa busca avancada por localizacao,
                  preco, tamanho e muito mais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="yellow">Popular</Badge>
                <CardTitle>Visitas Virtuais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Conheca cada imovel em 360 graus antes de agendar uma visita
                  presencial.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="blue">Novo</Badge>
                <CardTitle>Financiamento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simule seu financiamento e encontre as melhores opcoes de
                  credito imobiliario.
                </p>
              </CardContent>
            </Card>
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
