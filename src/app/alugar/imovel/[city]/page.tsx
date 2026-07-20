"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  isHighlighted?: boolean;
}

interface Neighborhood {
  name: string;
  propertyCount: number;
  avgPrice: number;
}

const neighborhoods: Neighborhood[] = [
  { name: "Vila Mariana", propertyCount: 21700, avgPrice: 3300 },
  { name: "Brooklin", propertyCount: 19853, avgPrice: 3809 },
  { name: "Jardim Paulista", propertyCount: 19079, avgPrice: 5000 },
  { name: "Pinheiros", propertyCount: 15420, avgPrice: 4200 },
  { name: "Consolação", propertyCount: 12300, avgPrice: 3100 },
  { name: "Moema", propertyCount: 11800, avgPrice: 4500 },
];

const faqItems = [
  {
    question: "Como alugar um imóvel na Siena?",
    answer: "É simples! Escolha o imóvel que deseja, agende uma visita online ou presencial, envie seus documentos e assine o contrato digitalmente. Todo o processo é feito de forma rápida e segura.",
  },
  {
    question: "Preciso de fiador para alugar?",
    answer: "Não! Na Siena você não precisa de fiador. Oferecemos opções de seguro-fiança que facilitam ainda mais o processo de locação.",
  },
  {
    question: "Quanto tempo demora o processo de aluguel?",
    answer: "O processo médio leva de 7 a 15 dias úteis, desde a aprovação dos documentos até a assinatura do contrato e entrega das chaves.",
  },
  {
    question: "Posso agendar uma visita presencial?",
    answer: "Sim! Você pode agendar visitas presenciais diretamente pelo nosso sistema. Escolha o dia e horário que melhor se encaixa na sua rotina.",
  },
  {
    question: "Quais documentos são necessários?",
    answer: "RG ou CNH, comprovante de renda (3x o valor do aluguel), comprovante de residência e extrato bancário dos últimos 3 meses.",
  },
];

const mockProperties: Property[] = [
  {
    id: 1,
    title: "Apartamento com 2 quartos",
    address: "Rua Augusta, 1500 - Consolação, São Paulo",
    price: 3500,
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    isHighlighted: true,
  },
  {
    id: 2,
    title: "Studio mobiliado",
    address: "Rua Oscar Freire, 300 - Jardins, São Paulo",
    price: 2800,
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Apartamento com 3 quartos",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo",
    price: 5500,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Kitnet compacta",
    address: "Rua da Consolação, 500 - Consolação, São Paulo",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    area: 25,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Casa com 3 quartos",
    address: "Rua dos Pinheiros, 800 - Pinheiros, São Paulo",
    price: 8000,
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Apartamento moderno",
    address: "Rua Haddock Lobo, 400 - Cerqueira César, São Paulo",
    price: 4200,
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Cobertura duplex",
    address: "Rua Artur de Azevedo, 120 - Pinheiros, São Paulo",
    price: 12000,
    bedrooms: 4,
    bathrooms: 4,
    area: 300,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Apartamento com varanda",
    address: "Rua Bela Cintra, 700 - Consolação, São Paulo",
    price: 3800,
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    title: "Apartamento garden",
    address: "Rua dos Bandeirantes, 500 - Morumbi, São Paulo",
    price: 4500,
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&h=400&fit=crop",
  },
  {
    id: 10,
    title: "Studio compacto",
    address: "Rua Vergueiro, 3000 - Vila Mariana, São Paulo",
    price: 2200,
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
  },
];

export default function SearchResultsPage() {
  const [priceRange, setPriceRange] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground">
                  Imóveis para alugar em São Paulo, SP
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {mockProperties.length} imóveis encontrados
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="border border-gray-300 px-4 py-2 text-sm"
                >
                  <option value="">Valor total até</option>
                  <option value="2000">R$ 2.000</option>
                  <option value="3000">R$ 3.000</option>
                  <option value="5000">R$ 5.000</option>
                  <option value="10000">R$ 10.000</option>
                </select>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="border border-gray-300 px-4 py-2 text-sm"
                >
                  <option value="">Quartos</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#f0f0f2] p-6 border border-gray-200 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
                <h2 className="text-lg font-bold text-foreground mb-6">
                  Filtros
                </h2>

                {/* Price Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">
                    Valor total até
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="price" className="w-4 h-4" />
                      <span className="text-sm">R$ 1.500</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="price" className="w-4 h-4" />
                      <span className="text-sm">R$ 2.000</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="price" className="w-4 h-4" />
                      <span className="text-sm">R$ 3.000</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="price" className="w-4 h-4" />
                      <span className="text-sm">R$ 5.000</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="price" className="w-4 h-4" />
                      <span className="text-sm">R$ 10.000</span>
                    </label>
                  </div>
                </div>

                {/* Bedrooms Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">
                    Quartos
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors">
                      1+
                    </button>
                    <button className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors">
                      2+
                    </button>
                    <button className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors">
                      3+
                    </button>
                    <button className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors">
                      4+
                    </button>
                  </div>
                </div>

                {/* Property Type Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">
                    Tipo de imóvel
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Apartamento</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Casa</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Kitnet</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Studio</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Cobertura</span>
                    </label>
                  </div>
                </div>

                {/* Amenities Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">
                    Comodidades
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Mobiliado</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Aceita pets</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Estacionamento</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Piscina</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Academia</span>
                    </label>
                  </div>
                </div>

                <button className="w-full bg-primary text-white py-3 font-medium hover:bg-primary-dark transition-colors">
                  Aplicar filtros
                </button>
              </div>
            </div>

            {/* Property Listings */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    {/* Property Image */}
                    <div className="relative h-48">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      {property.isHighlighted && (
                        <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs font-medium">
                          Destaque
                        </div>
                      )}
                    </div>

                    {/* Property Info */}
                    <div className="p-4">
                      <div className="text-lg font-bold text-foreground mb-1">
                        R$ {property.price.toLocaleString("pt-BR")}/mês
                      </div>
                      <h3 className="font-medium text-foreground mb-2">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {property.address}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {property.bedrooms} {property.bedrooms === 1 ? "quarto" : "quartos"}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                          </svg>
                          {property.bathrooms} {property.bathrooms === 1 ? "banheiro" : "banheiros"}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                          {property.area}m²
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center gap-2">
                <button className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors">
                  Próximo →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Neighborhoods Section */}
        <div className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Bairros recomendados para alugar imóveis em São Paulo
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {neighborhoods.map((neighborhood, index) => (
                <div
                  key={index}
                  className="bg-[#f0f0f2] p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {neighborhood.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {neighborhood.propertyCount.toLocaleString("pt-BR")} imóveis para alugar.
                  </p>
                  <div className="text-sm text-gray-500">
                    <span className="block">Valor médio</span>
                    <span className="font-medium text-foreground">
                      R$ {neighborhood.avgPrice.toLocaleString("pt-BR")}/mês
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Perguntas frequentes sobre aluguel
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-foreground">
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
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
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-gray-600">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
