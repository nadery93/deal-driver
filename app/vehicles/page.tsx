import Link from "next/link";
import { Nav } from "@/components/nav";
import { Disclaimer, Section, Stat } from "@/components/ui";
import { majorMakes, vehicleCatalog } from "@/lib/data";
import { currency } from "@/lib/format";
import { getVehicleCatalogSummary, vehicleSlug } from "@/lib/vehicleCatalogService";

export default function VehiclesPage() {
  const summary = getVehicleCatalogSummary();
  const byMake = majorMakes.map((make) => {
    const vehicles = vehicleCatalog.filter((vehicle) => vehicle.make === make);
    const models = Array.from(new Set(vehicles.map((vehicle) => vehicle.model)));
    return { make, vehicles, models };
  });

  return (
    <>
      <Nav />
      <main>
        <Section>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase text-electric">U.S. new vehicle catalog</p>
            <h1 className="mt-2 text-4xl font-semibold text-ink">Every major new-vehicle make, model, and trim is modeled for statewide promotions.</h1>
            <p className="mt-4 max-w-3xl text-slate-600">
              The MVP uses representative mock data, but the schema is built for licensed catalog feeds, manufacturer programs, dealer inventory, market pricing, stock photos, and compliant third-party references.
            </p>
          </div>
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Stat label="Makes" value={String(summary.makes)} />
            <Stat label="Models" value={`${summary.models}+`} />
            <Stat label="Trims" value={`${summary.trims}+`} />
            <Stat label="Coverage" value="U.S." detail="Cars, SUVs, trucks, EVs, hybrids, luxury, performance, commercial" />
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {byMake.map(({ make, vehicles, models }) => {
              const sample = vehicles[0];
              return (
                <article key={make} className="overflow-hidden rounded-xl border border-line bg-white shadow-soft">
                  <img src={sample.modelPhotoUrl ?? sample.fallbackImageUrl} alt={`${make} vehicles`} className="h-40 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-ink">{make}</h2>
                        <p className="mt-1 text-sm text-slate-500">{models.length} models · {vehicles.length} trims</p>
                      </div>
                      <p className="text-sm font-semibold text-electric">from {currency(Math.min(...vehicles.map((vehicle) => vehicle.msrp)))}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {models.slice(0, 5).map((model) => (
                        <Link key={model} href={`/promotions/ca/${vehicleSlug(make)}/${vehicleSlug(model)}`} className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-electric hover:text-electric">
                          {model}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>
      </main>
      <Disclaimer />
    </>
  );
}
