import Link from "next/link";
import { Phone, Mail, MapPin, CirclePlay, MessageCircle } from "lucide-react";

const regioes = [
  {
    cidade: "São Paulo - SP",
    bairros: ["Centro", "Jardim Paulista", "Moema", "Vila Mariana", "Pinheiros"],
  },
  {
    cidade: "Rio de Janeiro - RJ",
    bairros: ["Copacabana", "Leblon", "Ipanema", "Barra da Tijuca", "Tijuca"],
  },
  {
    cidade: "Curitiba - PR",
    bairros: ["Centro", "Batel", "Água Verde", "Santa Felicidade", "Ecoville"],
  },
  {
    cidade: "Florianópolis - SC",
    bairros: ["Centro", "Jurerê Internacional", "Lagoa da Conceição", "Campeche", "Ingleses"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Fale Conosco */}
          <div>
            <h3 className="mb-4 text-lg font-medium tracking-[-0.06em]">Fale Conosco</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Atendimento Online em todo o Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:08005431000" className="hover:text-foreground transition-colors">
                  (08) 00543-1000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0" />
                <a
                  href="https://api.whatsapp.com/send?phone=5508005431000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:contato@imobiliario.com" className="hover:text-foreground transition-colors">
                  contato@imobiliario.com
                </a>
              </div>
            </div>
          </div>

          {/* Imóveis por Região */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-medium tracking-[-0.06em]">Imóveis por Região</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {regioes.map((regiao) => (
                <div key={regiao.cidade}>
                  <h4 className="mb-2 text-sm font-medium tracking-[-0.04em]">{regiao.cidade}</h4>
                  <ul className="space-y-1">
                    {regiao.bairros.map((bairro) => (
                      <li key={bairro}>
                        <Link
                          href={`/imoveis?search=${encodeURIComponent(bairro)}`}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {bairro}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-border" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-[-0.08em]">Imobiliário</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Imóveis da Caixa com até 90% de desconto
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/imoveis" className="text-muted-foreground hover:text-foreground transition-colors">
              Imóveis
            </Link>
            <Link href="/contato" className="text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
              aria-label="YouTube"
            >
              <CirclePlay className="h-4 w-4" />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5508005431000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-green-600 hover:text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
