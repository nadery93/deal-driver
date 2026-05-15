import { majorMakes, usStates, vehicleCatalog } from "@/lib/data";

export function getStates() {
  return usStates;
}

export function getMakes() {
  return majorMakes;
}

export function getModelsForMake(make: string) {
  return Array.from(new Set(vehicleCatalog.filter((vehicle) => same(vehicle.make, make)).map((vehicle) => vehicle.model))).sort();
}

export function getTrimsForVehicle(make: string, model: string) {
  return vehicleCatalog
    .filter((vehicle) => same(vehicle.make, make) && same(vehicle.model, model))
    .sort((a, b) => a.year - b.year || a.msrp - b.msrp);
}

export function getVehicleCatalogSummary() {
  return {
    makes: majorMakes.length,
    models: new Set(vehicleCatalog.map((vehicle) => `${vehicle.make}:${vehicle.model}`)).size,
    trims: vehicleCatalog.length,
    states: usStates.length
  };
}

export function normalizeSlug(value: string) {
  return decodeURIComponent(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function vehicleSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function same(left: string, right: string) {
  return vehicleSlug(left) === normalizeSlug(right);
}
