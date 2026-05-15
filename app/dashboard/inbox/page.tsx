import { DealerInbox } from "@/components/dealer-inbox";
import { Nav } from "@/components/nav";
import { Section } from "@/components/ui";

export default function InboxPage() {
  return (
    <>
      <Nav />
      <main>
        <Section>
          <p className="text-sm font-semibold uppercase text-electric">Dealer inbox</p>
          <h1 className="mt-2 text-4xl font-semibold text-ink">Campaign replies ranked by best offer vs manufacturer</h1>
          <DealerInbox />
        </Section>
      </main>
    </>
  );
}
