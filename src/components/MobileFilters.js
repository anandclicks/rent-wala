"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, LocateFixed, MapPin, Search } from "lucide-react";
import data from "@/data/data.json";
import { allLocalities, countProperties, nearestPlace } from "@/data/properties";
import { requestCoords } from "@/lib/geo";
import {
  budgetHistogram,
  buildFacets,
  clearFilterParams,
  filtersFromParams,
  patchParams,
} from "@/lib/search-facets";

const fmt = (n) => n.toLocaleString("en-IN");
const RECENT_KEY = "prw-recent-locations";
const LOCATION_RESET = { locality: "", q: "", location: "" };

function shortRupees(n) {
  if (n >= 100000) return `₹${+(n / 100000).toFixed(1)} Lac`;
  if (n >= 1000) return `₹${+(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
}

function readRecent() {
  try {
    const list = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(list) ? list.slice(0, 5) : [];
  } catch {
    return [];
  }
}

function saveRecent(place) {
  try {
    const list = readRecent().filter((p) => p.city !== place.city || p.locality !== place.locality);
    localStorage.setItem(RECENT_KEY, JSON.stringify([place, ...list].slice(0, 5)));
  } catch {
    // Storage blocked: recent locations just won't be remembered.
  }
}

const placeLabel = (p) => (p.locality ? `${p.locality}, ${p.city}` : p.city || "India");

/* ───────────── Small building blocks ───────────── */

function Chip({ label, selected, disabled, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`h-9 cursor-pointer rounded-full border px-3.5 text-sm transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
        selected
          ? "border-brand bg-brand-light font-semibold text-brand-dark"
          : "border-ink/20 bg-white text-ink hover:border-ink/40"
      }`}
    >
      {label}
    </button>
  );
}

function Block({ title, aside, children }) {
  return (
    <section className="border-b border-line px-4 py-5 last:border-0">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-base font-bold text-ink">{title}</h3>
        {aside}
      </div>
      {children}
    </section>
  );
}

function ChipFacet({ facet, draft, setDraft }) {
  if (!facet) return null;
  return (
    <Block title={facet.title}>
      <div className="flex flex-wrap gap-2">
        {facet.options.map((o) => (
          <Chip
            key={o.id}
            label={o.label}
            selected={o.selected}
            disabled={!o.selected && o.count === 0}
            onClick={() => setDraft(o.apply(draft))}
          />
        ))}
      </div>
    </Block>
  );
}

/** Histogram of listing prices with a two-handle slider underneath (OLX-style budget). */
function BudgetSlider({ draft, setDraft }) {
  const { max, step, counts } = useMemo(() => budgetHistogram(draft), [draft]);
  const min = Number(draft.get("minPrice")) || 0;
  const rawMax = Number(draft.get("maxPrice"));
  const lo = Math.min(min, max);
  const hi = rawMax ? Math.min(rawMax, max) : max;
  const peak = Math.max(1, ...counts);
  const pct = (v) => (v / max) * 100;

  const set = (nextLo, nextHi) =>
    setDraft(
      patchParams({
        minPrice: nextLo > 0 ? String(nextLo) : "",
        maxPrice: nextHi < max ? String(nextHi) : "",
      })(draft)
    );

  const label =
    lo === 0 && hi >= max ? "Any budget" : `${shortRupees(lo)} – ${shortRupees(hi)}${hi >= max ? "+" : ""}`;

  return (
    <Block title="Budget" aside={<span className="text-sm font-semibold text-brand">{label}</span>}>
      <div className="flex h-20 items-end gap-[3px]" aria-hidden="true">
        {counts.map((c, i) => {
          const from = (i / counts.length) * max;
          const to = ((i + 1) / counts.length) * max;
          const inRange = to > lo && from < hi;
          return (
            <span
              key={i}
              className={`flex-1 rounded-t-sm transition-colors ${inRange ? "bg-brand/60" : "bg-line"}`}
              style={{ height: `${Math.max(c ? 8 : 3, (c / peak) * 100)}%` }}
            />
          );
        })}
      </div>
      <div className="range-dual relative mx-[13px] h-7">
        <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded bg-line" />
        <span
          className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded bg-ink"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          min={0}
          max={max}
          step={step}
          value={lo}
          aria-label="Minimum budget"
          onChange={(e) => set(Math.min(Number(e.target.value), hi - step), hi)}
          style={{ zIndex: lo > max - step * 2 ? 3 : 2 }}
        />
        <input
          type="range"
          min={0}
          max={max}
          step={step}
          value={hi}
          aria-label="Maximum budget"
          onChange={(e) => set(lo, Math.max(Number(e.target.value), lo + step))}
          style={{ zIndex: 2 }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs font-medium text-muted">
        <span>₹0</span>
        <span>{shortRupees(max)}+</span>
      </div>
    </Block>
  );
}

/* ───────────── Location picker screen ───────────── */

function PlaceRow({ place, icon: Icon = MapPin, onPick }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onPick(place)}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-[15px] text-ink transition active:bg-surface"
      >
        <Icon className="h-5 w-5 shrink-0 text-muted" />
        <span className="min-w-0 flex-1 truncate">
          {place.locality ? (
            <>
              {place.locality}
              <span className="text-muted">, {place.city}</span>
            </>
          ) : (
            place.city || "India"
          )}
        </span>
      </button>
    </li>
  );
}

function LocationPicker({ draft, onPick, onBack }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [geo, setGeo] = useState({ status: "idle", error: "" });
  const [recent] = useState(readRecent);
  const localities = useMemo(() => allLocalities(), []);
  const { city } = filtersFromParams(draft);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const q = query.trim().toLowerCase();
  const matches = q
    ? [
        ...data.cities.filter((c) => c.toLowerCase().includes(q)).map((c) => ({ city: c, locality: "" })),
        ...localities
          .filter((l) => l.name.toLowerCase().includes(q) || l.city.toLowerCase().includes(q))
          .slice(0, 25)
          .map((l) => ({ city: l.city, locality: l.name })),
      ]
    : [];
  const popular = localities
    .filter((l) => !city || l.city === city)
    .slice(0, 8)
    .map((l) => ({ city: l.city, locality: l.name }));

  async function useCurrent() {
    setGeo({ status: "asking", error: "" });
    try {
      const place = nearestPlace(await requestCoords());
      if (!place) throw new Error("No listings near you yet.");
      onPick(place);
    } catch (e) {
      setGeo({ status: "error", error: e.message });
    }
  }

  const heading = (text) => (
    <p className="px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-muted">{text}</p>
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-2 border-b border-line px-2 py-2">
        <button type="button" onClick={onBack} aria-label="Back to filters" className="icon-btn">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <label className="flex h-11 flex-1 items-center gap-2 rounded-lg border-2 border-ink px-3">
          <Search className="h-5 w-5 shrink-0 text-ink" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, area or locality"
            aria-label="Search city, area or locality"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
          />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto">
        <button
          type="button"
          onClick={useCurrent}
          disabled={geo.status === "asking"}
          className="flex w-full cursor-pointer items-start gap-3 border-b border-line px-4 py-4 text-left"
        >
          <LocateFixed className={`mt-0.5 h-6 w-6 shrink-0 text-brand ${geo.status === "asking" ? "animate-pulse" : ""}`} />
          <span>
            <span className="block text-base font-semibold text-brand">
              {geo.status === "asking" ? "Finding you…" : "Use current location"}
            </span>
            <span className={`block text-sm ${geo.status === "error" ? "text-danger" : "text-brand/80"}`}>
              {geo.status === "error" ? geo.error : "Show listings closest to you"}
            </span>
          </span>
        </button>

        {q ? (
          matches.length ? (
            <ul className="py-1">
              {matches.map((p) => (
                <PlaceRow key={`${p.city}|${p.locality}`} place={p} onPick={onPick} />
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-sm text-muted">No matching city or locality.</p>
          )
        ) : (
          <>
            {heading("Recent locations")}
            <ul>
              <PlaceRow place={{ city: "", locality: "" }} icon={Clock} onPick={onPick} />
              {recent.map((p) => (
                <PlaceRow key={`r-${p.city}|${p.locality}`} place={p} icon={Clock} onPick={onPick} />
              ))}
            </ul>
            <div className="mt-2 border-t border-line" />
            {heading("Cities")}
            <ul>
              {data.cities.map((c) => (
                <PlaceRow key={c} place={{ city: c, locality: "" }} onPick={onPick} />
              ))}
            </ul>
            {popular.length > 0 && (
              <>
                <div className="mt-2 border-t border-line" />
                {heading(city ? `Popular in ${city}` : "Popular locations")}
                <ul>
                  {popular.map((p) => (
                    <PlaceRow key={`p-${p.city}|${p.locality}`} place={p} onPick={onPick} />
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ───────────── Full-screen phone filter page ───────────── */

/**
 * Phone filters (OLX property style): one scrolling page with location, budget histogram,
 * chip options and sort. Choices stay a draft until "View properties".
 */
export default function MobileFilters({ onClose, sortOptions = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [draft, setDraft] = useState(() => new URLSearchParams(searchParams.toString()));
  const [view, setView] = useState("filters");

  const facets = useMemo(() => Object.fromEntries(buildFacets(draft).map((f) => [f.id, f])), [draft]);
  const resultCount = useMemo(() => countProperties(filtersFromParams(draft)), [draft]);
  const { city, locality } = filtersFromParams(draft);
  const sort = draft.get("sort") || "";

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (view === "location") setView("filters");
      else onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, view]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const pickPlace = (place) => {
    setDraft(patchParams({ city: place.city, ...LOCATION_RESET, locality: place.locality })(draft));
    if (place.city) saveRecent(place);
    setView("filters");
  };

  const apply = () => {
    router.push(`/search?${draft.toString()}`, { scroll: false });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filters-title"
      className="fixed inset-0 z-[95] flex animate-fade-in flex-col bg-white lg:hidden"
    >
      {view === "location" ? (
        <LocationPicker draft={draft} onPick={pickPlace} onBack={() => setView("filters")} />
      ) : (
        <>
          <header className="flex shrink-0 items-center gap-2 border-b border-line px-2 py-2">
            <button type="button" onClick={onClose} aria-label="Close filters" className="icon-btn">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 id="mobile-filters-title" className="flex-1 text-lg font-bold text-ink">
              Filters
            </h2>
            <button type="button" onClick={() => setDraft(clearFilterParams(draft))} className="link mr-2 text-sm">
              Clear all
            </button>
          </header>

          <div className="flex-1 overflow-y-auto">
            <div className="px-4 pb-4 pt-5">
              <h3 className="mb-2 text-base font-bold text-ink">Select Location</h3>
              <button
                type="button"
                onClick={() => setView("location")}
                className="flex h-12 w-full cursor-pointer items-center gap-2.5 rounded-lg border-2 border-ink/70 px-3 text-left"
              >
                <Search className="h-5 w-5 shrink-0 text-muted" />
                <span className="min-w-0 flex-1 truncate text-[15px] text-muted">
                  {city ? "Location " : "Search "}
                  <span className="font-semibold text-ink">{city ? placeLabel({ city, locality }) : "city, area or locality"}</span>
                </span>
              </button>
              <p className="mt-1.5 text-xs text-muted">Select cities, neighbourhoods or areas you want to search in</p>
            </div>
            <div className="h-2 bg-surface" />

            <ChipFacet facet={facets.category && { ...facets.category, title: "Property Type" }} draft={draft} setDraft={setDraft} />
            <BudgetSlider draft={draft} setDraft={setDraft} />
            <ChipFacet facet={facets.bhk} draft={draft} setDraft={setDraft} />
            <ChipFacet facet={facets.room} draft={draft} setDraft={setDraft} />
            <ChipFacet facet={facets.furnishing} draft={draft} setDraft={setDraft} />
            <ChipFacet facet={facets.listingType} draft={draft} setDraft={setDraft} />
            {sortOptions.length > 0 && (
              <Block title="Sort">
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((o) => (
                    <Chip
                      key={o.value || "relevance"}
                      label={o.label}
                      selected={sort === o.value}
                      onClick={() => setDraft(patchParams({ sort: o.value })(draft))}
                    />
                  ))}
                </div>
              </Block>
            )}
          </div>

          <div className="shrink-0 border-t border-line bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgb(0_0_0/0.05)]">
            <button type="button" onClick={apply} className="btn btn-primary h-12 w-full text-base">
              View {fmt(resultCount)} {resultCount === 1 ? "property" : "properties"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
