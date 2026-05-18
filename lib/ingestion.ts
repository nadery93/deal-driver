import { z } from "zod";
import {
  ingestedPromotionBatchSchema,
  ingestedPromotionSchema,
  type IngestedPromotion
} from "@/lib/schemas/ingestedPromotion";

export { ingestedPromotionSchema, ingestedPromotionBatchSchema, type IngestedPromotion };

export const communityDealSchema = z.object({
  source: z.enum(["reddit", "leasehackr", "customer_upload", "rss", "manual_import", "partner_feed"]),
  sourceUrl: z.string().url().optional(),
  year: z.number().int().min(2000).max(2035).optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  trim: z.string().optional(),
  msrp: z.number().int().positive().optional(),
  sellingPrice: z.number().int().positive().optional(),
  monthlyPayment: z.number().int().positive().optional(),
  dueAtSigning: z.number().int().min(0).optional(),
  term: z.number().int().positive().optional(),
  mileage: z.number().int().positive().optional(),
  apr: z.number().optional(),
  moneyFactor: z.number().optional(),
  dealerLocation: z.string().optional(),
  dealDate: z.string().optional(),
  sentiment: z.string().optional(),
  confidence: z.number().int().min(0).max(100).default(50)
});

export type ParsedCommunityDeal = z.infer<typeof communityDealSchema>;

export function normalizeCommunityDeal(input: unknown): ParsedCommunityDeal {
  return communityDealSchema.parse(input);
}

export function normalizeIngestedPromotion(input: unknown): IngestedPromotion {
  return ingestedPromotionSchema.parse(input);
}

export function normalizeIngestedPromotionBatch(input: unknown): IngestedPromotion[] {
  const payload = input as { promotions?: unknown[] };
  if (payload && Array.isArray(payload.promotions)) {
    return ingestedPromotionBatchSchema.parse(input).promotions;
  }
  return [normalizeIngestedPromotion(input)];
}

export function communityDealToIngested(deal: ParsedCommunityDeal): IngestedPromotion | null {
  if (!deal.make || !deal.model || !deal.trim || !deal.year) return null;
  if (!deal.monthlyPayment || !deal.term) return null;

  return {
    sourceKind: "community",
    year: deal.year,
    make: deal.make,
    model: deal.model,
    trim: deal.trim,
    state: "CA",
    type: "Lease",
    monthlyPayment: deal.monthlyPayment,
    dueAtSigning: deal.dueAtSigning ?? 0,
    term: deal.term,
    mileage: deal.mileage ?? 10000,
    apr: deal.apr,
    moneyFactor: deal.moneyFactor,
    sellingPrice: deal.sellingPrice,
    incentives: 0,
    stockPhotoUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    source: `Community: ${deal.source}`,
    sourceUrl: deal.sourceUrl,
    expiresAt: "2026-06-30",
    confidence: deal.confidence
  };
}

export const ingestionArchitecture = [
  {
    source: "Reddit",
    compliantMethod: "Use official Reddit API where allowed, OAuth app credentials, rate limits, and subreddit-specific rules.",
    parser: "Extract vehicle, payment, term, mileage, dealer location, price fields, and sentiment from posts/comments.",
    display: "Show as Community Reported Deals with source links, timestamps, and confidence."
  },
  {
    source: "Leasehackr-style forum",
    compliantMethod: "Use user-submitted links, manual imports, permitted feeds, or explicit partnerships. No ToS-violating scraping.",
    parser: "Parse structured worksheets and narrative posts into normalized deal fields.",
    display: "Cite source links and mark stale, regional, and credit-tier-dependent offers."
  },
  {
    source: "Dealer and manufacturer promotions",
    compliantMethod: "Use official feeds, dealer-submitted data, manual review, or partner APIs.",
    parser: "Normalize incentives, APR, money factor, residual notes, fees, and expiration dates.",
    display: "Show as dealer offers with expiration and verification status."
  }
];
