"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import data from "@/data/data.json";
import { LocateFixed, MapPin, Search } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import { buildSearchQuery, parseLocationInput } from "@/lib/search";
import { PROPERTY_CATEGORIES, withCategory } from "@/data/categories";

const HERO_CATEGORY_LABELS = PROPERTY_CATEGORIES.slice(0, 4).map((c) => c.label.toUpperCase());

const CITY_ALIASES = {
  Delhi: ["delhi", "new delhi", "south delhi", "north delhi", "east delhi", "west delhi"],
  Noida: ["noida", "greater noida"],
  Gurugram: ["gurugram", "gurgaon"],
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

export default function SearchBox({
  variant = "default",
  initialLocation = "",
  initialCity = "",
  initialCategoryKey = "",
  preserveQuery = "",
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Rent");
  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState(initialCategoryKey);
  const [city, setCity] = useState(initialCity);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");
  const [searchError, setSearchError] = useState("");
  const isHero = variant === "hero";
  const isSearchPage = variant === "search";

  useEffect(() => {
    if (!isSearchPage) return;
    setCity(initialCity);
    setPropertyType(initialCategoryKey);
    setLocation(initialLocation);
  }, [isSearchPage, initialCity, initialCategoryKey, initialLocation]);

  const pushSearch = useCallback(
    (overrides = {}) => {
      const loc = overrides.location ?? location;
      const selectedCity = overrides.city ?? city;
      const selectedType = overrides.type ?? propertyType;
      const parsed = parseLocationInput(loc, selectedCity);

      if (!loc.trim() && !selectedCity) {
        setSearchError("Please enter a location or select a city.");
        return;
      }

      setSearchError("");
      const query = buildSearchQuery({
        city: parsed.city,
        locality: parsed.locality,
        location: loc,
        listingType: new URLSearchParams(preserveQuery).get("listingType") || "",
        preserveParams: isSearchPage && preserveQuery ? new URLSearchParams(preserveQuery) : undefined,
      });
      // The type dropdown holds a category key; "" means all types.
      router.push(`/search?${withCategory(new URLSearchParams(query), selectedType).toString()}`);
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
              "Location detected, but we currently serve Delhi NCR only."
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
      ...PROPERTY_CATEGORIES.map((c) => ({ value: c.key, label: c.label })),
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
          {HERO_CATEGORY_LABELS.map((cat, i) => (
            <span key={cat} className="flex items-center gap-3">
              <button type="button" className="transition hover:text-white">
                {cat}
              </button>
              {i < HERO_CATEGORY_LABELS.length - 1 && <span className="text-white/40">•</span>}
            </span>
          ))}
        </div>
      )}

      <div
        className={
          isSearchPage
            ? ""
            : `rounded-2xl bg-white p-5 ring-1 ring-line/60 ${isHero ? "shadow-pop" : ""}`
        }
      >
        {!isHero && !isSearchPage && (
          <div className="inline-flex rounded-lg bg-surface p-1">
            {["Rent", "Buy"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`h-9 cursor-pointer rounded-md px-5 text-sm font-semibold transition ${
                  activeTab === tab ? "bg-white text-brand shadow-card" : "text-ink/65 hover:text-ink"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {isSearchPage ? (
          <div className="grid gap-2.5 sm:grid-cols-2 lg:flex lg:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:col-span-2 h-11 rounded-lg border border-line bg-white px-1.5 transition hover:border-slate-300 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
              <button
                type="button"
                onClick={detectLocation}
                disabled={locating}
                aria-label="Detect current location"
                title="Detect current location"
                className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-md text-brand transition hover:bg-brand-soft disabled:opacity-60"
              >
                {locating ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand/25 border-t-brand" />
                ) : (
                  <MapPin className="h-4 w-4" />
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
                className="hidden h-8 shrink-0 cursor-pointer items-center gap-1 rounded-md bg-brand-soft px-2.5 text-xs font-semibold text-brand transition hover:bg-brand-light disabled:opacity-60 sm:inline-flex"
              >
                <LocateFixed className="h-3.5 w-3.5" />
                Detect
              </button>
            </div>

            <CustomSelect
              ariaLabel="Property type"
              value={propertyType}
              onChange={handleTypeChange}
              options={typeOptions}
              placeholder="All types"
              className="lg:w-[180px]"
            />

            <CustomSelect
              ariaLabel="City"
              value={city}
              onChange={handleCityChange}
              options={cityOptions}
              placeholder="Select city"
              className="lg:w-[180px]"
            />

            <button
              type="button"
              onClick={() => runSearch()}
              className="btn btn-primary sm:col-span-2 lg:px-8"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        ) : (
          <>
            <div className={`flex flex-col gap-3 sm:flex-row ${isHero ? "" : "mt-4"}`}>
              <div className="flex flex-1 items-center gap-2 h-11 rounded-lg border border-line bg-white px-1.5 transition hover:border-slate-300 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={locating}
                  aria-label="Detect current location"
                  title="Detect current location"
                  className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-md text-brand transition hover:bg-brand-soft disabled:opacity-60"
                >
                  {locating ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand/25 border-t-brand" />
                  ) : (
                    <MapPin className="h-4 w-4" />
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
                  className="hidden h-8 shrink-0 cursor-pointer items-center gap-1 rounded-md bg-brand-soft px-2.5 text-xs font-semibold text-brand transition hover:bg-brand-light disabled:opacity-60 sm:inline-flex"
                >
                  <LocateFixed className="h-3.5 w-3.5" />
                  Detect
                </button>
              </div>
              <button
                type="button"
                onClick={() => runSearch()}
                className="btn btn-primary btn-lg"
              >
                <Search className="h-4 w-4" />
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
            <option key={`${l.name}-${l.city}`} value={`${l.name}, ${l.city}`} />
          ))}
        </datalist>

        {(locError || searchError) && (
          <p role="alert" className={`mt-2 animate-fade-in text-xs font-medium ${isHero ? "text-white/90" : "text-danger"}`}>
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
