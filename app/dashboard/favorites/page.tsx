import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Nav } from "@/components/nav";
import { Section } from "@/components/ui";
import { favoritedDeals } from "@/lib/data";
import { currency, signedCurrency } from "@/lib/format";
import { dealScore } from "@/lib/scoring";

export default function FavoritesPage() {
  return (
    <>
      <Nav />
      <main className="shell-grid">
        <Section>
          <p className="text-sm font-semibold uppercase text-electric">Favorited Deals</p>
          <h1 className="mt-2 text-4xl font-semibold text-ink">Benchmark advantages you are tracking.</h1>
          <div className="mt-8 overflow-hidden rounded-xl border border-line bg-white shadow-soft">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-chrome text-xs uppercase text-slate-500">
                <tr>
                  <th className="p-4">Deal</th>
                  <th className="p-4">Dealer</th>
                  <th className="p-4">Benchmark Advantage</th>
                  <th className="p-4">Manufacturer Comparison</th>
                  <th className="p-4">Expires</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {favoritedDeals.map((deal) => (
                  <tr key={deal.id}>
                    <td className="p-4">
                      <p className="font-semibold text-ink">{deal.year} {deal.make} {deal.model}</p>
                      <p className="mt-1 text-slate-500">{deal.trim}</p>
                    </td>
                    <td className="p-4 text-slate-600">{deal.dealer}</td>
                    <td className="p-4 font-semibold text-electric">{currency(deal.benchmark.effectiveSavings)}</td>
                    <td className="p-4">{signedCurrency(deal.benchmark.monthlySavings)}/mo vs manufacturer</td>
                    <td className="p-4">{deal.expiresAt}</td>
                    <td className="p-4 font-semibold text-ink">{dealScore(deal)}</td>
                    <td className="p-4">
                      <Link href={`/deal/${deal.id}`} className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 font-semibold text-ink hover:bg-chrome">
                        <Heart className="h-4 w-4 text-electric" />
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </main>
    </>
  );
}
