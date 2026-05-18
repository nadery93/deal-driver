"use client";

import Link from "next/link";
import { MapPinned, Search, SlidersHorizontal, Trophy, Zap } from "lucide-react";
import { Input, Select } from "@/components/ui";
import { usePromotionCatalog } from "@/lib/hooks/usePromotionCatalog";
import { usStates } from "@/lib/data";
import { vehicleSlug } from "@/lib/vehicleCatalogService";

export type PromotionFilterState = {
  query: string;
  make: string;
  model: string;
  trim: string;
  type: string;
  state: string;
  maxPayment: string;
  evOnly: boolean;
};

type PromotionFiltersProps = {
  filters: PromotionFilterState;
  onChange: (patch: Partial<PromotionFilterState>) => void;
  onReset: () => void;
};

export function PromotionFilters({ filters, onChange, onReset }: PromotionFiltersProps) {
  const { catalog } = usePromotionCatalog(filters.make, filters.model);

  const routeHref =
    filters.state && filters.make && filters.model
      ? `/promotions/${filters.state.toLowerCase()}/${vehicleSlug(filters.make)}/${vehicleSlug(filters.model)}${filters.trim ? `/${vehicleSlug(filters.trim)}` : ""}`
      : "/promotions";

  return (
    <aside className="rounded-xl border border-line bg-white p-5 shadow-soft transition-premium">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <SlidersHorizontal className="h-5 w-5 text-electric" />
          Filters
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink transition-premium hover:bg-chrome"
        >
          Reset
        </button>
      </div>
      <div className="grid gap-4">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">Search</span>
          <span className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-3 shadow-sm transition-premium focus-within:border-electric/40 focus-within:shadow-glow">
            <Search className="h-4 w-4 text-electric" />
            <input
              value={filters.query}
              onChange={(event) => onChange({ query: event.target.value })}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Make, model, trim, city, dealer"
            />
          </span>
        </label>
        <Select label="State" value={filters.state} onChange={(event) => onChange({ state: event.target.value })}>
          {usStates.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </Select>
        <Select
          label="Make"
          value={filters.make}
          onChange={(event) => onChange({ make: event.target.value, model: "", trim: "" })}
        >
          <option value="">Select make</option>
          {catalog.makes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select
          label="Model"
          value={filters.model}
          onChange={(event) => onChange({ model: event.target.value, trim: "" })}
          disabled={!filters.make}
        >
          <option value="">Select model</option>
          {catalog.models.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select
          label="Trim"
          value={filters.trim}
          onChange={(event) => onChange({ trim: event.target.value })}
          disabled={!filters.make || !filters.model}
        >
          <option value="">Any trim</option>
          {catalog.trims.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select label="Deal Type" value={filters.type} onChange={(event) => onChange({ type: event.target.value })}>
          <option value="">Lease and finance</option>
          <option>Lease</option>
          <option>Finance</option>
        </Select>
        <Input
          label="Max Payment"
          value={filters.maxPayment}
          onChange={(event) => onChange({ maxPayment: event.target.value })}
          placeholder="$500"
        />
        <label className="flex items-center justify-between rounded-xl border border-line px-3 py-3 text-sm font-semibold text-ink transition-premium hover:border-electric/30">
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-electric" />
            EV tax credit eligible
          </span>
          <input
            type="checkbox"
            checked={filters.evOnly}
            onChange={(event) => onChange({ evOnly: event.target.checked })}
            className="h-4 w-4 accent-electric"
          />
        </label>
        <Link
          href={routeHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition-premium hover:bg-panel hover:shadow-glow"
        >
          <MapPinned className="h-4 w-4" />
          Search Statewide Promotions
        </Link>
        <div className="rounded-xl border border-electric/20 bg-electric/5 p-3 text-sm text-slate-600">
          <p className="flex items-center gap-2 font-semibold text-ink">
            <Trophy className="h-4 w-4 text-electric" /> Manufacturer benchmark first
          </p>
          <p className="mt-1">
            Every result is measured against national and regional manufacturer lease, APR, cash, loyalty, conquest, and EV-credit programs.
          </p>
        </div>
      </div>
    </aside>
  );
}
