export type PropertyType = "casa" | "apartamento" | "terreno" | "comercial";
export type PropertyStatus = "disponivel" | "vendido" | "em_negociacao";

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
  neighborhood: string;
  city: string;
  state: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type PropertyInput = Omit<Property, "id" | "createdAt" | "updatedAt">;

const STORAGE_KEY = "imobiliario_properties";

function generateId(): string {
  return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function readStorage(): Property[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
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
