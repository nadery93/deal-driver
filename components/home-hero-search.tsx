"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPinned } from "lucide-react";
import { usStates } from "@/lib/data";

export function HomeHeroSearch() {
  const router = useRouter();
  const [state, setState] = useState("CA");

  function handleGetStarted() {
    router.push(`/promotions?state=${state}`);
  }

  return (
    <div className="mt-10 w-full">
      <p className="mb-3 text-sm font-medium text-white/70">Select State &amp; Get Started</p>
      <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white p-2 shadow-glow sm:flex-row sm:items-stretch">
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-3 sm:bg-transparent">
          <MapPinned className="hidden h-5 w-5 shrink-0 text-electric sm:block" />
          <span className="sr-only">Select your state</span>
          <select
            aria-label="Select your state"
            value={state}
            onChange={(event) => setState(event.target.value)}
            className="focus-ring w-full cursor-pointer border-0 bg-transparent py-3.5 text-sm font-medium text-ink outline-none"
          >
            {usStates.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={handleGetStarted}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-electric px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
