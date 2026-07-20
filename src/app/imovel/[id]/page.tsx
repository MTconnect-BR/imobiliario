"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const property = {
  id: 1,
  title: "Apartamento com 2 quartos",
  address: "Rua Augusta, 1500 - Consolação, São Paulo, SP",
  price: 3500,
  bedrooms: 2,
  bathrooms: 1,
  area: 65,
  parkingSpaces: 1,
  acceptsPets: true,
  isFurnished: false,
  description: `Apartamento amplo e bem iluminado, localizado na região da Consolação, próxima à Rua Augusta. O imóvel conta com 2 quartos (sendo 1 suíte), sala ampla, cozinha completa e área de serviço.

O prédio oferece segurança 24h, academia, piscina e salão de festas. Excelente localização, com fácil acesso ao metrô e ao principal corredor de ônibus da cidade.

Aceita pets de pequeno porte.`,
  images: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  ],
  amenities: [
    "Área de serviço",
    "Varanda",
    "Churrasqueira",
    "Piscina",
    "Academia",
    "Salão de festas",
    "Segurança 24h",
    "Portaria eletrônica",
    "Elevador",
    "Playground",
  ],
  rules: [
    "Aceita pets de pequeno porte",
    "Não aceita financiamento",
    "Imóvel não mobiliado",
    "Mínimo de 12 meses de contrato",
  ],
  condominiumFee: 450,
  iptu: 120,
  totalMonthly: 4070,
};

const similarProperties = [
  {
    id: 2,
    title: "Studio mobiliado",
    address: "Rua Oscar Freire, 300 - Jardins",
    price: 2800,
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Apartamento com 3 quartos",
    address: "Av. Paulista, 1000 - Bela Vista",
    price: 5500,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Kitnet compacta",
    address: "Rua da Consolação, 500 - Consolação",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    area: 25,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
  },
];

export default function PropertyDetailsPage() {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Image Gallery */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Main Image */}
              <div className="relative h-[400px] lg:h-[500px]">
                <img
                  src={property.images[currentImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 text-sm">
                  {currentImage + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-1">
                {property.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-full cursor-pointer"
                    onClick={() => setCurrentImage(index + 1)}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 2}`}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                    {index === 3 && property.images.length > 5 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          +{property.images.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              {/* Title and Price */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {property.title}
                </h1>
                <p className="text-gray-600 mb-4">{property.address}</p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
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
                  {property.parkingSpaces > 0 && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      {property.parkingSpaces} vaga
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Descrição
                </h2>
                <div className="text-gray-600 whitespace-pre-line">
                  {property.description}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Comodidades
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Regras do imóvel
                </h2>
                <ul className="space-y-2">
                  {property.rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Localização
                </h2>
                <div className="bg-gray-200 h-[300px] flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p>{property.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#f0f0f2] p-6 sticky top-20">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    R$ {property.price.toLocaleString("pt-BR")}
                  </div>
                  <div className="text-gray-600">Aluguel mensal</div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condolínio</span>
                    <span className="font-medium">R$ {property.condominiumFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IPTU</span>
                    <span className="font-medium">R$ {property.iptu}/mês</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex justify-between">
                    <span className="font-bold">Total mensal</span>
                    <span className="font-bold">R$ {property.totalMonthly.toLocaleString("pt-BR")}</span>
                  </div>
                </div>

                <button className="w-full bg-primary text-white py-4 font-semibold text-lg hover:bg-primary-dark transition-colors mb-4">
                  Agendar visita
                </button>

                <button className="w-full border-2 border-primary text-primary py-3 font-semibold hover:bg-primary hover:text-white transition-colors mb-6">
                  Tenho interesse
                </button>

                <div className="text-center text-sm text-gray-500">
                  <p>Código do imóvel: {property.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Imóveis similares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similarProperties.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="h-48">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-lg font-bold text-foreground mb-1">
                      R$ {item.price.toLocaleString("pt-BR")}/mês
                    </div>
                    <h3 className="font-medium text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.address}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{item.bedrooms} {item.bedrooms === 1 ? "quarto" : "quartos"}</span>
                      <span>{item.bathrooms} {item.bathrooms === 1 ? "banheiro" : "banheiros"}</span>
                      <span>{item.area}m²</span>
                    </div>
                  </div>
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
