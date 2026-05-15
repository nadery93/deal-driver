"use client";

import { SlidersHorizontal, Zap } from "lucide-react";
import { Input, Select } from "@/components/ui";

export function SearchFilters() {
  return (
    <aside className="rounded-xl border border-line bg-white p-5 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <SlidersHorizontal className="h-5 w-5 text-electric" />
          Filters
        </h2>
        <button className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink transition hover:bg-chrome">Reset</button>
      </div>
      <div className="grid gap-4">
        <Select label="Make" defaultValue="">
          <option value="">Any make</option>
          <option>BMW</option>
          <option>Toyota</option>
          <option>Honda</option>
          <option>Tesla</option>
          <option>Ford</option>
          <option>Mercedes-Benz</option>
          <option>Hyundai</option>
          <option>Kia</option>
        </Select>
        <Input label="Model" placeholder="i4, Tacoma, Model Y" />
        <Input label="Trim" placeholder="eDrive40, TRD Off-Road" />
        <Select label="Year" defaultValue="2025">
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </Select>
        <Select label="Deal Type" defaultValue="Lease">
          <option>Lease</option>
          <option>Finance</option>
        </Select>
        <div className="grid grid-cols-2 gap-3">
          <Input label="State" placeholder="TX" />
          <Input label="City" placeholder="Austin" />
        </div>
        <Input label="ZIP Radius" placeholder="100 miles" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Max Payment" placeholder="$500" />
          <Input label="Due At Signing" placeholder="$3,000" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Term" placeholder="36 months" />
          <Input label="Mileage" placeholder="12k/year" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="APR" placeholder="3.9%" />
          <Input label="MSRP" placeholder="$50,000" />
        </div>
        <Input label="Discount Off MSRP" placeholder="8%" />
        <Input label="Incentives / Rebates" placeholder="$7,500" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Dealer Fees" placeholder="$599" />
          <Input label="Broker Fee" placeholder="$0" />
        </div>
        <Select label="Credit Tier" defaultValue="Tier 1">
          <option>Super Prime</option>
          <option>Tier 1</option>
          <option>Prime</option>
          <option>Near Prime</option>
        </Select>
        <label className="flex items-center justify-between rounded-xl border border-line px-3 py-3 text-sm font-semibold text-ink">
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-electric" />
            EV tax credit eligible
          </span>
          <input type="checkbox" className="h-4 w-4 accent-electric" defaultChecked />
        </label>
        <Input label="Regional Program" placeholder="Conquest, loyalty, APR support" />
      </div>
    </aside>
  );
}
