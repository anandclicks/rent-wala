import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api";
import { buildPropertyWhere, formatPropertyForCard } from "@/lib/property-utils";
import { normalizeCity } from "@/lib/search";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
  const filters = {
    city: normalizeCity(searchParams.get("city") || ""),
    locality: searchParams.get("locality") || "",
    listingType: searchParams.get("listingType")?.toUpperCase() || "",
    category: searchParams.get("category")?.toUpperCase().replace(/ /g, "_") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bhk: searchParams.get("bhk") || "",
    furnishing: searchParams.get("furnishing") || "",
    featured: searchParams.get("featured") || "",
    q: searchParams.get("q") || "",
    limit: Math.min(Number(searchParams.get("limit") || 24), 100),
    offset: Number(searchParams.get("offset") || 0),
  };

  const where = buildPropertyWhere(filters);
  if (filters.city) where.city = filters.city;

  const [items, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: filters.limit,
      skip: filters.offset,
    }),
    prisma.property.count({ where }),
  ]);

  return jsonOk({
    total,
    properties: items.map(formatPropertyForCard),
  });
  } catch (err) {
    console.error("GET /api/properties", err);
    return jsonOk({ total: 0, properties: [], error: "Database unavailable" });
  }
}
