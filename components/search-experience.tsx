"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPinned, Search, SlidersHorizontal, Trophy, Zap } from "lucide-react";
import { DealCard } from "@/components/deal-card";
import { Input, Select } from "@/components/ui";
import { deals, majorMakes, usStates, vehicleCatalog } from "@/lib/data";
import { dealScore } from "@/lib/scoring";
import { vehicleSlug } from "@/lib/vehicleCatalogService";

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("CA");
  const [maxPayment, setMaxPayment] = useState("");
  const [evOnly, setEvOnly] = useState(false);
  const [sort, setSort] = useState("benchmark");

  const models = useMemo(() => Array.from(new Set(vehicleCatalog.filter((vehicle) => !make || vehicle.make === make).map((vehicle) => vehicle.model))).sort(), [make]);
  const trims = useMemo(() => Array.from(new Set(vehicleCatalog.filter((vehicle) => (!make || vehicle.make === make) && (!model || vehicle.model === model)).map((vehicle) => vehicle.trim))).sort(), [make, model]);
  const routeHref = state && make && model
    ? `/promotions/${state.toLowerCase()}/${vehicleSlug(make)}/${vehicleSlug(model)}${trim ? `/${vehicleSlug(trim)}` : ""}`
    : "/promotions";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const max = Number(maxPayment.replace(/[^0-9]/g, ""));

    return deals
      .filter((deal) => {
        const haystack = `${deal.year} ${deal.make} ${deal.model} ${deal.trim} ${deal.city} ${deal.state} ${deal.dealer}`.toLowerCase();
        if (q && !haystack.includes(q)) return false;
        if (make && deal.make !== make) return false;
        if (model && deal.model !== model) return false;
        if (trim && deal.trim !== trim) return false;
        if (type && deal.type !== type) return false;
        if (state && deal.state !== state) return false;
        if (max && deal.monthlyPayment > max) return false;
        if (evOnly && !deal.evTaxCredit) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "benchmark") return b.benchmark.effectiveSavings - a.benchmark.effectiveSavings;
        if (sort === "payment") return a.monthlyPayment - b.monthlyPayment;
        if (sort === "apr") return (a.apr ?? 99) - (b.apr ?? 99);
        if (sort === "discount") return b.dealerDiscount - a.dealerDiscount;
        if (sort === "score") return dealScore(b) - dealScore(a);
        if (sort === "newest") return a.updatedAt === "Today" ? -1 : 1;
        if (sort === "distance") return a.distance - b.distance;
        if (sort === "confidence") return b.confidence - a.confidence;
        return b.benchmark.effectiveSavings - a.benchmark.effectiveSavings;
      });
  }, [evOnly, make, maxPayment, model, query, sort, state, trim, type]);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="rounded-xl border border-line bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
            <SlidersHorizontal className="h-5 w-5 text-electric" />
            Filters
          </h2>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setMake("");
              setModel("");
              setTrim("");
              setType("");
              setState("CA");
              setMaxPayment("");
              setEvOnly(false);
              setSort("benchmark");
            }}
            className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink transition hover:bg-chrome"
          >
            Reset
          </button>
        </div>
        <div className="grid gap-4">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">Search</span>
            <span className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-3 shadow-sm">
              <Search className="h-4 w-4 text-electric" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="i4, Tacoma, dealer, city"
              />
            </span>
          </label>
          <Select label="State" value={state} onChange={(event) => setState(event.target.value)}>
            {usStates.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
          </Select>
          <Select label="Make" value={make} onChange={(event) => {
            setMake(event.target.value);
            setModel("");
            setTrim("");
          }}>
            <option value="">Select make</option>
            {majorMakes.map((item) => <option key={item}>{item}</option>)}
          </Select>
          <Select label="Model" value={model} onChange={(event) => {
            setModel(event.target.value);
            setTrim("");
          }}>
            <option value="">Select model</option>
            {models.map((item) => <option key={item}>{item}</option>)}
          </Select>
          <Select label="Trim" value={trim} onChange={(event) => setTrim(event.target.value)}>
            <option value="">Any trim</option>
            {trims.map((item) => <option key={item}>{item}</option>)}
          </Select>
          <Select label="Deal Type" value={type} onChange={(event) => setType(event.target.value)}>
            <option value="">Lease and finance</option>
            <option>Lease</option>
            <option>Finance</option>
          </Select>
          <Input label="Max Payment" value={maxPayment} onChange={(event) => setMaxPayment(event.target.value)} placeholder="$500" />
          <label className="flex items-center justify-between rounded-xl border border-line px-3 py-3 text-sm font-semibold text-ink">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-electric" />
              EV tax credit eligible
            </span>
            <input type="checkbox" checked={evOnly} onChange={(event) => setEvOnly(event.target.checked)} className="h-4 w-4 accent-electric" />
          </label>
          <Link href={routeHref} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-panel">
            <MapPinned className="h-4 w-4" />
            Search Statewide Promotions
          </Link>
          <div className="rounded-xl border border-electric/20 bg-electric/5 p-3 text-sm text-slate-600">
            <p className="flex items-center gap-2 font-semibold text-ink"><Trophy className="h-4 w-4 text-electric" /> Manufacturer benchmark first</p>
            <p className="mt-1">Every result is measured against national and regional manufacturer lease, APR, cash, loyalty, conquest, and EV-credit programs.</p>
          </div>
        </div>
      </aside>
      <div>
        <div className="mb-4 flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 shadow-soft">
          <p className="text-sm text-slate-600"><span className="font-semibold text-ink">{filtered.length}</span> statewide promotions</p>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-line px-3 py-2 text-sm">
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
        <div className="grid gap-5 xl:grid-cols-2">
          {filtered.map((deal) => <DealCard key={deal.id} deal={deal} />)}
        </div>
        {!filtered.length ? (
          <div className="rounded-xl border border-line bg-white p-8 text-center shadow-soft">
            <p className="text-lg font-semibold text-ink">No deals match those filters.</p>
            <p className="mt-2 text-sm text-slate-600">Loosen the payment, make, state, or EV requirement.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
