export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-foreground">Siena Gestão & Imobiliária</span>
            </a>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/comprar"
              className="text-gray-600 hover:text-primary font-medium transition-colors text-sm"
            >
              Comprar
            </a>
            <a
              href="https://www.instagram.com/sienagestaoimobiliaria/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary font-medium transition-colors text-sm"
            >
              Instagram
            </a>
            <a
              href="/fale-conosco"
              className="text-gray-600 hover:text-primary font-medium transition-colors text-sm"
            >
              Fale Conosco
            </a>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <a
              href="/comprar"
              className="text-gray-600 hover:text-primary font-medium transition-colors text-sm"
            >
              Comprar
            </a>
            <a
              href="/fale-conosco"
              className="text-gray-600 hover:text-primary font-medium transition-colors text-sm"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
