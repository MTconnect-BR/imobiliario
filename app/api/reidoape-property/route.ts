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
  const reidoapeId = searchParams.get("id");

  if (!reidoapeId) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  const properties = await loadProperties();
  const fullId = `reidoape-${reidoapeId}`;
  const property = properties.find((p) => p.id === fullId);

  if (!property) {
    return NextResponse.json({ property: null }, { status: 404 });
  }

  return NextResponse.json({ property });
}
