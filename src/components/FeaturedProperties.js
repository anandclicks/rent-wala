"use client";

import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROPERTY_CATEGORIES, cardMatchesCategory, getCategory } from "@/data/categories";

const FILTERS = [
  { label: "All", value: "ALL" },
  ...PROPERTY_CATEGORIES.map((c) => ({ label: c.label, value: c.key })),
];

export default function FeaturedProperties({ properties }) {
  const [active, setActive] = useState("ALL");

  const filtered = useMemo(() => {
    const category = getCategory(active);
    if (!category) return properties;
    return properties.filter((p) => cardMatchesCategory(p, category));
  }, [properties, active]);

  return (
    <section className="bg-surface py-10 lg:py-14">
      <div className="container-page">
        <SectionHeader title="Featured Properties" subtitle="Handpicked listings just for you" href="/search?listingType=RENT" />

        <div role="tablist" aria-label="Filter by property type" className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={active === f.value}
              onClick={() => setActive(f.value)}
              className={`chip ${active === f.value ? "chip-active" : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div key={active} className="mt-6 grid animate-fade-up grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filtered.slice(0, 8).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <p className="card mt-6 px-6 py-12 text-center text-sm text-muted">No properties in this category yet.</p>
        )}
      </div>
    </section>
  );
}
