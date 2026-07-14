import { type Property } from "@/lib/properties";

const API_BASE = "https://reidoape.com.br/api";
const ID_MASTER = "90821645";
const PAGE_SIZE = 100;
const CACHE_TTL_MS = 60 * 60 * 1000;

const CATEGORY_BY_TYPE: Record<string, string> = {
  apartamento: "1",
  casa: "6",
  terreno: "32",
  comercial: "16,20,60,130,132,144",
};

let cache: {
  map: Map<string, RawItem>;
  totalPages: number;
  pagesLoaded: number;
  loadingPromise: Promise<void> | null;
  timestamp: number;
  stale: boolean;
} | null = null;

interface RawItem {
  id: string;
  titulo_plain?: string;
  categoria?: string;
  categoria_nome?: string;
  cidade?: string;
  estado?: string;
  enderecoPermissao?: string;
  numeroPermissao?: string;
  valor_venda1?: string;
  valor_avaliacao_txt?: string;
  desconto_pct?: string;
  area_m2?: string;
  area_total_caixa?: string;
  quartos_txt?: string;
  banheiros_txt?: string;
  vagas_txt?: string;
  bairro?: string;
  fotos?: string[];
  foto?: string;
  map_lat?: string;
  map_lon?: string;
  coordenadas?: string;
  ref_caixa?: string;
  descricao_html?: string;
  situacao_caixa?: string;
  estado_imovel_txt?: string;
  tipo?: string;
  referencia_plain?: string;
}

function cleanHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#\d+;/g, "")
    .trim();
}

function parsePrice(text: string): number {
  if (!text) return 0;
  const cleaned = cleanHtml(text);
  const match = cleaned.match(/R\$\s*([\d.,]+)/);
  if (!match) return 0;
  const numStr = match[1].replace(/\./g, "").replace(",", ".");
  const num = parseFloat(numStr);
  return isNaN(num) ? 0 : Math.round(num);
}

function parseArea(text: string): number {
  if (!text) return 0;
  const cleaned = cleanHtml(text).trim();
  if (!cleaned) return 0;
  const normalized = cleaned.replace(/\./g, "").replace(",", ".");
  const match = normalized.match(/([\d.]+)\s*m/);
  if (match) {
    const num = parseFloat(match[1]);
    return isNaN(num) ? 0 : num;
  }
  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : num;
}

function parseNumber(text: string): number {
  if (!text) return 0;
  const cleaned = cleanHtml(text);
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? 0 : num;
}

const typeMap: Record<string, string> = {
  Apartamento: "apartamento",
  Casa: "casa",
  Terreno: "terreno",
  "Terreno / Lote": "terreno",
  Comercial: "comercial",
  Loja: "comercial",
  Sala: "comercial",
  Prédio: "comercial",
  Chácara: "casa",
  Fazenda: "casa",
  Sítio: "casa",
  Kitnet: "apartamento",
  Flat: "apartamento",
  Cobertura: "apartamento",
  Andar: "apartamento",
  Galpão: "comercial",
  "Grupo de Salas Comerciais": "comercial",
  "Imóvel Comercial": "comercial",
  Sobrado: "casa",
  "Casa Duplex": "casa",
  "Andar Corporativo": "comercial",
};

function categoriaIdsForType(type?: string): string | undefined {
  if (!type || type === "all") return undefined;
  return CATEGORY_BY_TYPE[type];
}

async function fetchPage(
  page: number,
  categoriaIds?: string,
): Promise<{ items?: RawItem[]; meta?: { total?: number } }> {
  let url = `${API_BASE}?id_master=${ID_MASTER}&pagina=${page}&limite=${PAGE_SIZE}`;
  if (categoriaIds) {
    url += `&categoria[]=${categoriaIds}`;
  }
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return res.json();
}

function needsRefresh(): boolean {
  if (!cache) return true;
  return Date.now() - cache.timestamp >= CACHE_TTL_MS;
}

async function loadPages(from: number, to: number, categoriaIds?: string): Promise<void> {
  if (!cache) return;
  const BATCH = 5;
  const DELAY_MS = 300;
  for (let batchStart = from; batchStart < to; batchStart += BATCH) {
    const batchEnd = Math.min(batchStart + BATCH, to);
    const pages: number[] = [];
    for (let p = batchStart; p < batchEnd; p++) pages.push(p);

    const results = await Promise.all(pages.map((p) => fetchPage(p, categoriaIds)));
    for (const data of results) {
      for (const item of data.items ?? []) {
        if (!cache.map.has(item.id)) {
          cache.map.set(item.id, item);
        }
      }
    }
    cache.pagesLoaded = batchEnd;

    if (batchEnd < to) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }
}

async function doFullFetch(categoriaIds?: string): Promise<void> {
  const firstPage = await fetchPage(0, categoriaIds);
  const total = firstPage.meta?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const map = new Map<string, RawItem>();
  for (const item of firstPage.items ?? []) {
    map.set(item.id, item);
  }

  cache = {
    map,
    totalPages,
    pagesLoaded: 1,
    loadingPromise: null,
    timestamp: Date.now(),
    stale: false,
  };

  await loadPages(1, totalPages, categoriaIds);

  if (cache) {
    cache = { ...cache, timestamp: Date.now(), loadingPromise: null };
  }
}

function ensureLoading(): void {
  if (!cache) {
    cache = {
      map: new Map(),
      totalPages: 0,
      pagesLoaded: 0,
      loadingPromise: null,
      timestamp: Date.now(),
      stale: false,
    };

    const prom = doFullFetch()
      .then(() => {
        if (cache) cache.loadingPromise = null;
      })
      .catch(() => {
        if (cache) cache.loadingPromise = null;
      });
    cache.loadingPromise = prom;
    return;
  }

  if (!needsRefresh()) return;
  if (cache.stale || cache.loadingPromise) return;

  cache.stale = true;
  const prom = doFullFetch()
    .then(() => {
      if (cache) cache.stale = false;
    })
    .catch(() => {
      if (cache) cache.stale = false;
    });
  cache.loadingPromise = prom;
}

async function ensureTypeLoaded(type: string): Promise<void> {
  const catIds = categoriaIdsForType(type);
  if (!catIds) return;

  await fetchTypePages(catIds);
}

async function fetchTypePages(categoriaIds: string): Promise<void> {
  if (!cache) return;

  const firstPage = await fetchPage(0, categoriaIds);
  const total = firstPage.meta?.total ?? 0;
  if (total === 0) return;

  for (const item of firstPage.items ?? []) {
    if (!cache.map.has(item.id)) {
      cache.map.set(item.id, item);
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);
  await loadPages(1, totalPages, categoriaIds);
}

export function mapToProperty(item: RawItem): Omit<Property, "id" | "createdAt" | "updatedAt"> {
  const cityState = (item.cidade || "").split(",").map((s) => s.trim());
  const city = cityState[0] ?? (item.cidade || "");
  const stateShort = item.estado || "";

  const enderecoRaw = cleanHtml(item.enderecoPermissao ?? "")
    .replace(/^Endereço:\s*/i, "")
    .trim();
  const numeroRaw = cleanHtml(item.numeroPermissao ?? "")
    .replace(/^\|\s*Número:\s*/i, "")
    .trim();

  const price = parsePrice(item.valor_venda1 ?? "");
  const avaliacao = parsePrice(item.valor_avaliacao_txt ?? "");
  const desconto = parseInt(item.desconto_pct ?? "0", 10) || undefined;

  const area = parseArea(item.area_m2 ?? "") || parseArea(item.area_total_caixa ?? "");
  const quartos = parseNumber(item.quartos_txt ?? "0");
  const banheiros = parseNumber(item.banheiros_txt ?? "0");
  const vagas = parseNumber(item.vagas_txt ?? "0");

  const matriculaUrl = item.ref_caixa
    ? `https://venda-imoveis.caixa.gov.br/editais/matricula/${item.estado}/${item.ref_caixa}.pdf`
    : "";
  const officialUrl = item.ref_caixa
    ? `https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=${item.ref_caixa}`
    : "";

  const fotos = item.fotos ?? [];
  const images: string[] = (fotos.length > 0 ? fotos : [item.foto]).filter(Boolean) as string[];

  let lat: number | undefined;
  let lng: number | undefined;
  if (item.map_lat && item.map_lon) {
    lat = parseFloat(item.map_lat);
    lng = parseFloat(item.map_lon);
  } else if (item.coordenadas) {
    const parts = item.coordenadas.match(/-?\d+\.\d+/g);
    if (parts?.length === 2) {
      lat = parseFloat(parts[0]);
      lng = parseFloat(parts[1]);
    }
  }

  const situacao = item.situacao_caixa || item.estado_imovel_txt || "";
  const description = item.descricao_html
    ? cleanHtml(item.descricao_html)
    : item.titulo_plain ||
      `Imóvel ${item.categoria_nome || item.categoria}\n\nRef: ${item.referencia_plain || item.ref_caixa}`;

  const categoria = item.categoria || item.categoria_nome || "";

  return {
    reidoapeId: item.id,
    title: item.titulo_plain || `Imóvel ${categoria} - ${item.bairro}, ${item.cidade}`,
    type: (typeMap[categoria] ?? "casa") as Property["type"],
    categoria,
    status: "disponivel" as Property["status"],
    price,
    avaliacaoPrice: avaliacao || undefined,
    descontoPct: desconto,
    area,
    bedrooms: quartos,
    bathrooms: banheiros,
    parkingSpaces: vagas,
    address: enderecoRaw,
    addressNumber: numeroRaw,
    neighborhood: item.bairro || "",
    city,
    state: stateShort,
    cep: "",
    description,
    imageUrl: images[0] ?? "",
    images,
    lat,
    lng,
    modalidade: situacao,
    tipo_origem: item.tipo || "",
    refCaixa: item.ref_caixa || "",
    documents: item.ref_caixa ? [{ label: "Matrícula do Imóvel", url: matriculaUrl }] : [],
    officialUrl,
    source: "reidoape",
  };
}

function rawItemToProperty(item: RawItem): Property {
  const now = new Date().toISOString();
  return {
    id: `imovel-${item.id}`,
    ...mapToProperty(item),
    createdAt: now,
    updatedAt: now,
  };
}

export function getRawItemById(id: string): RawItem | undefined {
  return cache?.map.get(id);
}

export async function getAllProperties(): Promise<Property[]> {
  ensureLoading();

  if (!cache) return [];

  if (cache.pagesLoaded === 0 && cache.loadingPromise) {
    await new Promise<void>((r) => {
      const check = () => {
        if (cache && cache.pagesLoaded > 0) return r();
        setTimeout(check, 100);
      };
      check();
    });
  }

  const props: Property[] = [];
  for (const item of cache.map.values()) {
    props.push(rawItemToProperty(item));
  }
  return props;
}

export async function waitForFullLoad(): Promise<void> {
  ensureLoading();
  if (cache?.loadingPromise) {
    await cache.loadingPromise;
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const reidoapeId = id.startsWith("imovel-") ? id.slice(7) : id;

  if (cache?.map.has(reidoapeId)) {
    return rawItemToProperty(cache.map.get(reidoapeId)!);
  }

  ensureLoading();

  if (cache?.loadingPromise) {
    const startWait = Date.now();
    const WAIT_TIMEOUT_MS = 25000;
    while (cache && cache.loadingPromise) {
      if (Date.now() - startWait > WAIT_TIMEOUT_MS) break;
      await new Promise((r) => setTimeout(r, 200));
      if (cache?.map.has(reidoapeId)) {
        return rawItemToProperty(cache.map.get(reidoapeId)!);
      }
    }
  }

  if (cache?.map.has(reidoapeId)) {
    return rawItemToProperty(cache.map.get(reidoapeId)!);
  }

  return null;
}

export interface PropertyFilters {
  state?: string;
  city?: string;
  neighborhood?: string;
  bedrooms?: string;
  bathrooms?: string;
  parking?: string;
  minPrice?: string;
  maxPrice?: string;
  modalidade?: string;
  tipoOrigem?: string;
  refCaixa?: string;
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
  sort?: "recentes" | "menor_valor" | "maior_valor" | "maior_desconto";
}

export async function getPropertiesFiltered(
  filters: PropertyFilters,
): Promise<{ properties: Property[]; total: number; partial: boolean }> {
  ensureLoading();

  if (!cache) return { properties: [], total: 0, partial: false };

  if (cache.pagesLoaded === 0 && cache.loadingPromise) {
    await new Promise<void>((r) => {
      const check = () => {
        if (cache && cache.pagesLoaded > 0) return r();
        setTimeout(check, 100);
      };
      check();
    });
  }

  if (filters.type && filters.type !== "all") {
    await ensureTypeLoaded(filters.type);
  }

  let all: Property[] = [];
  for (const item of cache.map.values()) {
    all.push(rawItemToProperty(item));
  }

  const isPartial = cache.loadingPromise !== null;

  if (filters.type && filters.type !== "all") {
    all = all.filter((p) => p.type === filters.type);
  }
  if (filters.state && filters.state !== "all") {
    all = all.filter((p) => p.state === filters.state);
  }
  if (filters.city) {
    const c = filters.city.toLowerCase();
    all = all.filter((p) => p.city.toLowerCase() === c);
  }
  if (filters.neighborhood) {
    const n = filters.neighborhood.toLowerCase();
    all = all.filter((p) => p.neighborhood?.toLowerCase().includes(n));
  }
  if (filters.bedrooms) {
    const min = parseInt(filters.bedrooms, 10);
    if (!isNaN(min)) all = all.filter((p) => p.bedrooms >= min);
  }
  if (filters.bathrooms) {
    const min = parseInt(filters.bathrooms, 10);
    if (!isNaN(min)) all = all.filter((p) => p.bathrooms >= min);
  }
  if (filters.parking) {
    const min = parseInt(filters.parking, 10);
    if (!isNaN(min)) all = all.filter((p) => p.parkingSpaces >= min);
  }
  if (filters.minPrice) {
    const min = parseInt(filters.minPrice, 10);
    if (!isNaN(min)) all = all.filter((p) => p.price >= min);
  }
  if (filters.maxPrice) {
    const max = parseInt(filters.maxPrice, 10);
    if (!isNaN(max)) all = all.filter((p) => p.price <= max);
  }
  if (filters.modalidade) {
    all = all.filter((p) => p.modalidade === filters.modalidade);
  }
  if (filters.tipoOrigem) {
    all = all.filter((p) => p.tipo_origem === filters.tipoOrigem);
  }
  if (filters.refCaixa) {
    const r = filters.refCaixa.toLowerCase();
    all = all.filter((p) => p.refCaixa?.toLowerCase().includes(r));
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    all = all.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.neighborhood?.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        (p.refCaixa && p.refCaixa.toLowerCase().includes(q)),
    );
  }

  const sort = filters.sort ?? "recentes";
  switch (sort) {
    case "menor_valor":
      all.sort((a, b) => a.price - b.price);
      break;
    case "maior_valor":
      all.sort((a, b) => b.price - a.price);
      break;
    case "maior_desconto":
      all.sort((a, b) => (b.descontoPct ?? 0) - (a.descontoPct ?? 0));
      break;
    case "recentes":
    default:
      all.sort((a, b) => {
        const aId = parseInt(a.id.replace("imovel-", ""), 10);
        const bId = parseInt(b.id.replace("imovel-", ""), 10);
        return bId - aId;
      });
      break;
  }

  const total = all.length;
  const page = filters.page ?? 0;
  const limit = filters.limit ?? 24;
  const start = page * limit;
  const paged = all.slice(start, start + limit);

  return { properties: paged, total, partial: isPartial };
}

export async function getCounts(): Promise<{
  total: number;
  byType: Record<string, number>;
  byState: Record<string, number>;
  byCity: Record<string, number>;
  pagesLoaded: number;
  totalPages: number;
  loading: boolean;
}> {
  ensureLoading();

  if (!cache) {
    return {
      total: 0,
      byType: {},
      byState: {},
      byCity: {},
      pagesLoaded: 0,
      totalPages: 0,
      loading: true,
    };
  }

  if (cache.pagesLoaded === 0 && cache.loadingPromise) {
    await new Promise<void>((r) => {
      const check = () => {
        if (cache && cache.pagesLoaded > 0) return r();
        setTimeout(check, 100);
      };
      check();
    });
  }

  const totalEstimate = cache.totalPages * PAGE_SIZE;
  const byType: Record<string, number> = {};
  const byState: Record<string, number> = {};
  const byCity: Record<string, number> = {};
  for (const item of cache.map.values()) {
    const p = mapToProperty(item);
    byType[p.type] = (byType[p.type] ?? 0) + 1;
    byState[p.state] = (byState[p.state] ?? 0) + 1;
    byCity[p.city] = (byCity[p.city] ?? 0) + 1;
  }

  return {
    total: totalEstimate,
    byType,
    byState,
    byCity,
    pagesLoaded: cache.pagesLoaded,
    totalPages: cache.totalPages,
    loading: cache.loadingPromise !== null,
  };
}

export function getLoadProgress(): { pagesLoaded: number; totalPages: number } {
  if (!cache) return { pagesLoaded: 0, totalPages: 0 };
  return { pagesLoaded: cache.pagesLoaded, totalPages: cache.totalPages };
}
