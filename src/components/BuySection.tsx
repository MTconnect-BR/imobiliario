"use client";

import { useState } from "react";

export default function BuySection() {
  const [currentCard, setCurrentCard] = useState(0);

  const propertyCards = [
    {
      title: "Casas à venda",
      description: "Encontre casas para comprar e tenha um cantinho só seu.",
      cta: "Ver casas à venda",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    },
    {
      title: "Kitnets à venda",
      description: "Compacta e elegante. Compre a kitnet ideal para você morar bem.",
      cta: "Ver kitnets à venda",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    },
    {
      title: "Apartamentos com 2 quartos",
      description: "Apartamentos com mais quartos para você e sua família.",
      cta: "Ver apartamentos com 2 quartos",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    },
    {
      title: "Apartamentos com piscina",
      description: "Apartamento com piscina para aqueles dias de calor e diversão.",
      cta: "Ver apartamentos com piscina",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    },
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % propertyCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + propertyCards.length) % propertyCards.length);
  };

  const card = propertyCards[currentCard];

  return (
    <section id="comprar" className="py-10 lg:py-16">
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
                style={{ width: `${((currentCard + 1) / propertyCards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Right side - Beige/olive background with text */}
          <div className="bg-[#d4dbd2] p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Comprar seu imóvel e ter um cantinho só seu
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Conte com nossos consultores para conseguir as melhores taxas de financiamento, tirar todas as suas dúvidas e para qualquer suporte durante todo o processo.
            </p>
            <a
              href="#buscar"
              className="border-2 border-foreground text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground hover:text-white transition-colors text-center inline-block w-fit mb-6"
            >
              Ver apartamentos à venda
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
