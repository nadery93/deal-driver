"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CalendarClock, Heart, MailPlus, MapPin, ShieldCheck } from "lucide-react";
import { formatDealHeadline, formatDealTerms } from "@/lib/format";
import { benchmarkCopy, dealLabel, dealScore, labelTone } from "@/lib/scoring";
import { genericVehicleImage } from "@/lib/data";
import { resolveVehicleImage } from "@/lib/stockPhotoService";
import type { VehicleDeal } from "@/lib/types";
import { Pill } from "@/components/ui";

export function DealCard({ deal }: { deal: VehicleDeal }) {
  const score = dealScore(deal);
  const label = dealLabel(deal);
  const beatsOem = deal.benchmark.benchmarkStatus === "BEATS_OEM" || deal.benchmark.benchmarkStatus === "EXCEPTIONAL_REGIONAL_DEAL";
  const initialImage = resolveVehicleImage(deal);
  const [imageSrc, setImageSrc] = useState(initialImage);

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-premium hover:-translate-y-0.5 hover:shadow-glow">
      <div className="relative aspect-[16/10] bg-[#09111f]">
        <Image
          src={imageSrc}
          alt={formatDealHeadline(deal)}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          className="object-cover object-center"
          onError={() => setImageSrc(deal.fallbackImageUrl || genericVehicleImage)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" aria-hidden="true" />
        <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {score} score
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-lg font-semibold leading-tight text-white">{formatDealHeadline(deal)}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Pill className={labelTone(label)}>{label}</Pill>
            <Pill className="border-white/20 bg-white/15 text-white">{deal.type}</Pill>
            {beatsOem ? <Pill className="border-mint/40 bg-mint/20 text-white">Beats manufacturer benchmark</Pill> : null}
          </div>
          <p className="mt-3 text-sm font-semibold text-white/95">{formatDealTerms(deal)}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="rounded-xl border border-electric/20 bg-electric/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ShieldCheck className="h-4 w-4 text-electric" />
            {benchmarkCopy(deal)}
          </p>
        </div>

        <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-electric" />
            {deal.dealer}, {deal.city}, {deal.state}
          </p>
          <p className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-electric" />
            Expires {deal.expiresAt} · {deal.confidence}% confidence
          </p>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_44px] gap-2">
          <Link
            href={`/deal/${deal.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white transition-premium hover:bg-panel"
          >
            Details <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-lg border border-line px-3 py-2 text-ink transition-premium hover:bg-chrome"
            aria-label="Favorite deal"
            type="button"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <Link
          href="/dashboard/campaigns"
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-electric/30 px-3 py-2 text-sm font-semibold text-electric transition-premium hover:bg-electric/10"
        >
          <MailPlus className="h-4 w-4" />
          Contact dealer
        </Link>
      </div>
    </article>
  );
}
