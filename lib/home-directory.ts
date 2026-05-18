import { vehicleSlug } from "@/lib/vehicleCatalogService";

const DEFAULT_STATE = "CA";

export type DirectoryItem = {
  label: string;
  href: string;
};

export type DirectoryCategory = {
  title: string;
  items: DirectoryItem[];
};

export function promotionsStateHref(stateCode: string) {
  return `/promotions?state=${stateCode}`;
}

export function promotionsMakeHref(make: string, stateCode = DEFAULT_STATE) {
  return `/promotions?state=${stateCode}&make=${encodeURIComponent(make)}`;
}

export function promotionsModelHref(make: string, model: string, stateCode = DEFAULT_STATE) {
  return `/promotions/${stateCode.toLowerCase()}/${vehicleSlug(make)}/${vehicleSlug(model)}`;
}

export const homeDirectoryCategories: DirectoryCategory[] = [
  {
    title: "Top States",
    items: [
      { label: "California", href: promotionsStateHref("CA") },
      { label: "Texas", href: promotionsStateHref("TX") },
      { label: "New York", href: promotionsStateHref("NY") }
    ]
  },
  {
    title: "Popular Makes",
    items: [
      { label: "Audi", href: promotionsMakeHref("Audi") },
      { label: "Porsche", href: promotionsMakeHref("Porsche") },
      { label: "BMW", href: promotionsMakeHref("BMW") }
    ]
  },
  {
    title: "Trending Models",
    items: [
      { label: "Audi A3", href: promotionsModelHref("Audi", "A3") },
      { label: "Porsche 911", href: promotionsModelHref("Porsche", "911") },
      { label: "BMW 3 Series", href: promotionsModelHref("BMW", "3 Series") }
    ]
  }
];
