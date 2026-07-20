export default function FinancingSection() {
  const benefitCards = [
    {
      title: "Nossos serviços",
      description: "Parceria com os principais bancos do mercado",
      cta: "Conhecer a assessoria",
      image: "https://images.unsplash.com-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop",
    },
    {
      title: "Melhores taxas",
      description: "Faça a simulação e saiba mais detalhes sobre prazos e condições",
      cta: "Simule aqui seu financiamento",
      image: "https://images.unsplash.com-1554224154-22dec7ec8818?w=600&h=600&fit=crop",
    },
    {
      title: "Conte conosco!",
      description: "Consultores dedicados dando visibilidade do processo",
      cta: "Conhecer a assessoria",
      image: "https://images.unsplash.com-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop",
    },
    {
      title: "Quanto posso pagar?",
      description: "Avalie seu potencial de compra de forma rápida e prática",
      cta: "Simule aqui seu financiamento",
      image: "https://images.unsplash.com-1554224155-6726b3ff858f?w=600&h=600&fit=crop",
    },
  ];

  return (
    <section id="financiamento" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side - Cards */}
          <div className="grid grid-cols-2 gap-4">
            {benefitCards.map((card, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden group cursor-pointer min-h-[250px]"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                {/* Gradient overlay with text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/90 mb-3 line-clamp-2">
                    {card.description}
                  </p>
                  <span className="text-white font-semibold text-sm inline-flex items-center gap-1 group-hover:underline">
                    {card.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Cream background with text */}
          <div className="bg-[#f5ede3] rounded-2xl p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Financie seu imóvel com nossa assessoria
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Aqui você pode contar com a nossa ajuda para financiar seu imóvel de forma prática. Ainda buscamos as melhores taxas para você!
            </p>
            <a
              href="#conhecer-assessoria"
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors text-center inline-block w-fit"
            >
              Conhecer a assessoria
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
