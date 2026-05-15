import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MailPlus } from "lucide-react";
import { DealCard } from "@/components/deal-card";
import { RegionChart } from "@/components/region-chart";
import { Section, Stat } from "@/components/ui";
import { getDealerPromotions } from "@/lib/dealerPromotionsService";
import { getManufacturerBenchmarks } from "@/lib/manufacturerPromotionsService";
import { estimateMarketPrice } from "@/lib/marketPricingService";
import { usStates, vehicleCatalog } from "@/lib/data";
import { currency, signedCurrency } from "@/lib/format";
import { discountPercent } from "@/lib/scoring";
import { normalizeSlug } from "@/lib/vehicleCatalogService";

export function PromotionResults({ state, make, model, trim }: { state: string; make: string; model: string; trim?: string }) {
  const selectedState = usStates.find((item) => item.code.toLowerCase() === state.toLowerCase() || normalizeSlug(item.name) === normalizeSlug(state));
  if (!selectedState) notFound();

  const vehicleDeals = getDealerPromotions({ state: selectedState.code, make, model, trim });
  const vehicle = vehicleCatalog.find((item) => normalizeSlug(item.make) === normalizeSlug(make) && normalizeSlug(item.model) === normalizeSlug(model) && (!trim || normalizeSlug(item.trim) === normalizeSlug(trim)));
  if (!vehicle || !vehicleDeals.length) notFound();

  const benchmarks = getManufacturerBenchmarks({ state: selectedState.code, make, model, trim });
  const titleTrim = trim ? ` ${vehicle.trim}` : "";
  const avgDiscount = vehicleDeals.reduce((sum, deal) => sum + discountPercent(deal), 0) / vehicleDeals.length;
  const avgSavings = Math.round(vehicleDeals.reduce((sum, deal) => sum + deal.benchmark.monthlySavings, 0) / vehicleDeals.length);
  const best = vehicleDeals[0];
  const pricing = estimateMarketPrice(vehicle, vehicleDeals);

  return (
    <>
      <Section>
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_340px]">
          <div>
            <Link href="/promotions" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-electric">
              <ArrowLeft className="h-4 w-4" />
              Change state or vehicle
            </Link>
            <p className="text-sm font-semibold uppercase text-electric">Statewide promotion results</p>
            <h1 className="mt-2 text-4xl font-semibold text-ink">
              {vehicle.year} {vehicle.make} {vehicle.model}{titleTrim} Lease and Finance Promotions in {selectedState.name}
            </h1>
            <p className="mt-4 max-w-3xl text-slate-600">
              Dealer-advertised lease and finance promotions in {selectedState.name}, compared against official national and regional manufacturer lease, APR, cash, loyalty, conquest, and EV-credit benchmarks.
            </p>
          </div>
          <Link href="/dashboard/campaigns" className="flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-panel">
            <MailPlus className="h-4 w-4" />
            Contact Dealers
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Stat label="Advertised promotions" value={String(vehicleDeals.length)} detail={`${selectedState.code} dealer ads`} />
          <Stat label="Manufacturer benchmarks" value={String(benchmarks.length)} detail="Lease and APR programs" />
          <Stat label="Average monthly edge" value={signedCurrency(avgSavings)} />
          <Stat label="Average discount" value={`${avgDiscount.toFixed(1)}%`} detail={`${currency(pricing.averageSellingPrice)} avg selling price`} />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-5 lg:grid-cols-2">
          {vehicleDeals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
        </div>
      </Section>

      <section className="bg-white">
        <Section>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="text-2xl font-semibold text-ink">Promotion ranking table</h2>
              <div className="mt-4 overflow-hidden rounded-xl border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-chrome text-xs uppercase text-slate-500">
                    <tr>
                      <th className="p-3">Dealer</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Manufacturer delta</th>
                      <th className="p-3">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {vehicleDeals.map((deal) => (
                      <tr key={deal.id}>
                        <td className="p-3 font-semibold text-ink">{deal.dealer}</td>
                        <td className="p-3 text-slate-600">{deal.type}</td>
                        <td className="p-3">{currency(deal.monthlyPayment)}</td>
                        <td className="p-3 font-semibold text-electric">{signedCurrency(deal.benchmark.monthlySavings)}</td>
                        <td className="p-3">{deal.confidence}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-ink">Deal quality by region</h2>
              <div className="mt-4 rounded-xl border border-line bg-white p-4 shadow-soft">
                <RegionChart />
              </div>
              <div className="mt-4 rounded-xl border border-line bg-chrome p-4 text-sm text-slate-600">
                Best offer: <span className="font-semibold text-ink">{best.dealer}</span> with {signedCurrency(best.benchmark.effectiveSavings)} effective savings versus the manufacturer benchmark.
              </div>
            </div>
          </div>
        </Section>
      </section>
    </>
  );
}
