import { communityReports } from "@/lib/data";
import { normalizeSlug } from "@/lib/vehicleCatalogService";

export function getCommunityDealReports(input: { make?: string; model?: string; state?: string } = {}) {
  return communityReports.filter((report) => {
    const haystack = `${report.vehicle} ${report.location}`;
    if (input.make && !normalizeSlug(haystack).includes(normalizeSlug(input.make))) return false;
    if (input.model && !normalizeSlug(haystack).includes(normalizeSlug(input.model))) return false;
    if (input.state && !normalizeSlug(haystack).includes(normalizeSlug(input.state))) return false;
    return true;
  });
}
