"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import data from "@/data/data.json";
import CustomSelect from "@/components/CustomSelect";
import { buildSearchQuery, parseLocationInput } from "@/lib/search";

const HERO_TABS = [
  { label: "Buy", listingType: "SELL", type: "" },
  { label: "Rent", listingType: "RENT", type: "" },
  { label: "PG/Hostel", listingType: "RENT", type: "PG / Hostel" },
  { label: "Villa", listingType: "", type: "Villa" },
  { label: "Independent House", listingType: "", type: "Independent House" },
];

const PROPERTY_TYPES = ["Apartment", "Villa", "Independent House", "Plot", "PG / Hostel", "Office Space"];
const BUDGET_OPTIONS = [
  { label: "Any", min: "", max: "" },
  { label: "Under ₹15,000", min: "", max: "15000" },
  { label: "₹15,000 – ₹30,000", min: "15000", max: "30000" },
  { label: "₹30,000 – ₹50,000", min: "30000", max: "50000" },
  { label: "Above ₹50,000", min: "50000", max: "" },
  { label: "Under ₹50 Lakh", min: "", max: "5000000" },
  { label: "₹50 Lakh – ₹1 Cr", min: "5000000", max: "10000000" },
  { label: "Above ₹1 Cr", min: "10000000", max: "" },
];

const POPULAR = [
  { label: "2 BHK in Delhi", location: "Delhi", type: "Apartment" },
  { label: "PG in Bangalore", location: "Bangalore", type: "PG / Hostel" },
  { label: "Villa in Goa", location: "Gurugram", type: "Villa" },
  { label: "Independent House in Noida", location: "Noida", type: "Independent House" },
];

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const runSearch = useCallback(
    (overrides = {}) => {
      const tab = HERO_TABS[activeTab];
      const loc = overrides.location ?? location;
      const selectedCity = overrides.city ?? city;
      const parsed = parseLocationInput(loc, selectedCity);
      if (!parsed.city) {
        setError("Please enter a location or select a city.");
        return;
      }
      setError("");
      const budget = BUDGET_OPTIONS[budgetIdx];
      const type = overrides.type ?? (propertyType || tab.type);
      const query = buildSearchQuery({
        city: parsed.city,
        locality: parsed.locality,
        location: loc,
        type,
        listingType: tab.listingType,
      });
      const params = new URLSearchParams(query);
      if (budget.min) params.set("minPrice", budget.min);
      if (budget.max) params.set("maxPrice", budget.max);
      router.push(`/search?${params.toString()}`);
    },
    [activeTab, location, city, propertyType, budgetIdx, router]
  );

  const handleTab = (idx) => {
    setActiveTab(idx);
    const tab = HERO_TABS[idx];
    if (tab.type) setPropertyType(tab.type);
    else setPropertyType("");
  };

  const typeOptions = useMemo(
    () => [{ value: "", label: "Any" }, ...PROPERTY_TYPES.map((t) => ({ value: t, label: t }))],
    []
  );
  const budgetSelectOptions = useMemo(
    () => BUDGET_OPTIONS.map((b, i) => ({ value: i, label: b.label })),
    []
  );

  return (
    <div className="w-full max-w-[720px]">
      <div className="overflow-visible rounded-[1.75rem] bg-black/15 p-4 shadow-2xl shadow-black/15 ring-1 ring-white/35 backdrop-blur-xl sm:p-5">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {HERO_TABS.map((tab, idx) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => handleTab(idx)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === idx
                  ? "bg-brand-dark text-white shadow-sm"
                  : "text-white/85 hover:bg-white/15 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* White search bar — single row with dividers */}
        <div className="relative z-10 mt-4 flex flex-col overflow-visible rounded-2xl bg-white shadow-md lg:flex-row lg:items-stretch">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 px-4 py-3.5">
            <PinIcon className="h-[18px] w-[18px] shrink-0 text-brand-dark" />
            <input
              list="hero-localities"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setError("");
                const parsed = parseLocationInput(e.target.value, city);
                if (parsed.city) setCity(parsed.city);
              }}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              placeholder="Enter location, city or landmark"
              className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/80"
            />
          </div>

          <Divider className="hidden lg:block" />
          <Divider className="lg:hidden" horizontal />

          <div className="px-4 py-3.5 lg:min-w-[160px]">
            <CustomSelect
              ariaLabel="Property type"
              value={propertyType}
              onChange={setPropertyType}
              options={typeOptions}
              placeholder="Any"
              variant="inline"
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
            className="flex items-center justify-center gap-2 bg-brand-dark px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-darker lg:px-10"
          >
            <SearchIcon className="h-4 w-4" />
            Search
          </button>
        </div>

        {/* Popular searches inside glass box */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-white/90">Popular Searches:</span>
          {POPULAR.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => {
                setLocation(tag.location);
                setCity(tag.location);
                setPropertyType(tag.type);
                runSearch({ location: tag.location, city: tag.location, type: tag.type });
              }}
              className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-medium text-white/95 backdrop-blur-sm transition hover:bg-white/20"
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

      {error && <p className="mt-2 text-xs font-medium text-red-200">{error}</p>}
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

