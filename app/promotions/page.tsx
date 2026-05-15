import { Nav } from "@/components/nav";
import { SearchExperience } from "@/components/search-experience";
import { Disclaimer, Section, Stat } from "@/components/ui";
import { getVehicleCatalogSummary } from "@/lib/vehicleCatalogService";

export default function PromotionsPage() {
  const summary = getVehicleCatalogSummary();

  return (
    <>
      <Nav />
      <main className="shell-grid">
        <Section>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase text-electric">State-first promotion search</p>
            <h1 className="mt-2 text-4xl font-semibold text-ink">Select a state, then choose any new vehicle sold in the U.S.</h1>
            <p className="mt-4 max-w-3xl text-slate-600">
              Find advertised lease and finance promotions, then compare every dealer special against the official manufacturer benchmark for that state and vehicle.
            </p>
          </div>
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Stat label="Makes" value={String(summary.makes)} />
            <Stat label="Models" value={`${summary.models}+`} />
            <Stat label="Trims" value={`${summary.trims}+`} />
            <Stat label="Markets" value={String(summary.states)} detail="50 states plus D.C." />
          </div>
          <SearchExperience />
        </Section>
      </main>
      <Disclaimer />
    </>
  );
}
