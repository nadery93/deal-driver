import { deals } from "@/lib/data";
import { normalizeSlug } from "@/lib/vehicleCatalogService";

export function getDealerPromotions(input: { state?: string; make?: string; model?: string; trim?: string; type?: string }) {
  const state = input.state?.toUpperCase();
  return deals.filter((deal) => {
    if (state && deal.state !== state && normalizeSlug(deal.state) !== normalizeSlug(state)) return false;
    if (input.make && normalizeSlug(deal.make) !== normalizeSlug(input.make)) return false;
    if (input.model && normalizeSlug(deal.model) !== normalizeSlug(input.model)) return false;
    if (input.trim && normalizeSlug(deal.trim) !== normalizeSlug(input.trim)) return false;
    if (input.type && deal.type !== input.type) return false;
    return true;
  });
}
