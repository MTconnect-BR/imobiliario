export default function BuySection() {
  const propertyCards = [
    {
      title: "Casas à venda",
      description: "Encontre casas para comprar e tenha um cantinho só seu.",
      cta: "Ver casas à venda",
      image: "https://images.unsplash.com-1600596542815-ffad4c1539a9?w=600&h=600&fit=crop",
    },
    {
      title: "Kitnets à venda",
      description: "Compacta e elegante. Compre a kitnet ideal para você morar bem.",
      cta: "Ver kitnets à venda",
      image: "https://images.unsplash.com-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop",
    },
    {
      title: "Apartamentos com 2 quartos",
      description: "Apartamentos com mais quartos para você e sua família.",
      cta: "Ver apartamentos com 2 quartos",
      image: "https://images.unsplash.com-1600566753190-17f0baa2a6c3?w=600&h=600&fit=crop",
    },
    {
      title: "Apartamentos com piscina",
      description: "Apartamento com piscina para aqueles dias de calor e diversão.",
      cta: "Ver apartamentos com piscina",
      image: "https://images.unsplash.com-1600585154340-be6161a56a0c?w=600&h=600&fit=crop",
    },
  ];

  return (
    <section id="comprar" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side - Property cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {propertyCards.map((card, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden group cursor-pointer min-h-[250px]"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                {/* White overlay with text */}
                <div className="absolute inset-0 bg-white/90 flex flex-col justify-end p-5">
                  <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {card.description}
                  </p>
                  <span className="text-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:underline">
                    {card.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Gray/olive background with text */}
          <div className="bg-[#d4dbd2] rounded-2xl p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Comprar seu imóvel e ter um cantinho só seu
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Conte com nossos consultores para conseguir as melhores taxas de financiamento, tirar todas as suas dúvidas e para qualquer suporte durante todo o processo.
            </p>
            <a
              href="#buscar"
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors text-center inline-block w-fit"
            >
              Ver apartamentos à venda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
