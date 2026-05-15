import { Nav } from "@/components/nav";
import { SearchExperience } from "@/components/search-experience";
import { Disclaimer, Section } from "@/components/ui";

export default function SearchPage() {
  return (
    <>
      <Nav />
      <main className="shell-grid">
        <Section>
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase text-electric">Statewide promotion search</p>
            <h1 className="mt-2 text-4xl font-semibold text-ink">Filter every current offer by state, vehicle, structure, and manufacturer benchmark advantage.</h1>
          </div>
          <SearchExperience />
        </Section>
      </main>
      <Disclaimer />
    </>
  );
}
