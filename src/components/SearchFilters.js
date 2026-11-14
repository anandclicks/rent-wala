"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Check, ChevronDown, ChevronRight, RotateCcw, SlidersHorizontal } from "lucide-react";
import { FILTER_KEYS, buildFacets, clearFilterParams, patchParams } from "@/lib/search-facets";

export { FILTER_KEYS };

const fmt = (n) => n.toLocaleString("en-IN");
const LOCALITY_PREVIEW = 8;

/* ───────────── Option renderers (shared by laptop sidebar and phone sheet) ───────────── */

function ListRow({ label, count, selected, onClick, indent = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-left text-sm transition ${
        indent ? "pl-6" : ""
      } ${selected ? "bg-brand-light font-semibold text-ink" : "text-ink/80 hover:bg-surface hover:text-ink"}`}
    >
      <span className="min-w-0 flex-1 leading-snug">
        {label}
        {count != null && <span className="text-muted"> ({fmt(count)})</span>}
      </span>
    </button>
  );
}

function CheckRow({ label, count, selected, onClick }) {
  const disabled = !selected && count === 0;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-left text-sm text-ink/85 transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent"
    >
      <span
        className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded border-2 transition ${
          selected ? "border-brand bg-brand text-white" : "border-ink/30 bg-white"
        }`}
      >
        {selected && <Check className="h-3 w-3" strokeWidth={3.5} />}
      </span>
      <span className="flex-1">
        {label}
        {count > 0 && <span className="text-muted"> ({fmt(count)})</span>}
      </span>
    </button>
  );
}

/** Live (phone draft): values come straight from the draft. Otherwise edited locally, applied with →. */
function BudgetRange({ min, max, onApply, live }) {
  const [local, setLocal] = useState({ min, max });
  const range = live ? { min, max } : local;
  const change = (key, value) => {
    const next = { ...range, [key]: value.replace(/\D/g, "") };
    if (live) onApply(next.min, next.max);
    else setLocal(next);
  };
  const field = (key, label) => (
    <input
      type="text"
      inputMode="numeric"
      placeholder={label}
      aria-label={`${label} price`}
      value={range[key]}
      onChange={(e) => change(key, e.target.value)}
      onKeyDown={(e) => !live && e.key === "Enter" && onApply(range.min, range.max)}
      className="input h-10 min-w-0"
    />
  );
  return (
    <div className="mt-4">
      <p className="mb-2 text-xs text-muted">Choose a range below (₹)</p>
      <div className="flex items-center gap-2">
        {field("min", "Min")}
        <span className="text-xs text-muted">to</span>
        {field("max", "Max")}
        {!live && (
          <button
            type="button"
            onClick={() => onApply(range.min, range.max)}
            disabled={range.min === min && range.max === max}
            aria-label="Apply budget"
            className="btn btn-primary h-10 w-10 shrink-0 p-0 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/** The body of one filter section. `onChange(nextParams)` either navigates or updates a draft. */
function FacetBody({ facet, params, onChange, live = false }) {
  const [showAll, setShowAll] = useState(false);
  const go = (apply) => onChange(apply(params));

  if (facet.kind === "list") {
    return (
      <div className="space-y-0.5">
        <ListRow label={facet.allOption.label} selected={facet.allOption.selected} onClick={() => go(facet.allOption.apply)} />
        {facet.options.map((o) => (
          <ListRow key={o.id} indent label={o.label} count={o.count} selected={o.selected} onClick={() => go(o.apply)} />
        ))}
      </div>
    );
  }

  if (facet.kind === "location") {
    const options = showAll ? facet.options : facet.options.slice(0, LOCALITY_PREVIEW);
    return (
      <div className="space-y-0.5">
        <ListRow label="India" selected={!facet.city} onClick={() => go(facet.clearCity)} />
        {facet.city ? (
          <>
            <ListRow
              indent
              label={facet.city}
              count={facet.cityCount}
              selected={facet.cityOption.selected}
              onClick={() => go(facet.cityOption.apply)}
            />
            <div className="pl-3">
              {options.map((o) => (
                <ListRow key={o.id} indent label={o.label} count={o.count} selected={o.selected} onClick={() => go(o.apply)} />
              ))}
            </div>
            {facet.options.length > LOCALITY_PREVIEW && (
              <button type="button" onClick={() => setShowAll((v) => !v)} className="link ml-9 mt-1 text-xs">
                {showAll ? "Show less" : `View all ${facet.options.length} localities`}
              </button>
            )}
            {facet.options.length === 0 && (
              <p className="ml-9 py-1 text-xs text-muted">No listings in {facet.city} yet.</p>
            )}
          </>
        ) : (
          facet.options.map((o) => (
            <ListRow key={o.id} indent label={o.label} count={o.count} selected={o.selected} onClick={() => go(o.apply)} />
          ))
        )}
      </div>
    );
  }

  if (facet.kind === "cards") {
    return (
      <div>
        <p className="mb-2 text-xs text-muted">{facet.hint}</p>
        <div className="grid grid-cols-2 gap-2">
          {facet.options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={o.selected}
              onClick={() => go(o.apply)}
              className={`cursor-pointer rounded-lg border px-2.5 py-2 text-left transition ${
                o.selected ? "border-brand bg-brand-light" : "border-line bg-white hover:border-brand/50"
              }`}
            >
              <span className="block text-[13px] font-semibold leading-tight text-ink">{o.label}</span>
              <span className="mt-0.5 block text-[11px] text-muted">
                {o.count > 0 ? `${fmt(o.count)} ${o.count === 1 ? "property" : "properties"}` : "No listings"}
              </span>
            </button>
          ))}
        </div>
        <BudgetRange
          key={live ? "live" : `${facet.min}|${facet.max}`}
          min={facet.min}
          max={facet.max}
          live={live}
          onApply={(min, max) => onChange(patchParams({ minPrice: min, maxPrice: max })(params))}
        />
      </div>
    );
  }

  return (
    <div>
      <p className="mb-1 text-xs text-muted">{facet.hint}</p>
      <div className="-mx-2">
        {facet.options.map((o) => (
          <CheckRow key={o.id} label={o.label} count={o.count} selected={o.selected} onClick={() => go(o.apply)} />
        ))}
      </div>
    </div>
  );
}

/* ───────────── Laptop: OLX-style sidebar, applies instantly ───────────── */

function Section({ title, active, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-line py-4 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between text-left text-[13px] font-bold uppercase tracking-wide text-ink"
      >
        <span className="flex items-center gap-2">
          {title}
          {active && <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-label="(active)" />}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pt-3">{children}</div>}
    </div>
  );
}

export default function SearchFilters({ className = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const facets = useMemo(() => buildFacets(searchParams), [searchParams]);
  const activeCount = FILTER_KEYS.filter((k) => searchParams.get(k)).length;

  const push = useCallback(
    (params) => router.push(`/search?${params.toString()}`, { scroll: false }),
    [router]
  );

  return (
    <aside className={`card px-5 py-1 ${className}`} aria-label="Filters">
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
          <button type="button" onClick={() => push(clearFilterParams(searchParams))} className="link text-xs">
            <RotateCcw className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}
      </div>

      {facets.map((facet) => (
        <Section key={facet.id} title={facet.title} active={facet.active}>
          <FacetBody facet={facet} params={searchParams} onChange={push} />
        </Section>
      ))}
    </aside>
  );
}
