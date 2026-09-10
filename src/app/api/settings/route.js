import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api";

export async function GET() {
  let settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.siteSetting.create({ data: {} });
  }
  return jsonOk({ settings });
}
