export default function Footer() {
  const aboutLinks = [
    { text: "Conheça o SextoAndar", href: "#" },
    { text: "Regiões atendidas", href: "#" },
    { text: "Condomínios", href: "#" },
    { text: "Conheça a Garantia SextoAndar", href: "#" },
    { text: "Central de Ajuda", href: "#" },
    { text: "Compliance", href: "#" },
    { text: "Mapa do Site", href: "#" },
  ];

  const productsLinks = [
    { text: "Indique um imóvel", href: "#" },
    { text: "Valor de aluguel por bairro", href: "#" },
    { text: "Guias", href: "#" },
    { text: "Consórcio de Imóveis", href: "#" },
    { text: "Carreiras", href: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { name: "Instagram", href: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
    { name: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre nós</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-4">Produtos</h3>
            <ul className="space-y-3">
              {productsLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Work with us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Trabalhe conosco</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Corretagem
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Fotografia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Vistorias
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Parceria de Reparos
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Redes sociais</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label={social.name}
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm text-white/80">
              <a href="#" className="block hover:text-white transition-colors">
                Aviso de privacidade
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Termos e condições de uso
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Política de Cookies
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Manual do usuário
              </a>
            </div>
          </div>
        </div>

        {/* Brand Statement */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm text-center">
            Para proporcionar uma experiência inesquecível para quem precisa de
            um lar ou anuncia com a gente, o SextoAndar aposta em design,
            segurança e tecnologia de ponta.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm">
            SextoAndar Ltda. | CRECI-SP J00.000
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-white/20 px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition-colors"
            >
              Google Play
            </a>
            <a
              href="#"
              className="bg-white/20 px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition-colors"
            >
              App Store
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
