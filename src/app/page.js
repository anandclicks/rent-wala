import Link from "next/link";
import data from "@/data/data.json";
import SearchBox from "@/components/SearchBox";
import PropertyCard from "@/components/PropertyCard";
import PgCard from "@/components/PgCard";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <ExploreProperties />
      <BrowseByType />
      <FeaturedPgs />
      <WhyChooseUs />
      <PopularLocations />
      <TopProjects />
      <Testimonials />
      <AppBanner />
      <Newsletter />
    </>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80"
          alt="Modern living room"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 py-16 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Find Your Perfect Property
          <br />
          <span className="text-brand">To Rent or Buy</span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
          Trusted by millions. Find verified properties with a hassle-free
          experience.
        </p>

        <div className="mt-8">
          <SearchBox />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Feature strip ---------------- */
function FeatureStrip() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {data.features.map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-light text-brand">
                <FeatureIcon name={f.icon} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{f.title}</p>
                <p className="text-xs text-muted">{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Explore properties ---------------- */
function ExploreProperties() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <SectionHeading title="Explore Properties" action="View All" />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Featured PGs ---------------- */
function FeaturedPgs() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <SectionHeading
          title="Popular PGs & Hostels"
          subtitle="Comfortable, verified paying-guest accommodations near work and college."
          action="View All"
        />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.pgs.map((pg) => (
            <PgCard key={pg.id} pg={pg} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why choose us ---------------- */
function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8">
        <div className="rounded-2xl bg-gray-50 px-6 py-12 lg:px-12">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
            Why Choose Property Rent Wala?
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {data.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <span className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-light text-brand">
                  <StatIcon label={s.label} />
                </span>
                <p className="text-2xl font-extrabold text-brand">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Browse by property type ---------------- */
function BrowseByType() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <h2 className="text-2xl font-bold text-ink sm:text-[1.7rem]">
          Browse by Property Type
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {data.propertyTypes.map((t) => (
              <Link
                key={t.title}
                href="#"
                className="flex flex-col items-center rounded-xl border border-line bg-white px-3 py-6 text-center transition hover:border-brand hover:shadow-md"
              >
                <span className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-light text-brand">
                  <TypeIcon name={t.icon} />
                </span>
                <p className="text-sm font-semibold text-ink">{t.title}</p>
                <p className="mt-0.5 text-xs text-muted">{t.subtitle}</p>
              </Link>
            ))}
          </div>

          {/* List your property promo */}
          <div className="relative overflow-hidden rounded-xl bg-brand-light p-6">
            <h3 className="text-lg font-bold text-ink">List Your Property</h3>
            <p className="mt-1 max-w-[60%] text-sm text-muted">
              Reach thousands of genuine buyers or tenants.
            </p>
            <Link
              href="#"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Post Property Now
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <svg
              className="pointer-events-none absolute -bottom-2 -right-2 h-28 w-28 text-brand/20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path d="M4 20V9l8-5 8 5v11H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Popular locations ---------------- */
function PopularLocations() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <SectionHeading title="Popular Locations" action="View All Cities" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {data.locations.map((loc) => (
            <Link
              key={loc.city}
              href="#"
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 text-white">
                <p className="text-sm font-semibold">{loc.city}</p>
                <p className="text-xs text-white/80">{loc.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Top projects ---------------- */
function TopProjects() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <SectionHeading title="Top Projects" action="View All Projects" />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.projects.map((pr) => (
            <article
              key={pr.id}
              className="group overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pr.image}
                  alt={pr.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span
                  className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white ${
                    pr.badge === "NEW LAUNCH" ? "bg-brand" : "bg-emerald-600"
                  }`}
                >
                  {pr.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-ink">{pr.name}</h3>
                <p className="mt-1 text-sm text-muted">{pr.location}</p>
                <p className="mt-2 text-base font-bold text-brand">{pr.price}</p>
                <p className="mt-1 text-xs text-muted">{pr.config}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <div className="rounded-2xl bg-brand-light px-6 py-12 lg:px-12">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
            What Our Customers Say
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {data.testimonials.map((t) => (
              <div key={t.id} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.city}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- App download banner ---------------- */
function AppBanner() {
  return (
    <section className="bg-white pb-12">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-brand px-8 py-10 text-white lg:px-12">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold sm:text-3xl">Find properties on the go!</h2>
            <p className="mt-2 text-white/85">Download the Property Rent Wala App</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <StoreBadge store="google" />
              <StoreBadge store="apple" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */
function Newsletter() {
  return (
    <section className="bg-white pb-16">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl bg-gray-50 px-6 py-8 sm:flex-row lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-light text-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-base font-semibold text-ink">
                Get the best property options in your inbox
              </p>
              <p className="text-sm text-muted">
                Subscribe to get updates on new properties & best deals
              </p>
            </div>
          </div>
          <form className="flex w-full max-w-md gap-2 sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-brand sm:w-64"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Shared bits ---------------- */
function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-ink sm:text-[1.7rem]">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href="#"
          className="shrink-0 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
        >
          {action}
        </Link>
      )}
    </div>
  );
}

function FeatureIcon({ name }) {
  const c = "h-5 w-5";
  switch (name) {
    case "verified":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "tag":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 12V5a1 1 0 011-1h7l8 8-8 8-8-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <circle cx="8.5" cy="8.5" r="1.3" fill="currentColor" />
        </svg>
      );
    case "star":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "search":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
          <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "support":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 13a8 8 0 0116 0v3a2 2 0 01-2 2h-1v-5h3M4 13v3a2 2 0 002 2h1v-5H4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function StatIcon({ label }) {
  const c = "h-6 w-6";
  if (label.includes("Cities")) {
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (label.includes("Customers")) {
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 19c1-3 3.4-4.5 6-4.5S14 16 15 19M16 5.5a3 3 0 010 5.5m5 8c-.6-2.2-2-3.5-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (label.includes("Verified")) {
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (label.includes("Support")) {
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 13a8 8 0 0116 0v3a2 2 0 01-2 2h-1v-5h3M4 13v3a2 2 0 002 2h1v-5H4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 20V9l8-5 8 5v11H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function TypeIcon({ name }) {
  const c = "h-6 w-6";
  switch (name) {
    case "apartment":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 21V4h9v17M14 21V9h5v12M8 8h3M8 12h3M8 16h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "villa":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 20V10l8-6 8 6v10H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "pg":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 21V6h10v15M14 21V11h6v10M7 9h3M7 13h3M7 17h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "land":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3c2.5 2 4 4.2 4 7 0 2.8-1.8 5-4 5s-4-2.2-4-5c0-2.8 1.5-5 4-7zM12 15v6M8 21h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "commercial":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 21V7l8-4 8 4v14H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 10h2M8 14h2M14 10h2M14 14h2M10 21v-4h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z" />
    </svg>
  );
}

function StoreBadge({ store }) {
  const isGoogle = store === "google";
  return (
    <Link
      href="#"
      className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-white transition hover:bg-black/85"
    >
      {isGoogle ? (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3.5 3.5l11 8.5-11 8.5V3.5z" fill="#34A853" />
          <path d="M14.5 12l4-3.1L20.6 10c1 .6 1 2.4 0 3l-2.1 1.1L14.5 12z" fill="#FBBC04" />
          <path d="M3.5 3.5l11 8.5-2.6 2L3.5 3.5z" fill="#4285F4" />
          <path d="M3.5 20.5l8.4-10.5 2.6 2-11 8.5z" fill="#EA4335" />
        </svg>
      ) : (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M16.4 12.6c0-2 1.6-3 1.7-3-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2.1 2.4 2 1-.1 1.3-.7 2.5-.7s1.5.7 2.6.6c1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.4-3zm-2-5.5c.5-.7.9-1.6.8-2.6-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.4-1.1z" />
        </svg>
      )}
      <span className="leading-tight">
        <span className="block text-[10px] text-white/80">
          {isGoogle ? "GET IT ON" : "Download on the"}
        </span>
        <span className="block text-sm font-semibold">
          {isGoogle ? "Google Play" : "App Store"}
        </span>
      </span>
    </Link>
  );
}
