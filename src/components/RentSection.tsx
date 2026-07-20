"use client";

import { useState } from "react";

export default function RentSection() {
  const [currentCard, setCurrentCard] = useState(0);

  const propertyCards = [
    {
      title: "Casas para alugar",
      description: "Aluguel de casas para morar bem com a Siena.",
      cta: "Ver casas para alugar",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    },
    {
      title: "Kitnets para alugar",
      description: "Compacta e elegante. Encontre a kitnet ideal para você morar bem.",
      cta: "Ver kitnets para alugar",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    },
    {
      title: "Apartamentos com 2 quartos",
      description: "Apartamentos com mais quartos para você e sua família.",
      cta: "Ver apartamentos com 2 quartos",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    },
    {
      title: "Apartamentos mobiliados",
      description: "Apartamentos com mobília para facilitar sua mudança e dia a dia.",
      cta: "Ver apartamentos mobiliados",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
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
    <section id="alugar" className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          {/* Left side - Purple background with text */}
          <div className="bg-[#e8dff5] p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Alugar bem, sem complicação e fiador
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Agende visitas online, negocie sem intermediários e assine o contrato digitalmente. Sem fiador. Sem depósito caução. Sem filas.
            </p>
            <a
              href="#buscar"
              className="border-2 border-foreground text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground hover:text-white transition-colors text-center inline-block w-fit mb-6"
            >
              Ver apartamentos para alugar
            </a>
            <a
              href="#como-alugar"
              className="text-foreground font-semibold inline-flex items-center gap-2 hover:underline"
            >
              Como alugar na Siena
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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
        </div>
      </div>
    </section>
  );
}
