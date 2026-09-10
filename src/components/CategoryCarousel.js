import Link from "next/link";
import Carousel from "@/components/Carousel";

const CATEGORIES = [
  {
    title: "Flats / Apartments",
    subtitle: "Buy or Rent",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    href: "/search?category=APARTMENT&city=Noida",
  },
  {
    title: "PG / Hostels",
    subtitle: "Single to Triple Sharing",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    href: "/search?category=PG&city=Noida",
  },
  {
    title: "Villas & Independent Houses",
    subtitle: "Luxury Living",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    href: "/search?category=VILLA&city=Gurugram",
  },
  {
    title: "Plots & Commercial",
    subtitle: "Investment & Business",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    href: "/search?category=COMMERCIAL&city=Noida",
  },
];

export default function CategoryCarousel() {
  return (
    <section className="bg-brand-soft/40 py-14">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-[1.75rem]">Explore by Category</h2>
            <p className="mt-1 text-sm text-muted">Find the right space for your lifestyle</p>
          </div>
        </div>

        <Carousel className="mt-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:w-[280px]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-bold text-ink">{cat.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{cat.subtitle}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-dark transition group-hover:bg-brand-dark group-hover:text-white">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
