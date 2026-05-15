import Link from "next/link";
import { Gauge, MapPinned, ShieldCheck } from "lucide-react";

const links = [
  ["Promotions", "/promotions"],
  ["Deals", "/deals"],
  ["Vehicles", "/vehicles"],
  ["Dashboard", "/dashboard"],
  ["Favorited Deals", "/dashboard/favorites"]
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09111f] text-white shadow-lg shadow-slate-950/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-electric text-white shadow-glow">
            <Gauge className="h-5 w-5" />
          </span>
          Deal Driver
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm text-white/72 transition hover:bg-white/10 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/promotions" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/80 transition hover:bg-white/10" aria-label="Promotions">
            <MapPinned className="h-4 w-4" />
          </Link>
          <Link href="/dashboard/campaigns" className="hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:bg-chrome sm:flex">
            <ShieldCheck className="h-4 w-4" />
            Build Offer
          </Link>
        </div>
      </div>
    </header>
  );
}
