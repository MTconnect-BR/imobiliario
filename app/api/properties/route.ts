import { NextResponse } from "next/server";
import { getPropertiesFiltered } from "@/lib/reidoape-api";
import type { PropertyFilters } from "@/lib/reidoape-api";

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

    const filters: PropertyFilters = {
      type,
      state,
      city,
      neighborhood,
      bedrooms,
      bathrooms,
      parking,
      minPrice,
      maxPrice,
      modalidade,
      tipoOrigem,
      refCaixa,
      search,
      page,
      limit,
    };

    const { properties, total, partial } = await getPropertiesFiltered(filters);

    return NextResponse.json({ properties, total, page, limit, partial });
  } catch {
    return NextResponse.json({ properties: [], total: 0, page: 0, limit: 10 }, { status: 500 });
  }
}
