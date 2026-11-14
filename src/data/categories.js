import {
  BedDouble,
  Building,
  Building2,
  Castle,
  DoorOpen,
  House,
  LandPlot,
  Laptop,
  Store,
} from "lucide-react";

/**
 * The site's one list of property categories. Every menu, filter, tab and form reads from here,
 * so changing a category means changing it only in this file.
 *
 * `query` is what the search page filters on. Co-Working and Office & Shops narrow COMMERCIAL
 * by the listing's own type (`space`); Commercial Property for Rent shows both. Rooms uses the
 * "rooms" space group: every co-living room and flat (see SPACE_GROUPS). Each link also
 * carries `cat=<key>` to remember which category the visitor picked (highlighting, filter chips).
 */
export const PROPERTY_CATEGORIES = [
  { key: "rooms", label: "Rooms", icon: DoorOpen, query: { space: "rooms", listingType: "RENT" } },
  { key: "flats", label: "Flats", icon: Building, query: { category: "APARTMENT" } },
  { key: "coworking", label: "Co-Working", icon: Laptop, query: { category: "COMMERCIAL", space: "coworking" } },
  { key: "villas", label: "Villas", icon: Castle, query: { category: "VILLA" } },
  { key: "lands", label: "Lands / Plots", icon: LandPlot, query: { category: "LAND" } },
  { key: "pg", label: "PG / Hostels", icon: BedDouble, query: { category: "PG" } },
  { key: "independent", label: "Independent House", icon: House, query: { category: "INDEPENDENT_HOUSE" } },
  {
    key: "commercial",
    label: "Commercial Property for Rent",
    icon: Building2,
    query: { category: "COMMERCIAL", listingType: "RENT" },
  },
  { key: "office", label: "Office & Shops", icon: Store, query: { category: "COMMERCIAL", space: "office" } },
];

export const CATEGORY_PARAM = "cat";

/** `space` values that stand for several listing types at once. */
const SPACE_GROUPS = {
  rooms: ["coliving", "flat"],
};

/** Does a listing's own type (coliving, flat, coworking, office) match a `space` filter? */
export function matchesSpace(propertyType, space) {
  if (!space) return true;
  return (SPACE_GROUPS[space] || [space]).includes(propertyType);
}

/** Room kinds for the `room` filter (set from the scraped data in lib/scraped-transform). */
export const ROOM_TYPE_LABELS = {
  private: "Private Room",
  shared: "Shared Room",
};

const rent = (noun) => ({ label: `${noun} for Rent`, badge: "For Rent", query: { listingType: "RENT" } });
const sale = (noun) => ({ label: `${noun} for Sale`, badge: "For Sale", query: { listingType: "SALE" } });
const bhk = (value, noun) => ({ label: `${value} ${noun}`, badge: value, query: { bhk: value } });
const furnished = (noun) => [
  { label: `Fully Furnished ${noun}`, badge: "Furnished", query: { furnishing: "Fully Furnished" } },
  { label: `Semi-Furnished ${noun}`, badge: "Semi", query: { furnishing: "Semi-Furnished" } },
  { label: `Unfurnished ${noun}`, badge: "Unfurnished", query: { furnishing: "Unfurnished" } },
];

/**
 * Narrower picks shown beside a category in the phone category browser (OLX-style right panel).
 * Each `query` is layered on top of the category's own query, so it only uses filters the
 * search page understands (listingType, bhk, furnishing).
 */
export const CATEGORY_SUBTYPES = {
  rooms: [
    { label: "Private Rooms", badge: "Private", query: { room: "private" } },
    { label: "Shared Rooms", badge: "Sharing", query: { room: "shared" } },
    { label: "Studio / 1 RK", badge: "1 RK", query: { bhk: "1 RK" } },
    bhk("1 BHK", "Rooms"),
    bhk("2 BHK", "Rooms"),
    bhk("3 BHK", "Rooms"),
    bhk("4 BHK", "Rooms"),
  ],
  flats: [
    rent("Flats"),
    sale("Flats"),
    bhk("1 BHK", "Flats"),
    bhk("2 BHK", "Flats"),
    bhk("3 BHK", "Flats"),
    bhk("4+ BHK", "Flats"),
  ],
  coworking: [rent("Co-Working Spaces"), ...furnished("Spaces").slice(0, 2)],
  villas: [rent("Villas"), sale("Villas"), bhk("3 BHK", "Villas"), bhk("4+ BHK", "Villas")],
  lands: [sale("Plots"), { ...rent("Plots"), label: "Plots for Lease", badge: "Lease" }],
  pg: furnished("PGs"),
  independent: [
    rent("Houses"),
    sale("Houses"),
    bhk("1 BHK", "Houses"),
    bhk("2 BHK", "Houses"),
    bhk("3 BHK", "Houses"),
    bhk("4+ BHK", "Houses"),
  ],
  commercial: furnished("Spaces"),
  office: [rent("Offices & Shops"), sale("Offices & Shops"), furnished("Offices")[0]],
};

/** Which group each category belongs to in the "List your property" form. */
const FORM_GROUP_BY_KEY = {
  rooms: "residential",
  flats: "residential",
  villas: "residential",
  independent: "residential",
  pg: "residential",
  coworking: "commercial",
  commercial: "commercial",
  office: "commercial",
  lands: "land",
};

/** Category labels offered as "Property type" for a form group (residential / commercial / land). */
export function categoryLabelsForGroup(group) {
  return PROPERTY_CATEGORIES.filter((c) => FORM_GROUP_BY_KEY[c.key] === group).map((c) => c.label);
}

/** URL params a category selection owns; cleared before applying another category. */
export const CATEGORY_OWNED_PARAMS = [CATEGORY_PARAM, "category", "space", "room", "type", "kitchen"];

/** Best guess for links that only carry the DB category (old bookmarks, property pages). */
const KEY_BY_DB_CATEGORY = {
  APARTMENT: "flats",
  STUDIO: "flats",
  BUILDER_FLOOR: "flats",
  VILLA: "villas",
  PENTHOUSE: "villas",
  LAND: "lands",
  PG: "pg",
  INDEPENDENT_HOUSE: "independent",
  COMMERCIAL: "commercial",
};

export function getCategory(key) {
  return PROPERTY_CATEGORIES.find((c) => c.key === key) || null;
}

/** The category the current URL is showing, if any. */
export function categoryFromParams(params) {
  const byKey = getCategory(params.get(CATEGORY_PARAM));
  if (byKey) return byKey;
  return getCategory(KEY_BY_DB_CATEGORY[params.get("category")]);
}

export function categoryQuery(category) {
  return { [CATEGORY_PARAM]: category.key, ...category.query };
}

export function categoryHref(category) {
  return `/search?${new URLSearchParams(categoryQuery(category)).toString()}`;
}

/**
 * Switch the category on an existing set of search params (keeps city, budget, etc.).
 * Pass a falsy key to clear it. Returns a new URLSearchParams.
 */
export function withCategory(params, key) {
  const next = new URLSearchParams(params.toString());
  const previous = categoryFromParams(next);
  CATEGORY_OWNED_PARAMS.forEach((p) => next.delete(p));
  // "Rooms" is a BHK filter; drop it when leaving Rooms so it doesn't stick to the next category.
  if (previous?.query.bhk && next.get("bhk") === previous.query.bhk) next.delete("bhk");

  const category = getCategory(key);
  if (category) {
    for (const [k, v] of Object.entries(categoryQuery(category))) next.set(k, v);
  }
  return next;
}

/** Client-side check used by home-page tabs that filter already-loaded property cards. */
export function cardMatchesCategory(card, category) {
  const { query } = category;
  if (query.category && card.categoryEnum !== query.category) return false;
  if (!matchesSpace(card.propertyType, query.space)) return false;
  if (query.listingType && card.listingType && card.listingType !== query.listingType) return false;
  return true;
}
