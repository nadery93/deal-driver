"use client";

import Link from "next/link";
import { ArrowRight, BadgeDollarSign, BarChart3, CalendarClock, Heart, MailPlus, MapPin, ShieldCheck } from "lucide-react";
import { currency, signedCurrency } from "@/lib/format";
import { benchmarkCopy, dealLabel, dealScore, discountPercent, effectiveMonthly, labelTone } from "@/lib/scoring";
import { genericVehicleImage } from "@/lib/data";
import { resolveVehicleImage } from "@/lib/stockPhotoService";
import type { VehicleDeal } from "@/lib/types";
import { Pill } from "@/components/ui";

export function DealCard({ deal }: { deal: VehicleDeal }) {
  const score = dealScore(deal);
  const label = dealLabel(deal);
  const beatsOem = deal.benchmark.benchmarkStatus === "BEATS_OEM" || deal.benchmark.benchmarkStatus === "EXCEPTIONAL_REGIONAL_DEAL";
  const imageUrl = resolveVehicleImage(deal);

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative aspect-[16/9] bg-[#09111f]">
        <img
          src={imageUrl}
          alt={`${deal.year} ${deal.make} ${deal.model} ${deal.trim}`}
          className="h-full w-full object-cover opacity-90"
          onError={(event) => {
            event.currentTarget.src = genericVehicleImage;
          }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Pill className={labelTone(label)}>{label}</Pill>
            <Pill className="border-white/20 bg-white/15 text-white">{deal.type}</Pill>
            {beatsOem ? <Pill className="border-mint/40 bg-mint/20 text-white">Beats manufacturer</Pill> : null}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">
              {deal.year} {deal.make} {deal.model} {deal.trim}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{deal.bodyStyle} · {deal.drivetrain} · {deal.powertrain}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-ink">{score}</p>
            <p className="text-xs uppercase text-slate-500">Deal Score</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Metric label="Dealer Payment" value={`${currency(deal.monthlyPayment)}/mo`} />
          <Metric label="Manufacturer Benchmark" value={`${currency(deal.benchmark.oemMonthlyPayment)}/mo`} />
          <Metric label="Due at Signing" value={currency(deal.dueAtSigning)} />
          <Metric label={deal.type === "Lease" ? "Term / Mileage" : "APR / Term"} value={deal.type === "Lease" ? `${deal.term} mo / ${deal.mileage / 1000}k mi/yr` : `${deal.apr}% / ${deal.term} mo`} />
          <Metric label="APR" value={deal.apr ? `${deal.apr}%` : deal.moneyFactor ? `MF ${deal.moneyFactor}` : "N/A"} />
          <Metric label="MSRP" value={currency(deal.msrp)} />
          <Metric label="Selling Price" value={currency(deal.sellingPrice)} />
          <Metric label="Discount" value={`${currency(deal.dealerDiscount)} (${discountPercent(deal).toFixed(1)}%)`} />
          <Metric label="Incentives" value={currency(deal.incentives)} />
          <Metric label="Savings" value={signedCurrency(deal.benchmark.effectiveSavings)} />
        </div>

        <div className="mt-5 rounded-xl border border-electric/20 bg-electric/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ShieldCheck className="h-4 w-4 text-electric" />
            {benchmarkCopy(deal)}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-600">
            <span>Monthly {signedCurrency(deal.benchmark.monthlySavings)}</span>
            <span>APR {deal.benchmark.aprImprovement.toFixed(1)} pts</span>
            <span>Rank #{deal.benchmark.regionRank}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-600">{deal.manufacturerBenchmarkPromotion}</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">{deal.dealerAdvertisedPromotion}</p>
        </div>

        <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-electric" />
            {deal.dealer}, {deal.city}, {deal.state} · {deal.distance} mi
          </p>
          <p className="flex items-center gap-2">
            <BadgeDollarSign className="h-4 w-4 text-electric" />
            {currency(deal.msrp)} MSRP, {currency(deal.incentives)} incentives, {currency(effectiveMonthly(deal))}/mo effective
          </p>
          <p className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-electric" />
            {deal.confidence}% confidence · {deal.fuelType}
          </p>
          <p className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-electric" />
            Expires {deal.expiresAt}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_44px] gap-2">
          <Link href={`/deal/${deal.id}`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white transition hover:bg-panel">
            Details <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="inline-flex items-center justify-center rounded-lg border border-line px-3 py-2 text-ink transition hover:bg-chrome" aria-label="Favorite deal">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <Link href="/dashboard/campaigns" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-electric/30 px-3 py-2 text-sm font-semibold text-electric transition hover:bg-electric/10">
          <MailPlus className="h-4 w-4" />
          Contact dealer
        </Link>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-chrome p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-ink">{value}</p>
    </div>
  );
}
