import { countProperties, localityCounts, priceList } from "@/data/properties";
import { mapSearchTypeToCategory, normalizeCity, parseLocationInput } from "@/lib/search";
import data from "@/data/data.json";
import {
  CATEGORY_OWNED_PARAMS,
  PROPERTY_CATEGORIES,
  ROOM_TYPE_LABELS,
  SHARING_LABELS,
  categoryFromParams,
  withCategory,
} from "@/data/categories";

/**
 * OLX-style search filters: every option knows the URL it leads to and how many listings
 * it would show. Used by the laptop sidebar and the phone "Filters & Sort" sheet.
 */

export const BUDGET_PRESETS = [
  { label: "Below ₹10K", min: "", max: "10000" },
  { label: "₹10K – ₹25K", min: "10000", max: "25000" },
  { label: "₹25K – ₹50K", min: "25000", max: "50000" },
  { label: "₹50K – ₹1 Lac", min: "50000", max: "100000" },
  { label: "₹1 Lac and Above", min: "100000", max: "" },
];

const BHK_OPTIONS = ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
const FURNISHING_OPTIONS = ["Fully Furnished", "Semi-Furnished", "Unfurnished"];
const LISTING_OPTIONS = [
  { value: "RENT", label: "Rent" },
  { value: "SELL", label: "Buy" },
];
const LOCATION_PARAMS = { locality: "", q: "", location: "" };

/** The filters the listing search runs with, read from the URL (same rules as the results list). */
export function filtersFromParams(params) {
  const q = params.get("q") || params.get("location") || "";
  const cityParam = params.get("city") || "";
  const parsed = parseLocationInput(q, cityParam);
  return {
    city: normalizeCity(parsed.city || cityParam) || undefined,
    locality: params.get("locality") || parsed.locality,
    category: params.get("category") || mapSearchTypeToCategory(params.get("type") || ""),
    space: params.get("space") || "",
    room: params.get("room") || "",
    sharing: params.get("sharing") || "",
    listingType: params.get("listingType") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
    bhk: params.get("bhk") || "",
    furnishing: params.get("furnishing") || "",
    kitchen: params.get("kitchen") === "1",
    q,
  };
}

/** Returns a function that applies `patch` to a copy of the params ("" removes a key). */
export function patchParams(patch) {
  return (params) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    return next;
  };
}

const countFor = (params) => countProperties(filtersFromParams(params));

/** A toggle option on one URL key: picking the selected value again clears it. */
function keyOption(params, key, value, label) {
  const selected = params.get(key) === value;
  const target = patchParams({ [key]: value });
  return {
    id: value,
    label,
    selected,
    count: countFor(target(params)),
    apply: selected ? patchParams({ [key]: "" }) : target,
  };
}

function categoryFacet(params) {
  const current = categoryFromParams(params)?.key || "";
  return {
    id: "category",
    title: "Categories",
    tab: "Category",
    kind: "list",
    active: Boolean(current),
    allOption: { label: "All Categories", selected: !current, apply: (p) => withCategory(p, "") },
    options: PROPERTY_CATEGORIES.map((c) => {
      const target = (p) => withCategory(p, c.key);
      return {
        id: c.key,
        label: c.label,
        selected: current === c.key,
        count: countFor(target(params)),
        apply: current === c.key ? (p) => withCategory(p, "") : target,
      };
    }),
  };
}

function locationFacet(params) {
  const { city, locality } = filtersFromParams(params);
  const facet = {
    id: "location",
    title: "Locations",
    tab: "Location",
    kind: "location",
    active: Boolean(city || locality),
    city: city || "",
    clearCity: patchParams({ city: "", ...LOCATION_PARAMS }),
  };

  if (!city) {
    facet.options = data.cities.map((name) => {
      const target = patchParams({ city: name, ...LOCATION_PARAMS });
      return { id: name, label: name, selected: false, count: countFor(target(params)), apply: target };
    });
    return facet;
  }

  const withoutLocality = patchParams({ city, ...LOCATION_PARAMS })(params);
  facet.cityCount = countFor(withoutLocality);
  facet.cityOption = { selected: !locality, apply: () => withoutLocality };
  facet.options = localityCounts(filtersFromParams(withoutLocality))
    .map(({ name }) => {
      const selected = locality?.toLowerCase() === name.toLowerCase();
      const target = patchParams({ city, ...LOCATION_PARAMS, locality: name });
      return {
        id: name,
        label: name,
        selected,
        // Counted the same way the results list matches a locality, so the numbers always agree.
        count: countFor(target(params)),
        apply: selected ? () => withoutLocality : target,
      };
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  return facet;
}

function budgetFacet(params) {
  const min = params.get("minPrice") || "";
  const max = params.get("maxPrice") || "";
  return {
    id: "budget",
    title: "Budget",
    tab: "Budget",
    kind: "cards",
    hint: "Choose from options below",
    active: Boolean(min || max),
    min,
    max,
    options: BUDGET_PRESETS.map((b) => {
      const selected = min === b.min && max === b.max;
      const target = patchParams({ minPrice: b.min, maxPrice: b.max });
      return {
        id: b.label,
        label: b.label,
        selected,
        count: countFor(target(params)),
        apply: selected ? patchParams({ minPrice: "", maxPrice: "" }) : target,
      };
    }),
  };
}

function checksFacet(params, { id, title, tab, key, options }) {
  return {
    id,
    title,
    tab,
    kind: "checks",
    hint: "Choose from below options",
    active: Boolean(params.get(key)),
    options: options.map((o) =>
      typeof o === "string" ? keyOption(params, key, o, o) : keyOption(params, key, o.value, o.label)
    ),
  };
}

/** Every filter section for the current params, with live counts. */
export function buildFacets(params) {
  const room = checksFacet(params, {
    id: "room",
    title: "Room Type",
    tab: "Room Type",
    key: "room",
    options: Object.entries(ROOM_TYPE_LABELS).map(([value, label]) => ({ value, label })),
  });
  const sharing = checksFacet(params, {
    id: "sharing",
    title: "Sharing",
    tab: "Sharing",
    key: "sharing",
    options: Object.entries(SHARING_LABELS).map(([value, label]) => ({ value, label })),
  });
  // Room kinds / sharing only exist for co-living and flats; hide a section when nothing could match.
  const relevant = (facet) => facet.active || facet.options.some((o) => o.count > 0);

  return [
    categoryFacet(params),
    locationFacet(params),
    budgetFacet(params),
    checksFacet(params, { id: "bhk", title: "BHK", tab: "BHK", key: "bhk", options: BHK_OPTIONS }),
    ...(relevant(sharing) ? [sharing] : []),
    ...(relevant(room) ? [room] : []),
    checksFacet(params, {
      id: "furnishing",
      title: "Furnishing",
      tab: "Furnishing",
      key: "furnishing",
      options: FURNISHING_OPTIONS,
    }),
    checksFacet(params, {
      id: "listingType",
      title: "Rent or Buy",
      tab: "Rent / Buy",
      key: "listingType",
      options: LISTING_OPTIONS,
    }),
  ];
}

/** Filter keys the panels control: drives "Clear all" and the active-filter badge. */
export const FILTER_KEYS = [
  "category",
  "listingType",
  "minPrice",
  "maxPrice",
  "bhk",
  "furnishing",
  "room",
  "sharing",
];

/** Params with every filter (and the picked category) removed; location and sort stay. */
export function clearFilterParams(params) {
  const next = new URLSearchParams(params.toString());
  [...FILTER_KEYS, ...CATEGORY_OWNED_PARAMS].forEach((k) => next.delete(k));
  return next;
}

const niceCeil = (n) => {
  const step = n > 200000 ? 50000 : n > 50000 ? 10000 : 5000;
  return Math.max(step, Math.ceil(n / step) * step);
};

/**
 * Budget histogram for the phone filter: slider scale (0 → max, the top meaning "max and above")
 * and listing counts per bar. The scale stops at the 90th-percentile price so a few very
 * expensive offices don't squash every other bar.
 */
export function budgetHistogram(params, bins = 12) {
  const prices = priceList(filtersFromParams(patchParams({ minPrice: "", maxPrice: "" })(params))).sort(
    (a, b) => a - b
  );
  const p90 = prices.length ? prices[Math.floor((prices.length - 1) * 0.9)] : 50000;
  const max = niceCeil(p90);
  const counts = new Array(bins).fill(0);
  for (const price of prices) counts[Math.min(bins - 1, Math.floor((price / max) * bins))] += 1;
  const step = max >= 100000 ? 1000 : 500;
  return { max, step, counts };
}
