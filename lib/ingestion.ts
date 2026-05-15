import { z } from "zod";

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
