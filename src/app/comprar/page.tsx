"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  searchProperties,
  parsePrice,
  parseArea,
  parseBedrooms,
  getDiscountPercentage,
  categories,
  states,
  sortOptions,
  type Property,
  type SearchFilters,
} from "@/lib/api";
import { supabase, type UserProperty } from "@/lib/supabase";

function ComprarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function userPropertyToProperty(up: UserProperty): Property {
    return {
      id: `user_${up.id}`,
      id_master: 0,
      foto: up.fotos?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
      fotos: up.fotos || [],
      categoria: up.categoria || "",
      categoria_nome: up.categoria || "Imóvel",
      transacao: "Venda",
      transacao_tag: "Venda",
      valor_venda1: up.preco || "",
      valorLocacao: "",
      valorLocacaoDia: "",
      valor_avaliacao_txt: "",
      precos: [],
      titulo_linha: up.titulo,
      titulo_plain: up.titulo,
      subtitulo_plain: "",
      referencia_plain: up.referencia || `Siena ${up.id.slice(0, 6)}`,
      quartos: String(up.quartos || ""),
      quartos_txt: String(up.quartos || ""),
      banheiros: String(up.banheiros || ""),
      banheiros_txt: String(up.banheiros || ""),
      vagas: String(up.vagas || ""),
      vagas_txt: String(up.vagas || ""),
      suites: "",
      suites_txt: "",
      area_total: up.area > 0 ? String(up.area) : "",
      area_total_caixa: "",
      area_privativa: "",
      area_privativa_caixa: "",
      area_util: "",
      area_terreno: up.area_terreno > 0 ? String(up.area_terreno) : "",
      area_terreno_caixa: "",
      area_m2: "",
      desconto_pct: "",
      bairro: up.bairro,
      cidade: up.cidade,
      estado: up.estado,
      estadoImovel: "",
      estado_imovel_txt: "",
      ref_caixa: "",
      enderecoPermissao: up.endereco || "",
      bairroPermissao: "",
      numeroPermissao: "",
      descricao_html: up.descricao || "",
      tipo: "",
      mostrar_mapa: "",
      map_geocode_queries: [],
      map_lat: null,
      map_lon: null,
      leilao_pracas: [],
      leilao_ativo: false,
    };
  }

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<SearchFilters>({
    ordena: "recentes",
    pagina: 0,
    limite: 24,
  });
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("categoria") || "");
  const [selectedState, setSelectedState] = useState(searchParams.get("estado") || "");
  const [selectedSort, setSelectedSort] = useState(searchParams.get("ordena") || "recentes");
  const [selectedOrigem, setSelectedOrigem] = useState(searchParams.get("origem") || "todas");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const searchParamsStr = searchParams.toString();

  useEffect(() => {
    setSelectedCategory(searchParams.get("categoria") || "");
    setSelectedState(searchParams.get("estado") || "");
    setSelectedSort(searchParams.get("ordena") || "recentes");
    setSelectedOrigem(searchParams.get("origem") || "todas");
    setPage(0);
  }, [searchParamsStr]);

  const bairroFilter = searchParams.get("bairro") || "";
  const precoMax = Number(searchParams.get("preco_max")) || 0;
  const precoMin = Number(searchParams.get("preco_min")) || 0;
  const quartosFilter = Number(searchParams.get("quartos")) || 0;

  useEffect(() => {
    let cancelled = false;

    async function fetchProperties() {
      setLoading(true);
      try {
        const searchFilters: SearchFilters = {
          ...filters,
          ordena: selectedSort,
          pagina: page,
        };

        if (selectedCategory) searchFilters.categoria = selectedCategory;
        if (selectedState) searchFilters.estado = selectedState;
        if (bairroFilter) searchFilters.bairro = bairroFilter;

        const [apiData, supabaseData] = await Promise.all([
          searchProperties(searchFilters),
          supabase
            .from("user_properties")
            .select("*")
            .eq("status", "ativo")
            .then(({ data }) => data || []),
        ]);

        if (cancelled) return;

        const apiItems = (apiData.items || []).filter(
          (p) => p.id && p.id !== "0"
        );
        const userItems = (supabaseData as UserProperty[])
          .filter((up) => {
            if (selectedCategory && up.categoria !== categories.find((c) => c.id === selectedCategory)?.name) return false;
            if (selectedState && up.estado !== selectedState) return false;
            if (bairroFilter && up.bairro !== bairroFilter) return false;
            return true;
          })
          .map(userPropertyToProperty);

        const merged = [...apiItems, ...userItems];

        let origemFiltered = merged;
        if (selectedOrigem === "siena") {
          origemFiltered = merged.filter((p) => p.id.startsWith("user_"));
        } else if (selectedOrigem === "caixa") {
          origemFiltered = merged.filter((p) => !p.id.startsWith("user_"));
        }

        if (selectedSort === "menor_valor") {
          origemFiltered.sort((a, b) => parsePrice(a.valor_venda1 || "") - parsePrice(b.valor_venda1 || ""));
        } else if (selectedSort === "maior_valor") {
          origemFiltered.sort((a, b) => parsePrice(b.valor_venda1 || "") - parsePrice(a.valor_venda1 || ""));
        } else if (selectedSort === "maior_desconto") {
          origemFiltered.sort((a, b) => getDiscountPercentage(b) - getDiscountPercentage(a));
        }
        setProperties(origemFiltered);

        let filtered = origemFiltered;

        if (precoMax > 0) {
          filtered = filtered.filter((p) => {
            const price = parsePrice(p.valor_venda1 || "");
            return price > 0 && price <= precoMax;
          });
        } else if (precoMin > 0) {
          filtered = filtered.filter((p) => {
            const price = parsePrice(p.valor_venda1 || "");
            return price >= precoMin;
          });
        }

        if (quartosFilter > 0) {
          filtered = filtered.filter((p) => {
            const bedrooms = parseBedrooms(p.quartos || p.quartos_txt);
            if (quartosFilter === 4) {
              return bedrooms >= 4;
            }
            return bedrooms === quartosFilter;
          });
        }

        setFilteredProperties(filtered);
        setTotal(precoMax > 0 || precoMin > 0 || quartosFilter > 0 ? filtered.length : merged.length);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProperties();
    return () => { cancelled = true; };
  }, [selectedSort, page, selectedCategory, selectedState, selectedOrigem, bairroFilter, precoMax, precoMin, quartosFilter]);

  const faqItems = [
    {
      question: "Como comprar um imóvel com a Siena?",
      answer:
        "É simples! Escolha o imóvel que deseja, entre em contato com nosso time e acompanhe todo o processo de compra com segurança e transparência.",
    },
    {
      question: "Quais documentos são necessários para comprar?",
      answer:
        "RG ou CNH, CPF, comprovante de renda e endereço. Para financiamento, será necessário extrato bancário e declaração de imposto de renda.",
    },
    {
      question: "Posso financiar o imóvel?",
      answer:
        "Sim! Trabalhamos com os principais bancos para oferecer as melhores taxas de financiamento. Consulte nossos especialistas.",
    },
    {
      question: "Como agendar uma visita ao imóvel?",
      answer:
        "Clique no botão 'Agendar visita' no card do imóvel ou entre em contato pelo WhatsApp. Nós agendamos no melhor horário para você.",
    },
    {
      question: "Quais são as formas de pagamento?",
      answer:
        "Aceitamos pagamento à vista, financiamento bancário, consórcio e parcelamento direto com a construtora/pessoa física.",
    },
  ];

  const pushFilter = (key: string, value: string) => {
    const qs = new URLSearchParams(searchParams.toString());
    if (value) qs.set(key, value);
    else qs.delete(key);
    router.push(`/comprar?${qs.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {selectedState
                    ? `Imóveis para venda em ${states.find((s) => s.id === selectedState)?.name || selectedState}`
                    : "Todos os imóveis para venda"}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {loading ? "Carregando..." : `${total.toLocaleString("pt-BR")} imóveis encontrados`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => pushFilter("categoria", e.target.value)}
                  className="border border-gray-300 px-4 py-2 text-sm rounded-lg"
                >
                  <option value="">Todas categorias</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedState}
                  onChange={(e) => pushFilter("estado", e.target.value)}
                  className="border border-gray-300 px-4 py-2 text-sm rounded-lg"
                >
                  <option value="">Todos estados</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedSort}
                  onChange={(e) => pushFilter("ordena", e.target.value)}
                  className="border border-gray-300 px-4 py-2 text-sm rounded-lg"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedOrigem}
                  onChange={(e) => pushFilter("origem", e.target.value)}
                  className="border border-gray-300 px-4 py-2 text-sm rounded-lg"
                >
                  <option value="todas">Todos origens</option>
                  <option value="siena">Siena</option>
                  <option value="caixa">Caixa</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white p-6 border border-gray-200 rounded-lg lg:sticky lg:top-20">
                <h2 className="text-lg font-bold text-foreground mb-6">
                  Filtros
                </h2>

                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">Categoria</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="category"
                          value={cat.id}
                          checked={selectedCategory === cat.id}
                          onChange={(e) => pushFilter("categoria", e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">Estado</h3>
                  <div className="space-y-2">
                    {states.map((state) => (
                      <label key={state.id} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="state"
                          value={state.id}
                          checked={selectedState === state.id}
                          onChange={(e) => pushFilter("estado", e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{state.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">Ordenar por</h3>
                  <div className="space-y-2">
                    {sortOptions.map((opt) => (
                      <label key={opt.id} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="sort"
                          value={opt.id}
                          checked={selectedSort === opt.id}
                          onChange={(e) => pushFilter("ordena", e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{opt.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">Origem</h3>
                  <div className="space-y-2">
                    {[
                      { id: "todas", name: "Todas" },
                      { id: "siena", name: "Siena" },
                      { id: "caixa", name: "Caixa" },
                    ].map((o) => (
                      <label key={o.id} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="origem"
                          value={o.id}
                          checked={selectedOrigem === o.id}
                          onChange={(e) => pushFilter("origem", e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{o.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => router.push("/comprar")}
                  className="w-full border border-gray-300 text-foreground py-2 font-medium hover:bg-gray-50 transition-colors rounded-lg"
                >
                  Limpar filtros
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (precoMax > 0 || precoMin > 0 || quartosFilter > 0 ? filteredProperties : properties).length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">
                    Nenhum imóvel encontrado com os filtros selecionados.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {(precoMax > 0 || precoMin > 0 || quartosFilter > 0 ? filteredProperties : properties).map((property) => {
                      const discount = getDiscountPercentage(property);
                      const price = parsePrice(property.valor_venda1);
                      const bedrooms = parseBedrooms(property.quartos);
                      const area = parseArea(property.area_total || property.area_privativa);

                      return (
                        <Link
                          key={property.id}
                          href={`/imovel/${property.id}`}
                          className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow block rounded-lg"
                        >
                          <div className="relative h-48">
                            <img
                              src={property.foto}
                              alt={property.categoria_nome}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop";
                              }}
                            />
                            {discount > 0 && (
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                                -{discount}%
                              </div>
                            )}
                            <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 text-xs font-medium rounded">
                              {property.transacao}
                            </div>
                            <div className={`absolute bottom-2 left-2 px-2 py-1 text-xs font-bold rounded ${property.id.startsWith("user_") ? "bg-[#1b4332] text-white" : "bg-blue-600 text-white"}`}>
                              {property.id.startsWith("user_") ? "Siena" : "Caixa"}
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg font-bold text-primary">
                                {property.valor_venda1 || "Consulte"}
                              </span>
                            </div>
                            <h3 className="font-medium text-foreground mb-1 text-sm">
                              {property.categoria_nome}
                            </h3>
                            <p className="text-xs text-gray-500 mb-1">
                              {property.referencia_plain}
                            </p>
                            <p
                              className="text-sm text-gray-600 mb-3 line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: property.titulo_linha || property.titulo_plain || "",
                              }}
                            />
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                              {bedrooms > 0 && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                  </svg>
                                  {bedrooms} {bedrooms === 1 ? "quarto" : "quartos"}
                                </span>
                              )}
                              {area > 0 && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                  </svg>
                                  {area}m²
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex justify-center items-center gap-2">
                    <button
                      onClick={() => setPage(Math.max(0, page - 1))}
                      disabled={page === 0}
                      className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Anterior
                    </button>
                    <span className="px-4 py-2 text-sm text-gray-600">
                      Página {page + 1} de {Math.ceil(total / 24)}
                    </span>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={(page + 1) * 24 >= total}
                      className="px-4 py-2 border border-gray-300 hover:border-primary transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próximo →
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Perguntas frequentes
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-foreground">{item.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-gray-600">{item.answer}</div>
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

export default function ComprarPage() {
  return (
    <Suspense>
      <ComprarContent />
    </Suspense>
  );
}
