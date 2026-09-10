"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "House", value: "INDEPENDENT_HOUSE" },
  { label: "Apartment", value: "APARTMENT" },
  { label: "Villa", value: "VILLA" },
  { label: "Builder Floor", value: "BUILDER_FLOOR" },
  { label: "Plot", value: "LAND" },
  { label: "Penthouse", value: "PENTHOUSE" },
  { label: "Studio", value: "STUDIO" },
  { label: "PG", value: "PG" },
  { label: "Commercial", value: "COMMERCIAL" },
];

const BHK_OPTIONS = ["Any", "1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
const FURNISHING = ["Fully Furnished", "Semi-Furnished", "Unfurnished"];

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  const category = searchParams.get("category") || "";
  const listingType = searchParams.get("listingType") || "";
  const bhk = searchParams.get("bhk") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const furnishing = searchParams.get("furnishing") || "";

  return (
    <aside className="space-y-6 rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-bold text-ink">Property Type</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => update("category", c.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                category === c.value
                  ? "bg-brand-dark text-white"
                  : "bg-gray-100 text-ink hover:bg-brand-soft"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-ink">I want to</p>
        <div className="mt-3 flex gap-4">
          {[
            { label: "Rent", value: "RENT" },
            { label: "Buy", value: "SELL" },
          ].map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="listingType"
                checked={listingType === opt.value}
                onChange={() => update("listingType", opt.value)}
                className="accent-brand-dark"
              />
              {opt.label}
            </label>
          ))}
          {listingType && (
            <button
              type="button"
              onClick={() => update("listingType", "")}
              className="text-xs text-muted hover:text-brand-dark"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-ink">Budget (₹)</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
            className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-dark"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-dark"
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-ink">BHK</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {BHK_OPTIONS.map((opt) => {
            const val = opt === "Any" ? "" : opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => update("bhk", val)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  bhk === val
                    ? "bg-brand-dark text-white"
                    : "bg-gray-100 text-ink hover:bg-brand-soft"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-ink">Furnishing</p>
        <div className="mt-3 space-y-2">
          {FURNISHING.map((f) => (
            <label key={f} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={furnishing === f}
                onChange={() => update("furnishing", furnishing === f ? "" : f)}
                className="accent-brand-dark"
              />
              {f}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
