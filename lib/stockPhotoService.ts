import { genericVehicleImage } from "@/lib/data";
import type { VehicleProfile } from "@/lib/types";

export function resolveVehicleImage(vehicle: Pick<VehicleProfile, "stockPhotoUrl" | "modelPhotoUrl" | "makePhotoUrl" | "fallbackImageUrl">) {
  return vehicle.stockPhotoUrl || vehicle.modelPhotoUrl || vehicle.makePhotoUrl || vehicle.fallbackImageUrl || genericVehicleImage;
}
