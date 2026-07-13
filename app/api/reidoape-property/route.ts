import { NextRequest, NextResponse } from "next/server";
import { getPropertyById } from "@/lib/reidoape-api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reidoapeId = searchParams.get("id");

  if (!reidoapeId) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  try {
    const property = await getPropertyById(reidoapeId);

    if (!property) {
      return NextResponse.json({ property: null }, { status: 404 });
    }

    return NextResponse.json({ property });
  } catch {
    return NextResponse.json({ property: null }, { status: 404 });
  }
}
