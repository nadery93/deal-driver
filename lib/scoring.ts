import type { BenchmarkStatus, DealLabel, ManufacturerPromotion, VehicleDeal } from "@/lib/types";

export function discountPercent(deal: VehicleDeal) {
  return (deal.dealerDiscount / deal.msrp) * 100;
}

export function effectiveMonthly(deal: VehicleDeal) {
  const upfront = Math.max(0, deal.dueAtSigning - deal.monthlyPayment);
  return Math.round(deal.monthlyPayment + upfront / deal.term + (deal.brokerFee + deal.dealerFees) / deal.term);
}

export function benchmarkEffectiveMonthly(promotion: ManufacturerPromotion) {
  const upfront = Math.max(0, promotion.dueAtSigning - promotion.monthlyPayment);
  return Math.round(promotion.monthlyPayment + upfront / promotion.term);
}

export function benchmarkAdvantage(deal: VehicleDeal) {
  return deal.benchmark.monthlySavings + Math.round(deal.benchmark.dueAtSigningSavings / Math.max(1, deal.term));
}

export function dealScore(deal: VehicleDeal) {
  const benchmark = deal.benchmark;
  const benchmarkComponent = Math.max(0, Math.min(38, 18 + benchmark.monthlySavings * 0.35 + benchmark.discountAdvantage / 600));
  const aprComponent = Math.max(0, Math.min(12, 6 + benchmark.aprImprovement * 3));
  const discountComponent = Math.min(18, discountPercent(deal) * 1.7);
  const incentiveComponent = Math.min(12, (deal.incentives / deal.msrp) * 130);
  const confidenceComponent = Math.min(10, deal.confidence / 10);
  const communityComponent = Math.min(8, deal.communityComps * 1.1);
  const feePenalty = Math.min(10, (deal.dealerFees + deal.brokerFee) / 300);

  const statusBonus: Record<BenchmarkStatus, number> = {
    EXCEPTIONAL_REGIONAL_DEAL: 10,
    BEATS_OEM: 6,
    MATCHES_OEM: 1,
    WORSE_THAN_OEM: -8
  };

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(benchmarkComponent + aprComponent + discountComponent + incentiveComponent + confidenceComponent + communityComponent + statusBonus[benchmark.benchmarkStatus] - feePenalty)
    )
  );
}

export function dealLabel(deal: VehicleDeal): DealLabel {
  switch (deal.benchmark.benchmarkStatus) {
    case "EXCEPTIONAL_REGIONAL_DEAL":
      return "Exceptional Statewide Deal";
    case "BEATS_OEM":
      return "Beats Manufacturer Promotion";
    case "MATCHES_OEM":
      return "Matches Manufacturer Promotion";
    default:
      return "Worse Than Manufacturer Promotion";
  }
}

export function labelTone(label: DealLabel) {
  switch (label) {
    case "Exceptional Statewide Deal":
      return "bg-mint/15 text-teal-800 border-mint/30";
    case "Beats Manufacturer Promotion":
      return "bg-electric/15 text-blue-800 border-electric/30";
    case "Matches Manufacturer Promotion":
      return "bg-amber/15 text-amber-800 border-amber/30";
    default:
      return "bg-red-50 text-red-800 border-red-100";
  }
}

export function benchmarkCopy(deal: VehicleDeal) {
  const savings = deal.benchmark.monthlySavings;
  if (deal.type === "Finance" && deal.benchmark.aprImprovement > 0) {
    return `${deal.benchmark.aprImprovement.toFixed(1)}% lower APR than the manufacturer promotion`;
  }
  if (savings > 0) return `$${savings}/month better than the manufacturer promotion`;
  if (savings === 0) return "Matches the official manufacturer promotion";
  return `$${Math.abs(savings)}/month above the manufacturer promotion`;
}
