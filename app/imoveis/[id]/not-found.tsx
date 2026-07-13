import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function PropertyNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <Home className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Imóvel não encontrado</h1>
        <p className="text-muted-foreground mb-8">
          Este imóvel pode ter sido removido ou o link está incorreto. Verifique o endereço ou volte
          para a listagem completa.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/imoveis">
            <Button size="lg">
              <Search className="w-4 h-4 mr-2" />
              Ver todos os imóveis
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
