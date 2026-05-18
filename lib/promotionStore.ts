import { deals as seedDeals } from "@/lib/data";
import { enrichIngestedPromotion } from "@/lib/dealEnrichment";
import { dealScore } from "@/lib/scoring";
import type { IngestedPromotion } from "@/lib/schemas/ingestedPromotion";
import type { VehicleDeal } from "@/lib/types";
import { getMakes, getModelsForMake, getTrimsForVehicle, normalizeSlug } from "@/lib/vehicleCatalogService";

export type PromotionFilters = {
  state?: string;
  make?: string;
  model?: string;
  trim?: string;
  type?: string;
  q?: string;
  maxPayment?: number;
  evOnly?: boolean;
  sort?: string;
};

let store: VehicleDeal[] | null = null;

function getStore(): VehicleDeal[] {
  if (!store) {
    store = [...seedDeals];
  }
  return store;
}

function haystack(deal: VehicleDeal) {
  return `${deal.year} ${deal.make} ${deal.model} ${deal.trim} ${deal.city} ${deal.state} ${deal.dealer}`.toLowerCase();
}

function sortDeals(items: VehicleDeal[], sort?: string) {
  const list = [...items];
  if (sort === "payment") return list.sort((a, b) => a.monthlyPayment - b.monthlyPayment);
  if (sort === "apr") return list.sort((a, b) => (a.apr ?? 99) - (b.apr ?? 99));
  if (sort === "discount") return list.sort((a, b) => b.dealerDiscount - a.dealerDiscount);
  if (sort === "score") return list.sort((a, b) => dealScore(b) - dealScore(a));
  if (sort === "newest") return list.sort((a, b) => (a.updatedAt === "Today" ? -1 : 1) - (b.updatedAt === "Today" ? -1 : 1));
  if (sort === "distance") return list.sort((a, b) => a.distance - b.distance);
  if (sort === "confidence") return list.sort((a, b) => b.confidence - a.confidence);
  return list.sort((a, b) => b.benchmark.effectiveSavings - a.benchmark.effectiveSavings);
}

export function listPromotions(filters: PromotionFilters = {}) {
  const state = filters.state?.toUpperCase();
  const q = filters.q?.trim().toLowerCase();

  const filtered = getStore().filter((deal) => {
    if (state && deal.state !== state && normalizeSlug(deal.state) !== normalizeSlug(state)) return false;
    if (filters.make && normalizeSlug(deal.make) !== normalizeSlug(filters.make)) return false;
    if (filters.model && normalizeSlug(deal.model) !== normalizeSlug(filters.model)) return false;
    if (filters.trim && normalizeSlug(deal.trim) !== normalizeSlug(filters.trim)) return false;
    if (filters.type && deal.type !== filters.type) return false;
    if (filters.maxPayment && deal.monthlyPayment > filters.maxPayment) return false;
    if (filters.evOnly && !deal.evTaxCredit) return false;
    if (q && !haystack(deal).includes(q)) return false;
    return true;
  });

  return sortDeals(filtered, filters.sort);
}

export function upsertPromotion(record: IngestedPromotion) {
  const deal = enrichIngestedPromotion(record);
  const items = getStore();
  const index = items.findIndex((item) => item.id === deal.id);
  if (index >= 0) {
    items[index] = deal;
  } else {
    items.unshift(deal);
  }
  return deal;
}

export function bulkUpsert(records: IngestedPromotion[]) {
  return records.map((record) => upsertPromotion(record));
}

export function getCatalogOptions(input: { make?: string; model?: string }) {
  if (input.make && input.model) {
    return {
      makes: getMakes(),
      models: getModelsForMake(input.make),
      trims: getTrimsForVehicle(input.make, input.model).map((vehicle) => vehicle.trim)
    };
  }

  if (input.make) {
    return {
      makes: getMakes(),
      models: getModelsForMake(input.make),
      trims: [] as string[]
    };
  }

  return {
    makes: getMakes(),
    models: [] as string[],
    trims: [] as string[]
  };
}

export function getPromotionById(id: string) {
  return getStore().find((deal) => deal.id === id);
}

export function resetPromotionStore() {
  store = null;
}
