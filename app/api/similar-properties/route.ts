import { NextResponse } from "next/server";
import { getPropertiesFiltered } from "@/lib/reidoape-api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") ?? undefined;
    const state = searchParams.get("state") ?? undefined;
    const city = searchParams.get("city") ?? undefined;
    const excludeId = searchParams.get("excludeId") ?? undefined;

    const { properties } = await getPropertiesFiltered({
      type,
      state,
      city,
      limit: 50,
    });

    const filtered = properties
      .filter((p) => p.id !== excludeId)
      .sort((a, b) => {
        const aCity = a.city === city ? 1 : 0;
        const bCity = b.city === city ? 1 : 0;
        return bCity - aCity;
      })
      .slice(0, 10);

    return NextResponse.json({ properties: filtered });
  } catch {
    return NextResponse.json({ properties: [] }, { status: 500 });
  }
}
