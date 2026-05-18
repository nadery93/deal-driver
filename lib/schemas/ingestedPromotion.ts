import { z } from "zod";

export const dealTypeSchema = z.enum(["Lease", "Finance"]);

export const sourceKindSchema = z.enum(["dealer", "manufacturer", "community", "partner_feed"]);

export const ingestedPromotionSchema = z.object({
  sourceKind: sourceKindSchema.default("dealer"),
  year: z.number().int().min(2000).max(2035),
  make: z.string().min(1),
  model: z.string().min(1),
  trim: z.string().min(1),
  state: z.string().length(2).transform((value) => value.toUpperCase()),
  city: z.string().optional(),
  dealer: z.string().optional(),
  type: dealTypeSchema,
  monthlyPayment: z.number().int().positive(),
  dueAtSigning: z.number().int().min(0),
  term: z.number().int().positive(),
  mileage: z.number().int().min(0).default(10000),
  apr: z.number().optional(),
  moneyFactor: z.number().optional(),
  sellingPrice: z.number().int().positive().optional(),
  incentives: z.number().int().min(0).optional(),
  stockPhotoUrl: z.string().url(),
  source: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  expiresAt: z.string().min(1),
  confidence: z.number().int().min(0).max(100).default(70),
  id: z.string().optional()
});

export const ingestedPromotionBatchSchema = z.object({
  promotions: z.array(ingestedPromotionSchema).min(1)
});

export type IngestedPromotion = z.infer<typeof ingestedPromotionSchema>;
