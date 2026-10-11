import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import HeroBackgroundCarousel from "@/components/home/HeroBackgroundCarousel";
import HomeContactActions from "@/components/home/HomeContactActions";

export default function HomeHero() {
  return (
    <section className="relative -mt-[4.25rem] bg-gradient-to-b from-brand-soft/40 to-white pt-[4.25rem]">
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="order-2 lg:order-1">
            <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-dark">
              List your property for FREE — zero brokerage
            </span>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
              Homes for a Better Tomorrow
            </p>
            <h1 className="mt-3 max-w-xl text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Find a Place You&apos;ll Love
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
              Rent or book PG, flats &amp; workspaces across Delhi NCR — verified listings, trusted owners.
            </p>
            <div className="mt-6">
              <HomeContactActions variant="hero" />
            </div>
            <div className="mt-8">
              <HeroSearch variant="home" />
            </div>
            <p className="mt-4 text-sm text-muted">
              Own a property?{" "}
              <Link href="/list-your-property" className="font-semibold text-brand-dark hover:underline">
                List for free
              </Link>
            </p>
          </div>

          <div className="order-1 min-h-[45vh] lg:order-2 lg:min-h-[min(560px,58vh)]">
            <HeroBackgroundCarousel className="h-full shadow-lg ring-1 ring-line/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
