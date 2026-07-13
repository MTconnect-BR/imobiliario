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
  source?: "reidoape";
  refCaixa?: string;
  reidoapeId?: string;
  avaliacaoPrice?: number;
  descontoPct?: number;
  situacaoCaixa?: string;
  documents?: PropertyDocument[];
  officialUrl?: string;
  modalidade?: string;
  tipo_origem?: string;
  categoria?: string;
}

export type PropertyInput = Omit<Property, "id" | "createdAt" | "updatedAt">;

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
