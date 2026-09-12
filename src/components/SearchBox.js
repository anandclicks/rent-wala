"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import data from "@/data/data.json";
import CustomSelect from "@/components/CustomSelect";
import {
  buildSearchQuery,
  mapCategoryToType,
  parseLocationInput,
} from "@/lib/search";

const PROPERTY_TYPES = ["Apartment", "Villa", "Independent House", "Plot", "PG / Hostel", "Office Space"];
const CATEGORIES = ["HOMES", "PG", "VILLAS", "MORE"];

const CITY_ALIASES = {
  Noida: ["noida", "greater noida", "delhi ncr"],
};

function matchSupportedCity(...values) {
  const haystack = values.filter(Boolean).join(" ").toLowerCase();
  for (const city of data.cities) {
    if (haystack.includes(city.toLowerCase())) return city;
    for (const alias of CITY_ALIASES[city] || []) {
      if (haystack.includes(alias)) return city;
    }
  }
  return "";
}

async function reverseGeocode(lat, lon) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  );
  if (!res.ok) throw new Error("Could not fetch location details");
  return res.json();
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function LocateIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function SearchBox({
  variant = "default",
  initialLocation = "",
  initialCity = "",
  initialType = "",
  initialCategory = "",
  preserveQuery = "",
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Rent");
  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState(initialType || mapCategoryToType(initialCategory));
  const [city, setCity] = useState(initialCity);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");
  const [searchError, setSearchError] = useState("");
  const isHero = variant === "hero";
  const isSearchPage = variant === "search";

  useEffect(() => {
    if (!isSearchPage) return;
    setCity(initialCity);
    setPropertyType(initialType || mapCategoryToType(initialCategory));
    setLocation(initialLocation);
  }, [isSearchPage, initialCity, initialType, initialCategory, initialLocation]);

  const pushSearch = useCallback(
    (overrides = {}) => {
      const loc = overrides.location ?? location;
      const selectedCity = overrides.city ?? city;
      const selectedType = overrides.type ?? propertyType;
      const parsed = parseLocationInput(loc, selectedCity);

      if (!parsed.city) {
        setSearchError("Please detect location or select a city to search nearby properties.");
        return;
      }

      setSearchError("");
      const query = buildSearchQuery({
        city: parsed.city,
        locality: parsed.locality,
        location: loc,
        type: selectedType,
        category:
          overrides.category ??
          (selectedType ? "" : new URLSearchParams(preserveQuery).get("category") || ""),
        listingType: new URLSearchParams(preserveQuery).get("listingType") || "",
        preserveParams: isSearchPage && preserveQuery ? new URLSearchParams(preserveQuery) : undefined,
      });
      router.push(`/search?${query}`);
    },
    [location, city, propertyType, router, isSearchPage, preserveQuery]
  );

  const runSearch = useCallback(
    (overrides = {}) => pushSearch(overrides),
    [pushSearch]
  );

  const handleLocationChange = (value) => {
    setLocation(value);
    setLocError("");
    setSearchError("");
    const parsed = parseLocationInput(value, city);
    if (parsed.city) setCity(parsed.city);
  };

  const handleTypeChange = (value) => {
    setPropertyType(value);
    setSearchError("");
    if (isSearchPage) pushSearch({ type: value });
  };

  const handleCityChange = (value) => {
    setCity(value);
    setSearchError("");
    if (isSearchPage && value) pushSearch({ city: value });
  };

  const detectLocation = useCallback(() => {
    if (locating) return;
    setLocError("");

    if (!navigator.geolocation) {
      setLocError("Location is not supported on this browser.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const geo = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
          const adminNames =
            geo.localityInfo?.administrative?.map((a) => a.name).join(" ") || "";
          const matchedCity = matchSupportedCity(
            geo.city,
            geo.locality,
            geo.principalSubdivision,
            adminNames
          );

          const area = geo.locality || geo.city || geo.principalSubdivision || "";
          const label = matchedCity
            ? area && area.toLowerCase() !== matchedCity.toLowerCase()
              ? `${area}, ${matchedCity}`
              : matchedCity
            : area || "Current location";

          setLocation(label);
          if (matchedCity) {
            setCity(matchedCity);
            if (isSearchPage) pushSearch({ location: label, city: matchedCity });
          } else {
            setLocError(
              "Location detected, but we currently serve Noida only."
            );
          }
        } catch {
          setLocError("Could not detect your city. Please select manually.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocError("Location access denied. Allow location or enter manually.");
        } else if (err.code === err.TIMEOUT) {
          setLocError("Location request timed out. Try again.");
        } else {
          setLocError("Unable to detect location. Please enter manually.");
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }, [locating, isSearchPage, pushSearch]);

  const typeOptions = useMemo(
    () => [
      { value: "", label: isSearchPage ? "All types" : "Select property type" },
      ...PROPERTY_TYPES.map((t) => ({ value: t, label: t })),
    ],
    [isSearchPage]
  );
  const cityOptions = useMemo(
    () => [
      { value: "", label: isSearchPage ? "Select city" : "Select city" },
      ...data.cities.map((c) => ({ value: c, label: c })),
    ],
    []
  );

  return (
    <div className={isSearchPage ? "w-full" : "w-full max-w-2xl"}>
      {isHero && (
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold tracking-[0.18em] text-white/90">
          {CATEGORIES.map((cat, i) => (
            <span key={cat} className="flex items-center gap-3">
              <button type="button" className="transition hover:text-white">
                {cat}
              </button>
              {i < CATEGORIES.length - 1 && <span className="text-white/40">•</span>}
            </span>
          ))}
        </div>
      )}

      <div
        className={`rounded-2xl bg-white ring-1 ring-line/60 ${
          isSearchPage ? "p-4 shadow-sm" : "p-5"
        } ${isHero ? "shadow-2xl shadow-black/10" : ""}`}
      >
        {!isHero && !isSearchPage && (
          <div className="inline-flex rounded-xl bg-brand-soft p-1">
            {["Rent", "Buy"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-brand-dark text-white shadow-sm shadow-brand-dark/30"
                    : "text-ink/65 hover:text-brand-dark"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {isSearchPage ? (
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
              <button
                type="button"
                onClick={detectLocation}
                disabled={locating}
                aria-label="Detect current location"
                title="Detect current location"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-brand transition hover:bg-brand-soft disabled:opacity-60"
              >
                {locating ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
                ) : (
                  <PinIcon className="h-4 w-4" />
                )}
              </button>
              <input
                list="localities"
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                placeholder={locating ? "Detecting your location..." : "Search locality or city"}
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={detectLocation}
                disabled={locating}
                className="hidden shrink-0 items-center gap-1 rounded-lg bg-brand-soft px-2.5 py-1.5 text-[11px] font-bold text-brand-dark transition hover:bg-brand-light disabled:opacity-60 sm:inline-flex"
              >
                <LocateIcon className="h-3.5 w-3.5" />
                Detect
              </button>
            </div>

            <CustomSelect
              ariaLabel="Property type"
              value={propertyType}
              onChange={handleTypeChange}
              options={typeOptions}
              placeholder="All types"
              className="lg:w-auto"
            />

            <CustomSelect
              ariaLabel="City"
              value={city}
              onChange={handleCityChange}
              options={cityOptions}
              placeholder="Select city"
              className="lg:w-auto"
            />

            <button
              type="button"
              onClick={() => runSearch()}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-dark/30 transition hover:bg-brand-darker lg:px-8"
            >
              <SearchIcon className="h-4 w-4" />
              Search
            </button>
          </div>
        ) : (
          <>
            <div className={`flex flex-col gap-3 sm:flex-row ${isHero ? "" : "mt-4"}`}>
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={locating}
                  aria-label="Detect current location"
                  title="Detect current location"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-brand transition hover:bg-brand-soft disabled:opacity-60"
                >
                  {locating ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
                  ) : (
                    <PinIcon className="h-4 w-4" />
                  )}
                </button>
                <input
                  list="localities"
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onBlur={() => {
                    const parsed = parseLocationInput(location, city);
                    if (parsed.city) setCity(parsed.city);
                  }}
                  placeholder={locating ? "Detecting your location..." : "Use current location"}
                  className="w-full bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-muted"
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={locating}
                  className="hidden shrink-0 items-center gap-1 rounded-lg bg-brand-soft px-2.5 py-1.5 text-[11px] font-bold text-brand-dark transition hover:bg-brand-light disabled:opacity-60 sm:inline-flex"
                >
                  <LocateIcon className="h-3.5 w-3.5" />
                  Detect
                </button>
              </div>
              <button
                type="button"
                onClick={() => runSearch()}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-dark/30 transition hover:bg-brand-darker sm:shrink-0"
              >
                <SearchIcon className="h-4 w-4" />
                Search
              </button>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <CustomSelect
                ariaLabel="Property type"
                value={propertyType}
                onChange={setPropertyType}
                options={typeOptions}
                placeholder="Select property type"
              />
              <CustomSelect
                ariaLabel="City"
                value={city}
                onChange={(v) => {
                  setCity(v);
                  setSearchError("");
                }}
                options={cityOptions}
                placeholder="Select city"
              />
            </div>
          </>
        )}

        <datalist id="localities">
          {data.localities.map((l) => (
            <option key={l.name} value={`${l.name}, ${l.city}`} />
          ))}
        </datalist>

        {(locError || searchError) && (
          <p className={`mt-2 text-xs ${isHero ? "text-white/90" : "text-red-600"}`}>
            {searchError || locError}
          </p>
        )}
      </div>

      {isHero && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-white/80">Popular:</span>
          {data.popularSearches.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                let nextCity = "";
                let nextType = "";
                for (const c of data.cities) {
                  if (tag.toLowerCase().includes(c.toLowerCase())) nextCity = c;
                }
                if (tag.toLowerCase().includes("pg")) nextType = "PG / Hostel";
                else if (tag.toLowerCase().includes("villa")) nextType = "Villa";
                else if (tag.toLowerCase().includes("bhk") || tag.toLowerCase().includes("flat"))
                  nextType = "Apartment";

                setLocation(tag);
                if (nextCity) setCity(nextCity);
                if (nextType) setPropertyType(nextType);
                runSearch({ location: tag, city: nextCity, type: nextType });
              }}
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
