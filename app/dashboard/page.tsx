import Link from "next/link";
import { Bell, Clock, Heart, Inbox, MailPlus, Sparkles, TrendingUp } from "lucide-react";
import { Nav } from "@/components/nav";
import { Section, Stat } from "@/components/ui";
import { dealerResponses, deals, favoritedDeals } from "@/lib/data";
import { currency, signedCurrency } from "@/lib/format";

export default function DashboardPage() {
  const best = dealerResponses[0];
  const bestDeal = deals[0];
  return (
    <>
      <Nav />
      <main className="shell-grid">
        <Section>
          <p className="text-sm font-semibold uppercase text-electric">Statewide intelligence dashboard</p>
          <h1 className="mt-2 text-4xl font-semibold text-ink">Track favorited deals, manufacturer-beating offers, campaigns, and dealer replies.</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Stat label="Favorited Deals" value={String(favoritedDeals.length)} detail={`${currency(favoritedDeals[0].benchmark.effectiveSavings)} best advantage`} />
            <Stat label="Best Manufacturer-Beating Deal" value={`${currency(bestDeal.monthlyPayment)}/mo`} detail={`${signedCurrency(bestDeal.benchmark.monthlySavings)}/mo vs manufacturer`} />
            <Stat label="Active Campaigns" value="2" detail="BMW i4, Tacoma" />
            <Stat label="Dealer Inbox" value="7" detail={`${best.dealer} ranked best`} />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3 xl:grid-cols-7">
            <DashLink href="/dashboard/favorites" icon={<Heart />} title="Favorited Deals" text="Monitor benchmark advantage, expiration, and score." />
            <DashLink href="/deals" icon={<Sparkles />} title="Best Manufacturer-Beating Deals" text="Find offers outperforming manufacturer programs." />
            <DashLink href="/dashboard/campaigns" icon={<MailPlus />} title="Active Campaigns" text="Send benchmark-aware requests to dealers." />
            <DashLink href="/dashboard/inbox" icon={<Inbox />} title="Dealer Inbox" text="Rank responses by best offer vs manufacturer." />
            <DashLink href="/promotions" icon={<TrendingUp />} title="Trending Promotions" text="Watch improved incentives by state." />
            <DashLink href="/dashboard/alerts" icon={<Bell />} title="Expiring Offers" text="Track upcoming manufacturer and dealer expirations." />
            <DashLink href="/deals" icon={<Clock />} title="Recently Improved Deals" text="Review newly better dealer advertisements." />
          </div>
        </Section>
      </main>
    </>
  );
}

function DashLink({ href, icon, title, text }: { href: string; icon: React.ReactNode; title: string; text: string }) {
  return (
    <Link href={href} className="rounded-xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-electric/10 text-electric">{icon}</div>
      <h2 className="mt-4 text-base font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </Link>
  );
}
