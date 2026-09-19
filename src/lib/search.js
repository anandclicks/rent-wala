import data from "@/data/data.json";
import { filterStaticProperties } from "@/data/properties";
import { normalizeCity } from "@/lib/cities";

export { normalizeCity };

function findLocalityMatch(text) {
  const lower = text.toLowerCase();
  const exact = data.localities.find((l) => l.name.toLowerCase() === lower);
  if (exact) return exact;

  const partial = data.localities.filter(
    (l) =>
      l.name.toLowerCase().includes(lower) ||
      lower.includes(l.name.toLowerCase())
  );
  if (partial.length === 1) return partial[0];
  return null;
}

export function parseLocationInput(location = "", city = "") {
  const text = location.trim();
  const explicitCity = normalizeCity(city);

  if (!text) {
    return { city: explicitCity, locality: "", q: "" };
  }

  const parts = text.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const maybeCity = normalizeCity(parts[parts.length - 1]);
    const locality = parts.slice(0, -1).join(", ");
    return {
      city: maybeCity || explicitCity,
      locality,
      q: text,
    };
  }

  const asCity = normalizeCity(text);
  if (data.cities.some((c) => c.toLowerCase() === text.toLowerCase())) {
    return { city: asCity, locality: "", q: text };
  }

  const knownLocality = findLocalityMatch(text);
  if (knownLocality) {
    return {
      city: normalizeCity(knownLocality.city),
      locality: knownLocality.name,
      q: text,
    };
  }

  for (const knownCity of data.cities) {
    if (text.toLowerCase().includes(knownCity.toLowerCase())) {
      const localityPart = text
        .replace(new RegExp(knownCity, "i"), "")
        .replace(/,/g, "")
        .trim();
      return {
        city: knownCity,
        locality: localityPart,
        q: text,
      };
    }
  }

  if (explicitCity) {
    return { city: explicitCity, locality: text, q: text };
  }

  return { city: asCity && asCity !== text ? asCity : "", locality: "", q: text };
}

export function filterListings({ city, locality = "", type = "", listingType = "", q = "" }) {
  const category = mapSearchTypeToCategory(type);
  const results = filterStaticProperties({
    city: normalizeCity(city) || undefined,
    locality,
    category,
    listingType,
    q,
  });

  const pgs = results.filter((p) => p.categoryEnum === "PG");
  const properties = results.filter((p) => p.categoryEnum !== "PG");

  if (type === "PG / Hostel") {
    return { properties: [], pgs };
  }

  return { properties, pgs };
}

export const TYPE_TO_CATEGORY = {
  Apartment: "APARTMENT",
  Villa: "VILLA",
  "Independent House": "INDEPENDENT_HOUSE",
  Plot: "LAND",
  "PG / Hostel": "PG",
  "Office Space": "COMMERCIAL",
};

export function mapSearchTypeToCategory(type = "") {
  return TYPE_TO_CATEGORY[type] || "";
}

export const CATEGORY_TO_TYPE = {
  APARTMENT: "Apartment",
  VILLA: "Villa",
  INDEPENDENT_HOUSE: "Independent House",
  BUILDER_FLOOR: "Independent House",
  PENTHOUSE: "Villa",
  STUDIO: "Apartment",
  LAND: "Plot",
  PG: "PG / Hostel",
  COMMERCIAL: "Office Space",
};

export function mapCategoryToType(category = "") {
  return CATEGORY_TO_TYPE[category] || "";
}

export function buildSearchQuery({
  city,
  locality,
  location,
  type,
  listingType,
  category,
  preserveParams,
}) {
  const parsed = parseLocationInput(location, city);
  const params = preserveParams
    ? new URLSearchParams(preserveParams.toString())
    : new URLSearchParams();

  params.delete("city");
  params.delete("locality");
  params.delete("q");
  params.delete("type");
  params.delete("category");

  if (parsed.city) params.set("city", parsed.city);
  if (parsed.locality) params.set("locality", parsed.locality);
  if (location.trim()) params.set("q", location.trim());

  const resolvedCategory = type ? mapSearchTypeToCategory(type) : category || "";
  if (type) params.set("type", type);
  if (resolvedCategory) params.set("category", resolvedCategory);

  if (listingType) params.set("listingType", listingType);

  return params.toString();
}
