import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk, parseBody } from "@/lib/api";

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  listingType: z.enum(["RENT", "SELL"]).optional(),
  city: z.string().optional(),
  locality: z.string().optional(),
  address: z.string().optional(),
  price: z.number().int().positive().optional(),
  priceLabel: z.string().optional(),
  beds: z.number().int().nullable().optional(),
  baths: z.number().int().nullable().optional(),
  areaSqft: z.number().int().nullable().optional(),
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

export async function PUT(request, { params }) {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Unauthorized", 401);

  const { id } = await params;
  const body = await parseBody(request);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid data");

  const property = await prisma.property.update({
    where: { id },
    data: parsed.data,
  });

  return jsonOk({ property });
}

export async function DELETE(_request, { params }) {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Unauthorized", 401);

  const { id } = await params;
  await prisma.property.delete({ where: { id } });
  return jsonOk({ message: "Deleted" });
}
