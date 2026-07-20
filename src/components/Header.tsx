export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Sexto</span>
              <span className="text-2xl font-bold text-foreground">Andar</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <a
              href="#alugar"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Alugar
            </a>
            <a
              href="#comprar"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Comprar
            </a>
            <a
              href="#consorcio"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Consórcio
            </a>
            <a
              href="#financiamento"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Financiamento
            </a>
            <a
              href="#anunciar"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Anunciar
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <a
              href="#fale-conosco"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Fale Conosco
            </a>
            <a
              href="#entrar"
              className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-dark transition-colors"
            >
              Entrar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
