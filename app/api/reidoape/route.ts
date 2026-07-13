import { NextRequest, NextResponse } from "next/server";
import { getPropertiesFiltered } from "@/lib/reidoape-api";
import type { PropertyFilters } from "@/lib/reidoape-api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10));
  const limite = Math.min(100, Math.max(1, parseInt(searchParams.get("limite") ?? "24", 10)));

  const search = searchParams.get("search") ?? searchParams.get("busca") ?? "";
  const type = searchParams.get("type") ?? "";
  const state = searchParams.get("state") ?? searchParams.get("estado") ?? "";
  const priceMin = parseInt(searchParams.get("preco_minimo") ?? "0", 10);
  const priceMax = parseInt(searchParams.get("preco_maximo") ?? "999999999", 10);
  const bedrooms = parseInt(searchParams.get("quartos_min") ?? "0", 10);
  const bathrooms = parseInt(searchParams.get("banheiros_min") ?? "0", 10);
  const parking = parseInt(searchParams.get("vagas_min") ?? "0", 10);
  const neighborhood = searchParams.get("bairro") ?? "";
  const reference = searchParams.get("referencia") ?? "";
  const sort = searchParams.get("ordena") ?? "recentes";

  try {
    const filters: PropertyFilters = {
      type: type || undefined,
      state: state || undefined,
      search: search || undefined,
      neighborhood: neighborhood || undefined,
      minPrice: priceMin > 0 ? String(priceMin) : undefined,
      maxPrice: priceMax < 999999999 ? String(priceMax) : undefined,
      bedrooms: bedrooms > 0 ? String(bedrooms) : undefined,
      bathrooms: bathrooms > 0 ? String(bathrooms) : undefined,
      parking: parking > 0 ? String(parking) : undefined,
      refCaixa: reference || undefined,
      sort: sort as PropertyFilters["sort"],
      page,
      limit: limite,
    };

    const { properties, total, partial } = await getPropertiesFiltered(filters);

    return NextResponse.json({
      total,
      page,
      perPage: limite,
      properties,
      partial,
    });
  } catch {
    return NextResponse.json({
      total: 0,
      page,
      perPage: limite,
      properties: [],
    });
  }
}
