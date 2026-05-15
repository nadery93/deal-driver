"use client";

import { useState } from "react";
import { Archive, CheckCircle2, Star, XCircle } from "lucide-react";
import { dealerResponses } from "@/lib/data";
import { currency, signedCurrency } from "@/lib/format";

type InboxStatus = "best offer" | "interested" | "countered" | "declined" | "no response" | "favorite" | "rejected" | "archived";

export function DealerInbox() {
  const [statuses, setStatuses] = useState<Record<string, InboxStatus>>(() => Object.fromEntries(dealerResponses.map((response) => [response.id, response.status])));
  const [note, setNote] = useState("Follow up with Lone Star BMW before close. Ask for full worksheet and confirm acquisition fee.");

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {dealerResponses.map((response) => (
          <article key={response.id} className="rounded-xl border border-line bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-ink">{response.dealer}</p>
                <p className="mt-1 text-sm text-slate-500">{response.vehicle} - {response.receivedAt}</p>
              </div>
              <span className="rounded-full border border-line bg-chrome px-3 py-1 text-xs font-semibold uppercase text-slate-600">{statuses[response.id]}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{response.message}</p>
            {response.monthlyPayment ? (
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                <p className="font-semibold text-ink">{currency(response.monthlyPayment)}/mo</p>
                <p className="text-slate-600">{currency(response.dueAtSigning)} due</p>
                <p className="font-semibold text-electric">{signedCurrency(response.benchmarkAdvantage)}/mo vs manufacturer</p>
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <Action icon={<Star className="h-4 w-4" />} label="Favorite" onClick={() => setStatuses((current) => ({ ...current, [response.id]: "favorite" }))} />
              <Action icon={<CheckCircle2 className="h-4 w-4" />} label="Best offer" onClick={() => setStatuses((current) => ({ ...current, [response.id]: "best offer" }))} />
              <Action icon={<XCircle className="h-4 w-4" />} label="Reject" onClick={() => setStatuses((current) => ({ ...current, [response.id]: "rejected" }))} />
              <Action icon={<Archive className="h-4 w-4" />} label="Archive" onClick={() => setStatuses((current) => ({ ...current, [response.id]: "archived" }))} />
            </div>
          </article>
        ))}
      </div>
      <aside className="rounded-xl border border-line bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-ink">Notes</h2>
        <textarea className="mt-3 min-h-44 w-full rounded-xl border border-line p-3 text-sm" value={note} onChange={(event) => setNote(event.target.value)} />
        <div className="mt-5 rounded-lg bg-chrome p-4 text-sm text-slate-600">
          Unique reply-to addresses per campaign will route inbound messages into DealerMessage records. Provider adapters are ready for Resend, SendGrid, Mailgun, or AWS SES.
        </div>
      </aside>
    </div>
  );
}

function Action({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold transition hover:bg-chrome">
      {icon} {label}
    </button>
  );
}
