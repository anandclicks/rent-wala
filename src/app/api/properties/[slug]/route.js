import { prisma } from "@/lib/db";
import { jsonError, jsonOk } from "@/lib/api";
import { formatPropertyForCard } from "@/lib/property-utils";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const property = await prisma.property.findFirst({
    where: { slug, status: "PUBLISHED" },
  });

  if (!property) return jsonError("Property not found", 404);

  const nearby = await prisma.property.findMany({
    where: {
      status: "PUBLISHED",
      city: property.city,
      id: { not: property.id },
    },
    take: 4,
    orderBy: { featured: "desc" },
  });

  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });

  return jsonOk({
    property: formatPropertyForCard(property),
    nearby: nearby.map(formatPropertyForCard),
    callNumber: settings?.callNumber || "+919876543210",
    whatsappNumber: settings?.whatsappNumber || "+919876543210",
  });
}
