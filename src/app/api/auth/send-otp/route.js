import { z } from "zod";
import { prisma } from "@/lib/db";
import { jsonError, jsonOk, parseBody } from "@/lib/api";
import { createAndSendOtp, normalizeEmail } from "@/lib/otp";

const schema = z.object({
  email: z.string().email(),
  purpose: z.enum(["login", "register"]),
  name: z.string().min(2).optional(),
});

export async function POST(request) {
  const body = await parseBody(request);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid email or purpose");

  const { email, purpose, name } = parsed.data;
  const normalizedEmail = normalizeEmail(email);
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (purpose === "login" && !existing) {
    return jsonError("No account found. Please sign up first.", 404);
  }
  if (purpose === "register") {
    if (existing) return jsonError("Account already exists. Please sign in.", 409);
    if (!name) return jsonError("Name is required for sign up");
  }

  try {
    const result = await createAndSendOtp({
      email: normalizedEmail,
      name: name || existing?.name,
      purpose,
    });
    return jsonOk({
      message: "OTP sent to your email",
      expiresAt: result.expiresAt,
      ...(result.devOtp ? { devOtp: result.devOtp } : {}),
    });
  } catch (err) {
    return jsonError(err.message || "Failed to send OTP", 500);
  }
}
