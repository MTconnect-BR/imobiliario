import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { type Property } from "@/lib/properties";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "0", 10);
    const limit = parseInt(searchParams.get("limit") ?? "10", 10);
    const type = searchParams.get("type") ?? undefined;
    const state = searchParams.get("state") ?? undefined;
    const city = searchParams.get("city") ?? undefined;
    const search = searchParams.get("search")?.toLowerCase() ?? undefined;

    const filePath = join(process.cwd(), "data", "all-properties.json");
    const data = await readFile(filePath, "utf-8");
    const allProperties: Property[] = JSON.parse(data);

    let filtered = allProperties;

    if (type) filtered = filtered.filter((p) => p.type === type);
    if (state) filtered = filtered.filter((p) => p.state === state);
    if (city) filtered = filtered.filter((p) => p.city === city);
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
