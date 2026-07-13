import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { type Property } from "@/lib/properties";

let cachedCounts: Record<string, unknown> | null = null;

async function getCounts() {
  if (cachedCounts) return cachedCounts;
  try {
    const filePath = join(process.cwd(), "data", "all-properties.json");
    const data = await readFile(filePath, "utf-8");
    const properties = JSON.parse(data) as Property[];

    const typeCounts: Record<string, number> = {};
    const stateCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};

    for (const p of properties) {
      typeCounts[p.type] = (typeCounts[p.type] ?? 0) + 1;
      stateCounts[p.state] = (stateCounts[p.state] ?? 0) + 1;
      cityCounts[p.city] = (cityCounts[p.city] ?? 0) + 1;
    }

    cachedCounts = {
      total: properties.length,
      byType: typeCounts,
      byState: stateCounts,
      byCity: cityCounts,
    };
    return cachedCounts;
  } catch {
    return { total: 0, byType: {}, byState: {}, byCity: {} };
  }
}

export async function GET() {
  const counts = await getCounts();
  return NextResponse.json(counts);
}
