import { listPromotions } from "@/lib/promotionStore";
import { normalizeSlug } from "@/lib/vehicleCatalogService";

export function getDealerPromotions(input: { state?: string; make?: string; model?: string; trim?: string; type?: string }) {
  const state = input.state?.toUpperCase();
  return listPromotions({
    state,
    make: input.make,
    model: input.model,
    trim: input.trim,
    type: input.type
  }).filter((deal) => {
    if (!state) return true;
    return deal.state === state || normalizeSlug(deal.state) === normalizeSlug(state);
  });
}
