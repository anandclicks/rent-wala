import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk, parseBody } from "@/lib/api";

const schema = z.object({
  callNumber: z.string().min(10).optional(),
  whatsappNumber: z.string().min(10).optional(),
});

export async function PATCH(request) {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Unauthorized", 401);

  const body = await parseBody(request);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid settings");

  const settings = await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: parsed.data,
    create: parsed.data,
  });

  return jsonOk({ settings });
}
