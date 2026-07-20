export default function RentSection() {
  const propertyCards = [
    {
      title: "Casas para alugar",
      description: "Aluguel de casas para morar bem com o SextoAndar.",
      cta: "Ver casas para alugar",
      image: "https://images.unsplash.com-1564013799919-ab600027ffc6?w=600&h=600&fit=crop",
    },
    {
      title: "Kitnets para alugar",
      description: "Compacta e elegante. Encontre a kitnet ideal para você morar bem.",
      cta: "Ver kitnets para alugar",
      image: "https://images.unsplash.com-1522708323590-d24dbb6b0267?w=600&h=600&fit=crop",
    },
    {
      title: "Apartamentos com 2 quartos",
      description: "Apartamentos com mais quartos para você e sua família.",
      cta: "Ver apartamentos com 2 quartos",
      image: "https://images.unsplash.com-1502672260266-1c1ef2d93688?w=600&h=600&fit=crop",
    },
    {
      title: "Apartamentos mobiliados",
      description: "Apartamentos com mobília para facilitar sua mudança e dia a dia.",
      cta: "Ver apartamentos mobiliados",
      image: "https://images.unsplash.com-1560448204-e02f11c3d0e2?w=600&h=600&fit=crop",
    },
  ];

  return (
    <section id="alugar" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side - Pink background with text */}
          <div className="bg-[#e8dff5] rounded-2xl p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Alugar bem, sem complicação e fiador
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Agende visitas online, negocie sem intermediários e assine o contrato digitalmente. Sem fiador. Sem depósito caução. Sem filas.
            </p>
            <a
              href="#buscar"
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors text-center inline-block w-fit"
            >
              Ver apartamentos para alugar
            </a>
          </div>

          {/* Right side - Property cards grid */}
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
        </div>
      </div>
    </section>
  );
}
