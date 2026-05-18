import { DealCard } from "@/components/deal-card";
import { SearchExperience } from "@/components/search-experience";
import { Nav } from "@/components/nav";
import { Disclaimer, Section, Stat } from "@/components/ui";
import { listPromotions } from "@/lib/promotionStore";
import { currency } from "@/lib/format";

export default function DealsPage() {
  const deals = listPromotions();
  const best = deals[0];
  const manufacturerBeaters = deals.filter((deal) => deal.benchmark.benchmarkStatus === "BEATS_OEM" || deal.benchmark.benchmarkStatus === "EXCEPTIONAL_REGIONAL_DEAL").length;

  return (
    <>
      <Nav />
      <main>
        <Section>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-electric">Statewide promotions marketplace</p>
              <h1 className="mt-2 text-4xl font-semibold text-ink">Dealer offers benchmarked against official manufacturer promotions.</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Search all major makes, compare cities and dealers, and sort by the strongest real-world advantage over the manufacturer benchmark.
            </p>
          </div>
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Stat label="Tracked offers" value={String(deals.length)} detail="Statewide mock marketplace" />
            <Stat label="Manufacturer beaters" value={String(manufacturerBeaters)} detail="Better than benchmark" />
            <Stat label="Best monthly edge" value={`${currency(best.benchmark.monthlySavings)}/mo`} detail={`${best.make} ${best.model}`} />
            <Stat label="Best region rank" value={`#${best.benchmark.regionRank}`} detail={`${best.city}, ${best.state}`} />
          </div>
          <SearchExperience />
        </Section>
        <Section className="pt-0">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase text-electric">Fast scan</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">Top manufacturer-beating promotions</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
            {deals.slice(0, 6).map((deal) => <DealCard key={deal.id} deal={deal} />)}
          </div>
        </Section>
      </main>
      <Disclaimer />
    </>
  );
}
