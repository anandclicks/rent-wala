"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import data from "@/data/data.json";
import CustomSelect from "@/components/CustomSelect";
import {
  BHK_HERO_OPTIONS,
  LOOKING_FOR_OPTIONS,
  buildSearchQuery,
  mapLookingFor,
  parseLocationInput,
  showsBhkForLookingFor,
} from "@/lib/search";

const BUDGET_OPTIONS = [
  { label: "Any", min: "", max: "" },
  { label: "Under ₹15,000", min: "", max: "15000" },
  { label: "₹15,000 – ₹30,000", min: "15000", max: "30000" },
  { label: "₹30,000 – ₹50,000", min: "30000", max: "50000" },
  { label: "Above ₹50,000", min: "50000", max: "" },
];

const POPULAR = [
  { label: "PG in Sector 62", location: "Sector 62, Noida", lookingFor: "pg" },
  { label: "Coworking in Gurugram", location: "Gurugram", lookingFor: "commercial" },
  { label: "Coliving in South Delhi", location: "South Delhi", lookingFor: "pg" },
  { label: "Kitchen flat Noida", location: "Noida", lookingFor: "kitchen" },
];

export default function HeroSearch({ variant = "legacy" }) {
  const isHome = variant === "home";
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
      const mapped = mapLookingFor(selectedLooking);
      const parsed = parseLocationInput(loc, selectedCity);
      const budget = BUDGET_OPTIONS[budgetIdx];

      const query = buildSearchQuery({
        city: selectedCity || parsed.city,
        locality: parsed.locality,
        location: loc,
        type: mapped.type,
        category: mapped.category,
        listingType: mapped.listingType,
        kitchen: mapped.kitchen,
        bhk: selectedBhk,
      });
      const params = new URLSearchParams(query);
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
  const shellClass = isHome
    ? "overflow-visible rounded-2xl border border-line bg-white p-4 shadow-lg ring-1 ring-line/60 sm:p-5"
    : "overflow-visible rounded-[1.75rem] bg-black/15 p-4 shadow-2xl shadow-black/15 ring-1 ring-white/35 backdrop-blur-xl sm:p-5";
  const popularChipClass = isHome
    ? "rounded-full border border-line bg-brand-soft/50 px-3 py-1 text-xs font-medium text-ink transition hover:bg-brand-soft"
    : "rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-medium text-white/95 backdrop-blur-sm transition hover:bg-white/20";
  const popularLabelClass = isHome ? "text-xs font-medium text-muted" : "text-xs font-medium text-white/90";

  return (
    <div className="w-full max-w-[720px]">
      <div className={shellClass}>
        <div className="grid gap-3 sm:grid-cols-2">
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
        </div>

        {showBhk && (
          <div className="mt-3">
            <CustomSelect
              ariaLabel="BHK configuration"
              value={bhk}
              onChange={setBhk}
              options={bhkOptions}
              placeholder="BHK / RK"
            />
          </div>
        )}

        <div className="relative z-10 mt-4 flex flex-col overflow-visible rounded-2xl bg-brand-soft/30 ring-1 ring-line/50 lg:flex-row lg:items-stretch">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 px-4 py-3.5">
            <PinIcon className="h-[18px] w-[18px] shrink-0 text-brand-dark" />
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
          </div>

          <Divider className="hidden lg:block" />
          <Divider className="lg:hidden" horizontal />

          <div className="px-4 py-3.5 lg:min-w-[140px]">
            <CustomSelect
              ariaLabel="Budget"
              value={budgetIdx}
              onChange={setBudgetIdx}
              options={budgetSelectOptions}
              placeholder="Budget"
              variant="inline"
              align="right"
            />
          </div>

          <button
            type="button"
            onClick={() => runSearch()}
            className="flex items-center justify-center gap-2 rounded-b-2xl bg-brand-dark px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-darker lg:rounded-none lg:rounded-r-2xl lg:px-10"
          >
            <SearchIcon className="h-4 w-4" />
            Search
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={popularLabelClass}>Popular:</span>
          {POPULAR.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => {
                setLocation(tag.location);
                setLookingFor(tag.lookingFor);
                runSearch({ location: tag.location, lookingFor: tag.lookingFor });
              }}
              className={popularChipClass}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      <datalist id="hero-localities">
        {data.localities.map((l) => (
          <option key={l.name} value={`${l.name}, ${l.city}`} />
        ))}
        {data.cities.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      {error && (
        <p className={`mt-2 text-xs font-medium ${isHome ? "text-red-600" : "text-red-200"}`}>{error}</p>
      )}
    </div>
  );
}

function Divider({ horizontal, className = "" }) {
  if (horizontal) {
    return <div className={`mx-4 h-px bg-line ${className}`} />;
  }
  return <div className={`my-3 w-px self-stretch bg-line ${className}`} />;
}

function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
