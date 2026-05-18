import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, MailPlus, Phone, ShieldCheck, Star } from "lucide-react";
import { Nav } from "@/components/nav";
import { Disclaimer, Pill, Section, Stat } from "@/components/ui";
import { communityReports, manufacturerPromotions } from "@/lib/data";
import { getPromotionById, listPromotions } from "@/lib/promotionStore";
import { currency, signedCurrency } from "@/lib/format";
import { benchmarkCopy, dealLabel, dealScore, discountPercent, effectiveMonthly, labelTone } from "@/lib/scoring";

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const deal = getPromotionById(params.id);
  if (!deal) notFound();
  const oem = manufacturerPromotions.find((promotion) => promotion.id === deal.oemPromotionId);
  if (!oem) notFound();
  const score = dealScore(deal);
  const reports = communityReports.filter((report) => report.vehicleId === deal.id || report.vehicleId === deal.oemPromotionId.replace("oem-", ""));
  const similar = listPromotions({ make: deal.make }).filter((item) => item.id !== deal.id).slice(0, 4);

  return (
    <>
      <Nav />
      <main>
        <Section>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <Pill className={labelTone(dealLabel(deal))}>{dealLabel(deal)}</Pill>
              <h1 className="mt-4 text-4xl font-semibold text-ink">{deal.year} {deal.make} {deal.model} {deal.trim}</h1>
              <p className="mt-4 max-w-3xl text-slate-600">
                {deal.dealer} in {deal.city}, {deal.state}. {benchmarkCopy(deal)} with {deal.confidence}% confidence from dealer ads, manufacturer data, and community intelligence.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-4">
                <Stat label="Deal score" value={String(score)} />
                <Stat label="Effective savings" value={currency(deal.benchmark.effectiveSavings)} />
                <Stat label="Monthly edge" value={signedCurrency(deal.benchmark.monthlySavings)} />
                <Stat label="Region rank" value={`#${deal.benchmark.regionRank}`} />
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
              <h2 className="text-lg font-semibold text-ink">Dealer action</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Use the manufacturer benchmark and this dealer advertisement as leverage in a multi-dealer offer campaign.</p>
              <div className="mt-5 grid gap-2">
                <Link href="/dashboard/campaigns" className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-white">
                  <MailPlus className="h-4 w-4" />
                  Add to Offer Campaign
                </Link>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-4 py-3 text-sm font-semibold text-ink">
                  <Phone className="h-4 w-4" />
                  Contact Dealer
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-4 py-3 text-sm font-semibold text-ink">
                  <Star className="h-4 w-4" />
                  Favorite Deal
                </button>
              </div>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="grid gap-5 lg:grid-cols-2">
            <PromotionPanel title="Manufacturer Promotion" rows={[
              ["Program", oem.programName],
              ["Region", oem.region],
              ["Payment", `${currency(oem.monthlyPayment)}/mo`],
              ["Due at signing", currency(oem.dueAtSigning)],
              ["APR / money factor", oem.apr ? `${oem.apr}%` : String(oem.moneyFactor)],
              ["Incentives", currency(oem.incentives)],
              ["Expires", oem.expiresAt]
            ]} />
            <PromotionPanel title="Dealer Promotion" rows={[
              ["Dealer", `${deal.dealer}, ${deal.city}, ${deal.state}`],
              ["Payment", `${currency(deal.monthlyPayment)}/mo`],
              ["Due at signing", currency(deal.dueAtSigning)],
              ["APR / money factor", deal.apr ? `${deal.apr}%` : String(deal.moneyFactor)],
              ["Selling price", currency(deal.sellingPrice)],
              ["Dealer discount", `${currency(deal.dealerDiscount)} (${discountPercent(deal).toFixed(1)}%)`],
              ["Effective monthly", `${currency(effectiveMonthly(deal))}/mo`]
            ]} />
          </div>

          <div className="mt-6 rounded-xl border border-electric/20 bg-white p-5 shadow-soft">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-ink"><ShieldCheck className="h-5 w-5 text-electric" /> Benchmark Comparison</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <Stat label="Monthly difference" value={signedCurrency(deal.benchmark.monthlySavings)} detail="Dealer vs manufacturer payment" />
              <Stat label="APR improvement" value={`${deal.benchmark.aprImprovement.toFixed(1)} pts`} detail="Finance offers only" />
              <Stat label="Due at signing" value={signedCurrency(deal.benchmark.dueAtSigningSavings)} detail="Lower is better" />
              <Stat label="Discount advantage" value={signedCurrency(deal.benchmark.discountAdvantage)} detail="Dealer discount vs manufacturer" />
            </div>
          </div>
        </Section>

        <Section className="grid gap-6 lg:grid-cols-2">
          <InfoBlock title="Community Reported Deals" text={reports[0]?.snippet ?? "Community submissions are structured for Reddit API, Leasehackr imports, and customer-uploaded worksheets."} />
          <InfoBlock title="Reddit Discussions" text="Reddit integration remains a compliant placeholder for OAuth API collection, permalink citations, timestamps, and confidence scoring." />
          <InfoBlock title="Leasehackr References" text="Leasehackr-style references are modeled as user-submitted links or permitted imports with parsed payment, term, discount, and confidence fields." />
          <InfoBlock title="Regional Comparison" text={`This offer ranks #${deal.benchmark.regionRank} for comparable ${deal.make} ${deal.model} promotions in its region.`} />
        </Section>

        <Section className="pt-0">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase text-electric">Similar Statewide Deals</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">Other offers to use as leverage</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {(similar.length ? similar : listPromotions().filter((item) => item.id !== deal.id).slice(0, 4)).map((item) => (
              <Link key={item.id} href={`/deal/${item.id}`} className="rounded-xl border border-line bg-white p-4 shadow-soft transition hover:-translate-y-1">
                <p className="font-semibold text-ink">{item.make} {item.model}</p>
                <p className="mt-1 text-sm text-slate-500">{item.dealer}</p>
                <p className="mt-3 text-sm font-semibold text-electric">{signedCurrency(item.benchmark.monthlySavings)}/mo vs manufacturer</p>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <Disclaimer />
    </>
  );
}

function PromotionPanel({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 divide-y divide-line">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-slate-500">{label}</span>
            <span className="text-right font-semibold text-ink">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-ink"><ExternalLink className="h-5 w-5 text-electric" /> {title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
