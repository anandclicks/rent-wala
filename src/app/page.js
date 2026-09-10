import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import CategoryCarousel from "@/components/CategoryCarousel";
import FeaturedProperties from "@/components/FeaturedProperties";
import ExploreCarouselSection from "@/components/ExploreCarouselSection";
import { getAllProperties, getPropertiesByCategoryEnum } from "@/data/properties";

const FEATURES = [
  {
    icon: "verified",
    title: "Verified Listings",
    subtitle: "Real photos, genuine properties",
  },
  {
    icon: "owners",
    title: "Trusted Owners",
    subtitle: "Direct contact, no middlemen",
  },
  {
    icon: "choices",
    title: "Wide Choices",
    subtitle: "Flats, PGs, Villas & more",
  },
  {
    icon: "secure",
    title: "Easy & Secure",
    subtitle: "A safe and hassle-free experience",
  },
];

const STATS = [
  { value: "50K+", label: "Verified Listings", icon: "listings" },
  { value: "25K+", label: "Happy Customers", icon: "customers" },
  { value: "100+", label: "Cities Covered", icon: "cities" },
  { value: "4.8/5", label: "Average Rating", icon: "rating" },
];

export default function Home() {
  const properties = getAllProperties();
  const independentHouses = getPropertiesByCategoryEnum("INDEPENDENT_HOUSE");
  const villas = getPropertiesByCategoryEnum("VILLA");
  const flats = getPropertiesByCategoryEnum("FLATS");

  return (
    <>
      <Hero />
      <FeatureStrip />
      <CategoryCarousel />
      <FeaturedProperties properties={properties} />
      <DualCTA />
      <ExploreCarouselSection
        title="Independent Houses"
        subtitle="Spacious homes with privacy and comfort"
        viewAllHref="/search?category=INDEPENDENT_HOUSE&city=Noida"
        items={independentHouses}
      />
      <ExploreCarouselSection
        title="Villas"
        subtitle="Luxury living in premium neighbourhoods"
        viewAllHref="/search?category=VILLA&city=Gurugram"
        items={villas}
        className="bg-brand-soft/30"
      />
      <ExploreCarouselSection
        title="Flats & Apartments"
        subtitle="Modern apartments for every budget"
        viewAllHref="/search?category=APARTMENT&city=Noida"
        items={flats}
      />
      <StatsSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative -mt-[4.25rem] min-h-[720px] pt-[4.25rem] lg:min-h-[780px]">
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mainbgimage.jpg"
          alt=""
          className="h-full w-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1400px] flex-col justify-center px-4 pb-12 pt-8 lg:min-h-[740px] lg:px-8 lg:pb-16 lg:pt-12">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">
              Homes for a Better Tomorrow
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Find a Place You&apos;ll Love
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85">
              Buy, Rent or Book PG — Verified Listings, Trusted Owners, Hassle-Free Experience
            </p>
            <div className="mt-8">
              <HeroSearch />
            </div>
          </div>

          <div className="hidden flex-col items-end pb-2 lg:flex">
            <p className="font-script mb-3 text-right text-[2rem] leading-none text-white drop-shadow-md xl:text-[2.35rem]">
              More Than Just a Home
            </p>
            <div className="rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur-sm">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
                ].map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="mt-2.5 text-sm leading-snug text-ink/70">
                <span className="font-bold text-brand-dark">10K+</span> Happy Families Found Their Home
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="border-b border-line bg-white py-10">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-mint text-brand-dark">
                <FeatureIcon name={f.icon} />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{f.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DualCTA() {
  return (
    <section className="bg-brand-soft/30 py-14">
      <div className="mx-auto grid max-w-[1400px] gap-5 px-4 lg:grid-cols-2 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="relative p-8 lg:p-10">
            <h3 className="text-xl font-bold text-white sm:text-2xl">List Your Property</h3>
            <p className="mt-2 max-w-xs text-sm text-white/80">
              Get Genuine Tenants or Buyers
            </p>
            <Link
              href="/list-your-property"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-brand-light"
            >
              List Your Property
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/40" />
          <div className="relative flex h-full min-h-[200px] items-center p-8 lg:p-10">
            <div>
              <h3 className="text-xl font-bold text-ink sm:text-2xl">
                A Better Tomorrow Starts with a Brighter Home
              </h3>
              <Link
                href="/search?city=Noida"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition hover:text-brand-darker"
              >
                Explore Properties
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="border-t border-line bg-white py-10">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:items-center">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-mint text-brand-dark">
                <StatIcon name={s.icon} />
              </span>
              <div>
                <p className="text-lg font-bold text-ink">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            </div>
          ))}
          <p className="col-span-2 hidden text-sm italic leading-relaxed text-muted lg:col-span-1 lg:block">
            Helping people find more than just properties — we help them find a place to belong.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ name }) {
  const c = "h-5 w-5";
  switch (name) {
    case "verified":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "owners":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-2 1.5-3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "choices":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 20V10l8-6 8 6v10H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "secure":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function StatIcon({ name }) {
  const c = "h-4 w-4";
  switch (name) {
    case "listings":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "customers":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 20c1-3 3.5-4.5 7-4.5s6 1.5 7 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "cities":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "rating":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
