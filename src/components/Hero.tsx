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

const priceRanges = [
  { label: "Qualquer valor", min: 0, max: 0 },
  { label: "Até R$ 100.000", min: 0, max: 100000 },
  { label: "Até R$ 200.000", min: 0, max: 200000 },
  { label: "Até R$ 300.000", min: 0, max: 300000 },
  { label: "Até R$ 500.000", min: 0, max: 500000 },
  { label: "Até R$ 700.000", min: 0, max: 700000 },
  { label: "Até R$ 1.000.000", min: 0, max: 1000000 },
  { label: "Acima de R$ 1.000.000", min: 1000000, max: 0 },
];

const bedroomOptions = [
  { label: "Qualquer", value: 0 },
  { label: "1 quarto", value: 1 },
  { label: "2 quartos", value: 2 },
  { label: "3 quartos", value: 3 },
  { label: "4+ quartos", value: 4 },
];

export default function Hero() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("");
  const [bairro, setBairro] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedBedrooms, setSelectedBedrooms] = useState(0);

  const handleSearch = () => {
    const city = selectedCity || "sao-paulo";
    const params = new URLSearchParams();

    if (bairro) params.set("bairro", bairro);
    if (selectedPrice > 0) {
      const price = priceRanges[selectedPrice];
      if (price.max > 0) {
        params.set("preco_max", String(price.max));
      } else {
        params.set("preco_min", String(price.min));
      }
    }
    if (selectedBedrooms > 0) {
      params.set("quartos", String(selectedBedrooms));
    }

    const queryString = params.toString();
    router.push(`/comprar/imovel/${city}${queryString ? `?${queryString}` : ""}`);
  };

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
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Busque por bairro"
                  className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder-gray-500"
                />
              </div>

              {/* Valor e Quartos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative border border-gray-300 bg-white">
                  <div className="flex items-center gap-3 p-4">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <select
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(Number(e.target.value))}
                      className="w-full bg-transparent text-sm font-medium text-foreground outline-none cursor-pointer appearance-none"
                    >
                      {priceRanges.map((price, index) => (
                        <option key={index} value={index}>
                          {price.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative border border-gray-300 bg-white">
                  <div className="flex items-center gap-3 p-4">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <select
                      value={selectedBedrooms}
                      onChange={(e) => setSelectedBedrooms(Number(e.target.value))}
                      className="w-full bg-transparent text-sm font-medium text-foreground outline-none cursor-pointer appearance-none"
                    >
                      {bedroomOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                onClick={handleSearch}
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
