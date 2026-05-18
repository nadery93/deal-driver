import type { VehicleDeal } from "@/lib/types";

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function signedCurrency(value: number) {
  const formatted = currency(Math.abs(value));
  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return formatted;
}

export function percent(value: number) {
  return `${value.toFixed(1)}%`;
}

export function formatDealHeadline(deal: VehicleDeal) {
  return `${deal.year} ${deal.make} ${deal.model} ${deal.trim}`;
}

export function formatDealTerms(deal: VehicleDeal) {
  if (deal.type === "Lease") {
    return `${currency(deal.monthlyPayment)}/mo | ${currency(deal.dueAtSigning)} down | ${deal.term} mo`;
  }
  return `${deal.apr ?? "—"}% APR for ${deal.term} mos`;
}
