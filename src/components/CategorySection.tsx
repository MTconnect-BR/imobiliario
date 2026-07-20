"use client";

import { useState, useEffect } from "react";
import { searchProperties, type Property } from "@/lib/api";

interface CategorySectionProps {
  categoryId: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  backgroundImage: string;
  accentColor: string;
  reverse?: boolean;
}

export default function CategorySection({
  categoryId,
  title,
  description,
  linkText,
  linkHref,
  backgroundImage,
  accentColor,
  reverse = false,
}: CategorySectionProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await searchProperties({
          categoria: categoryId,
          pagina: 0,
          limite: 6,
        });
        setProperties(data.items || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, [categoryId]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % Math.max(properties.length, 1));
  };

  const prevCard = () => {
    setCurrentCard((prev) =>
      (prev - 1 + Math.max(properties.length, 1)) %
      Math.max(properties.length, 1)
    );
  };

  const formatPrice = (price: string) => {
    if (!price) return "Consulte";
    const cleaned = price.replace(/<[^>]*>/g, "").trim();
    const match = cleaned.match(/([\d.,]+)/);
    if (match) {
      const num = Number(match[1].replace(/\./g, "").replace(",", "."));
      if (!isNaN(num) && num > 0) {
        return `R$ ${num.toLocaleString("pt-BR")}`;
      }
    }
    return "Consulte";
  };

  const carousel = (
    <div className="relative overflow-hidden min-h-[400px]">
      {loading ? (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500">Carregando...</div>
        </div>
      ) : properties.length > 0 ? (
        <>
          {/* Property image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                properties[currentCard]?.fotos?.[0] || backgroundImage
              })`,
            }}
          />

          {/* White box overlay */}
          <div className="absolute top-6 left-6 bg-white p-6 max-w-[280px] overflow-hidden">
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-3">
              {properties[currentCard]?.titulo_plain || title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {properties[currentCard]?.bairro
                ? `${properties[currentCard].bairro} - ${properties[currentCard].cidade}`
                : description}
            </p>
            <a
              href={linkHref}
              className="font-semibold text-sm inline-flex items-center gap-1 hover:underline"
              style={{ color: accentColor }}
            >
              {linkText}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Price overlay */}
          {properties[currentCard]?.precos?.[0]?.valor && (
            <div className="absolute bottom-6 left-6 bg-white px-4 py-2 rounded-lg shadow-md">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(properties[currentCard].precos[0].valor)}
              </span>
            </div>
          )}

          {/* Navigation arrows */}
          <div className="absolute bottom-6 right-4 flex gap-2">
            <button
              onClick={prevCard}
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextCard}
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-6 left-24 right-20 h-1 bg-white/30 rounded-full">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentCard + 1) / Math.max(properties.length, 1)) * 100
                }%`,
              }}
            />
          </div>
        </>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
    </div>
  );

  const textPanel = (
    <div
      className="p-8 lg:p-10 flex flex-col justify-center"
      style={{ backgroundColor: accentColor }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
        {title}
      </h2>
      <p className="text-lg text-white/80 mb-8">{description}</p>
      <a
        href={linkHref}
        className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors text-center inline-block w-fit"
      >
        {linkText}
      </a>
    </div>
  );

  return (
    <section className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          {reverse ? (
            <>
              {textPanel}
              {carousel}
            </>
          ) : (
            <>
              {carousel}
              {textPanel}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
