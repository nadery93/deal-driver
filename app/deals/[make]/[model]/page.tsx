import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { DealCard } from "@/components/deal-card";
import { Nav } from "@/components/nav";
import { RegionChart } from "@/components/region-chart";
import { Disclaimer, Section, Stat } from "@/components/ui";
import { communityReports, deals, manufacturerPromotions } from "@/lib/data";
import { currency, signedCurrency } from "@/lib/format";
import { discountPercent } from "@/lib/scoring";

export default function VehicleDealPage({ params }: { params: { make: string; model: string } }) {
  const make = decodeURIComponent(params.make).toLowerCase();
  const model = decodeURIComponent(params.model).toLowerCase();
  const vehicleDeals = deals.filter((deal) => deal.make.toLowerCase().replace(/\s+/g, "-") === make && deal.model.toLowerCase().replace(/\s+/g, "-") === model);

  if (!vehicleDeals.length) notFound();

  const lead = vehicleDeals[0];
  const oem = manufacturerPromotions.find((promotion) => promotion.id === lead.oemPromotionId)!;
  const avgDiscount = vehicleDeals.reduce((sum, deal) => sum + discountPercent(deal), 0) / vehicleDeals.length;
  const avgSavings = Math.round(vehicleDeals.reduce((sum, deal) => sum + deal.benchmark.monthlySavings, 0) / vehicleDeals.length);
  const avgDue = Math.round(vehicleDeals.reduce((sum, deal) => sum + deal.dueAtSigning, 0) / vehicleDeals.length);
  const reports = communityReports.filter((report) => report.vehicleId === lead.id);

  return (
    <>
      <Nav />
      <main>
        <Section>
          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-semibold uppercase text-electric">Vehicle benchmark intelligence</p>
              <h1 className="mt-2 text-4xl font-semibold text-ink">{lead.year} {lead.make} {lead.model}</h1>
              <p className="mt-4 max-w-3xl text-slate-600">
                Compare official {lead.make} programs, dealer-advertised promotions, community-reported outcomes, and regional rankings for this exact vehicle.
              </p>
            </div>
            <Link href="/dashboard/campaigns" className="flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-panel">
              Build Benchmark Offer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <Stat label="Manufacturer benchmark" value={`${currency(oem.monthlyPayment)}/mo`} detail={oem.programName} />
            <Stat label="Avg monthly edge" value={signedCurrency(avgSavings)} />
            <Stat label="Average discount" value={`${avgDiscount.toFixed(1)}%`} />
            <Stat label="Average due" value={currency(avgDue)} />
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
                <h2 className="text-2xl font-semibold text-ink">Dealer ranking table</h2>
                <div className="mt-4 overflow-hidden rounded-xl border border-line">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-chrome text-xs uppercase text-slate-500">
                      <tr>
                        <th className="p-3">Dealer</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Manufacturer Delta</th>
                        <th className="p-3">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {vehicleDeals.map((deal) => (
                        <tr key={deal.id}>
                          <td className="p-3 font-semibold text-ink">{deal.dealer}</td>
                          <td className="p-3 text-slate-600">{deal.city}, {deal.state}</td>
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
              </div>
            </div>
          </Section>
        </section>

        <Section>
          <h2 className="text-2xl font-semibold text-ink">Community-reported deal examples</h2>
          <p className="mt-2 text-sm text-slate-600">Users are reporting deals averaging $37/month below advertised dealer specials where enough samples exist.</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {(reports.length ? reports : communityReports).map((report) => (
              <a key={report.id} href={report.url} className="rounded-xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-electric">{report.source}</span>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </div>
                <p className="font-semibold text-ink">{report.vehicle}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{report.snippet}</p>
                <p className="mt-3 text-sm text-slate-500">{currency(report.monthlyPayment)}/mo, {currency(report.dueAtSigning)} due, {currency(report.negotiatedDiscount)} negotiated discount</p>
              </a>
            ))}
          </div>
        </Section>
      </main>
      <Disclaimer />
    </>
  );
}
