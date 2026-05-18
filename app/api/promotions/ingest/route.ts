import { NextRequest, NextResponse } from "next/server";
import { normalizeIngestedPromotionBatch } from "@/lib/ingestion";
import { bulkUpsert } from "@/lib/promotionStore";

function authorizeIngest(request: NextRequest) {
  const apiKey = process.env.INGEST_API_KEY;
  if (!apiKey) return true;
  return request.headers.get("x-ingest-api-key") === apiKey;
}

export async function POST(request: NextRequest) {
  if (!authorizeIngest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const records = normalizeIngestedPromotionBatch(body);
    const deals = bulkUpsert(records);
    return NextResponse.json({ ingested: deals.length, deals });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid ingest payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
