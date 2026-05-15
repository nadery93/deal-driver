"use client";

import { useMemo, useState } from "react";
import { Send, Upload, Users } from "lucide-react";
import { Input, Select } from "@/components/ui";
import { deals } from "@/lib/data";
import { buildOfferEmail } from "@/lib/email";
import { currency, signedCurrency } from "@/lib/format";

export function CampaignBuilder() {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState(() => new Set(deals.slice(0, 3).map((deal) => deal.id)));
  const [form, setForm] = useState({
    shopperName: "Demo Shopper",
    email: "demo@dealdriver.com",
    phone: "",
    zipCode: "78701",
    vehicle: "2025 BMW i4 eDrive40",
    structure: "lease",
    targetMonthly: "479",
    targetDue: "2500",
    targetSellingPrice: "54000",
    targetAprOrMoneyFactor: "0.00150",
    term: "36",
    mileage: "10000",
    customMessage: "I can take delivery this week if the numbers are confirmed in writing."
  });

  const email = useMemo(() => buildOfferEmail({
    shopperName: form.shopperName,
    vehicle: form.vehicle,
    structure: form.structure as "lease" | "finance",
    targetMonthly: Number(form.targetMonthly),
    targetDue: Number(form.targetDue),
    targetSellingPrice: Number(form.targetSellingPrice),
    targetAprOrMoneyFactor: form.targetAprOrMoneyFactor,
    term: Number(form.term),
    mileage: Number(form.mileage),
    zipCode: form.zipCode,
    customMessage: form.customMessage
  }), [form]);

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
        className="rounded-xl border border-line bg-white p-5 shadow-soft"
      >
        {sent ? (
          <div className="mb-5 rounded-xl border border-mint/30 bg-mint/10 p-4 text-sm font-semibold text-teal-800">
            Campaign marked sent to {selected.size} dealers. Replies will appear in the inbox mockup.
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Name" value={form.shopperName} onChange={(event) => update("shopperName", event.target.value)} />
          <Input label="Email" value={form.email} onChange={(event) => update("email", event.target.value)} />
          <Input label="Phone Optional" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="(555) 123-4567" />
          <Input label="ZIP Code" value={form.zipCode} onChange={(event) => update("zipCode", event.target.value)} />
          <Input label="Make / Model / Trim / Year" value={form.vehicle} onChange={(event) => update("vehicle", event.target.value)} />
          <Select label="Structure" value={form.structure} onChange={(event) => update("structure", event.target.value)}>
            <option value="lease">Lease</option>
            <option value="finance">Finance</option>
          </Select>
          <Input label="Target Monthly vs Manufacturer Benchmark" value={form.targetMonthly} onChange={(event) => update("targetMonthly", event.target.value)} />
          <Input label="Target Due At Signing" value={form.targetDue} onChange={(event) => update("targetDue", event.target.value)} />
          <Input label="Target Selling Price" value={form.targetSellingPrice} onChange={(event) => update("targetSellingPrice", event.target.value)} />
          <Input label="Target APR / Money Factor" value={form.targetAprOrMoneyFactor} onChange={(event) => update("targetAprOrMoneyFactor", event.target.value)} />
          <Input label="Lease Term" value={form.term} onChange={(event) => update("term", event.target.value)} />
          <Input label="Mileage Allowance" value={form.mileage} onChange={(event) => update("mileage", event.target.value)} />
        </div>
        <label className="mt-4 flex items-center gap-3 rounded-xl border border-line p-3 text-sm font-semibold">
          <input type="checkbox" className="h-4 w-4 accent-electric" />
          Include trade-in details
        </label>
        <label className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-line p-4 text-sm font-semibold text-slate-600">
          <Upload className="h-5 w-5 text-electric" />
          Upload or paste competing offer
        </label>
        <label className="mt-4 block">
          <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">Custom message</span>
          <textarea value={form.customMessage} onChange={(event) => update("customMessage", event.target.value)} className="min-h-28 w-full rounded-xl border border-line p-3 text-sm" />
        </label>
        <div className="mt-5 rounded-xl bg-chrome p-4">
          <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Generated email preview</p>
          <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{email}</pre>
        </div>
        <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white">
          <Send className="h-4 w-4" />
          Send Offer Campaign
        </button>
      </form>
      <aside className="rounded-xl border border-line bg-white p-5 shadow-soft">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink"><Users className="h-5 w-5 text-electric" /> Select dealers</h2>
        <div className="mt-4 space-y-3">
          {deals.slice(0, 6).map((deal) => (
            <label key={deal.id} className="flex items-center justify-between rounded-lg border border-line p-3">
              <span>
                <span className="block font-semibold text-ink">{deal.dealer}</span>
                <span className="text-sm text-slate-500">{deal.city}, {deal.state} - {deal.make} {deal.model}</span>
                <span className="mt-1 block text-xs font-semibold text-electric">{currency(deal.monthlyPayment)}/mo · {signedCurrency(deal.benchmark.monthlySavings)}/mo vs manufacturer · rank #{deal.benchmark.regionRank}</span>
              </span>
              <input
                type="checkbox"
                className="h-4 w-4 accent-electric"
                checked={selected.has(deal.id)}
                onChange={(event) => {
                  setSelected((current) => {
                    const next = new Set(current);
                    if (event.target.checked) next.add(deal.id);
                    else next.delete(deal.id);
                    return next;
                  });
                }}
              />
            </label>
          ))}
        </div>
        <div className="mt-5 rounded-lg bg-chrome p-4 text-sm leading-6 text-slate-600">
          Email delivery is mocked now. Provider adapters are structured for Resend, SendGrid, Mailgun, or AWS SES with unique reply-to addresses for inbound DealerMessage rows.
        </div>
      </aside>
    </div>
  );
}
