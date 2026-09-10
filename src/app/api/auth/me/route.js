import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api";

export async function GET() {
  const session = await getSessionUser();
  if (!session) return jsonOk({ user: null });

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, name: true, mobile: true, email: true, role: true },
  });

  return jsonOk({ user });
}
