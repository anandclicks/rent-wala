import { z } from "zod";
import { prisma } from "@/lib/db";
import { jsonError, jsonOk, parseBody } from "@/lib/api";

const schema = z.object({
  propertyId: z.string().min(1),
  name: z.string().min(2),
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().max(1000).optional(),
});

export async function POST(request) {
  const body = await parseBody(request);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid inquiry details");

  const { propertyId, name, mobile, email, message } = parsed.data;
  const property = await prisma.property.findFirst({
    where: { id: propertyId, status: "PUBLISHED" },
  });
  if (!property) return jsonError("Property not found", 404);

  const inquiry = await prisma.inquiry.create({
    data: {
      propertyId,
      name,
      mobile,
      email: email || null,
      message: message || null,
    },
  });

  return jsonOk({ inquiry: { id: inquiry.id }, message: "Inquiry submitted successfully" });
}
