import type { VehicleDeal } from "@/lib/types";

export const VEHICLE_MEDIA_API_BASE = "https://api.vehicledatabases.com/vehicle-media/v2";

export const brandedVehicleFallback = "/brand/vehicle-silhouette.svg";

export function sanitizeMediaSegment(value: string) {
  return encodeURIComponent(value.trim().toLowerCase().replace(/\s+/g, " "));
}

type VehicleMediaFields = Pick<VehicleDeal, "year" | "make" | "model" | "trim">;

export function buildTrimMediaUrl(vehicle: VehicleMediaFields) {
  return `${VEHICLE_MEDIA_API_BASE}/${vehicle.year}/${sanitizeMediaSegment(vehicle.make)}/${sanitizeMediaSegment(vehicle.model)}/${sanitizeMediaSegment(vehicle.trim)}`;
}

export function buildModelMediaUrl(vehicle: Pick<VehicleDeal, "year" | "make" | "model">) {
  return `${VEHICLE_MEDIA_API_BASE}/${vehicle.year}/${sanitizeMediaSegment(vehicle.make)}/${sanitizeMediaSegment(vehicle.model)}`;
}

export function resolveVehicleImage(vehicle: VehicleMediaFields) {
  return buildTrimMediaUrl(vehicle);
}
