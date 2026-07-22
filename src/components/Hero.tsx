"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statesWithCities = [
  {
    id: "RJ",
    name: "Rio de Janeiro",
    cities: [
      { name: "Rio de Janeiro", slug: "rio-de-janeiro" },
      { name: "São Gonçalo", slug: "sao-goncalo" },
      { name: "Nova Iguaçu", slug: "nova-iguacu" },
      { name: "Belford Roxo", slug: "belford-roxo" },
      { name: "Itaboraí", slug: "itaborai" },
      { name: "Campos dos Goytacazes", slug: "campos-dos-goytacazes" },
      { name: "Resende", slug: "resende" },
      { name: "Magé", slug: "mage" },
    ],
  },
  {
    id: "SP",
    name: "São Paulo",
    cities: [
      { name: "São Paulo", slug: "sao-paulo" },
      { name: "Guarulhos", slug: "guarulhos" },
      { name: "Campinas", slug: "campinas" },
      { name: "São Bernardo do Campo", slug: "sao-bernardo-do-campo" },
    ],
  },
  {
    id: "PR",
    name: "Paraná",
    cities: [
      { name: "Curitiba", slug: "curitiba" },
      { name: "Londrina", slug: "londrina" },
      { name: "Maringá", slug: "maringa" },
    ],
  },
  {
    id: "SC",
    name: "Santa Catarina",
    cities: [
      { name: "Florianópolis", slug: "florianopolis" },
      { name: "Joinville", slug: "joinville" },
      { name: "Blumenau", slug: "blumenau" },
    ],
  },
];

const propertyTypes = [
  { label: "Todos os tipos", value: "" },
  { label: "Apartamento", value: "Apartamento" },
  { label: "Casa", value: "Casa" },
  { label: "Galpão", value: "Galpão" },
  { label: "Terreno", value: "Terreno" },
  { label: "Andar Corporativo", value: "Andar Corporativo" },
];

const bedroomOptions = [
  { label: "Qualquer", value: 0 },
  { label: "1+", value: 1 },
  { label: "2+", value: 2 },
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
];

export default function Hero() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [bairro, setBairro] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState(0);

  const availableCities =
    statesWithCities.find((s) => s.id === selectedState)?.cities || [];

  const handleSearch = () => {
    const city = selectedCity || availableCities[0]?.slug || "rio-de-janeiro";
    const params = new URLSearchParams();

    if (selectedState) params.set("estado", selectedState);
    if (bairro) params.set("bairro", bairro);
    if (selectedType) params.set("categoria", selectedType);
    if (selectedBedrooms > 0) {
      params.set("quartos", String(selectedBedrooms));
    }

    const queryString = params.toString();
    router.push(
      `/comprar${queryString ? `?${queryString}` : ""}`
    );
  };

  return (
    <section className="relative h-[500px] lg:h-[600px]">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=800&fit=crop"
          alt="Família em casa"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Search Form - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            {/* Title */}
            <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6 text-center">
              Encontre o lar
              <br />
              dos seus sonhos
            </h1>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {/* Estado */}
              <div className="relative">
                <div className="flex items-center gap-3 border border-gray-200 p-3.5 rounded-xl bg-white hover:border-gray-300 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity("");
                    }}
                    className="w-full bg-transparent text-sm text-gray-700 outline-none cursor-pointer appearance-none pr-8"
                  >
                    <option value="">Estado</option>
                    {statesWithCities.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Cidade */}
              <div className="relative">
                <div className="flex items-center gap-3 border border-gray-200 p-3.5 rounded-xl bg-white hover:border-gray-300 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                    className="w-full bg-transparent text-sm text-gray-700 outline-none cursor-pointer appearance-none pr-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {selectedState ? "Cidade" : "Selecione o estado"}
                    </option>
                    {availableCities.map((city) => (
                      <option key={city.slug} value={city.slug}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bairro */}
              <div className="flex items-center gap-3 border border-gray-200 p-3.5 rounded-xl bg-white hover:border-gray-300 transition-colors">
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Bairro"
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
                />
              </div>

              {/* Tipo */}
              <div className="relative">
                <div className="flex items-center gap-2 border border-gray-200 p-3.5 rounded-xl bg-white hover:border-gray-300 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-700 outline-none cursor-pointer appearance-none pr-6"
                  >
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quartos + Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Quartos */}
              <div className="relative">
                <div className="flex items-center gap-2 border border-gray-200 p-3.5 rounded-xl bg-white hover:border-gray-300 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <select
                    value={selectedBedrooms}
                    onChange={(e) =>
                      setSelectedBedrooms(Number(e.target.value))
                    }
                    className="w-full bg-transparent text-sm text-gray-700 outline-none cursor-pointer appearance-none pr-6"
                  >
                    {bedroomOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label === "Qualquer"
                          ? "Quartos"
                          : option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-3">
                <button
                  onClick={handleSearch}
                  className="w-full bg-[#1b4332] text-white py-3.5 px-6 font-semibold rounded-xl hover:bg-[#143526] transition-colors"
                >
                  Buscar imóveis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
