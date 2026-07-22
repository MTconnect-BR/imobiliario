const API_BASE = "https://reidoape.com.br/api";

export interface PriceDetail {
  tipo: string;
  valor: string;
  label: string;
  destaque: boolean;
  riscado: boolean;
}

export interface Property {
  id_master: number;
  id: string;
  foto: string;
  fotos: string[];
  categoria: string;
  categoria_nome: string;
  transacao: string;
  transacao_tag: string;
  tipo: string;
  valor_venda1: string;
  valorLocacao: string;
  valorLocacaoDia: string;
  valor_avaliacao_txt: string;
  precos: PriceDetail[];
  quartos: string;
  quartos_txt: string;
  banheiros: string;
  banheiros_txt: string;
  vagas: string;
  vagas_txt: string;
  suites: string;
  suites_txt: string;
  area_total: string;
  area_total_caixa: string;
  area_privativa: string;
  area_privativa_caixa: string;
  area_util: string;
  area_terreno: string;
  area_terreno_caixa: string;
  area_m2: string;
  desconto_pct: string;
  cidade: string;
  estado: string;
  bairro: string;
  estadoImovel: string;
  estado_imovel_txt: string;
  referencia_plain: string;
  ref_caixa: string;
  titulo_plain: string;
  titulo_linha: string;
  subtitulo_plain: string;
  enderecoPermissao: string;
  bairroPermissao: string;
  numeroPermissao: string;
  descricao_html: string;
  mostrar_mapa: string;
  map_geocode_queries: string[];
  map_lat: number | null;
  map_lon: number | null;
  leilao_pracas: unknown[];
  leilao_ativo: boolean;
  instagram_url?: string;
  instagram_texto?: string;
}

export interface ApiResponse {
  meta: {
    total: number;
    pagina: number;
    limite: number;
    ordena: string;
  };
  items: Property[];
}

export interface SearchFilters {
  categoria?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  ordena?: string;
  pagina?: number;
  limite?: number;
}

export function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function searchProperties(
  filters: SearchFilters = {}
): Promise<ApiResponse> {
  const params = new URLSearchParams();
  params.append("ordena", filters.ordena || "recentes");
  params.append("pagina", String(filters.pagina || 0));
  params.append("limite", String(filters.limite || 24));
  params.append("id_master", "90821645");

  if (filters.categoria) {
    params.append("categoria[]", filters.categoria);
  }
  if (filters.estado) {
    params.append("estado", filters.estado);
  }
  if (filters.cidade) {
    params.append("cidade[]", filters.cidade);
  }
  if (filters.bairro) {
    params.append("bairro[]", filters.bairro);
  }

  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
}

export function parsePrice(priceHtml: string): number {
  const cleaned = stripHtml(priceHtml);
  const match = cleaned.match(/R\$\s*([\d.,]+)/);
  if (match) {
    return Number(match[1].replace(".", "").replace(",", "."));
  }
  return 0;
}

export function formatPrice(price: string | number): string {
  if (!price && price !== 0) return "Consulte";
  const str = String(price).trim();
  if (str.toLowerCase() === "consulte" || str === "") return "Consulte";

  let numStr = str.replace(/[^\d,\.]/g, "");
  if (!numStr) return "Consulte";

  if (numStr.includes(",")) {
    numStr = numStr.replace(/\./g, "").replace(",", ".");
  } else {
    numStr = numStr.replace(/\./g, "");
  }

  const num = parseFloat(numStr);
  if (isNaN(num)) return "Consulte";

  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseArea(areaHtml: string): number {
  const cleaned = stripHtml(areaHtml);
  const match = cleaned.match(/([\d.,]+)/);
  if (match) {
    return Number(match[1].replace(".", "").replace(",", "."));
  }
  return 0;
}

export function parseBedrooms(bedroomsHtml: string): number {
  const cleaned = stripHtml(bedroomsHtml);
  const match = cleaned.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export function getDiscountPercentage(property: Property): number {
  if (property.desconto_pct) {
    const cleaned = stripHtml(property.desconto_pct);
    const match = cleaned.match(/(\d+)/);
    if (match) return parseInt(match[1]);
  }

  if (property.valor_avaliacao_txt && property.valor_venda1) {
    const avaliacao = parsePrice(property.valor_avaliacao_txt);
    const venda = parsePrice(property.valor_venda1);
    if (avaliacao > 0 && venda > 0) {
      return Math.round(((avaliacao - venda) / avaliacao) * 100);
    }
  }

  return 0;
}

export function getFullAddress(property: Property): string {
  const parts: string[] = [];
  if (property.enderecoPermissao) {
    parts.push(stripHtml(property.enderecoPermissao));
  }
  if (property.numeroPermissao) {
    parts.push(stripHtml(property.numeroPermissao));
  }
  if (property.bairroPermissao) {
    parts.push(stripHtml(property.bairroPermissao));
  }
  if (parts.length === 0) {
    if (property.bairro) parts.push(property.bairro);
    if (property.cidade) parts.push(property.cidade);
  }
  return parts.join(", ").replace(/^,\s*/, "").replace(/,\s*$/, "");
}

export function getMapQuery(property: Property): string {
  if (property.map_geocode_queries && property.map_geocode_queries.length > 0) {
    return property.map_geocode_queries[0];
  }
  return getFullAddress(property);
}

export const categories = [
  { id: "1", name: "Apartamento" },
  { id: "6", name: "Casa" },
  { id: "32", name: "Terreno" },
  { id: "16", name: "Galpão" },
  { id: "144", name: "Andar Corporativo" },
  { id: "20", name: "Sobrado" },
];

export const states = [
  { id: "SP", name: "São Paulo" },
  { id: "RJ", name: "Rio de Janeiro" },
  { id: "PR", name: "Paraná" },
  { id: "SC", name: "Santa Catarina" },
];

export const sortOptions = [
  { id: "recentes", name: "Mais recentes" },
  { id: "menor_valor", name: "Menor valor" },
  { id: "maior_valor", name: "Maior valor" },
  { id: "maior_desconto", name: "Maior desconto" },
];
