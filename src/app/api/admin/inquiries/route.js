import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Unauthorized", 401);

  const inquiries = await prisma.inquiry.findMany({
    include: {
      property: { select: { title: true, city: true, locality: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return jsonOk({ inquiries });
}
