"use client";

import { useState } from "react";

export default function FinancingSection() {
  const [currentCard, setCurrentCard] = useState(0);

  const benefitCards = [
    {
      title: "Nossos serviços",
      description: "Parceria com os principais bancos do mercado",
      cta: "Conhecer a assessoria",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    },
    {
      title: "Melhores taxas",
      description: "Faça a simulação e saiba mais detalhes sobre prazos e condições",
      cta: "Simule aqui seu financiamento",
      image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&h=600&fit=crop",
    },
    {
      title: "Conte conosco!",
      description: "Consultores dedicados dando visibilidade do processo",
      cta: "Conhecer a assessoria",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
    },
    {
      title: "Quanto posso pagar?",
      description: "Avalie seu potencial de compra de forma rápida e prática",
      cta: "Simule aqui seu financiamento",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
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
    <section id="financiamento" className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          {/* Left side - Card carousel */}
          <div className="relative overflow-hidden min-h-[400px]">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
            />

            {/* White box overlay */}
            <div className="absolute top-6 left-6 bg-white p-6 max-w-[280px]">
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

          {/* Right side - Cream background with text */}
          <div className="bg-[#f5ede3] p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Financie seu imóvel com nossa assessoria
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Aqui você pode contar com a nossa ajuda para financiar seu imóvel de forma prática. Ainda buscamos as melhores taxas para você!
            </p>
            <a
              href="#conhecer-assessoria"
              className="border-2 border-foreground text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground hover:text-white transition-colors text-center inline-block w-fit mb-6"
            >
              Conhecer a assessoria
            </a>
            <a
              href="#como-comprar"
              className="text-foreground font-semibold inline-flex items-center gap-2 hover:underline"
            >
              Como comprar na Siena
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
