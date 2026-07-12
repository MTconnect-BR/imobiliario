export type PropertyType = "casa" | "apartamento" | "terreno" | "comercial";
export type PropertyStatus = "disponivel" | "vendido" | "em_negociacao";

export interface PropertyDocument {
  label: string;
  url: string;
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  address: string;
  addressNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  description: string;
  imageUrl: string;
  images: string[];
  lat?: number;
  lng?: number;
  createdAt: string;
  updatedAt: string;
  /** Rei do APê external source fields */
  source?: "reidoape";
  refCaixa?: string;
  reidoapeId?: string;
  avaliacaoPrice?: number;
  descontoPct?: number;
  situacaoCaixa?: string;
  documents?: PropertyDocument[];
  officialUrl?: string;
}

export type PropertyInput = Omit<Property, "id" | "createdAt" | "updatedAt">;

export interface ReiDoApeProperty {
  id: string;
  referencia: string;
  ref_caixa: string;
  titulo: string;
  categoria: string;
  transacao: string;
  tipo: string;
  valor_venda: number | null;
  valor_locacao: number | null;
  valor_avaliacao: number | null;
  desconto_pct: number | null;
  cidade: string;
  estado: string;
  bairro: string;
  endereco: string;
  numero: string;
  quartos: number;
  banheiros: number;
  vagas: number;
  area_m2: number;
  area_total: number;
  area_privativa: number;
  estado_imovel: string;
  situacao_caixa: string;
  fotos: string[];
  imagem_principal: string;
  coordenadas: string;
  descricao: string;
  link: string;
}

export function mapReiDoApeToProperty(item: ReiDoApeProperty): Property {
  const stateMap: Record<string, string> = {
    AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas",
    BA: "Bahia", CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo",
    GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
    MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná",
    PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina",
    SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
  };

  const cityState = item.cidade.split(",").map(s => s.trim());
  const city = cityState[0] ?? item.cidade;
  const stateShort = item.estado;
  const stateFull = stateMap[stateShort] ?? stateShort;

  const enderecoRaw = (item.endereco ?? "").replace(/^Endereço:\s*/i, "").trim();
  const numeroRaw = (item.numero ?? "").replace(/^\|\s*Número:\s*/i, "").trim();
  const addressParts = [enderecoRaw, numeroRaw].filter(Boolean);
  const address = addressParts[0] ?? "";
  const addressNumber = addressParts[1] ?? "";

  const price = item.valor_venda ? Math.round(item.valor_venda / 100) : 0;
  const avaliacao = item.valor_avaliacao ? Math.round(item.valor_avaliacao / 100) : undefined;

  const matriculaUrl = `https://venda-imoveis.caixa.gov.br/editais/matricula/${item.estado}/${item.ref_caixa}.pdf`;
  const officialUrl = `https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=${item.ref_caixa}`;

  const typeMap: Record<string, PropertyType> = {
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
  };

  const slug = item.id;
  const images = (item.fotos?.length > 0 ? item.fotos : [item.imagem_principal]).filter(Boolean);

  const latMatch = item.coordenadas?.match(/-?\d+\.\d+/);
  const lat = latMatch ? parseFloat(latMatch[0]) : undefined;
  const lngParts = item.coordenadas?.match(/-?\d+\.\d+/g);
  const lng = lngParts?.[1] ? parseFloat(lngParts[1]) : undefined;

  const situacao = item.situacao_caixa || item.estado_imovel || "";

  return {
    id: `reidoape-${slug}`,
    title: item.titulo.split("|")[0].trim(),
    type: typeMap[item.categoria] ?? "casa",
    status: "disponivel",
    price,
    area: item.area_m2 || item.area_total || 0,
    bedrooms: item.quartos || 0,
    bathrooms: item.banheiros || 0,
    parkingSpaces: item.vagas || 0,
    address,
    addressNumber,
    neighborhood: item.bairro || "",
    city,
    state: stateFull,
    cep: "",
    description: item.descricao || `${item.titulo}\n\nRef: ${item.referencia}`,
    imageUrl: images[0] ?? "",
    images,
    lat,
    lng,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: "reidoape",
    refCaixa: item.ref_caixa,
    reidoapeId: item.id,
    avaliacaoPrice: avaliacao,
    descontoPct: item.desconto_pct ?? undefined,
    situacaoCaixa: situacao,
    documents: [
      { label: "Matrícula do Imóvel", url: matriculaUrl },
    ],
    officialUrl,
  };
}

const STORAGE_KEY = "imobiliario_properties";

function generateId(): string {
  return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function readStorage(): Property[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    // Migrate old properties: ensure images[] exists
    return parsed.map((p: Record<string, unknown>) => ({
      ...p,
      images: p.images ?? (p.imageUrl ? [p.imageUrl] : []),
    })) as Property[];
  } catch {
    return [];
  }
}

function writeStorage(properties: Property[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

export function getAllProperties(): Property[] {
  return readStorage().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPropertyById(id: string): Property | undefined {
  return readStorage().find((p) => p.id === id);
}

export function createProperty(input: PropertyInput): Property {
  const now = new Date().toISOString();
  const property: Property = {
    ...input,
    images: input.images ?? (input.imageUrl ? [input.imageUrl] : []),
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  const properties = readStorage();
  properties.push(property);
  writeStorage(properties);
  return property;
}

export function updateProperty(id: string, input: Partial<PropertyInput>): Property | null {
  const properties = readStorage();
  const index = properties.findIndex((p) => p.id === id);
  if (index === -1) return null;
  properties[index] = {
    ...properties[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  writeStorage(properties);
  return properties[index];
}

export function deleteProperty(id: string): boolean {
  const properties = readStorage();
  const filtered = properties.filter((p) => p.id !== id);
  if (filtered.length === properties.length) return false;
  writeStorage(filtered);
  return true;
}

export function getPropertyTypeLabel(type: PropertyType): string {
  const labels: Record<PropertyType, string> = {
    casa: "Casa",
    apartamento: "Apartamento",
    terreno: "Terreno",
    comercial: "Comercial",
  };
  return labels[type];
}

export function getPropertyStatusLabel(status: PropertyStatus): string {
  const labels: Record<PropertyStatus, string> = {
    disponivel: "Disponível",
    vendido: "Vendido",
    em_negociacao: "Em negociação",
  };
  return labels[status];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getRelatedProperties(property: Property, limit = 6): Property[] {
  return getAllProperties()
    .filter((p) => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, limit);
}
