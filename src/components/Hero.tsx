"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const cities = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Porto Alegre",
  "Florianópolis",
  "Brasília",
  "Salvador",
  "Recife",
  "Fortaleza",
];

export default function Hero() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"buscar" | "anunciar">("buscar");
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="w-full h-[500px] lg:h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=800&fit=crop"
          alt="Família em casa"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tab Buttons - Overlapping top of image */}
      <div className="absolute top-0 left-0 right-0 mt-6 flex justify-center gap-4 z-10">
        <button
          onClick={() => setActiveSection("buscar")}
          className={`px-8 py-3 rounded-full font-medium transition-all backdrop-blur-sm ${
            activeSection === "buscar"
              ? "bg-white border-2 border-foreground text-foreground shadow-lg"
              : "bg-white/80 border-2 border-gray-300 text-gray-600 hover:border-gray-400"
          }`}
        >
          Buscar Imóveis
        </button>
        <button
          onClick={() => setActiveSection("anunciar")}
          className={`px-8 py-3 rounded-full font-medium transition-all backdrop-blur-sm ${
            activeSection === "anunciar"
              ? "bg-white border-2 border-foreground text-foreground shadow-lg"
              : "bg-white/80 border-2 border-gray-300 text-gray-600 hover:border-gray-400"
          }`}
        >
          Anunciar Imóveis
        </button>
      </div>

      {/* Search Form - Overlapping bottom of image */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-[#f0f0f2] p-6 md:p-8 shadow-2xl">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Encontre o lar
              <br />
              dos seus sonhos
            </h2>

            {/* Search Fields */}
            <div className="space-y-4">
              {/* Cidade */}
              <div className="flex items-center gap-3 border border-gray-300 p-4 relative bg-white">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-foreground outline-none cursor-pointer appearance-none"
                >
                  <option value="">Busque por cidade</option>
                  {cities.map((city) => (
                    <option key={city} value={city.toLowerCase().replace(/\s+/g, "-")}>
                      {city}
                    </option>
                  ))}
                </select>
                <svg className="w-5 h-5 text-gray-500 absolute right-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Bairro */}
              <div className="flex items-center gap-3 border border-gray-300 p-4 bg-white">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-foreground">Bairro</div>
                  <div className="text-sm text-gray-500">Busque por bairro</div>
                </div>
              </div>

              {/* Valor e Quartos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between border border-gray-300 p-4 bg-white">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-foreground">Valor total até</div>
                      <div className="text-sm text-gray-500">Escolha o valor</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="flex items-center justify-between border border-gray-300 p-4 bg-white">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-foreground">Quartos</div>
                      <div className="text-sm text-gray-500">Nº de quartos</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                onClick={() => {
                  const city = selectedCity || "sao-paulo";
                  router.push(`/comprar/imovel/${city}`);
                }}
                className="w-full bg-primary text-white py-4 px-8 font-semibold text-lg hover:bg-primary-dark transition-colors"
              >
                Buscar imóveis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
