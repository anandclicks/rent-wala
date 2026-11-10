import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Handshake,
  LockKeyhole,
  MapPinned,
  Plus,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import CategoryCarousel from "@/components/CategoryCarousel";
import FeaturedProperties from "@/components/FeaturedProperties";
import ExploreCarouselSection from "@/components/ExploreCarouselSection";
import { getAllProperties, getPropertiesByCategoryEnum } from "@/data/properties";

const FEATURES = [
  { icon: ShieldCheck, title: "Verified Listings", subtitle: "Real photos, genuine properties" },
  { icon: Handshake, title: "Trusted Owners", subtitle: "Direct contact, no middlemen" },
  { icon: Building2, title: "Wide Choices", subtitle: "Flats, PGs, Villas & more" },
  { icon: LockKeyhole, title: "Easy & Secure", subtitle: "A safe and hassle-free experience" },
];

const STATS = [
  { value: "50K+", label: "Verified Listings", icon: BadgeCheck },
  { value: "25K+", label: "Happy Customers", icon: UsersRound },
  { value: "100+", label: "Cities Covered", icon: MapPinned },
  { value: "4.8/5", label: "Average Rating", icon: Star },
];

export default function Home() {
  const properties = getAllProperties();
  const pgs = getPropertiesByCategoryEnum("PG");
  const commercial = getPropertiesByCategoryEnum("COMMERCIAL");
  const flats = getPropertiesByCategoryEnum("FLATS");

  return (
    <>
      <Hero />
      {/* The hero's h1 is desktop-only, so the page still needs one on phones. */}
      <h1 className="sr-only lg:hidden">Find a Place You&apos;ll Love</h1>
      {/* Phones open on categories; desktop keeps the trust strip first. */}
      <div className="flex flex-col">
        <div className="lg:order-2">
          <CategoryCarousel />
        </div>
        <div className="lg:order-1">
          <FeatureStrip />
        </div>
      </div>
      <FeaturedProperties properties={properties} />
      <DualCTA />
      <ExploreCarouselSection
        title="PG & Coliving"
        subtitle="Affordable stays for students and professionals"
        viewAllHref="/search?category=PG"
        items={pgs}
      />
      <ExploreCarouselSection
        title="Coworking & Offices"
        subtitle="Professional workspaces across Delhi NCR"
        viewAllHref="/search?category=COMMERCIAL"
        items={commercial}
        className="bg-surface"
      />
      <ExploreCarouselSection
        title="Flats & Apartments"
        subtitle="Modern apartments for every budget"
        viewAllHref="/search?category=APARTMENT"
        items={flats}
      />
      <StatsSection />
    </>
  );
}

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
];

function Hero() {
  return (
    <section className="hidden bg-white pb-2 pt-6 lg:block">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-3xl">
          {/* A background image scoped to lg, because a hidden <img> would still download on phones. */}
          <div className="absolute inset-0 -z-10 bg-cover bg-[center_40%] lg:bg-[url('/mainbgimage.jpg')]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-brand-darker/70 to-brand/20" />

          <div className="grid items-end gap-8 px-4 py-8 sm:px-8 sm:py-12 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-16">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Homes for a Better Tomorrow
              </p>
              <h1 className="mt-4 max-w-xl text-[2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                Find a Place You&apos;ll <span className="text-accent">Love</span>
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85 sm:text-[15px]">
                Buy, Rent or Book PG — Verified Listings, Trusted Owners, Hassle-Free Experience
              </p>
              <div className="mt-6 sm:mt-8">
                <HeroSearch />
              </div>
            </div>

            <div className="hidden flex-col items-end pb-12 lg:flex">
              <p className="font-script mb-3 text-right text-[2.1rem] leading-none text-white drop-shadow-md">
                More Than Just a Home
              </p>
              <div className="rounded-2xl bg-white/95 p-4 shadow-pop ring-1 ring-black/5 backdrop-blur-sm">
                <div className="flex -space-x-2">
                  {AVATARS.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-brand text-[11px] font-bold text-white">
                    10K+
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-snug text-ink/70">
                  <span className="font-bold text-brand">10K+</span> Happy Families Found Their Home
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, subtitle }) => (
            <li
              key={title}
              className="group flex items-center gap-3 rounded-xl border border-line bg-white p-3 transition duration-300 hover:border-brand/30 hover:shadow-card sm:gap-4 sm:p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-light text-brand transition duration-300 group-hover:bg-brand group-hover:text-white sm:h-12 sm:w-12">
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-ink sm:text-sm">{title}</p>
                <p className="mt-0.5 hidden text-xs leading-relaxed text-muted sm:block">{subtitle}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DualCTA() {
  return (
    <section className="bg-white py-10 lg:py-12">
      <div className="container-page grid gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="group relative isolate overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-darker/95 via-brand-dark/80 to-brand/30" />
          <div className="flex min-h-[200px] flex-col justify-center p-6 sm:p-8 lg:p-10">
            <span className="badge badge-featured w-fit">Free</span>
            <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">List Your Property</h3>
            <p className="mt-1.5 max-w-xs text-sm text-white/80">Get Genuine Tenants or Buyers</p>
            <Link href="/list-your-property" className="btn btn-inverse mt-5 w-fit rounded-full">
              <Plus className="h-4 w-4" />
              List Your Property
            </Link>
          </div>
        </div>

        <div className="group relative isolate overflow-hidden rounded-2xl border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="flex min-h-[200px] flex-col justify-center p-6 sm:p-8 lg:p-10">
            <h3 className="max-w-sm text-xl font-bold text-ink sm:text-2xl">
              A Better Tomorrow Starts with a Brighter Home
            </h3>
            <Link href="/search?listingType=RENT" className="btn btn-primary mt-5 w-fit rounded-full">
              Explore Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="border-t border-line bg-white py-10">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-5 lg:items-center">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-light text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-bold text-ink">{value}</p>
                <p className="text-xs text-muted">{label}</p>
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
