"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";

const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Flats", value: "FLATS" },
  { label: "PG/Hostel", value: "PG" },
  { label: "Villa", value: "VILLA" },
  { label: "Independent House", value: "INDEPENDENT_HOUSE" },
];

const FLAT_CATS = new Set(["APARTMENT", "STUDIO", "BUILDER_FLOOR"]);

export default function FeaturedProperties({ properties }) {
  const [active, setActive] = useState("ALL");

  const filtered = useMemo(() => {
    if (active === "ALL") return properties;
    if (active === "FLATS") return properties.filter((p) => FLAT_CATS.has(p.categoryEnum));
    return properties.filter((p) => p.categoryEnum === active);
  }, [properties, active]);

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-[1.75rem]">Featured Properties</h2>
            <p className="mt-1 text-sm text-muted">Handpicked listings just for you</p>
          </div>
          <Link
            href="/search?city=Noida"
            className="text-sm font-semibold text-brand-dark transition hover:text-brand-darker"
          >
            View All →
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === f.value
                  ? "bg-brand-dark text-white"
                  : "bg-brand-soft text-ink/70 hover:bg-brand-light hover:text-brand-dark"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.slice(0, 8).map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted">No properties in this category yet.</p>
        )}
      </div>
    </section>
  );
}
