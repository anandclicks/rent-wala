"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AmenityIcon } from "./icons";

const INITIAL_COUNT = 12;

export default function PropertyAmenities({ amenities: rawAmenities }) {
  const [showAll, setShowAll] = useState(false);
  // Scraped data can repeat entries (e.g. "Meeting Rooms" three times).
  const amenities = [...new Set(rawAmenities || [])];
  if (!amenities.length) return null;

  const hasMore = amenities.length > INITIAL_COUNT;
  const visible = showAll ? amenities : amenities.slice(0, INITIAL_COUNT);

  return (
    <section className="card-section">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-ink">Amenities</h2>
        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="link text-sm"
          >
            {showAll ? "Show less" : `View all ${amenities.length}`}
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {visible.map((name) => (
          <div
            key={name}
            className="group flex animate-fade-in items-center gap-3 rounded-xl border border-line px-3 py-3 transition duration-200 hover:border-brand/30 hover:bg-brand-soft"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white">
              <AmenityIcon name={name} className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[13px] font-medium leading-snug text-ink">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
