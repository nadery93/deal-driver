"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DealCard } from "@/components/deal-card";
import { PromotionFilters, type PromotionFilterState } from "@/components/promotion-filters";
import { Skeleton } from "@/components/ui";
import { majorMakes, usStates } from "@/lib/data";
import { usePromotions } from "@/lib/hooks/usePromotions";

const defaultFilters: PromotionFilterState = {
  query: "",
  make: "",
  model: "",
  trim: "",
  type: "",
  state: "CA",
  maxPayment: "",
  evOnly: false
};

function SearchExperienceFallback() {
  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Skeleton className="h-[520px]" />
      <Skeleton className="h-[520px]" />
    </div>
  );
}

function SearchExperienceInner() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<PromotionFilterState>(defaultFilters);
  const [sort, setSort] = useState("benchmark");

  useEffect(() => {
    const stateParam = searchParams.get("state")?.toUpperCase();
    const makeParam = searchParams.get("make");
    const modelParam = searchParams.get("model");

    setFilters((current) => {
      const next = { ...current };
      if (stateParam && usStates.some((item) => item.code === stateParam)) {
        next.state = stateParam;
      }
      if (makeParam && majorMakes.includes(makeParam)) {
        next.make = makeParam;
        next.model = "";
        next.trim = "";
      }
      if (modelParam) {
        next.model = modelParam;
        next.trim = "";
      }
      return next;
    });
  }, [searchParams]);

  const { deals, isLoading, error } = usePromotions({
    state: filters.state,
    make: filters.make,
    model: filters.model,
    trim: filters.trim,
    type: filters.type,
    q: filters.query,
    maxPayment: filters.maxPayment,
    evOnly: filters.evOnly,
    sort
  });

  function updateFilters(patch: Partial<PromotionFilterState>) {
    setFilters((current) => ({ ...current, ...patch }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setSort("benchmark");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <PromotionFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />
      <div>
        <div className="mb-4 flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 shadow-soft transition-premium">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-ink">{isLoading ? "…" : deals.length}</span> statewide promotions
          </p>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="focus-ring rounded-lg border border-line px-3 py-2 text-sm transition-premium"
          >
            <option value="benchmark">Best vs manufacturer benchmark</option>
            <option value="payment">Lowest monthly payment</option>
            <option value="apr">Lowest APR</option>
            <option value="discount">Largest discount</option>
            <option value="score">Best deal score</option>
            <option value="newest">Newest promotion</option>
            <option value="distance">Closest distance</option>
            <option value="confidence">Highest confidence</option>
          </select>
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">{error}</div>
        ) : null}

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
            <Skeleton className="h-[420px]" />
            <Skeleton className="h-[420px]" />
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}

        {!isLoading && !deals.length ? (
          <div className="rounded-xl border border-line bg-white p-8 text-center shadow-soft">
            <p className="text-lg font-semibold text-ink">No deals match those filters.</p>
            <p className="mt-2 text-sm text-slate-600">Loosen the payment, make, state, or EV requirement.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SearchExperience() {
  return (
    <Suspense fallback={<SearchExperienceFallback />}>
      <SearchExperienceInner />
    </Suspense>
  );
}
