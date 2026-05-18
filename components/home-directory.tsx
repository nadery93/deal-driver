import Link from "next/link";
import { Section } from "@/components/ui";
import { homeDirectoryCategories } from "@/lib/home-directory";

export function HomeDirectory() {
  return (
    <section className="bg-[#f6f8fb]">
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-electric">Directory</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">Quick-start filters</h2>
          <p className="mt-3 text-slate-600">Jump into statewide promotions by state, make, or model.</p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {homeDirectoryCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-electric">{category.title}</h3>
              <ul className="mt-4 grid gap-2">
                {category.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl border border-line bg-white/80 px-4 py-3 text-sm font-medium text-ink shadow-soft transition hover:border-electric/40 hover:text-electric hover:shadow-glow"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
