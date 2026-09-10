import { z } from "zod";
import { prisma } from "@/lib/db";
import { jsonError, jsonOk, parseBody } from "@/lib/api";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { normalizeEmail, verifyOtp } from "@/lib/otp";

const schema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  purpose: z.enum(["login", "register"]),
  name: z.string().min(2).optional(),
});

export async function POST(request) {
  const body = await parseBody(request);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid request");

  const { email, otp, purpose, name } = parsed.data;
  const normalizedEmail = normalizeEmail(email);
  const verified = await verifyOtp({ email: normalizedEmail, code: otp, purpose });
  if (!verified.ok) return jsonError(verified.error, 401);

  let user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (purpose === "register") {
    if (!name) return jsonError("Name is required");
    user = await prisma.user.create({
      data: { email: normalizedEmail, name, role: "USER" },
    });
  }

  if (!user) return jsonError("User not found", 404);

  const token = await createSessionToken(user);
  await setSessionCookie(token);

  return jsonOk({
    user: {
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      role: user.role,
    },
  });
}
