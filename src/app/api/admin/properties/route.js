import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk, parseBody } from "@/lib/api";
import { slugify } from "@/lib/property-utils";

const propertySchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.enum([
    "APARTMENT",
    "VILLA",
    "INDEPENDENT_HOUSE",
    "BUILDER_FLOOR",
    "PG",
    "COMMERCIAL",
    "LAND",
    "STUDIO",
    "PENTHOUSE",
  ]),
  listingType: z.enum(["RENT", "SELL"]),
  city: z.string().min(2),
  locality: z.string().min(2),
  address: z.string().optional(),
  price: z.number().int().positive(),
  priceLabel: z.string().optional(),
  beds: z.number().int().optional().nullable(),
  baths: z.number().int().optional().nullable(),
  areaSqft: z.number().int().optional().nullable(),
  floor: z.string().optional(),
  totalFloors: z.string().optional(),
  furnishing: z.string().optional(),
  propertyAge: z.string().optional(),
  facing: z.string().optional(),
  suitableFor: z.string().optional(),
  badges: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  featureTags: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  nearbyLocations: z.any().optional(),
  availability: z.string().optional(),
  images: z.array(z.string()).optional(),
  roomOptions: z.any().optional(),
  featured: z.boolean().optional(),
  verified: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Unauthorized", 401);

  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });
  return jsonOk({ properties });
}

export async function POST(request) {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Unauthorized", 401);

  const body = await parseBody(request);
  const parsed = propertySchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.errors?.[0]?.message || "Invalid data");

  const data = parsed.data;
  let slug = slugify(`${data.title}-${data.locality}-${data.city}`);
  const exists = await prisma.property.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now()}`;

  const property = await prisma.property.create({
    data: {
      ...data,
      slug,
      beds: data.beds ?? null,
      baths: data.baths ?? null,
      areaSqft: data.areaSqft ?? null,
      badges: data.badges || [],
      amenities: data.amenities || [],
      featureTags: data.featureTags || [],
      highlights: data.highlights || [],
      nearbyLocations: data.nearbyLocations || null,
      availability: data.availability || null,
      images: data.images?.length ? data.images : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"],
      status: data.status || "PUBLISHED",
    },
  });

  return jsonOk({ property }, 201);
}
