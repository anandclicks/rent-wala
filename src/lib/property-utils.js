const RESIDENTIAL = new Set([
  "APARTMENT",
  "VILLA",
  "INDEPENDENT_HOUSE",
  "BUILDER_FLOOR",
  "PENTHOUSE",
  "STUDIO",
]);

export function slugify(text) {
  return `${text}`
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPrice(property) {
  const n = property.price;
  if (property.listingType === "SELL") {
    if (n >= 10000000) return `₹ ${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `₹ ${(n / 100000).toFixed(2)} Lakh`;
    return `₹ ${n.toLocaleString("en-IN")}`;
  }
  return `₹ ${n.toLocaleString("en-IN")}`;
}

export function getPropertyLayout(categoryEnum, listingType) {
  const isPG = categoryEnum === "PG";
  const isResidential = RESIDENTIAL.has(categoryEnum);
  const isCommercial = categoryEnum === "COMMERCIAL";
  const isLand = categoryEnum === "LAND";
  const isRent = listingType === "RENT";
  const isSell = listingType === "SELL";

  let primaryTabLabel = "Rent This Property";
  if (isSell) primaryTabLabel = "Buy This Property";
  else if (isCommercial) primaryTabLabel = "Lease This Space";

  const secondaryTabLabel = isSell ? "Schedule Site Visit" : "Schedule a Visit";

  return {
    isPG,
    isResidential,
    isCommercial,
    isLand,
    isRent,
    isSell,
    primaryTabLabel,
    secondaryTabLabel,
    showSharing: isPG,
    showRoomDetails: isPG,
    showConfiguration: !isPG,
  };
}

export function formatPropertyForCard(p) {
  const priceText = formatPrice(p);
  const suffix = p.listingType === "RENT" ? "/month" : "";
  const status = p.listingType === "RENT" ? "FOR RENT" : "FOR SALE";
  const categoryLabel = p.category.replace(/_/g, " ");
  const nearbyLocations = Array.isArray(p.nearbyLocations) ? p.nearbyLocations : [];

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    locality: p.locality,
    city: p.city,
    status,
    category: categoryLabel,
    featured: p.featured,
    verified: p.verified,
    badges: p.badges,
    price: priceText,
    priceSuffix: suffix,
    rawPrice: p.price,
    beds: p.beds,
    baths: p.baths,
    area: p.areaSqft ? `${p.areaSqft.toLocaleString("en-IN")} Sq.Ft` : null,
    areaSqft: p.areaSqft,
    image: p.images?.[0] || "/logo-brand.png",
    images: p.images,
    amenities: p.amenities,
    featureTags: p.featureTags || [],
    highlights: p.highlights || [],
    nearbyLocations,
    availability: p.availability || "Ready to Move",
    listingType: p.listingType,
    categoryEnum: p.category,
    suitableFor: p.suitableFor,
    roomOptions: p.roomOptions,
    description: p.description,
    address: p.address,
    furnishing: p.furnishing,
    facing: p.facing,
    floor: p.floor,
    totalFloors: p.totalFloors,
    propertyAge: p.propertyAge,
    layout: getPropertyLayout(p.category, p.listingType),
  };
}

export function buildPropertyWhere(filters) {
  const where = { status: "PUBLISHED" };

  if (filters.city) where.city = filters.city;
  if (filters.locality) {
    where.locality = { contains: filters.locality, mode: "insensitive" };
  }
  if (filters.listingType) where.listingType = filters.listingType;
  if (filters.category) where.category = filters.category;
  if (filters.featured === "true") where.featured = true;

  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price.gte = Number(filters.minPrice);
    if (filters.maxPrice) where.price.lte = Number(filters.maxPrice);
  }

  if (filters.bhk) {
    const map = { "1 RK": 0, "1 BHK": 1, "2 BHK": 2, "3 BHK": 3, "4 BHK": 4, "4+ BHK": 5 };
    const beds = map[filters.bhk];
    if (beds != null) where.beds = beds >= 5 ? { gte: 4 } : beds === 0 ? 0 : beds;
  }

  if (filters.furnishing) {
    where.furnishing = { contains: filters.furnishing, mode: "insensitive" };
  }

  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q, mode: "insensitive" } },
      { locality: { contains: filters.q, mode: "insensitive" } },
      { city: { contains: filters.q, mode: "insensitive" } },
    ];
  }

  return where;
}

export function getMapsUrl(property) {
  const q = property.address || `${property.locality}, ${property.city}`;
  return `https://maps.google.com/?q=${encodeURIComponent(q)}`;
}
