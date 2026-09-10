import PropertyCard from "@/components/PropertyCard";

export default function PropertyNearbyCarousel({ nearby, city }) {
  if (!nearby?.length) return null;

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-10 lg:px-6">
      <h2 className="text-base font-bold text-ink">Nearby Properties in {city}</h2>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {nearby.map((p) => (
          <div key={p.id} className="w-[280px] shrink-0 snap-start sm:w-[300px]">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
