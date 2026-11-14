const SHARING_LABELS = ["Private Room", "Double Sharing", "Triple Sharing", "Four Sharing"];

function isObjectId(value) {
  return typeof value === "string" && /^[a-f0-9]{24}$/i.test(value);
}

export function mapScrapedType(propertyType) {
  switch (propertyType) {
    case "coliving":
      return "PG";
    case "flat":
      return "APARTMENT";
    case "coworking":
    case "office":
      return "COMMERCIAL";
    default:
      return "APARTMENT";
  }
}

export function extractLocality(item) {
  if (item.locality?.trim()) return item.locality.trim();

  const micro = item.raw?.location?.micro_location?.name;
  if (micro?.trim()) return micro.trim();

  const locName = item.raw?.location?.name;
  if (locName?.trim()) return locName.trim();

  const address = item.address || "";
  const sectorMatch = address.match(/Sector\s+\d+[A-Za-z]?/i);
  if (sectorMatch) return sectorMatch[0];

  return "";
}

function inferFurnishing(amenities = []) {
  const list = amenities.map((a) => a.toLowerCase());
  if (list.some((a) => a.includes("fully furnished"))) return "Fully Furnished";
  if (list.some((a) => a.includes("semi furnished") || a.includes("semi-furnished"))) {
    return "Semi-Furnished";
  }
  if (list.some((a) => a.includes("unfurnished"))) return "Unfurnished";
  return undefined;
}

function buildRoomOptions(item, images) {
  const category = mapScrapedType(item.property_type);
  const thumb = images[0] || "/logo-brand.png";

  if (category === "PG") {
    const raw = item.raw || {};
    const fromRaw = [
      raw.single_sharing ? { name: "Private Room", price: raw.single_sharing } : null,
      raw.double_sharing ? { name: "Double Sharing", price: raw.double_sharing } : null,
      raw.triple_sharing ? { name: "Triple Sharing", price: raw.triple_sharing } : null,
    ].filter(Boolean);

    if (fromRaw.length > 0) {
      return fromRaw.map((room) => ({
        ...room,
        image: thumb,
        furniture: ["Bed", "Wardrobe", "Study table"],
      }));
    }
  }

  const plans = Array.isArray(item.price_plans) ? item.price_plans : [];
  if (plans.length <= 1) return undefined;

  return plans.map((plan, index) => ({
    name: plan.name && !isObjectId(plan.name) ? plan.name : SHARING_LABELS[index] || `Plan ${index + 1}`,
    price: plan.price,
    image: thumb,
    furniture: category === "PG" ? ["Bed", "Wardrobe"] : [],
  }));
}

/**
 * What kind of room a listing offers, read from the scraped "type_of_co_living" (e.g. "1 BHK",
 * "Double Sharing", "Private room", "Studio Apartment"), falling back to the name/description.
 * Returns { beds, roomType }: beds is the BHK count (0 for studio / 1 RK), roomType is
 * "private" | "shared" | "studio" | "bhk".
 */
export function parseRoomType(item) {
  const detail = item.raw?.other_detail || {};
  const typed = typeof detail.type_of_co_living === "string" && !isObjectId(detail.type_of_co_living)
    ? detail.type_of_co_living
    : "";
  const candidates = [typed, item.name, item.description].filter(Boolean);

  for (const text of candidates) {
    const bhk = text.match(/(\d)\s*-?\s*bhk/i);
    if (bhk) return { beds: Number(bhk[1]), roomType: "bhk" };
    if (/\b1\s*-?\s*rk\b|studio/i.test(text)) return { beds: 0, roomType: "studio" };
    // Only trust sharing / private wording from the structured field, not free-text marketing copy.
    if (text === typed) {
      if (/private|single/i.test(text)) return { beds: undefined, roomType: "private" };
      if (/sharing|double|triple/i.test(text)) return { beds: undefined, roomType: "shared" };
    }
  }

  const bedrooms = Number(detail.bedroom);
  if (Number.isFinite(bedrooms) && bedrooms > 0) return { beds: bedrooms, roomType: "bhk" };
  return { beds: undefined, roomType: undefined };
}

function buildHighlights(item, category) {
  const highlights = [];
  if (item.brand) highlights.push(`Managed by ${item.brand}`);
  if (category === "PG") highlights.push("Flexible sharing options");
  if (category === "COMMERCIAL") highlights.push("Professional workspace");
  if (item.amenities?.includes("Wi-Fi")) highlights.push("High-speed Wi-Fi included");
  highlights.push("Verified listing on Property Rent Wala");
  return highlights.slice(0, 5);
}

export function transformScrapedProperty(item, index = 0) {
  const category = mapScrapedType(item.property_type);
  const slug = item.slug || `property-${item.id}`;
  const locality = extractLocality(item);
  const images = item.images?.length ? item.images : ["/logo-brand.png"];
  const furnishing = inferFurnishing(item.amenities);
  const roomOptions = buildRoomOptions(item, images);
  const { beds, roomType } = parseRoomType(item);

  const badges = [];
  if (item.status === "approve") badges.push("VERIFIED");
  if (category === "PG") badges.push("CO-LIVING");
  if (category === "COMMERCIAL") badges.push("COMMERCIAL");
  if (index < 12) badges.push("FEATURED");

  const description =
    item.description?.trim() ||
    `${item.name} in ${locality || item.city || "Noida"}. Explore amenities, pricing, and book a visit on Property Rent Wala.`;

  return {
    id: slug,
    slug,
    title: item.name,
    description: description.slice(0, 2000),
    category,
    listingType: "RENT",
    city: item.city || "Noida",
    locality,
    address: item.address?.trim() || [locality, item.city].filter(Boolean).join(", "),
    price: Number(item.starting_price) || 0,
    latitude: item.latitude,
    longitude: item.longitude,
    furnishing,
    beds,
    roomType,
    badges,
    amenities: item.amenities || [],
    images,
    featured: index < 12,
    verified: item.status === "approve",
    availability: "Ready to Move",
    suitableFor: category === "PG" ? "Unisex" : undefined,
    roomOptions,
    highlights: buildHighlights(item, category),
    featureTags: (item.amenities || []).slice(0, 4),
    nearbyLocations: [],
    sourceUrl: item.url,
    productId: item.product_id,
    brand: item.brand,
    scrapedAt: item.scraped_at,
    propertyType: item.property_type,
  };
}

export function transformScrapedProperties(items = []) {
  const seen = new Set();
  const transformed = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.status && item.status !== "approve") continue;

    let slug = item.slug || `property-${item.id}`;
    if (seen.has(slug)) slug = `${slug}-${item.id.slice(-6)}`;
    seen.add(slug);

    transformed.push(transformScrapedProperty({ ...item, slug }, i));
  }

  return transformed;
}

const CITY_STATE = {
  Delhi: "Delhi",
  Noida: "Uttar Pradesh",
  Gurugram: "Haryana",
  Gorakhpur: "Uttar Pradesh",
  Faridabad: "Haryana",
  Ghaziabad: "Uttar Pradesh",
};

function stateForCity(city = "") {
  return CITY_STATE[city] || "Delhi NCR";
}

export function buildLocalitiesFromProperties(properties = []) {
  const map = new Map();
  for (const p of properties) {
    if (!p.locality || !p.city) continue;
    const key = `${p.locality}|${p.city}`;
    if (!map.has(key)) {
      map.set(key, { name: p.locality, city: p.city, state: stateForCity(p.city) });
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
