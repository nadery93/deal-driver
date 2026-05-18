import { manufacturerPromotions, usStates, vehicleCatalog } from "@/lib/data";
import type { IngestedPromotion } from "@/lib/schemas/ingestedPromotion";
import type { ManufacturerPromotion, VehicleDeal, VehicleProfile } from "@/lib/types";
import { vehicleSlug } from "@/lib/vehicleCatalogService";

function same(left: string, right: string) {
  return vehicleSlug(left) === vehicleSlug(right);
}

function findProfile(record: IngestedPromotion): VehicleProfile | undefined {
  return vehicleCatalog.find(
    (vehicle) =>
      vehicle.year === record.year &&
      same(vehicle.make, record.make) &&
      same(vehicle.model, record.model) &&
      same(vehicle.trim, record.trim)
  );
}

function findOem(profile: VehicleProfile, type: IngestedPromotion["type"]): ManufacturerPromotion | undefined {
  return manufacturerPromotions.find((promotion) => promotion.vehicleId === profile.id && promotion.type === type);
}

function buildDeal(
  profile: VehicleProfile,
  oem: ManufacturerPromotion,
  data: {
    dealer: string;
    city: string;
    state: string;
    distance: number;
    monthlyPayment: number;
    dueAtSigning: number;
    apr?: number;
    moneyFactor?: number;
    sellingPrice: number;
    incentives: number;
    dealerDiscount: number;
    dealerFees: number;
    brokerFee: number;
    confidence: number;
    communityComps: number;
    updatedAt: string;
    mileage: number;
    source: string;
    advertisedSourceUrl: string;
    stockPhotoUrl: string;
    expiresAt: string;
    id: string;
  }
): VehicleDeal {
  const monthlySavings = oem.monthlyPayment - data.monthlyPayment;
  const aprImprovement = Number(((oem.apr ?? 0) - (data.apr ?? oem.apr ?? 0)).toFixed(1));
  const dueAtSigningSavings = oem.dueAtSigning - data.dueAtSigning;
  const discountAdvantage = data.dealerDiscount - oem.dealerDiscount;
  const effectiveSavings = monthlySavings * oem.term + dueAtSigningSavings + discountAdvantage;
  const benchmarkStatus =
    effectiveSavings > 5000 || monthlySavings >= 50
      ? "EXCEPTIONAL_REGIONAL_DEAL"
      : monthlySavings > 8 || aprImprovement >= 0.5 || discountAdvantage > 1000
        ? "BEATS_OEM"
        : Math.abs(monthlySavings) <= 8 && Math.abs(dueAtSigningSavings) < 500
          ? "MATCHES_OEM"
          : "WORSE_THAN_OEM";

  return {
    ...profile,
    stockPhotoUrl: data.stockPhotoUrl,
    imageUrl: data.stockPhotoUrl,
    id: data.id,
    type: oem.type,
    state: data.state,
    city: data.city,
    dealer: data.dealer,
    distance: data.distance,
    monthlyPayment: data.monthlyPayment,
    dueAtSigning: data.dueAtSigning,
    term: oem.term,
    mileage: data.mileage,
    apr: data.apr,
    moneyFactor: data.moneyFactor,
    sellingPrice: data.sellingPrice,
    incentives: data.incentives,
    dealerDiscount: data.dealerDiscount,
    dealerFees: data.dealerFees,
    brokerFee: data.brokerFee,
    creditTier: "Tier 1 / well-qualified",
    evTaxCredit: profile.isEV,
    regionProgram: `${oem.region} manufacturer benchmark plus ingested promotion`,
    communityComps: data.communityComps,
    confidence: data.confidence,
    updatedAt: data.updatedAt,
    expiresAt: data.expiresAt,
    source: data.source,
    advertisedSourceUrl: data.advertisedSourceUrl,
    oemPromotionId: oem.id,
    manufacturerBenchmarkPromotion: `${oem.programName}: ${oem.type === "Lease" ? `$${oem.monthlyPayment}/mo, $${oem.dueAtSigning} due, ${oem.term} months` : `${oem.apr}% APR for ${oem.term} months`}`,
    dealerAdvertisedPromotion: `${data.dealer}: ${oem.type === "Lease" ? `$${data.monthlyPayment}/mo, $${data.dueAtSigning} due` : `${data.apr}% APR, ${oem.term} months`}`,
    benchmark: {
      oemMonthlyPayment: oem.monthlyPayment,
      dealerMonthlyPayment: data.monthlyPayment,
      oemAPR: oem.apr,
      dealerAPR: data.apr,
      oemDueAtSigning: oem.dueAtSigning,
      dealerDueAtSigning: data.dueAtSigning,
      oemDealerDiscount: oem.dealerDiscount,
      dealerDiscount: data.dealerDiscount,
      monthlySavings,
      aprImprovement,
      dueAtSigningSavings,
      discountAdvantage,
      benchmarkStatus,
      effectiveSavings,
      regionRank: Math.max(1, Math.min(25, 1 + Math.floor((100 - data.confidence + Math.max(0, -monthlySavings)) / 5)))
    }
  };
}

export function enrichIngestedPromotion(record: IngestedPromotion): VehicleDeal {
  const profile = findProfile(record);
  const state = usStates.find((item) => item.code === record.state);
  const city = record.city ?? state?.capitalOrMajorMarket ?? "Unknown";
  const dealer = record.dealer ?? `${city} ${record.make}`;
  const id =
    record.id ??
    `ingest-${record.year}-${vehicleSlug(record.make)}-${vehicleSlug(record.model)}-${vehicleSlug(record.trim)}-${record.state.toLowerCase()}-${record.type.toLowerCase()}`;

  if (!profile) {
    throw new Error(`No catalog vehicle match for ${record.year} ${record.make} ${record.model} ${record.trim}`);
  }

  const oem = findOem(profile, record.type);
  if (!oem) {
    throw new Error(`No manufacturer benchmark for ${record.make} ${record.model} (${record.type})`);
  }

  const sellingPrice = record.sellingPrice ?? profile.msrp - Math.round(profile.msrp * 0.04);
  const dealerDiscount = profile.msrp - sellingPrice;
  const incentives = record.incentives ?? oem.incentives;

  return buildDeal(profile, oem, {
    id,
    dealer,
    city,
    state: record.state,
    distance: 12,
    monthlyPayment: record.monthlyPayment,
    dueAtSigning: record.dueAtSigning,
    apr: record.apr,
    moneyFactor: record.moneyFactor,
    sellingPrice,
    incentives,
    dealerDiscount,
    dealerFees: 399,
    brokerFee: 0,
    confidence: record.confidence,
    communityComps: 1,
    updatedAt: "Today",
    mileage: record.mileage ?? oem.mileage,
    source: record.source,
    advertisedSourceUrl: record.sourceUrl ?? record.stockPhotoUrl,
    stockPhotoUrl: record.stockPhotoUrl,
    expiresAt: record.expiresAt
  });
}

