import { formatPropertyForCard } from "@/lib/property-utils";
import { normalizeCity } from "@/lib/cities";
import { matchesSpace } from "@/data/categories";
import {
  transformScrapedProperties,
  buildLocalitiesFromProperties,
} from "@/lib/scraped-transform";
import allProperties from "@/data/delhi_ncr/all_properties.json";

export const SITE_CONFIG = {
  callNumber: "+919876543210",
  whatsappNumber: "+919876543210",
};

const PROPERTIES = transformScrapedProperties(allProperties);

export const SCRAPED_LOCALITIES = buildLocalitiesFromProperties(PROPERTIES);

export function getAllProperties() {
  return PROPERTIES.map(formatPropertyForCard);
}

export function getPropertyBySlug(slug) {
  const raw = PROPERTIES.find((p) => p.slug === slug);
  return raw ? formatPropertyForCard(raw) : null;
}

export function getRawPropertyBySlug(slug) {
  return PROPERTIES.find((p) => p.slug === slug) || null;
}

export function getNearbyProperties(property, limit = 4) {
  return PROPERTIES.filter((p) => p.city === property.city && p.slug !== property.slug)
    .slice(0, limit)
    .map(formatPropertyForCard);
}

const FLAT_CATEGORIES = new Set(["APARTMENT", "STUDIO", "BUILDER_FLOOR"]);
const VILLA_CATEGORIES = new Set(["VILLA", "INDEPENDENT_HOUSE", "PENTHOUSE"]);

export function getByCategoryGroup(group) {
  let filtered;
  if (group === "PG") filtered = PROPERTIES.filter((p) => p.category === "PG");
  else if (group === "FLATS") filtered = PROPERTIES.filter((p) => FLAT_CATEGORIES.has(p.category));
  else if (group === "VILLAS") filtered = PROPERTIES.filter((p) => VILLA_CATEGORIES.has(p.category));
  else filtered = PROPERTIES;
  return filtered.map(formatPropertyForCard);
}

export function getPropertiesByCategoryEnum(category) {
  if (category === "FLATS") {
    return PROPERTIES.filter((p) => FLAT_CATEGORIES.has(p.category)).map(formatPropertyForCard);
  }
  if (category === "PG") {
    return PROPERTIES.filter((p) => p.category === "PG").map(formatPropertyForCard);
  }
  if (category === "COMMERCIAL") {
    return PROPERTIES.filter((p) => p.category === "COMMERCIAL").map(formatPropertyForCard);
  }
  return PROPERTIES.filter((p) => p.category === category).map(formatPropertyForCard);
}

function propertyLocationText(property) {
  return [property.title, property.locality, property.city, property.address, property.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function hasKitchenAmenity(property) {
  const amenities = property.amenities || [];
  const text = propertyLocationText(property);
  return (
    amenities.some((a) => /kitchen|modular/i.test(a)) ||
    /kitchen|modular kitchen/i.test(text)
  );
}

function matchesLocationQuery(property, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = propertyLocationText(property);
  const tokens = q.split(/[\s,]+/).filter(Boolean);
  if (tokens.length === 0) return haystack.includes(q);

  return tokens.every((token) => haystack.includes(token));
}

export function filterStaticProperties(filters) {
  return filterRawProperties(filters).map(formatPropertyForCard);
}

/** How many listings match — used for the "(73)" counts next to every filter option. */
export function countProperties(filters) {
  return filterRawProperties(filters).length;
}

/** Listings per locality for the given filters, busiest first: [{ name, count }]. */
export function localityCounts(filters) {
  const counts = new Map();
  for (const p of filterRawProperties(filters)) {
    if (p.locality) counts.set(p.locality, (counts.get(p.locality) || 0) + 1);
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Prices of the matching listings (for the budget histogram). */
export function priceList(filters) {
  return filterRawProperties(filters)
    .map((p) => p.price)
    .filter((n) => Number.isFinite(n) && n > 0);
}

/** Every city + locality pair in the data with its listing count, busiest first. */
export function allLocalities() {
  const counts = new Map();
  for (const p of PROPERTIES) {
    if (!p.locality || !p.city) continue;
    const key = `${p.locality}|${p.city}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts]
    .map(([key, count]) => {
      const [name, city] = key.split("|");
      return { name, city, count };
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** City and locality of the listing closest to a { lat, lng } point. */
export function nearestPlace(coords) {
  let best = null;
  let bestD = Infinity;
  for (const p of PROPERTIES) {
    if (!Number.isFinite(p.latitude) || !Number.isFinite(p.longitude)) continue;
    const d = (p.latitude - coords.lat) ** 2 + (p.longitude - coords.lng) ** 2;
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return best ? { city: best.city, locality: best.locality || "" } : null;
}

function filterRawProperties(filters) {
  let results = PROPERTIES;

  if (filters.city) {
    const city = normalizeCity(filters.city).toLowerCase();
    results = results.filter((p) => p.city.toLowerCase() === city);
  }

  const locationQuery = (filters.q || filters.locality || "").trim();
  if (locationQuery) {
    results = results.filter((p) => matchesLocationQuery(p, locationQuery));
  }
  if (filters.category) {
    results = results.filter((p) => p.category === filters.category);
  }
  if (filters.space) {
    results = results.filter((p) => matchesSpace(p.propertyType, filters.space));
  }
  if (filters.room) {
    results = results.filter((p) => p.roomType === filters.room);
  }
  if (filters.listingType) {
    results = results.filter((p) => p.listingType === filters.listingType);
  }
  if (filters.minPrice) {
    results = results.filter((p) => p.price >= Number(filters.minPrice));
  }
  if (filters.maxPrice) {
    results = results.filter((p) => p.price <= Number(filters.maxPrice));
  }
  if (filters.bhk) {
    const map = { "1 RK": 0, "1 BHK": 1, "2 BHK": 2, "3 BHK": 3, "4 BHK": 4, "4+ BHK": 5 };
    const beds = map[filters.bhk];
    if (beds != null) {
      results = results.filter((p) =>
        beds >= 5 ? (p.beds ?? 0) >= 4 : beds === 0 ? p.beds === 0 : p.beds === beds
      );
    }
  }
  if (filters.furnishing) {
    const f = filters.furnishing.toLowerCase();
    results = results.filter((p) => p.furnishing?.toLowerCase().includes(f));
  }
  if (filters.kitchen) {
    results = results.filter((p) => hasKitchenAmenity(p));
  }
  return results;
}

export function getScrapedStats() {
  const byType = {};
  for (const p of PROPERTIES) {
    byType[p.propertyType] = (byType[p.propertyType] || 0) + 1;
  }
  return {
    total: PROPERTIES.length,
    byType,
    cities: [...new Set(PROPERTIES.map((p) => p.city))].sort(),
  };
}
