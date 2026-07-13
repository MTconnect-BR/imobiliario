import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { type Property } from "@/lib/properties";

export const dynamic = "force-dynamic";

const TYPE_FILE_MAP: Record<string, string> = {
  casa: "casas.json",
  apartamento: "apartamentos.json",
  terreno: "terrenos.json",
  comercial: "comerciais.json",
};

async function loadProperties(type?: string): Promise<Property[]> {
  const fileName = type && TYPE_FILE_MAP[type] ? TYPE_FILE_MAP[type] : "all-properties.json";
  const filePath = join(process.cwd(), "data", fileName);
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "0", 10);
    const limit = parseInt(searchParams.get("limit") ?? "10", 10);
    const type = searchParams.get("type") ?? undefined;
    const state = searchParams.get("state") ?? undefined;
    const city = searchParams.get("city") ?? undefined;
    const neighborhood = searchParams.get("neighborhood") ?? undefined;
    const bedrooms = searchParams.get("bedrooms") ?? undefined;
    const bathrooms = searchParams.get("bathrooms") ?? undefined;
    const parking = searchParams.get("parking") ?? undefined;
    const minPrice = searchParams.get("minPrice") ?? undefined;
    const maxPrice = searchParams.get("maxPrice") ?? undefined;
    const modalidade = searchParams.get("modalidade") ?? undefined;
    const tipoOrigem = searchParams.get("tipoOrigem") ?? undefined;
    const refCaixa = searchParams.get("refCaixa") ?? undefined;
    const search = searchParams.get("search")?.toLowerCase() ?? undefined;

    const allProperties = await loadProperties(type);

    let filtered = allProperties;

    if (state) filtered = filtered.filter((p) => p.state === state);
    if (city) filtered = filtered.filter((p) => p.city.toLowerCase() === city.toLowerCase());
    if (neighborhood) {
      const n = neighborhood.toLowerCase();
      filtered = filtered.filter((p) => p.neighborhood?.toLowerCase().includes(n));
    }
    if (bedrooms) {
      const min = parseInt(bedrooms, 10);
      if (!isNaN(min)) filtered = filtered.filter((p) => p.bedrooms >= min);
    }
    if (bathrooms) {
      const min = parseInt(bathrooms, 10);
      if (!isNaN(min)) filtered = filtered.filter((p) => p.bathrooms >= min);
    }
    if (parking) {
      const min = parseInt(parking, 10);
      if (!isNaN(min)) filtered = filtered.filter((p) => p.parkingSpaces >= min);
    }
    if (minPrice) {
      const min = parseInt(minPrice, 10);
      if (!isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
    }
    if (maxPrice) {
      const max = parseInt(maxPrice, 10);
      if (!isNaN(max)) filtered = filtered.filter((p) => p.price <= max);
    }
    if (modalidade) {
      filtered = filtered.filter((p) => p.modalidade === modalidade);
    }
    if (tipoOrigem) {
      filtered = filtered.filter((p) => p.tipo_origem === tipoOrigem);
    }
    if (refCaixa) {
      const r = refCaixa.toLowerCase();
      filtered = filtered.filter((p) => p.refCaixa?.toLowerCase().includes(r));
    }
    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.city.toLowerCase().includes(search) ||
          p.neighborhood?.toLowerCase().includes(search) ||
          p.refCaixa?.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const start = page * limit;
    const properties = filtered.slice(start, start + limit);

    return NextResponse.json({ properties, total, page, limit });
  } catch {
    return NextResponse.json({ properties: [], total: 0, page: 0, limit: 10 }, { status: 500 });
  }
}
