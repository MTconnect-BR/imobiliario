import { type Property } from "@/lib/properties";
import {
  getAllProperties,
  getPropertiesFiltered,
  getPropertyById as getReidoapePropertyById,
  getCounts,
} from "@/lib/reidoape-api";

export async function getProperties(type?: string): Promise<Property[]> {
  if (type) {
    const { properties } = await getPropertiesFiltered({ type, limit: 10000 });
    return properties;
  }
  return getAllProperties();
}

export function filterProperties(
  properties: Property[],
  filters: {
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
  },
): Property[] {
  let filtered = properties;

  if (filters.state) filtered = filtered.filter((p) => p.state === filters.state);
  if (filters.city)
    filtered = filtered.filter((p) => p.city.toLowerCase() === filters.city!.toLowerCase());
  if (filters.neighborhood) {
    const n = filters.neighborhood.toLowerCase();
    filtered = filtered.filter((p) => p.neighborhood?.toLowerCase().includes(n));
  }
  if (filters.bedrooms) {
    const min = parseInt(filters.bedrooms, 10);
    if (!isNaN(min)) filtered = filtered.filter((p) => p.bedrooms >= min);
  }
  if (filters.bathrooms) {
    const min = parseInt(filters.bathrooms, 10);
    if (!isNaN(min)) filtered = filtered.filter((p) => p.bathrooms >= min);
  }
  if (filters.parking) {
    const min = parseInt(filters.parking, 10);
    if (!isNaN(min)) filtered = filtered.filter((p) => p.parkingSpaces >= min);
  }
  if (filters.minPrice) {
    const min = parseInt(filters.minPrice, 10);
    if (!isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
  }
  if (filters.maxPrice) {
    const max = parseInt(filters.maxPrice, 10);
    if (!isNaN(max)) filtered = filtered.filter((p) => p.price <= max);
  }
  if (filters.modalidade) filtered = filtered.filter((p) => p.modalidade === filters.modalidade);
  if (filters.tipoOrigem) filtered = filtered.filter((p) => p.tipo_origem === filters.tipoOrigem);
  if (filters.refCaixa) {
    const r = filters.refCaixa.toLowerCase();
    filtered = filtered.filter((p) => p.refCaixa?.toLowerCase().includes(r));
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.neighborhood?.toLowerCase().includes(q) ||
        p.refCaixa?.toLowerCase().includes(q),
    );
  }

  return filtered;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  return getReidoapePropertyById(id);
}

export async function createProperty(
  _input: Omit<Property, "id" | "createdAt" | "updatedAt">,
): Promise<Property | null> {
  return null;
}

export async function updateProperty(
  _id: string,
  _input: Partial<Omit<Property, "id" | "createdAt" | "updatedAt">>,
): Promise<Property | null> {
  return null;
}

export async function deleteProperty(_id: string): Promise<boolean> {
  return true;
}

export async function getPropertiesCount(): Promise<number> {
  const counts = await getCounts();
  return counts.total;
}

export async function getPropertiesByState(): Promise<{ state: string; count: number }[]> {
  const counts = await getCounts();
  return Object.entries(counts.byState).map(([state, count]) => ({ state, count }));
}

export async function getPropertiesByType(): Promise<{ type: string; count: number }[]> {
  const counts = await getCounts();
  return Object.entries(counts.byType).map(([type, count]) => ({ type, count }));
}
