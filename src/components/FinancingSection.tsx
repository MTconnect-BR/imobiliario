export default function FinancingSection() {
  const benefits = [
    {
      title: "Nossos serviços",
      description: "Parceria com os principais bancos do mercado",
      cta: "Conhecer a assessoria",
      icon: "🏦",
    },
    {
      title: "Melhores taxas",
      description:
        "Faça a simulação e saiba mais detalhes sobre prazos e condições",
      cta: "Simule aqui seu financiamento",
      icon: "📊",
    },
    {
      title: "Conte conosco!",
      description: "Consultores dedicados dando visibilidade do processo",
      cta: "Conhecer a assessoria",
      icon: "👥",
    },
    {
      title: "Quanto posso pagar?",
      description:
        "Avalie seu potencial de compra de forma rápida e prática",
      cta: "Simule aqui seu financiamento",
      icon: "🧮",
    },
  ];

  return (
    <section id="financiamento" className="py-16 lg:py-24 bg-accent-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image/Icon */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="w-80 h-80 bg-white/50 rounded-full flex items-center justify-center">
              <span className="text-8xl">📋</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Financie seu imóvel com nossa assessoria
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Aqui você pode contar com a nossa ajuda para financiar seu imóvel
              de forma prática. Ainda buscamos as melhores taxas para você!
            </p>
            <a
              href="#conhecer-assessoria"
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors inline-block"
            >
              Conhecer a assessoria
            </a>
          </div>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 mb-4">{benefit.description}</p>
              <a
                href="#"
                className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                {benefit.cta}
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
