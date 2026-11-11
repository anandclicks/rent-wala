"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import data from "@/data/data.json";
import { IndianRupee, MapPin, Search, TrendingUp } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import {
  BHK_HERO_OPTIONS,
  LOOKING_FOR_OPTIONS,
  buildSearchQuery,
  parseLocationInput,
  showsBhkForLookingFor,
} from "@/lib/search";
import { withCategory } from "@/data/categories";

const BUDGET_OPTIONS = [
  { label: "Any", min: "", max: "" },
  { label: "Under ₹15,000", min: "", max: "15000" },
  { label: "₹15,000 – ₹30,000", min: "15000", max: "30000" },
  { label: "₹30,000 – ₹50,000", min: "30000", max: "50000" },
  { label: "Above ₹50,000", min: "50000", max: "" },
];

const POPULAR = [
  { label: "PG in Sector 62", location: "Sector 62, Noida", lookingFor: "pg" },
  { label: "Coworking in Gurugram", location: "Gurugram", lookingFor: "coworking" },
  { label: "Coliving in South Delhi", location: "South Delhi", lookingFor: "pg" },
  { label: "Flats in Noida", location: "Noida", lookingFor: "flats" },
];

export default function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [city, setCity] = useState("");
  const [bhk, setBhk] = useState("");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [error, setError] = useState("");

  const runSearch = useCallback(
    (overrides = {}) => {
      const loc = overrides.location ?? location;
      const selectedCity = overrides.city ?? city;
      const selectedLooking = overrides.lookingFor ?? lookingFor;
      const selectedBhk = overrides.bhk ?? bhk;

      if (!loc.trim() && !selectedCity && !selectedLooking) {
        setError("Please enter a location or choose city & property type.");
        return;
      }

      setError("");
      const parsed = parseLocationInput(loc, selectedCity);
      const budget = BUDGET_OPTIONS[budgetIdx];

      const query = buildSearchQuery({
        city: selectedCity || parsed.city,
        locality: parsed.locality,
        location: loc,
        listingType: selectedLooking ? "RENT" : "",
      });
      const params = withCategory(new URLSearchParams(query), selectedLooking);
      if (selectedBhk) params.set("bhk", selectedBhk);
      if (budget.min) params.set("minPrice", budget.min);
      if (budget.max) params.set("maxPrice", budget.max);
      router.push(`/search?${params.toString()}`);
    },
    [location, city, lookingFor, bhk, budgetIdx, router]
  );

  const lookingForOptions = useMemo(
    () => [{ value: "", label: "Looking for" }, ...LOOKING_FOR_OPTIONS],
    []
  );
  const cityOptions = useMemo(
    () => [{ value: "", label: "All cities" }, ...data.cities.map((c) => ({ value: c, label: c }))],
    []
  );
  const bhkOptions = useMemo(
    () => [{ value: "", label: "BHK / RK" }, ...BHK_HERO_OPTIONS.map((b) => ({ value: b, label: b }))],
    []
  );
  const budgetSelectOptions = useMemo(
    () => BUDGET_OPTIONS.map((b, i) => ({ value: i, label: b.label })),
    []
  );

  const showBhk = showsBhkForLookingFor(lookingFor);

  return (
    <div className="w-full max-w-[760px]">
      <div className="rounded-2xl bg-white p-3 shadow-pop ring-1 ring-black/5 sm:p-4">
        <div className={`grid gap-2.5 sm:gap-3 ${showBhk ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          <CustomSelect
            ariaLabel="Looking for"
            value={lookingFor}
            onChange={(v) => {
              setLookingFor(v);
              if (!showsBhkForLookingFor(v)) setBhk("");
            }}
            options={lookingForOptions}
            placeholder="Looking for"
          />
          <CustomSelect
            ariaLabel="City"
            value={city}
            onChange={setCity}
            options={cityOptions}
            placeholder="City"
          />
          {showBhk && (
            <div className="animate-fade-in">
              <CustomSelect
                ariaLabel="BHK configuration"
                value={bhk}
                onChange={setBhk}
                options={bhkOptions}
                placeholder="BHK / RK"
              />
            </div>
          )}
        </div>

        <div className="mt-2.5 flex flex-col gap-2.5 sm:mt-3 lg:flex-row lg:items-stretch lg:gap-0 lg:overflow-visible lg:rounded-xl lg:border lg:border-line lg:transition lg:focus-within:border-brand lg:focus-within:ring-4 lg:focus-within:ring-brand/10">
          <label className="flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-line px-3.5 transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10 lg:rounded-none lg:border-0 lg:focus-within:ring-0">
            <MapPin className="h-5 w-5 text-brand" />
            <span className="sr-only">Location</span>
            <input
              list="hero-localities"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setError("");
                const parsed = parseLocationInput(e.target.value, city);
                if (parsed.city && !city) setCity(parsed.city);
              }}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              placeholder="Enter location, sector or landmark"
              className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/80"
            />
          </label>

          <span aria-hidden className="my-3 hidden w-px bg-line lg:block" />

          <div className="flex h-12 items-center gap-2 rounded-lg border border-line px-3.5 lg:min-w-[170px] lg:rounded-none lg:border-0">
            <IndianRupee className="h-4 w-4 text-muted" />
            <CustomSelect
              ariaLabel="Budget"
              value={budgetIdx}
              onChange={setBudgetIdx}
              options={budgetSelectOptions}
              placeholder="Budget"
              variant="inline"
              align="right"
              className="flex-1"
            />
          </div>

          <button
            type="button"
            onClick={() => runSearch()}
            className="btn btn-primary btn-lg lg:h-auto lg:rounded-l-none lg:rounded-r-[11px] lg:px-8"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-2 animate-fade-in text-xs font-medium text-danger">
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
              setLocation(tag.location);
              setLookingFor(tag.lookingFor);
              runSearch({ location: tag.location, lookingFor: tag.lookingFor });
            }}
            className="h-8 cursor-pointer rounded-full border border-white/30 bg-white/10 px-3 text-xs font-medium text-white backdrop-blur-sm transition duration-200 hover:border-white/60 hover:bg-white/20 active:scale-[0.97]"
          >
            {tag.label}
          </button>
        ))}
      </div>

      <datalist id="hero-localities">
        {data.localities.map((l) => (
          <option key={`${l.name}-${l.city}`} value={`${l.name}, ${l.city}`} />
        ))}
        {data.cities.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </div>
  );
}
