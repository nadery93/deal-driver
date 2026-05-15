import Link from "next/link";
import { ArrowRight, Gauge, MailPlus, Search, ShieldCheck, Sparkles } from "lucide-react";
import { DealCard } from "@/components/deal-card";
import { Disclaimer, Section, Stat } from "@/components/ui";
import { Nav } from "@/components/nav";
import { communityReports, deals, manufacturerPromotions, regionQuality } from "@/lib/data";
import { currency } from "@/lib/format";
import { getVehicleCatalogSummary } from "@/lib/vehicleCatalogService";
import type { VehicleDeal } from "@/lib/types";

export default function HomePage() {
  const summary = getVehicleCatalogSummary();
  const trending = deals.slice(0, 3);
  const bestLease = deals.filter((deal) => deal.type === "Lease").slice(0, 3);
  const bestFinance = deals.filter((deal) => deal.type === "Finance").slice(0, 3);
  const improved = deals.filter((deal) => deal.updatedAt === "Today").slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        <section className="hero-road relative overflow-hidden text-white">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f6f8fb] to-transparent" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/80">
                <Sparkles className="h-4 w-4 text-mint" />
                Manufacturer benchmarks, dealer ads, and statewide promotion signals.
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-normal sm:text-6xl">
                Find every new-car lease and finance promotion in your state.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                Select your state, choose any new vehicle sold in the U.S., and compare manufacturer incentives, dealer specials, and real-world advertised promotions.
              </p>
              <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/15 bg-white p-2 shadow-glow sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Search className="h-5 w-5 text-electric" />
                  <input className="w-full border-0 bg-transparent py-3 text-sm text-ink outline-none placeholder:text-slate-400" placeholder="Search state, make, model, trim, or incentive" />
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <Link href="/promotions" className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-panel">
                    Search Statewide Promotions <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/vehicles" className="inline-flex items-center justify-center rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:bg-chrome">
                    Browse Vehicles
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-end">
              <div className="w-full rounded-2xl border border-white/15 bg-white/10 p-4 shadow-glow backdrop-blur">
                <div className="rounded-xl bg-white p-5 text-ink shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-electric/10 px-3 py-2 text-sm font-semibold text-electric">Live Benchmark Scan</span>
                    <span className="rounded-lg bg-mint/20 px-3 py-2 text-sm font-semibold text-teal-800">Manufacturer-beating</span>
                  </div>
                  <p className="mt-5 text-sm text-slate-500">Best current statewide signal</p>
                  <p className="mt-1 text-3xl font-semibold">{trending[0].make} {trending[0].model}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                    <span>{currency(trending[0].monthlyPayment)}/mo</span>
                    <span>{currency(trending[0].benchmark.monthlySavings)}/mo better</span>
                    <span>Rank #{trending[0].benchmark.regionRank}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section className="grid gap-4 md:grid-cols-4">
          <Stat label="Manufacturer programs" value={String(manufacturerPromotions.length)} detail="Lease, APR, EV, loyalty, conquest" />
          <Stat label="Major makes" value={String(summary.makes)} detail={`${summary.models}+ models, ${summary.trims}+ trims`} />
          <Stat label="U.S. markets" value={String(summary.states)} detail="50 states plus Washington, D.C." />
          <Stat label="Best monthly delta" value={`${currency(trending[0].benchmark.monthlySavings)}/mo`} detail="Dealer vs manufacturer benchmark" />
        </Section>

        <PromotionSection title="Trending Manufacturer-Beating Deals" deals={trending} href="/deals" />
        <PromotionSection title="Best Lease Promotions" deals={bestLease} href="/deals" />
        <PromotionSection title="Best Finance Promotions" deals={bestFinance} href="/deals" />

        <section className="bg-white">
          <Section>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase text-electric">Top Statewide Discounts</p>
                <h2 className="mt-2 text-3xl font-semibold text-ink">Compare every advertised offer against the same manufacturer baseline.</h2>
                <p className="mt-4 text-slate-600">State rankings combine advertised dealer discounts, manufacturer incentives, confidence, and compliant market references.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {regionQuality.map((region) => (
                  <div key={region.region} className="rounded-xl border border-line bg-chrome p-4">
                    <p className="font-semibold text-ink">{region.region}</p>
                    <p className="mt-2 text-sm text-slate-600">Lease index {region.lease} · Finance index {region.finance}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </section>

        <Section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase text-electric">Community Deal Insights</p>
              <h2 className="mt-2 text-3xl font-semibold text-ink">Real-world deal intelligence</h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {communityReports.map((report) => (
              <a key={report.id} href={report.url} className="rounded-xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1">
                <p className="text-sm font-semibold text-electric">{report.source}</p>
                <p className="mt-2 font-semibold text-ink">{report.vehicle}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{report.snippet}</p>
              </a>
            ))}
          </div>
        </Section>

        <PromotionSection title="Recently Improved Deals" deals={improved} href="/deals" />

        <Section className="grid gap-5 md:grid-cols-3">
          <Trust icon={<ShieldCheck className="h-5 w-5" />} title="Manufacturer benchmarks" text="Every dealer promotion is compared to the official manufacturer offer for that vehicle and state." />
          <Trust icon={<Gauge className="h-5 w-5" />} title="Transparent scoring" text="Scores prioritize manufacturer advantage, effective savings, APR improvement, confidence, and region rank." />
          <Trust icon={<MailPlus className="h-5 w-5" />} title="Offer campaigns" text="Send benchmark-aware requests to multiple dealers and rank the responses in one inbox." />
        </Section>
      </main>
      <Disclaimer />
    </>
  );
}

function PromotionSection({ title, deals, href }: { title: string; deals: VehicleDeal[]; href: string }) {
  return (
    <Section className="pt-0">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-electric">Statewide intelligence</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">{title}</h2>
        </div>
        <Link href={href} className="hidden items-center gap-2 text-sm font-semibold text-electric md:flex">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {deals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
      </div>
    </Section>
  );
}

function Trust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-electric/10 text-electric">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
