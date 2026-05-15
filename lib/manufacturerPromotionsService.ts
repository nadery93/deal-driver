import { manufacturerPromotions, usStates } from "@/lib/data";
import { normalizeSlug } from "@/lib/vehicleCatalogService";

export function getManufacturerBenchmarks(input: { state?: string; make?: string; model?: string; trim?: string; type?: string }) {
  const state = input.state?.toUpperCase();
  const region = usStates.find((item) => item.code === state || normalizeSlug(item.name) === normalizeSlug(input.state ?? ""))?.region;

  return manufacturerPromotions.filter((promotion) => {
    if (input.make && normalizeSlug(promotion.make) !== normalizeSlug(input.make)) return false;
    if (input.type && promotion.type !== input.type) return false;
    if (region && promotion.region !== "National" && promotion.region !== region) return false;
    if (input.model && !promotion.id.includes(normalizeSlug(input.model))) return false;
    if (input.trim && !promotion.id.includes(normalizeSlug(input.trim))) return false;
    return true;
  });
}
