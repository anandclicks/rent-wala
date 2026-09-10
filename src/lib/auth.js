import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "prw_session";
const MAX_AGE = 60 * 60 * 24 * 30;

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET is missing or too short");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user) {
  return new SignJWT({
    sub: user.id,
    email: user.email,
    mobile: user.mobile || "",
    role: user.role,
    name: user.name || "",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSessionUser() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verifySessionToken(token);
  if (!payload?.sub) return null;
  return {
    id: payload.sub,
    email: payload.email,
    mobile: payload.mobile,
    role: payload.role,
    name: payload.name,
  };
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") {
    return null;
  }
  return user;
}

export { COOKIE_NAME };
