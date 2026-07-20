"use client";

import { useState } from "react";

export default function ConsortiumSection() {
  const [currentCard, setCurrentCard] = useState(0);

  const benefitCards = [
    {
      title: "Receba 10% de cashback",
      description: "Compre sua casa no SextoAndar com 10% de cashback ao ser contemplado.",
      cta: "Conhecer o Consórcio",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    },
    {
      title: "Resgate antecipado",
      description: "Após 60 parcelas, use o saldo para comprar no SextoAndar sem sorteio ou multa.",
      cta: "Conhecer o Consórcio",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
    },
    {
      title: "Sem entrada e sem juros",
      description: "Sem entrada e 50% mais econômico que o financiamento.",
      cta: "Conhecer o Consórcio",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    },
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % benefitCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + benefitCards.length) % benefitCards.length);
  };

  const card = benefitCards[currentCard];

  return (
    <section id="consorcio" className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          {/* Left side - Light blue background with text */}
          <div className="bg-[#c9d4f5] p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Conquistar um novo lar pagando menos
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Com o Consórcio SextoAndar você conquista um novo lar sem entrada, sem juros, parcelas leves, cashback e resgate do saldo sem sorteio ou multa se comprar com a gente.
            </p>
            <a
              href="#conhecer-consorcio"
              className="border-2 border-foreground text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground hover:text-white transition-colors text-center inline-block w-fit"
            >
              Conhecer o Consórcio SextoAndar
            </a>
          </div>

          {/* Right side - Card carousel */}
          <div className="relative overflow-hidden min-h-[400px]">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
            />

            {/* White box overlay */}
            <div className="absolute top-6 left-6 bg-white rounded-lg p-6 max-w-[280px]">
              <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {card.description}
              </p>
              <a href="#" className="text-foreground font-semibold text-sm inline-flex items-center gap-1 hover:underline">
                {card.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Navigation arrows */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={prevCard}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextCard}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-4 left-4 right-20 h-1 bg-white/30 rounded-full">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${((currentCard + 1) / benefitCards.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
