import { readFile } from "fs/promises";
import { join } from "path";
import { type Property } from "@/lib/properties";

const TYPE_FILE_MAP: Record<string, string> = {
  casa: "casas.json",
  apartamento: "apartamentos.json",
  terreno: "terrenos.json",
  comercial: "comerciais.json",
};

let cachedAll: Property[] | null = null;
const cachedByType: Record<string, Property[]> = {};

export async function getProperties(type?: string): Promise<Property[]> {
  if (type && cachedByType[type]) return cachedByType[type];
  if (!type && cachedAll) return cachedAll;

  const fileName = type && TYPE_FILE_MAP[type] ? TYPE_FILE_MAP[type] : "all-properties.json";
  const filePath = join(process.cwd(), "data", fileName);
  const data = await readFile(filePath, "utf-8");
  const properties: Property[] = JSON.parse(data);

  if (type) {
    cachedByType[type] = properties;
  } else {
    cachedAll = properties;
  }

  return properties;
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
  }
): Property[] {
  let filtered = properties;

  if (filters.state) filtered = filtered.filter((p) => p.state === filters.state);
  if (filters.city) filtered = filtered.filter((p) => p.city.toLowerCase() === filters.city!.toLowerCase());
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
        p.refCaixa?.toLowerCase().includes(q)
    );
  }

  return filtered;
}
