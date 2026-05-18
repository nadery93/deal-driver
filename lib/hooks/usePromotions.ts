"use client";

import { useEffect, useMemo, useState } from "react";
import type { VehicleDeal } from "@/lib/types";

export type UsePromotionsFilters = {
  state?: string;
  make?: string;
  model?: string;
  trim?: string;
  type?: string;
  q?: string;
  maxPayment?: string;
  evOnly?: boolean;
  sort?: string;
};

type PromotionsResponse = {
  deals: VehicleDeal[];
  count: number;
};

function buildQuery(filters: UsePromotionsFilters, query: string) {
  const params = new URLSearchParams();
  if (filters.state) params.set("state", filters.state);
  if (filters.make) params.set("make", filters.make);
  if (filters.model) params.set("model", filters.model);
  if (filters.trim) params.set("trim", filters.trim);
  if (filters.type) params.set("type", filters.type);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.evOnly) params.set("evOnly", "true");
  if (query) params.set("q", query);

  const max = Number((filters.maxPayment ?? "").replace(/[^0-9]/g, ""));
  if (max) params.set("maxPayment", String(max));

  return params.toString();
}

export function usePromotions(filters: UsePromotionsFilters) {
  const [debouncedQuery, setDebouncedQuery] = useState(filters.q ?? "");
  const [deals, setDeals] = useState<VehicleDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(filters.q ?? ""), 200);
    return () => window.clearTimeout(timer);
  }, [filters.q]);

  const queryString = useMemo(
    () =>
      buildQuery(filters, debouncedQuery),
    [filters.state, filters.make, filters.model, filters.trim, filters.type, filters.sort, filters.evOnly, filters.maxPayment, debouncedQuery]
  );

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/promotions?${queryString}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Failed to load promotions");
        const payload = (await response.json()) as PromotionsResponse;
        setDeals(payload.deals);
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setError(caught instanceof Error ? caught.message : "Failed to load promotions");
        setDeals([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [queryString]);

  return { deals, isLoading, error };
}
