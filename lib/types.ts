export type DealType = "Lease" | "Finance";

export type BenchmarkStatus = "BEATS_OEM" | "MATCHES_OEM" | "WORSE_THAN_OEM" | "EXCEPTIONAL_REGIONAL_DEAL";

export type DealLabel = "Exceptional Statewide Deal" | "Beats Manufacturer Promotion" | "Matches Manufacturer Promotion" | "Worse Than Manufacturer Promotion";

export type FuelType = "Gasoline" | "Diesel" | "Hybrid" | "Plug-in Hybrid" | "Electric" | "Hydrogen" | "Mild Hybrid";

export type MarketAvailability = {
  states: string[];
  regions: string[];
  restricted?: boolean;
};

export type VehicleProfile = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  manufacturer: string;
  modelFamily: string;
  msrp: number;
  bodyStyle: string;
  drivetrain: string;
  engine: string;
  fuelType: FuelType;
  powertrain: string;
  isEV: boolean;
  isHybrid: boolean;
  stockPhotoUrl?: string;
  modelPhotoUrl?: string;
  makePhotoUrl?: string;
  fallbackImageUrl: string;
  imageUrl: string;
  marketAvailability: MarketAvailability;
  regionalEligibility: string[];
  manufacturerIncentiveSupport: boolean;
  oemProgramSupport: string[];
};

export type ManufacturerPromotion = {
  id: string;
  vehicleId: string;
  programName: string;
  make: string;
  region: string;
  type: DealType;
  monthlyPayment: number;
  dueAtSigning: number;
  term: number;
  mileage: number;
  apr?: number;
  moneyFactor?: number;
  msrp: number;
  sellingPrice: number;
  incentives: number;
  dealerDiscount: number;
  evTaxCredit: boolean;
  loyaltyCash: number;
  conquestCash: number;
  expiresAt: string;
  sourceUrl: string;
  scope: "National" | "Regional";
  leaseCash: number;
  retailBonusCash: number;
};

export type BenchmarkComparison = {
  oemMonthlyPayment: number;
  dealerMonthlyPayment: number;
  oemAPR?: number;
  dealerAPR?: number;
  oemDueAtSigning: number;
  dealerDueAtSigning: number;
  oemDealerDiscount: number;
  dealerDiscount: number;
  monthlySavings: number;
  aprImprovement: number;
  dueAtSigningSavings: number;
  discountAdvantage: number;
  benchmarkStatus: BenchmarkStatus;
  effectiveSavings: number;
  regionRank: number;
};

export type { IngestedPromotion } from "@/lib/schemas/ingestedPromotion";

export type VehicleDeal = VehicleProfile & {
  type: DealType;
  state: string;
  city: string;
  dealer: string;
  distance: number;
  monthlyPayment: number;
  dueAtSigning: number;
  term: number;
  mileage: number;
  apr?: number;
  moneyFactor?: number;
  sellingPrice: number;
  incentives: number;
  dealerDiscount: number;
  dealerFees: number;
  brokerFee: number;
  creditTier: string;
  evTaxCredit: boolean;
  regionProgram: string;
  communityComps: number;
  confidence: number;
  updatedAt: string;
  expiresAt: string;
  source: string;
  advertisedSourceUrl: string;
  oemPromotionId: string;
  manufacturerBenchmarkPromotion: string;
  dealerAdvertisedPromotion: string;
  benchmark: BenchmarkComparison;
};

export type StateOption = {
  code: string;
  name: string;
  region: string;
  capitalOrMajorMarket: string;
};

export type CommunityReport = {
  id: string;
  vehicleId: string;
  vehicle: string;
  location: string;
  source: "Reddit" | "Leasehackr" | "Customer Upload";
  snippet: string;
  monthlyPayment: number;
  dueAtSigning: number;
  term: number;
  apr?: number;
  negotiatedDiscount: number;
  confidence: number;
  url: string;
  date: string;
};

export type DealerResponse = {
  id: string;
  dealer: string;
  status: "interested" | "countered" | "declined" | "no response" | "best offer";
  vehicle: string;
  monthlyPayment: number;
  dueAtSigning: number;
  oemMonthlyPayment: number;
  benchmarkAdvantage: number;
  responseRank: number;
  message: string;
  receivedAt: string;
};
