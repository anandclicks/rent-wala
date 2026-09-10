"use client";

import { useState } from "react";
import { AmenityIcon } from "./icons";

const INITIAL_COUNT = 12;

export default function PropertyAmenities({ amenities }) {
  const [showAll, setShowAll] = useState(false);
  if (!amenities?.length) return null;

  const hasMore = amenities.length > INITIAL_COUNT;
  const visible = showAll ? amenities : amenities.slice(0, INITIAL_COUNT);

  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-ink">Amenities</h2>
        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="text-sm font-semibold text-brand-dark hover:underline"
          >
            {showAll ? "Show less" : "View All Amenities"}
          </button>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 rounded-xl border border-line bg-brand-soft/30 px-3 py-4 text-center"
          >
            <AmenityIcon name={name} className="h-6 w-6 text-brand-dark" />
            <span className="text-xs font-medium leading-snug text-ink">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
