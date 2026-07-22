export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3">Siena</h3>
            <p className="text-white/70 text-sm">
              Gestão & Imobiliária. Encontre o imóvel ideal com segurança e transparência.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-3">Navegação</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="/comprar" className="hover:text-white transition-colors">Comprar</a></li>
              <li><a href="/fale-conosco" className="hover:text-white transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Nova Iguaçu, RJ</li>
              <li>
                <a href="https://www.instagram.com/sienagestaoimobiliaria/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} Siena Gestão & Imobiliária. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
