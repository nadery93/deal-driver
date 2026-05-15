import { BellRing } from "lucide-react";
import { Nav } from "@/components/nav";
import { Input, Section } from "@/components/ui";

const alerts = [
  "BMW i4 lease under $499/month within 100 miles of Austin, TX",
  "Toyota Tacoma finance APR below 3.9%",
  "Dealer posts a better promotion than favorited BMW offer"
];

export default function AlertsPage() {
  return (
    <>
      <Nav />
      <main className="shell-grid">
        <Section>
          <p className="text-sm font-semibold uppercase text-electric">Deal alerts</p>
          <h1 className="mt-2 text-4xl font-semibold text-ink">Watch the market for offers that beat manufacturer benchmarks.</h1>
          <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
            <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
              <h2 className="text-lg font-semibold text-ink">Create alert</h2>
              <div className="mt-4 grid gap-4">
                <Input label="Vehicle" placeholder="BMW i4" />
                <Input label="Target Manufacturer Advantage" placeholder="$50/month better than manufacturer" />
                <Input label="Location" placeholder="Austin, TX" />
                <Input label="Radius" placeholder="100 miles" />
              </div>
              <button className="mt-5 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white">Create Alert</button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert} className="flex items-center gap-3 rounded-xl border border-line bg-white p-5 shadow-soft">
                  <BellRing className="h-5 w-5 text-electric" />
                  <p className="font-semibold text-ink">{alert}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
