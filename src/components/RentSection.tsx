export default function RentSection() {
  const propertyTypes = [
    {
      title: "Casas para alugar",
      description: "Aluguel de casas para morar bem com o SextoAndar.",
      cta: "Ver casas para alugar",
      icon: "🏠",
    },
    {
      title: "Kitnets para alugar",
      description:
        "Compacta e elegante. Encontre a kitnet ideal para você morar bem.",
      cta: "Ver kitnets para alugar",
      icon: "🏢",
    },
    {
      title: "Apartamentos com 2 quartos",
      description:
        "Apartamentos com mais quartos para você e sua família.",
      cta: "Ver apartamentos com 2 quartos",
      icon: "🛏️",
    },
    {
      title: "Apartamentos mobiliados",
      description:
        "Apartamentos com mobília para facilitar sua mudança e dia a dia.",
      cta: "Ver apartamentos mobiliados",
      icon: "🛋️",
    },
  ];

  return (
    <section id="alugar" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Alugar bem, sem complicação e fiador
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Agende visitas online, negocie sem intermediários e assine o
              contrato digitalmente. Sem fiador. Sem depósito caução. Sem filas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#buscar"
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors text-center"
              >
                Ver apartamentos para alugar
              </a>
              <a
                href="#como-alugar"
                className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/5 transition-colors text-center"
              >
                Como alugar no SextoAndar
              </a>
            </div>
          </div>

          {/* Image/Icon */}
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-8xl">🏡</span>
            </div>
          </div>
        </div>

        {/* Property Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((property, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="text-4xl mb-4">{property.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {property.title}
              </h3>
              <p className="text-gray-600 mb-4">{property.description}</p>
              <a
                href="#"
                className="text-primary font-semibold group-hover:underline inline-flex items-center gap-1"
              >
                {property.cta}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
