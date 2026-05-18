import { Sparkles } from "lucide-react";
import { HomeDirectory } from "@/components/home-directory";
import { HomeHeroSearch } from "@/components/home-hero-search";
import { Nav } from "@/components/nav";
import { Disclaimer } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero-road relative overflow-hidden text-white">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f6f8fb] to-transparent" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/80">
              <Sparkles className="h-4 w-4 text-mint" />
              Statewide lease &amp; finance promotions
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Find every new-car promotion in your state.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/72">
              Select your state to search dealer specials and compare them against manufacturer benchmarks.
            </p>
            <HomeHeroSearch />
          </div>
        </section>
        <HomeDirectory />
      </main>
      <Disclaimer />
    </>
  );
}
