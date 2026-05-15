import type { VehicleDeal, VehicleProfile } from "@/lib/types";

export function estimateMarketPrice(vehicle: VehicleProfile, comparableDeals: VehicleDeal[] = []) {
  if (!comparableDeals.length) {
    return {
      averageSellingPrice: Math.round(vehicle.msrp * 0.965),
      averageDiscount: Math.round(vehicle.msrp * 0.035),
      sampleSize: 0,
      source: "Modeled placeholder for licensed market-pricing feeds"
    };
  }

  const averageSellingPrice = Math.round(comparableDeals.reduce((sum, deal) => sum + deal.sellingPrice, 0) / comparableDeals.length);
  return {
    averageSellingPrice,
    averageDiscount: vehicle.msrp - averageSellingPrice,
    sampleSize: comparableDeals.length,
    source: "Dealer promotion set"
  };
}
