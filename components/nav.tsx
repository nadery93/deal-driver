"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, ShieldCheck, User } from "lucide-react";
import { cn } from "@/components/ui";

const links = [
  ["Search Promotions", "/promotions"],
  ["Deals Saved", "/dashboard/favorites"],
  ["Inbox", "/dashboard/inbox"]
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/promotions") {
    return pathname === "/promotions" || pathname.startsWith("/promotions/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09111f] text-white shadow-lg shadow-slate-950/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex shrink-0 items-center gap-2 text-base font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-electric text-white shadow-glow">
              <Gauge className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">Deal Driver</span>
          </Link>
          <nav className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "shrink-0 rounded-lg px-2.5 py-2 text-xs font-medium transition sm:px-3 sm:text-sm",
                  isActive(pathname, href)
                    ? "bg-white/10 text-white"
                    : "text-white/72 hover:bg-white/10 hover:text-white"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/dashboard"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/80 transition hover:bg-white/10"
              aria-label="Profile"
            >
              <User className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard/campaigns"
              className="hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:bg-chrome sm:flex"
            >
              <ShieldCheck className="h-4 w-4" />
              Build Offer
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
