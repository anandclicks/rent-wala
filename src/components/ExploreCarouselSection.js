import Carousel from "@/components/Carousel";
import PropertyCard from "@/components/PropertyCard";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ExploreCarouselSection({ title, subtitle, viewAllHref, items, className = "bg-white" }) {
  if (!items?.length) return null;

  return (
    <section className={className}>
      <div className="container-page py-10 lg:py-12">
        <SectionHeader title={title} subtitle={subtitle} href={viewAllHref} />
        <Carousel className="mt-6">
          {items.map((p) => (
            <div key={p.id || p.slug} className="w-[260px] shrink-0 snap-start sm:w-[290px]">
              <PropertyCard property={p} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
