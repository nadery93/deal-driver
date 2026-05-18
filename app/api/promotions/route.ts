import { NextRequest, NextResponse } from "next/server";
import { listPromotions } from "@/lib/promotionStore";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const maxPaymentRaw = params.get("maxPayment");
  const maxPayment = maxPaymentRaw ? Number(maxPaymentRaw.replace(/[^0-9]/g, "")) : undefined;

  const deals = listPromotions({
    state: params.get("state") ?? undefined,
    make: params.get("make") ?? undefined,
    model: params.get("model") ?? undefined,
    trim: params.get("trim") ?? undefined,
    type: params.get("type") ?? undefined,
    q: params.get("q") ?? undefined,
    maxPayment: maxPayment && !Number.isNaN(maxPayment) ? maxPayment : undefined,
    evOnly: params.get("evOnly") === "true",
    sort: params.get("sort") ?? undefined
  });

  return NextResponse.json({ deals, count: deals.length });
}
