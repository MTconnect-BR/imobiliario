import { NextRequest, NextResponse } from "next/server";
import {
  type ReiDoApeProperty,
  mapReiDoApeToProperty,
  type PropertyType,
} from "@/lib/properties";

const REIDOAPE_API = "https://reidoape.com.br/api";
const REIDOAPE_ID_MASTER = "90821645";

interface ReiDoApeApiResponse {
  total: number;
  lastPage: number;
  count: number;
  properties: ReiDoApeProperty[];
}

export interface TransformedProperty {
  id: string;
  title: string;
  type: PropertyType;
  status: "disponivel";
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
  source: "reidoape";
  refCaixa: string;
  reidoapeId: string;
  avaliacaoPrice?: number;
  descontoPct?: number;
  situacaoCaixa: string;
  documents: { label: string; url: string }[];
  officialUrl: string;
}

async function fetchReiDoApePage(
  page: number,
  filters: Record<string, string> = {}
): Promise<ReiDoApeApiResponse> {
  const params = new URLSearchParams({
    id_master: REIDOAPE_ID_MASTER,
    page: page.toString(),
    ...filters,
  });

  const res = await fetch(`${REIDOAPE_API}?${params}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Rei do APê API error: ${res.status}`);
  }

  return res.json();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "24", 10)));
  const type = searchParams.get("type") ?? "";
  const state = searchParams.get("state") ?? "";
  const city = searchParams.get("city") ?? "";
  const q = searchParams.get("q") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "data_venda";
  const sortDir = searchParams.get("sortDir") ?? "desc";

  const filters: Record<string, string> = {};
  if (type) filters.categoria = type;
  if (state) filters.estado = state;
  if (city) filters.cidade = city;
  if (q) filters.q = q;
  if (sortBy) filters.sort_by = sortBy;
  if (sortDir) filters.sort_direction = sortDir;

  try {
    const data = await fetchReiDoApePage(page, filters);

    const transformed = data.properties.map(mapReiDoApeToProperty);

    return NextResponse.json({
      total: data.total,
      lastPage: data.lastPage,
      page,
      limit,
      properties: transformed,
    });
  } catch (error) {
    console.error("Rei do APê API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties from Rei do APê" },
      { status: 502 }
    );
  }
}
