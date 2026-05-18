import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const footerLinks = [
  ["Home", "/"],
  ["Search Promotions", "/promotions"],
  ["Deals", "/deals"],
  ["Build Offer", "/dashboard/campaigns"]
] as const;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", className)}>{children}</section>;
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", className)}>{children}</span>;
}

export function Stat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      {detail ? <p className="mt-1 text-sm text-slate-500">{detail}</p> : null}
    </div>
  );
}

export function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">{label}</span>
      <input
        {...props}
        className="focus-ring transition-premium w-full rounded-xl border border-line bg-white px-3 py-3 text-sm text-ink shadow-sm placeholder:text-slate-400"
      />
    </label>
  );
}

export function Select({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">{label}</span>
      <select {...props} className="focus-ring transition-premium w-full rounded-xl border border-line bg-white px-3 py-3 text-sm text-ink shadow-sm">
        {children}
      </select>
    </label>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl border border-line bg-white shadow-soft", className)} aria-hidden="true" />;
}

export function Disclaimer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm text-white/72 transition hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
          <p className="shrink-0 text-sm text-white/50">&copy; {year} Deal Driver</p>
        </div>
        <section aria-label="Legal disclosures" className="max-w-4xl space-y-3 py-6 text-xs leading-relaxed text-white/50">
          <h2 className="sr-only">Legal disclosures</h2>
          <p>
            Deal Driver automatically aggregates and scrapes publicly available automotive lease, finance, and promotional data from various
            internet sources nationwide. We compile dealer and manufacturer incentives, APR programs, and lease specials to help shoppers
            compare options; we are not a data broker to dealers or OEMs.
          </p>
          <p>
            While we strive for timely and accurate information, promotions, incentives, credit tiers, and dealer pricing change frequently and
            without notice. All offers are subject to dealer availability, program eligibility (including credit approval such as tier-1
            requirements), expiration dates, and regional or market restrictions. You must verify all payment amounts, residuals, money factors,
            and terms directly with the franchised dealership or manufacturer before signing any agreement.
          </p>
          <p>
            Deal Driver is an independent comparison platform. We are not affiliated with, sponsored by, or endorsed by any vehicle
            manufacturer, automotive brand, dealer group, or specific dealership referenced on this site. Brand names, logos, model names, and
            trademarks are the property of their respective owners and are used for identification and comparison purposes only.
          </p>
          <p>
            Information on this site is provided for general informational purposes only and does not constitute an offer to sell, lease, or
            finance a vehicle, nor a binding quote or contract. Deal Driver is not a licensed dealer, broker, or lender.
          </p>
        </section>
      </div>
    </footer>
  );
}
