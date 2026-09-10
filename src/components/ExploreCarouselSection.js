import Link from "next/link";
import Carousel from "@/components/Carousel";
import PropertyCard from "@/components/PropertyCard";

export default function ExploreCarouselSection({ title, subtitle, viewAllHref, items, className = "bg-white" }) {
  if (!items?.length) return null;

  return (
    <section className={className}>
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-[1.7rem]">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="shrink-0 text-sm font-semibold text-brand-dark transition hover:text-brand-darker"
            >
              View All →
            </Link>
          )}
        </div>
        <Carousel className="mt-6">
          {items.map((p) => (
            <div key={p.id || p.slug} className="w-[280px] shrink-0 snap-start sm:w-[300px]">
              <PropertyCard property={p} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
