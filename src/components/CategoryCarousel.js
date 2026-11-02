import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=70`;

const CATEGORIES = [
  { title: "Flats / Apartments", image: img("1502672260266-1c1ef2d93688"), href: "/search?category=APARTMENT" },
  { title: "PG / Hostels", image: img("1631049307264-da0ec9d70304"), href: "/search?category=PG" },
  { title: "Coworking Spaces", image: img("1497366811353-6870744d04b2"), href: "/search?category=COMMERCIAL" },
  { title: "Independent House", image: img("1560518883-ce09059eeffa"), href: "/search?category=INDEPENDENT_HOUSE" },
  { title: "Villas", image: img("1613490493576-7fde63acd811"), href: "/search?category=VILLA" },
  { title: "Kitchen Flats", image: img("1556911220-bff31c812dba"), href: "/search?kitchen=1&listingType=RENT" },
  { title: "Lands & Plots", image: img("1500382017468-9049fed747ef"), href: "/search?category=LAND" },
  { title: "Offices & Shops", image: img("1497366216548-37526070297c"), href: "/search?category=COMMERCIAL" },
];

/** OLX-style category tiles: square image tile with the label underneath. */
export default function CategoryCarousel() {
  return (
    <section className="bg-white py-10 lg:py-12">
      <div className="container-page">
        <SectionHeader title="Explore by Category" subtitle="Find the right space for your lifestyle" href="/search?listingType=RENT" linkLabel="All properties" />

        <ul className="no-scrollbar -mx-4 mt-6 grid snap-x auto-cols-[104px] grid-flow-col grid-rows-2 gap-x-3 gap-y-5 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 md:mx-0 md:grid-flow-row md:grid-cols-8 md:grid-rows-none md:gap-4 md:overflow-visible md:px-0 lg:gap-5">
          {CATEGORIES.map((cat) => (
            <li key={cat.title} className="snap-start">
              <Link href={cat.href} className="group flex flex-col items-center gap-2.5 text-center outline-none">
                <span className="relative block aspect-square w-full overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover group-hover:ring-brand/40 group-focus-visible:ring-4 group-focus-visible:ring-brand/25">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </span>
                <span className="text-[13px] font-medium leading-snug text-ink transition group-hover:text-brand sm:text-sm">
                  {cat.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
