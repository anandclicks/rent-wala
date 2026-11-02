"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";

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

const BUDGET_PRESETS = [
  { label: "Under ₹10K", min: "", max: "10000" },
  { label: "₹10K – ₹25K", min: "10000", max: "25000" },
  { label: "₹25K – ₹50K", min: "25000", max: "50000" },
  { label: "Above ₹50K", min: "50000", max: "" },
];

/** URL params this panel controls — used for "Clear all" and the active-filter count. */
export const FILTER_KEYS = ["category", "listingType", "minPrice", "maxPrice", "bhk", "furnishing"];

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-4 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between text-left text-sm font-semibold text-ink"
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

function OptionRow({ type, name, checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-ink/85 transition hover:bg-surface">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 cursor-pointer accent-brand"
      />
      {children}
    </label>
  );
}

/** Edited locally and applied on blur / Enter, instead of navigating on every keystroke. */
function BudgetInputs({ minPrice, maxPrice, onApply }) {
  const [budget, setBudget] = useState({ min: minPrice, max: maxPrice });
  const apply = () => {
    if (budget.min !== minPrice || budget.max !== maxPrice) onApply(budget.min, budget.max);
  };
  const field = (key, label) => (
    <input
      type="number"
      inputMode="numeric"
      min="0"
      placeholder={label}
      aria-label={`${label}imum price`}
      value={budget[key]}
      onChange={(e) => setBudget((b) => ({ ...b, [key]: e.target.value }))}
      onBlur={apply}
      onKeyDown={(e) => e.key === "Enter" && apply()}
      className="input h-10"
    />
  );
  return (
    <div className="grid grid-cols-2 gap-2">
      {field("min", "Min")}
      {field("max", "Max")}
    </div>
  );
}

export default function SearchFilters({ className = "", showHeader = true }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const push = useCallback(
    (params) => router.push(`/search?${params.toString()}`, { scroll: false }),
    [router]
  );

  const update = useCallback(
    (patch) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      push(params);
    },
    [push, searchParams]
  );

  const category = searchParams.get("category") || "";
  const listingType = searchParams.get("listingType") || "";
  const bhk = searchParams.get("bhk") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const furnishing = searchParams.get("furnishing") || "";
  const activeCount = FILTER_KEYS.filter((k) => searchParams.get(k)).length;


  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((k) => params.delete(k));
    push(params);
  };

  return (
    <aside className={`card px-5 py-1 ${className}`} aria-label="Filters">
      {showHeader && (
        <div className="flex items-center justify-between border-b border-line py-4">
          <p className="flex items-center gap-2 text-base font-bold text-ink">
            <SlidersHorizontal className="h-[18px] w-[18px] text-brand" />
            Filters
            {activeCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[11px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </p>
          {activeCount > 0 && (
            <button type="button" onClick={clearAll} className="link text-xs">
              <RotateCcw className="h-3.5 w-3.5" />
              Clear all
            </button>
          )}
        </div>
      )}

      <Section title="Property Type">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => update({ category: c.value })}
              className={`chip h-8 px-3 text-xs ${category === c.value ? "chip-active" : ""}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="I want to">
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-surface p-1">
          {[
            { label: "Any", value: "" },
            { label: "Rent", value: "RENT" },
            { label: "Buy", value: "SELL" },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              aria-pressed={listingType === opt.value}
              onClick={() => update({ listingType: opt.value })}
              className={`h-9 cursor-pointer rounded-md text-sm font-medium transition duration-200 ${
                listingType === opt.value ? "bg-white text-brand shadow-card" : "text-ink/70 hover:text-ink"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Budget (₹)">
        <BudgetInputs
          key={`${minPrice}|${maxPrice}`}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApply={(min, max) => update({ minPrice: min, maxPrice: max })}
        />
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {BUDGET_PRESETS.map((p) => {
            const active = minPrice === p.min && maxPrice === p.max;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => update(active ? { minPrice: "", maxPrice: "" } : { minPrice: p.min, maxPrice: p.max })}
                className={`chip h-7 px-2.5 text-[11px] ${active ? "chip-active" : ""}`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="BHK">
        <div className="flex flex-wrap gap-2">
          {BHK_OPTIONS.map((opt) => {
            const val = opt === "Any" ? "" : opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => update({ bhk: val })}
                className={`chip h-8 px-3 text-xs ${bhk === val ? "chip-active" : ""}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Furnishing">
        <div className="-mx-2 space-y-0.5">
          {FURNISHING.map((f) => (
            <OptionRow
              key={f}
              type="checkbox"
              checked={furnishing === f}
              onChange={() => update({ furnishing: furnishing === f ? "" : f })}
            >
              {f}
            </OptionRow>
          ))}
        </div>
      </Section>
    </aside>
  );
}
