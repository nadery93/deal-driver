import { CampaignBuilder } from "@/components/campaign-builder";
import { Nav } from "@/components/nav";
import { Section } from "@/components/ui";

export default function CampaignsPage() {
  return (
    <>
      <Nav />
      <main className="shell-grid">
        <Section>
          <p className="text-sm font-semibold uppercase text-electric">Offer campaign</p>
          <h1 className="mt-2 text-4xl font-semibold text-ink">Send benchmark-aware offer requests to multiple dealers.</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Campaigns include the official manufacturer promotion, your target structure, and the dealer response ranking needed to identify the best offer vs benchmark.
          </p>
          <CampaignBuilder />
        </Section>
      </main>
    </>
  );
}
