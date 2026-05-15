import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
        className="focus-ring w-full rounded-xl border border-line bg-white px-3 py-3 text-sm text-ink shadow-sm placeholder:text-slate-400"
      />
    </label>
  );
}

export function Select({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">{label}</span>
      <select {...props} className="focus-ring w-full rounded-xl border border-line bg-white px-3 py-3 text-sm text-ink shadow-sm">
        {children}
      </select>
    </label>
  );
}

export function Disclaimer() {
  return (
    <div className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-xs leading-6 text-slate-500 sm:px-6 lg:px-8">
        Deals may change without notice. Community-reported deals are not guaranteed. Dealer offers may depend on credit approval, location,
        taxes, fees, incentives, and inventory. Deal Driver is not a lender or dealer. Users are responsible for verifying terms directly with
        dealerships. Forum and Reddit data should be cited and linked where allowed.
      </div>
    </div>
  );
}
