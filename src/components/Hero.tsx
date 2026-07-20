"use client";

import { useState } from "react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"alugar" | "comprar">("alugar");

  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Alugue um lar para chamar de{" "}
            <span className="text-primary">seu</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre o imóvel perfeito sem complicação. Agende visitas online,
            negocie sem intermediários e assine o contrato digitalmente.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab("alugar")}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  activeTab === "alugar"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Alugar
              </button>
              <button
                onClick={() => setActiveTab("comprar")}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  activeTab === "comprar"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Comprar
              </button>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  placeholder="Busque por cidade"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro
                </label>
                <input
                  type="text"
                  placeholder="Busque por bairro"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {activeTab === "alugar" ? "Valor total até" : "Preço até"}
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
                  <option>Selecione</option>
                  <option>R$ 1.000</option>
                  <option>R$ 2.000</option>
                  <option>R$ 3.000</option>
                  <option>R$ 4.000</option>
                  <option>R$ 5.000</option>
                  <option>R$ 6.000</option>
                  <option>R$ 10.000</option>
                  <option>R$ 15.000</option>
                  <option>R$ 20.000</option>
                  <option>R$ 30.000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quartos
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
                  <option>Selecione</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button className="w-full bg-primary text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Buscar imóveis
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span className="font-medium">Buscas populares:</span>
          <a href="#" className="hover:text-primary transition-colors">
            Apartamentos em São Paulo
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Casas no Rio de Janeiro
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Studios em Curitiba
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Kitnets em Belo Horizonte
          </a>
        </div>
      </div>
    </section>
  );
}
