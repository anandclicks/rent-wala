import { formatPropertyForCard } from "@/lib/property-utils";
import { normalizeCity } from "@/lib/cities";
import {
  transformScrapedProperties,
  buildLocalitiesFromProperties,
} from "@/lib/scraped-transform";
import allProperties from "@/data/noida/all_properties.json";

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

export function filterStaticProperties(filters) {
  let results = [...PROPERTIES];

  if (filters.city) {
    const city = normalizeCity(filters.city).toLowerCase();
    results = results.filter((p) => p.city.toLowerCase() === city);
  }
  if (filters.locality) {
    const loc = filters.locality.toLowerCase();
    results = results.filter(
      (p) => p.locality.toLowerCase().includes(loc) || loc.includes(p.locality.toLowerCase())
    );
  }
  if (filters.category) {
    results = results.filter((p) => p.category === filters.category);
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
  if (filters.q) {
    const q = filters.q.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.address?.toLowerCase().includes(q)
    );
  }

  return results.map(formatPropertyForCard);
}

export function getScrapedStats() {
  const byType = {};
  for (const p of PROPERTIES) {
    byType[p.propertyType] = (byType[p.propertyType] || 0) + 1;
  }
  return {
    total: PROPERTIES.length,
    byType,
    city: PROPERTIES[0]?.city || "Noida",
  };
}
