"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  searchProperties,
  parsePrice,
  parseArea,
  parseBedrooms,
  getDiscountPercentage,
  getFullAddress,
  getMapQuery,
  stripHtml,
  type Property,
} from "@/lib/api";

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await searchProperties({ limite: 100 });
        const found = data.items.find(
          (p) => p.id === propertyId
        );
        setProperty(found || data.items[0]);

        const similar = data.items
          .filter((p) => p.id !== (found?.id || data.items[0]?.id))
          .slice(0, 3);
        setSimilarProperties(similar);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Imóvel não encontrado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = getDiscountPercentage(property);
  const bedrooms = parseBedrooms(property.quartos || property.quartos_txt);
  const area = parseArea(
    property.area_total ||
      property.area_total_caixa ||
      property.area_privativa ||
      property.area_privativa_caixa ||
      property.area_util
  );
  const parking = parseBedrooms(property.vagas || property.vagas_txt);
  const suites = parseBedrooms(property.suites || property.suites_txt);
  const bathrooms = parseBedrooms(property.banheiros || property.banheiros_txt);
  const fullAddress = getFullAddress(property);
  const mapQuery = getMapQuery(property);
  const photos = property.fotos && property.fotos.length > 0 ? property.fotos : [property.foto];
  const hasMultiplePhotos = photos.length > 1;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Image Gallery */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            {hasMultiplePhotos ? (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Main Image */}
                <div className="relative h-[400px] lg:h-[500px]">
                  <img
                    src={photos[currentImage]}
                    alt={property.categoria_nome}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop";
                    }}
                  />
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                      -{discount}% OFF
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 text-sm rounded">
                    {currentImage + 1} / {photos.length}
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-1">
                  {photos.slice(1, 5).map((photo, index) => (
                    <div
                      key={index}
                      className="relative h-full cursor-pointer"
                      onClick={() => setCurrentImage(index + 1)}
                    >
                      <img
                        src={photo}
                        alt={`${property.categoria_nome} ${index + 2}`}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop";
                        }}
                      />
                      {index === 3 && photos.length > 5 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white text-xl font-bold">
                            +{photos.length - 5}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Single Image - Centered */
              <div className="relative h-[400px] lg:h-[500px] max-w-4xl mx-auto">
                <img
                  src={photos[0]}
                  alt={property.categoria_nome}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop";
                  }}
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                    -{discount}% OFF
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              {/* Title and Tags */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-primary text-white px-3 py-1 text-xs font-medium rounded">
                    {property.categoria_nome}
                  </span>
                  <span className="bg-[#1a365d] text-white px-3 py-1 text-xs font-medium rounded">
                    {property.transacao}
                  </span>
                  {property.estado_imovel_txt && (
                    <span className="bg-[#1b4332] text-white px-3 py-1 text-xs font-medium rounded">
                      {property.estado_imovel_txt}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {property.titulo_plain || property.categoria_nome}
                </h1>
                {property.subtitulo_plain && (
                  <p className="text-gray-500 text-sm mb-2">
                    {property.subtitulo_plain}
                  </p>
                )}
                <p className="text-gray-600 mb-2">
                  {property.referencia_plain}
                </p>
                {fullAddress && (
                  <div className="flex items-start gap-2 text-gray-600 mb-4">
                    <svg
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
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
                    <span>{fullAddress}</span>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {bedrooms > 0 && (
                    <span className="flex items-center gap-1">
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
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      {bedrooms} {bedrooms === 1 ? "quarto" : "quartos"}
                    </span>
                  )}
                  {bathrooms > 0 && (
                    <span className="flex items-center gap-1">
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
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>
                      {bathrooms} {bathrooms === 1 ? "banheiro" : "banheiros"}
                    </span>
                  )}
                  {area > 0 && (
                    <span className="flex items-center gap-1">
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
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                      {area}m²
                    </span>
                  )}
                  {parking > 0 && (
                    <span className="flex items-center gap-1">
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
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                      {parking} {parking === 1 ? "vaga" : "vagas"}
                    </span>
                  )}
                  {suites > 0 && (
                    <span className="flex items-center gap-1">
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
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      {suites} {suites === 1 ? "suíte" : "suítes"}
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
                  {property.descricao_html
                    ? stripHtml(property.descricao_html)
                    : property.titulo_plain || "Descrição não disponível."}
                </div>
              </div>

              {/* Property Details Grid */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Detalhes do imóvel
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 border border-gray-200 rounded-lg">
                    <span className="text-sm text-gray-500">Categoria</span>
                    <p className="font-medium">{property.categoria_nome}</p>
                  </div>
                  <div className="bg-white p-4 border border-gray-200 rounded-lg">
                    <span className="text-sm text-gray-500">Transação</span>
                    <p className="font-medium">{property.transacao}</p>
                  </div>
                  {property.estado_imovel_txt && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Modalidade</span>
                      <p className="font-medium">{property.estado_imovel_txt}</p>
                    </div>
                  )}
                  {property.tipo && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Tipo</span>
                      <p className="font-medium capitalize">{property.tipo}</p>
                    </div>
                  )}
                  {bedrooms > 0 && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Quartos</span>
                      <p className="font-medium">{bedrooms}</p>
                    </div>
                  )}
                  {bathrooms > 0 && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Banheiros</span>
                      <p className="font-medium">{bathrooms}</p>
                    </div>
                  )}
                  {parking > 0 && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Vagas</span>
                      <p className="font-medium">{parking}</p>
                    </div>
                  )}
                  {suites > 0 && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Suítes</span>
                      <p className="font-medium">{suites}</p>
                    </div>
                  )}
                  {area > 0 && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Área</span>
                      <p className="font-medium">{area}m²</p>
                    </div>
                  )}
                  {property.bairro && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Bairro</span>
                      <p className="font-medium">{property.bairro}</p>
                    </div>
                  )}
                  {property.cidade && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Cidade</span>
                      <p className="font-medium">{property.cidade}</p>
                    </div>
                  )}
                  {property.estado && (
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-500">Estado</span>
                      <p className="font-medium">{property.estado}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Details */}
              {property.precos && property.precos.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-foreground mb-4">
                    Valores
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {property.precos.map((preco, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 ${
                          index > 0 ? "border-t border-gray-200" : ""
                        }`}
                      >
                        <span className="text-gray-600">{preco.label}</span>
                        <span
                          className={`font-bold ${
                            preco.riscado
                              ? "text-gray-400 line-through"
                              : preco.destaque
                              ? "text-primary text-lg"
                              : "text-foreground"
                          }`}
                        >
                          {preco.valor}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentation */}
              {property.ref_caixa && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-foreground mb-4">
                    Documentação
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                    <a
                      href={`https://venda-imoveis.caixa.gov.br/editais/matricula/${property.estado}/${property.ref_caixa}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary hover:underline"
                    >
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Baixar matrícula do imóvel
                    </a>
                    <a
                      href={`https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=${property.ref_caixa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary hover:underline"
                    >
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Ver imóvel no site da Caixa
                    </a>
                  </div>
                </div>
              )}

              {/* Payment Conditions */}
              {property.ref_caixa && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-foreground mb-4">
                    Condições de pagamento
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4 text-sm text-gray-600">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Formas de pagamento aceitas:
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Recursos próprios</li>
                        <li>
                          Permite utilização de FGTS. Consulte condições e
                          enquadramento.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Regras para pagamento das despesas:
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>Condomínio:</strong> Sob responsabilidade do
                          comprador, até o limite de 10% em relação ao valor de
                          avaliação do imóvel. A CAIXA realizará o pagamento
                          apenas do valor que exceder o limite de 10% do valor
                          de avaliação.
                        </li>
                        <li>
                          <strong>Tributos:</strong> Sob responsabilidade do
                          comprador, quando o débito for inferior a 10% do valor
                          de avaliação. A CAIXA paga integralmente quando o
                          débito for superior a 10% do valor de avaliação.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Localização
                </h2>
                <div className="bg-gray-200 h-[300px] flex items-center justify-center text-gray-500 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                      mapQuery
                    )}`}
                    allowFullScreen
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {fullAddress}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 border border-gray-200 rounded-lg sticky top-20">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {property.valor_venda1 || (property.precos && property.precos.length > 0 ? property.precos[0].valor : "Consulte")}
                  </div>
                  {property.valor_avaliacao_txt && (
                    <div className="text-sm text-gray-500">
                      <span className="line-through">{property.valor_avaliacao_txt}</span>
                      <span className="ml-2 text-[#1b4332] font-medium">
                        Avaliação
                      </span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="text-[#1b4332] font-medium mt-1">
                      {discount}% de desconto
                    </div>
                  )}
                </div>

                <a
                  href="/fale-conosco"
                  className="w-full bg-[#1b4332] text-white py-4 font-semibold text-lg hover:bg-[#143526] transition-colors mb-4 rounded-lg flex items-center justify-center gap-2"
                >
                  Tenho interesse
                </a>

                <div className="text-center text-sm text-gray-500 space-y-1">
                  <p>Código: {property.referencia_plain}</p>
                  {property.ref_caixa && (
                    <p>Ref. Caixa: {property.ref_caixa}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Imóveis similares
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarProperties.map((item) => {
                  const itemBedrooms = parseBedrooms(item.quartos || item.quartos_txt);
                  const itemArea = parseArea(
                    item.area_total ||
                      item.area_total_caixa ||
                      item.area_privativa ||
                      item.area_privativa_caixa
                  );
                  const itemDiscount = getDiscountPercentage(item);
                  const itemPhoto =
                    item.fotos && item.fotos.length > 0
                      ? item.fotos[0]
                      : item.foto;

                  return (
                    <Link
                      key={item.id}
                      href={`/imovel/${item.id}`}
                      className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow rounded-lg block"
                    >
                      <div className="relative h-48">
                        <img
                          src={itemPhoto}
                          alt={item.categoria_nome}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop";
                          }}
                        />
                        {itemDiscount > 0 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                            -{itemDiscount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-lg font-bold text-primary mb-1">
                          {item.valor_venda1 || (item.precos && item.precos.length > 0 ? item.precos[0].valor : "Consulte")}
                        </div>
                        <h3 className="font-medium text-foreground mb-1 text-sm">
                          {item.categoria_nome}
                        </h3>
                        <p className="text-xs text-gray-500 mb-1">
                          {item.referencia_plain}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.bairro}, {item.cidade}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {itemBedrooms > 0 && (
                            <span>
                              {itemBedrooms}{" "}
                              {itemBedrooms === 1 ? "quarto" : "quartos"}
                            </span>
                          )}
                          {itemArea > 0 && <span>{itemArea}m²</span>}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
