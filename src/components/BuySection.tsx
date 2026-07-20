export default function BuySection() {
  const propertyTypes = [
    {
      title: "Casas à venda",
      description:
        "Encontre casas para comprar e ter um cantinho só seu.",
      cta: "Ver casas à venda",
      icon: "🏠",
    },
    {
      title: "Kitnets à venda",
      description:
        "Compacta e elegante. Compre a kitnet ideal para você morar bem.",
      cta: "Ver kitnets à venda",
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
      title: "Apartamentos com piscina",
      description:
        "Apartamento com piscina para aqueles dias de calor e diversão.",
      cta: "Ver apartamentos com piscina",
      icon: "🏊",
    },
  ];

  return (
    <section id="comprar" className="py-16 lg:py-24 bg-accent-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image/Icon */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="w-80 h-80 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-8xl">🔑</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Comprar seu imóvel e ter um cantinho só seu
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Conte com nossos consultores para conseguir as melhores taxas de
              financiamento, tirar todas as suas dúvidas e para qualquer suporte
              durante todo o processo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#buscar"
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors text-center"
              >
                Ver apartamentos à venda
              </a>
              <a
                href="#como-comprar"
                className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/5 transition-colors text-center"
              >
                Como comprar no SextoAndar
              </a>
            </div>
          </div>
        </div>

        {/* Property Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer group"
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
