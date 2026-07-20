"use client";

import { useState } from "react";

export default function LocationsSection() {
  const [activeTab, setActiveTab] = useState<"alugar" | "comprar">("alugar");

  const locations = {
    alugar: [
      {
        city: "São Paulo",
        links: [
          "Apartamentos para alugar em São Paulo",
          "Casas para alugar em São Paulo",
          "Studios e kitnets para alugar em São Paulo",
          "Casas em condomínio para alugar em São Paulo",
          "Condomínios em São Paulo",
        ],
      },
      {
        city: "Rio de Janeiro",
        links: [
          "Apartamentos para alugar em Rio de Janeiro",
          "Casas para alugar em Rio de Janeiro",
          "Studios e kitnets para alugar em Rio de Janeiro",
          "Casas em condomínio para alugar em Rio de Janeiro",
          "Condomínios no Rio de Janeiro",
        ],
      },
      {
        city: "Porto Alegre",
        links: [
          "Apartamentos para alugar em Porto Alegre",
          "Casas para alugar em Porto Alegre",
          "Studios e kitnets para alugar em Porto Alegre",
          "Casas em condomínio para alugar em Porto Alegre",
          "Condomínios em Porto Alegre",
        ],
      },
      {
        city: "Belo Horizonte",
        links: [
          "Apartamentos para alugar em Belo Horizonte",
          "Casas para alugar em Belo Horizonte",
          "Studios e kitnets para alugar em Belo Horizonte",
          "Casas em condomínio para alugar em Belo Horizonte",
          "Condomínios em Belo Horizonte",
        ],
      },
    ],
    comprar: [
      {
        city: "São Paulo",
        links: [
          "Apartamentos para comprar em São Paulo",
          "Casas para comprar em São Paulo",
          "Studios e kitnets para comprar em São Paulo",
          "Casas em condomínio para comprar em São Paulo",
          "Condomínios à venda em São Paulo",
        ],
      },
      {
        city: "Rio de Janeiro",
        links: [
          "Apartamentos para comprar em Rio de Janeiro",
          "Casas para comprar em Rio de Janeiro",
          "Studios e kitnets para comprar em Rio de Janeiro",
          "Casas em condomínio para comprar em Rio de Janeiro",
          "Condomínios à venda no Rio de Janeiro",
        ],
      },
      {
        city: "Porto Alegre",
        links: [
          "Apartamentos para comprar em Porto Alegre",
          "Casas para comprar em Porto Alegre",
          "Studios e kitnets para comprar em Porto Alegre",
          "Casas em condomínio para comprar em Porto Alegre",
          "Condomínios à venda em Porto Alegre",
        ],
      },
      {
        city: "Belo Horizonte",
        links: [
          "Apartamentos para comprar em Belo Horizonte",
          "Casas para comprar em Belo Horizonte",
          "Studios e kitnets para comprar em Belo Horizonte",
          "Casas em condomínio para comprar em Belo Horizonte",
          "Condomínios à venda em Belo Horizonte",
        ],
      },
    ],
  };

  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Onde você quiser, tem uma Siena
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setActiveTab("alugar")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "alugar"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Alugar
          </button>
          <button
            onClick={() => setActiveTab("comprar")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "comprar"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Comprar
          </button>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations[activeTab].map((location, index) => (
            <div key={index}>
              <h3 className="text-2xl font-bold text-primary mb-6">
                {location.city}
              </h3>
              <ul className="space-y-4">
                {location.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
