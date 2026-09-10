import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendOtpEmail } from "@/lib/brevo";

const OTP_TTL_MS = 10 * 60 * 1000;

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function hashOtp(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export async function createAndSendOtp({ email, name, purpose }) {
  const normalizedEmail = normalizeEmail(email);
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await prisma.otpCode.deleteMany({ where: { email: normalizedEmail, purpose } });
  await prisma.otpCode.create({
    data: {
      email: normalizedEmail,
      codeHash: hashOtp(code),
      purpose,
      expiresAt,
    },
  });

  await sendOtpEmail(normalizedEmail, name, code);

  return {
    expiresAt,
    devOtp: process.env.NODE_ENV === "development" ? code : undefined,
  };
}

export async function verifyOtp({ email, code, purpose }) {
  const normalizedEmail = normalizeEmail(email);
  const record = await prisma.otpCode.findFirst({
    where: { email: normalizedEmail, purpose },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return { ok: false, error: "OTP expired or not found" };
  if (record.expiresAt < new Date()) {
    await prisma.otpCode.delete({ where: { id: record.id } });
    return { ok: false, error: "OTP expired" };
  }
  if (record.codeHash !== hashOtp(code)) {
    return { ok: false, error: "Invalid OTP" };
  }

  await prisma.otpCode.delete({ where: { id: record.id } });
  return { ok: true };
}
