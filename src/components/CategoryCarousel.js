import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGE_SOFTEN, HERO_SHADE } from "@/lib/hero-style";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROPERTY_CATEGORIES, categoryHref } from "@/data/categories";
import {
  ART_CIRCLE_STYLE as CIRCLE_STYLE,
  CATEGORY_ART,
} from "@/components/CategoryIllustrations";
import CitySelect from "@/components/home/CitySelect";

const CATEGORIES = PROPERTY_CATEGORIES.map((c) => ({
  title: c.label,
  Art: CATEGORY_ART[c.key],
  href: categoryHref(c),
}));

/**
 * Phone version of the desktop hero banner (the desktop one is hidden below lg).
 * `sizes` makes desktop pick the tiniest srcset entry, so the hidden image costs nothing there,
 * while phones get a resized copy instead of the 21 MB original.
 */
function PhoneHero() {
  return (
    <div className="relative isolate mb-8 overflow-hidden rounded-2xl px-5 py-9 lg:hidden">
      <Image
        src="/mainbgimage.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 1px, 100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-10 object-cover"
        style={{ objectPosition: "center 40%", ...HERO_IMAGE_SOFTEN }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-brand-darker/70 to-brand/20" />
      <div className="absolute inset-0 -z-10" style={HERO_SHADE} />
      <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Homes for a Better Tomorrow
      </p>
      <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-white">
        Find a Place You&apos;ll Love
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-white/85">
        Buy, Rent or Book PG — Verified Listings, Trusted Owners
      </p>
    </div>
  );
}

/** Category tiles: round line-art illustration with the label underneath. */
export default function CategoryCarousel() {
  return (
    <section className="bg-white pb-2 pt-4 md:pb-10 lg:py-12">
      <div className="container-page">
        <PhoneHero />
        <CitySelect />

        {/*
          Phones skip "Explore by Category" for now: tapping a city above already opens every category.
          Tablet: 5 per row. Laptop: all 9 in one row.
        */}
        <div className="hidden md:block">
          <SectionHeader
            title="Explore by Category"
            subtitle="Find the right space for your lifestyle"
            href="/search?listingType=RENT"
            linkLabel="All properties"
          />

          <ul className="mt-6 grid grid-cols-5 gap-4 lg:grid-cols-9 lg:gap-5">
            {CATEGORIES.map(({ title, Art, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="group flex flex-col items-center gap-2.5 text-center outline-none"
                >
                  <span
                    className="flex aspect-square items-center justify-center rounded-full ring-1 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover group-focus-visible:ring-4 w-full max-w-28"
                    style={CIRCLE_STYLE}
                  >
                    <Art
                      className="transition duration-300 group-hover:scale-110"
                      style={{ width: "58%", height: "58%" }}
                    />
                  </span>
                  <span className="text-xs font-medium leading-tight text-ink/80 transition group-hover:text-brand">
                    {title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
