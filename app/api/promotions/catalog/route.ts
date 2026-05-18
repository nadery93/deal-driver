import { NextRequest, NextResponse } from "next/server";
import { getCatalogOptions } from "@/lib/promotionStore";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const catalog = getCatalogOptions({
    make: params.get("make") ?? undefined,
    model: params.get("model") ?? undefined
  });

  return NextResponse.json(catalog);
}
