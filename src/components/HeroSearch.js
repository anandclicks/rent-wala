"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import data from "@/data/data.json";
import { Search, TrendingUp } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import {
  BHK_HERO_OPTIONS,
  LOOKING_FOR_OPTIONS,
  buildSearchQuery,
  parseLocationInput,
  showsBhkForLookingFor,
} from "@/lib/search";
import { SHARING_LABELS, withCategory } from "@/data/categories";

/** Rooms are sized by room count; each maps to the BHK filter the listings use. */
const ROOM_OPTIONS = [
  { value: "1 BHK", label: "1 Room" },
  { value: "2 BHK", label: "2 Rooms" },
  { value: "3 BHK", label: "3 Rooms" },
];

const POPULAR = [
  { label: "PG in Sector 62", location: "Sector 62, Noida", lookingFor: "pg" },
  { label: "Coworking in Gurugram", location: "Gurugram", lookingFor: "coworking" },
  { label: "Coliving in South Delhi", location: "South Delhi", lookingFor: "pg" },
  { label: "Flats in Noida", location: "Noida", lookingFor: "flats" },
];

/**
 * The extra dropdown for a property type and the URL param it sets:
 * Rooms → room count, PG / Hostels → sharing, flats & houses → BHK / RK.
 */
function sizeSelectFor(lookingFor) {
  if (lookingFor === "rooms") {
    return { label: "Rooms", param: "bhk", options: [{ value: "", label: "Any rooms" }, ...ROOM_OPTIONS] };
  }
  if (lookingFor === "pg") {
    return {
      label: "Sharing",
      param: "sharing",
      options: [
        { value: "", label: "Any sharing" },
        ...Object.entries(SHARING_LABELS).map(([value, label]) => ({ value, label })),
      ],
    };
  }
  if (showsBhkForLookingFor(lookingFor)) {
    return {
      label: "BHK / RK",
      param: "bhk",
      options: [{ value: "", label: "Any BHK / RK" }, ...BHK_HERO_OPTIONS.map((b) => ({ value: b, label: b }))],
    };
  }
  return null;
}

export default function HeroSearch() {
  const router = useRouter();
  const [lookingFor, setLookingFor] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState("");

  const runSearch = useCallback(
    (overrides = {}) => {
      // Only the "Popular" chips pass a location; the form itself searches by type + city.
      const loc = overrides.location ?? "";
      const selectedCity = overrides.city ?? city;
      const selectedLooking = overrides.lookingFor ?? lookingFor;
      const selectedSize = overrides.size ?? size;

      if (!loc.trim() && !selectedCity && !selectedLooking) {
        setError("Please choose what you're looking for or a city.");
        return;
      }

      setError("");
      const parsed = parseLocationInput(loc, selectedCity);
      const query = buildSearchQuery({
        city: selectedCity || parsed.city,
        locality: parsed.locality,
        location: loc,
        listingType: selectedLooking ? "RENT" : "",
      });
      const params = withCategory(new URLSearchParams(query), selectedLooking);
      const sizeParam = sizeSelectFor(selectedLooking)?.param;
      if (selectedSize && sizeParam) params.set(sizeParam, selectedSize);
      router.push(`/search?${params.toString()}`);
    },
    [city, lookingFor, size, router]
  );

  const lookingForOptions = useMemo(
    () => [{ value: "", label: "Looking for" }, ...LOOKING_FOR_OPTIONS],
    []
  );
  const cityOptions = useMemo(
    () => [{ value: "", label: "All cities" }, ...data.cities.map((c) => ({ value: c, label: c }))],
    []
  );

  const sizeSelect = sizeSelectFor(lookingFor);

  return (
    <div className="w-full max-w-[760px]">
      <div className="rounded-2xl bg-white p-2.5 shadow-pop ring-1 ring-black/5 sm:p-3">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-2">
          <div
            className={`grid min-w-0 flex-1 gap-2.5 sm:grid-cols-2 lg:gap-2 ${
              sizeSelect ? "lg:grid-cols-3" : "lg:grid-cols-2"
            }`}
          >
            <CustomSelect
              ariaLabel="Looking for"
              value={lookingFor}
              onChange={(v) => {
                setLookingFor(v);
                setSize("");
                setError("");
              }}
              options={lookingForOptions}
              placeholder="Looking for"
            />
            <CustomSelect
              ariaLabel="City"
              value={city}
              onChange={(v) => {
                setCity(v);
                setError("");
              }}
              options={cityOptions}
              placeholder="City"
            />
            {sizeSelect && (
              <div key={sizeSelect.label} className="animate-fade-in sm:col-span-2 lg:col-span-1">
                <CustomSelect
                  ariaLabel={sizeSelect.label}
                  value={size}
                  onChange={setSize}
                  options={sizeSelect.options}
                  placeholder={sizeSelect.label}
                />
              </div>
            )}
          </div>

          <button type="button" onClick={() => runSearch()} className="btn btn-primary h-11 shrink-0 px-7">
            <Search className="h-[18px] w-[18px]" />
            Search
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-2 animate-fade-in px-1 text-xs font-medium text-danger">
            {error}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-xs font-medium text-white/90">
          <TrendingUp className="h-4 w-4" />
          Popular:
        </span>
        {POPULAR.map((tag) => (
          <button
            key={tag.label}
            type="button"
            onClick={() => {
              setLookingFor(tag.lookingFor);
              runSearch({ location: tag.location, lookingFor: tag.lookingFor, size: "" });
            }}
            className="h-8 cursor-pointer rounded-full border border-white/30 bg-white/10 px-3 text-xs font-medium text-white backdrop-blur-sm transition duration-200 hover:border-white/60 hover:bg-white/20 active:scale-[0.97]"
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}
