"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import SearchBox from "@/components/SearchBox";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { mapSearchTypeToCategory, normalizeCity, parseLocationInput } from "@/lib/search";
import { filterStaticProperties } from "@/data/properties";

export default function SearchResults() {
  const searchParams = useSearchParams();

  const cityParam = searchParams.get("city") || "";
  const localityParam = searchParams.get("locality") || "";
  const type = searchParams.get("type") || "";
  const q = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const category = categoryParam || mapSearchTypeToCategory(type);
  const listingType = searchParams.get("listingType") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const bhk = searchParams.get("bhk") || "";
  const furnishing = searchParams.get("furnishing") || "";

  const { city, locality } = useMemo(() => {
    const parsed = parseLocationInput(q, cityParam);
    return {
      city: normalizeCity(parsed.city || cityParam),
      locality: localityParam || parsed.locality,
    };
  }, [cityParam, localityParam, q]);

  const properties = useMemo(() => {
    if (!city) return [];
    return filterStaticProperties({
      city,
      locality,
      category,
      listingType,
      minPrice,
      maxPrice,
      bhk,
      furnishing,
      q: locality ? "" : q,
    });
  }, [city, locality, category, listingType, minPrice, maxPrice, bhk, furnishing, q]);

  const total = properties.length;
  const hasSearch = Boolean(city);
  const locationLabel = [locality, city].filter(Boolean).join(", ");

  return (
    <div className="min-h-[60vh] bg-gray-50">
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition hover:text-brand-darker"
          >
            ← Back to home
          </Link>
          <h1 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">Search Properties</h1>
          <p className="mt-2 text-sm text-muted">
            Filter by location, type, budget and more. Browse verified listings instantly.
          </p>
          <div className="mt-6">
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

      <section className="mx-auto max-w-[1400px] px-4 py-10 lg:px-8">
        {!hasSearch ? (
          <div className="rounded-2xl border border-line bg-white px-6 py-12 text-center">
            <p className="text-lg font-bold text-ink">Select a location to start</p>
            <p className="mt-2 text-sm text-muted">
              Use detect location or choose a city above.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <SearchFilters />

            <div>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-brand-dark">
                    Showing {total} {total === 1 ? "property" : "properties"} in
                  </p>
                  <h2 className="text-xl font-bold text-ink">{locationLabel}</h2>
                </div>
              </div>

              {total === 0 ? (
                <div className="rounded-2xl border border-line bg-white px-6 py-12 text-center">
                  <p className="text-lg font-bold text-ink">No properties found near {locationLabel}</p>
                  <p className="mt-2 text-sm text-muted">Try adjusting filters or another city.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {properties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
