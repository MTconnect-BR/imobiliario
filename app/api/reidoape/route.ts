import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { type Property } from "@/lib/properties";

let cachedProperties: Property[] | null = null;

async function loadProperties(): Promise<Property[]> {
  if (cachedProperties) return cachedProperties;
  try {
    const filePath = join(process.cwd(), "data", "all-properties.json");
    const data = await readFile(filePath, "utf-8");
    cachedProperties = JSON.parse(data) as Property[];
    return cachedProperties;
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10));
  const limite = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limite") ?? "24", 10))
  );

  const search = searchParams.get("search") ?? searchParams.get("busca") ?? "";
  const type = searchParams.get("type") ?? "";
  const state = searchParams.get("state") ?? searchParams.get("estado") ?? "";
  const priceMin = parseInt(searchParams.get("preco_minimo") ?? "0", 10);
  const priceMax = parseInt(
    searchParams.get("preco_maximo") ?? "999999999",
    10
  );
  const bedrooms = parseInt(searchParams.get("quartos_min") ?? "0", 10);
  const bathrooms = parseInt(searchParams.get("banheiros_min") ?? "0", 10);
  const parking = parseInt(searchParams.get("vagas_min") ?? "0", 10);
  const neighborhood = searchParams.get("bairro") ?? "";
  const reference = searchParams.get("referencia") ?? "";
  const sort = searchParams.get("ordena") ?? "recentes";

  let properties = await loadProperties();

  if (search) {
    const q = search.toLowerCase();
    properties = properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        (p.refCaixa && p.refCaixa.toLowerCase().includes(q))
    );
  }

  if (type && type !== "all") {
    properties = properties.filter((p) => p.type === type);
  }

  if (state && state !== "all") {
    properties = properties.filter((p) => p.state === state);
  }

  if (priceMin > 0) {
    properties = properties.filter((p) => p.price >= priceMin);
  }

  if (priceMax < 999999999) {
    properties = properties.filter((p) => p.price <= priceMax);
  }

  if (bedrooms > 0) {
    properties = properties.filter((p) => p.bedrooms >= bedrooms);
  }

  if (bathrooms > 0) {
    properties = properties.filter((p) => p.bathrooms >= bathrooms);
  }

  if (parking > 0) {
    properties = properties.filter((p) => p.parkingSpaces >= parking);
  }

  if (neighborhood) {
    const nq = neighborhood.toLowerCase();
    properties = properties.filter(
      (p) =>
        p.neighborhood.toLowerCase().includes(nq) ||
        p.city.toLowerCase().includes(nq)
    );
  }

  if (reference) {
    const rq = reference.toLowerCase();
    properties = properties.filter(
      (p) =>
        p.refCaixa?.toLowerCase().includes(rq) ||
        p.id.toLowerCase().includes(rq)
    );
  }

  switch (sort) {
    case "menor_valor":
      properties.sort((a, b) => a.price - b.price);
      break;
    case "maior_valor":
      properties.sort((a, b) => b.price - a.price);
      break;
    case "maior_desconto":
      properties.sort(
        (a, b) => (b.descontoPct ?? 0) - (a.descontoPct ?? 0)
      );
      break;
    case "recentes":
    default:
      properties.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  const total = properties.length;
  const start = page * limite;
  const paged = properties.slice(start, start + limite);

  return NextResponse.json({
    total,
    page,
    perPage: limite,
    properties: paged,
  });
}
