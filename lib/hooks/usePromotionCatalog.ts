"use client";

import { useEffect, useState } from "react";

type CatalogResponse = {
  makes: string[];
  models: string[];
  trims: string[];
};

export function usePromotionCatalog(make: string, model: string) {
  const [catalog, setCatalog] = useState<CatalogResponse>({ makes: [], models: [], trims: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (model) params.set("model", model);

    async function load() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/promotions/catalog?${params.toString()}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Failed to load catalog");
        const payload = (await response.json()) as CatalogResponse;
        if (!controller.signal.aborted) setCatalog(payload);
      } catch {
        if (!controller.signal.aborted) setCatalog({ makes: [], models: [], trims: [] });
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [make, model]);

  return { catalog, isLoading };
}
