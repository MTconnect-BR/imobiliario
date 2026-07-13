import { NextResponse } from "next/server";
import { getCounts } from "@/lib/reidoape-api";

export async function GET() {
  try {
    const counts = await getCounts();
    return NextResponse.json(counts);
  } catch {
    return NextResponse.json({
      total: 0,
      byType: {},
      byState: {},
      byCity: {},
    });
  }
}
