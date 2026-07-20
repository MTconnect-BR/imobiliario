export default function ConsortiumSection() {
  const benefits = [
    {
      title: "Receba 10% de cashback",
      description:
        "Compre sua casa no SextoAndar com 10% de cashback ao ser contemplado.",
      cta: "Conhecer o Consórcio",
      icon: "💰",
    },
    {
      title: "Resgate antecipado",
      description:
        "Após 60 parcelas, use o saldo para comprar no SextoAndar sem sorteio ou multa.",
      cta: "Conhecer o Consórcio",
      icon: "🔓",
    },
    {
      title: "Sem entrada e sem juros",
      description:
        "Sem entrada e 50% mais econômico que o financiamento.",
      cta: "Conhecer o Consórcio",
      icon: "✨",
    },
  ];

  return (
    <section id="consorcio" className="py-16 lg:py-24 bg-accent-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Conquistar um novo lar pagando menos
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Com o Consórcio SextoAndar você conquista um novo lar sem
              entrada, sem juros, parcelas leves, cashback e resgate do saldo
              sem sorteio ou multa se comprar com a gente.
            </p>
            <a
              href="#conhecer-consorcio"
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors inline-block"
            >
              Conhecer o Consórcio SextoAndar
            </a>
          </div>

          {/* Image/Icon */}
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-white/50 rounded-full flex items-center justify-center">
              <span className="text-8xl">🤝</span>
            </div>
          </div>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
