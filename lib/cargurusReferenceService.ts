export type CarGurusReferenceRecord = {
  make: string;
  model: string;
  trim?: string;
  year?: number;
  market?: string;
  imageUrl?: string;
  listingContext?: string;
};

export async function getCarGurusReferenceData(_input: { make?: string; model?: string; trim?: string; state?: string }): Promise<CarGurusReferenceRecord[]> {
  return [];
}

export const cargurusReferenceServiceNotes = [
  "Optional adapter only; no scraping logic is implemented.",
  "Designed for approved APIs, licensed feeds, manually imported CarGurus-style exports, or dealer-provided inventory context.",
  "Use only where terms and permissions allow vehicle coverage, stock imagery, pricing, or dealer availability references."
];
