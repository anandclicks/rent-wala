"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, MapPin, SearchX, SlidersHorizontal, X } from "lucide-react";
import SearchBox from "@/components/SearchBox";
import SearchFilters, { FILTER_KEYS } from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import CustomSelect from "@/components/CustomSelect";
import { mapSearchTypeToCategory, normalizeCity, parseLocationInput } from "@/lib/search";
import { filterStaticProperties } from "@/data/properties";

const PAGE_SIZE = 24;

const SORT_OPTIONS = [
  { value: "", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const CATEGORY_LABELS = {
  INDEPENDENT_HOUSE: "Independent House",
  APARTMENT: "Apartment",
  VILLA: "Villa",
  BUILDER_FLOOR: "Builder Floor",
  LAND: "Plot",
  PENTHOUSE: "Penthouse",
  STUDIO: "Studio",
  PG: "PG / Hostel",
  COMMERCIAL: "Commercial",
};

const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

function activeFilterChips(params) {
  const chips = [];
  const category = params.get("category");
  if (category) chips.push({ keys: ["category", "type"], label: CATEGORY_LABELS[category] || category });
  const listingType = params.get("listingType");
  if (listingType) chips.push({ keys: ["listingType"], label: listingType === "SELL" ? "Buy" : "Rent" });
  const min = params.get("minPrice");
  const max = params.get("maxPrice");
  if (min || max) {
    const label =
      min && max ? `${formatINR(min)} – ${formatINR(max)}` : min ? `Above ${formatINR(min)}` : `Under ${formatINR(max)}`;
    chips.push({ keys: ["minPrice", "maxPrice"], label });
  }
  if (params.get("bhk")) chips.push({ keys: ["bhk"], label: params.get("bhk") });
  if (params.get("furnishing")) chips.push({ keys: ["furnishing"], label: params.get("furnishing") });
  if (params.get("kitchen") === "1") chips.push({ keys: ["kitchen"], label: "Kitchen" });
  return chips;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get("sort") || "";
  const queryKey = searchParams.toString();
  // Page size resets whenever the query changes.
  const [page, setPage] = useState({ key: queryKey, count: PAGE_SIZE });
  const visible = page.key === queryKey ? page.count : PAGE_SIZE;
  const [sheetOpen, setSheetOpen] = useState(false);

  const cityParam = searchParams.get("city") || "";
  const localityParam = searchParams.get("locality") || "";
  const type = searchParams.get("type") || "";
  const q = searchParams.get("q") || searchParams.get("location") || "";
  const categoryParam = searchParams.get("category") || "";
  const category = categoryParam || mapSearchTypeToCategory(type);
  const listingType = searchParams.get("listingType") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const bhk = searchParams.get("bhk") || "";
  const furnishing = searchParams.get("furnishing") || "";
  const kitchen = searchParams.get("kitchen") === "1";

  const { city, locality } = useMemo(() => {
    const parsed = parseLocationInput(q, cityParam);
    return {
      city: normalizeCity(parsed.city || cityParam),
      locality: localityParam || parsed.locality,
    };
  }, [cityParam, localityParam, q]);

  const properties = useMemo(() => {
    const hasLocation = Boolean(q || locality || city);
    const hasFilters = Boolean(
      category || listingType || minPrice || maxPrice || bhk || furnishing || kitchen
    );
    if (!hasLocation && !hasFilters) return [];

    return filterStaticProperties({
      city: city || undefined,
      locality,
      category,
      listingType,
      minPrice,
      maxPrice,
      bhk,
      furnishing,
      kitchen,
      q,
    });
  }, [city, locality, category, listingType, minPrice, maxPrice, bhk, furnishing, kitchen, q]);

  const sorted = useMemo(() => {
    if (!sort) return properties;
    const dir = sort === "price_desc" ? -1 : 1;
    return [...properties].sort((a, b) => dir * ((a.rawPrice ?? 0) - (b.rawPrice ?? 0)));
  }, [properties, sort]);

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setSheetOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  const total = properties.length;
  const hasSearch = Boolean(
    q ||
      locality ||
      city ||
      category ||
      listingType ||
      minPrice ||
      maxPrice ||
      bhk ||
      furnishing ||
      kitchen
  );
  const locationLabel = q || [locality, city].filter(Boolean).join(", ") || "Delhi NCR";
  const chips = activeFilterChips(searchParams);
  const filterCount = FILTER_KEYS.filter((k) => searchParams.get(k)).length;

  const setParams = (mutate) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    router.push(`/search?${params.toString()}`, { scroll: false });
  };
  const clearFilters = () => setParams((p) => FILTER_KEYS.forEach((k) => p.delete(k)));
  const removeChip = (keys) => setParams((p) => keys.forEach((k) => p.delete(k)));
  const setSort = (value) => setParams((p) => (value ? p.set("sort", value) : p.delete("sort")));

  return (
    <div className="min-h-[60vh] bg-surface">
      <section className="border-b border-line bg-white">
        <div className="container-page py-5 sm:py-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted">
            <Link href="/" className="transition hover:text-brand">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className={hasSearch ? "" : "text-ink"}>Search</span>
            {hasSearch && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="line-clamp-1 text-ink">{locationLabel}</span>
              </>
            )}
          </nav>
          <h1 className="mt-2 text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {hasSearch ? `Properties in ${locationLabel}` : "Search Properties"}
          </h1>
          <p className="mt-1 hidden text-sm text-muted sm:block">
            Filter by location, type, budget and more. Browse verified listings instantly.
          </p>
          <div className="mt-4">
            <SearchBox
              variant="search"
              initialLocation={q || locationLabel}
              initialCity={city}
              initialType={type}
              initialCategory={categoryParam}
              preserveQuery={searchParams.toString()}
            />
          </div>
        </div>
      </section>

      <section className="container-page py-6 lg:py-8">
        {!hasSearch ? (
          <EmptyState
            icon={MapPin}
            title="Select a location to start"
            text="Use detect location or choose a city above."
            action={{ href: "/search?listingType=RENT", label: "Browse all rentals" }}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
            <div className="hidden lg:block">
              <div className="sticky top-[8.5rem]">
                <SearchFilters />
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted">
                  <span className="font-bold text-ink">{total.toLocaleString("en-IN")}</span>{" "}
                  {total === 1 ? "property" : "properties"} in{" "}
                  <span className="font-semibold text-ink">{locationLabel}</span>
                </p>
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSheetOpen(true)}
                    className="btn btn-outline btn-sm h-10 flex-1 sm:flex-none lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {filterCount > 0 && (
                      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[11px] font-bold text-white">
                        {filterCount}
                      </span>
                    )}
                  </button>
                  <div className="flex flex-1 items-center gap-2 sm:flex-none">
                    <span className="hidden whitespace-nowrap text-sm text-muted sm:inline">Sort by</span>
                    <CustomSelect
                      ariaLabel="Sort results"
                      value={sort}
                      onChange={setSort}
                      options={SORT_OPTIONS}
                      placeholder="Relevance"
                      align="right"
                      className="flex-1 sm:w-[190px] [&>button]:h-10"
                    />
                  </div>
                </div>
              </div>

              {chips.length > 0 && (
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {chips.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => removeChip(chip.keys)}
                      aria-label={`Remove filter ${chip.label}`}
                      className="chip h-8 animate-fade-in border-brand/30 bg-brand-soft px-3 text-xs text-brand hover:border-brand"
                    >
                      {chip.label}
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              )}

              {total === 0 ? (
                <EmptyState
                  icon={SearchX}
                  title={`No properties found near ${locationLabel}`}
                  text="Try adjusting filters or another city."
                  action={filterCount > 0 ? { onClick: clearFilters, label: "Clear filters" } : null}
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                    {sorted.slice(0, visible).map((p) => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>
                  {visible < total && (
                    <div className="mt-8 flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPage({ key: queryKey, count: visible + PAGE_SIZE })}
                        className="btn btn-outline-brand min-w-[200px] rounded-full"
                      >
                        Load more
                      </button>
                      <p className="text-xs text-muted">
                        Showing {Math.min(visible, total)} of {total}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {sheetOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 animate-fade-in bg-navy/50 backdrop-blur-[2px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute inset-x-0 bottom-0 flex max-h-[88vh] animate-sheet-up flex-col rounded-t-2xl bg-white shadow-pop"
          >
            <span aria-hidden className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-line" />
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="flex items-center gap-2 text-base font-bold text-ink">
                <SlidersHorizontal className="h-[18px] w-[18px] text-brand" />
                Filters
              </p>
              <button type="button" onClick={() => setSheetOpen(false)} aria-label="Close filters" className="icon-btn -mr-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SearchFilters showHeader={false} className="rounded-none border-0" />
            </div>
            <div className="flex gap-3 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {filterCount > 0 && (
                <button type="button" onClick={clearFilters} className="btn btn-outline flex-1">
                  Clear all
                </button>
              )}
              <button type="button" onClick={() => setSheetOpen(false)} className="btn btn-primary flex-[2]">
                Show {total.toLocaleString("en-IN")} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-light text-brand">
        <Icon className="h-7 w-7" />
      </span>
      <p className="mt-4 text-lg font-bold text-ink">{title}</p>
      <p className="mt-1.5 text-sm text-muted">{text}</p>
      {action &&
        (action.href ? (
          <Link href={action.href} className="btn btn-primary mt-5">
            {action.label}
          </Link>
        ) : (
          <button type="button" onClick={action.onClick} className="btn btn-primary mt-5">
            {action.label}
          </button>
        ))}
    </div>
  );
}
