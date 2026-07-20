export default function ConsortiumSection() {
  const benefitCards = [
    {
      title: "Receba 10% de cashback",
      description: "Compre sua casa no SextoAndar com 10% de cashback ao ser contemplado.",
      cta: "Conhecer o Consórcio",
      image: "https://images.unsplash.com-1554224155-6726b3ff858f?w=600&h=600&fit=crop",
    },
    {
      title: "Resgate antecipado",
      description: "Após 60 parcelas, use o saldo para comprar no SextoAndar sem sorteio ou multa.",
      cta: "Conhecer o Consórcio",
      image: "https://images.unsplash.com-1579621970563-ebec7560ff3e?w=600&h=600&fit=crop",
    },
    {
      title: "Sem entrada e sem juros",
      description: "Sem entrada e 50% mais econômico que o financiamento.",
      cta: "Conhecer o Consórcio",
      image: "https://images.unsplash.com-1450101499163-c8848c66ca85?w=600&h=600&fit=crop",
    },
  ];

  return (
    <section id="consorcio" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left side - Text */}
          <div className="bg-[#f0e6d9] rounded-2xl p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Conquistar um novo lar pagando menos
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Com o Consórcio SextoAndar você conquista um novo lar sem entrada, sem juros, parcelas leves, cashback e resgate do saldo sem sorteio ou multa se comprar com a gente.
            </p>
            <a
              href="#conhecer-consorcio"
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors text-center inline-block w-fit"
            >
              Conhecer o Consórcio SextoAndar
            </a>
          </div>

          {/* Right side - Cards */}
          <div className="grid grid-cols-3 gap-4">
            {benefitCards.map((card, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden group cursor-pointer min-h-[300px]"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                {/* Gradient overlay with text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/90 mb-3 line-clamp-3">
                    {card.description}
                  </p>
                  <span className="text-white font-semibold text-xs inline-flex items-center gap-1 group-hover:underline">
                    {card.cta}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
