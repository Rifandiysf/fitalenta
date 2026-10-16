import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import type { Request } from "express";

const tooMany = (message: string) => ({ success: false, message });

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Terlalu banyak pesan terkirim. Silakan coba lagi dalam beberapa menit.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Registrasi: maks 5 per jam per IP
export const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: tooMany("Terlalu banyak percobaan registrasi. Silakan coba lagi nanti."),
  standardHeaders: true,
  legacyHeaders: false,
});

// Login: throttle global per IP
export const loginIpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: tooMany("Terlalu banyak percobaan login. Silakan coba lagi dalam beberapa menit."),
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginAccountRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  keyGenerator: (req: Request) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    return email ? `acct:${email.slice(0, 254)}` : ipKeyGenerator(req.ip ?? "");
  },
  message: tooMany("Terlalu banyak percobaan login untuk akun ini. Silakan coba lagi dalam 15 menit."),
  standardHeaders: true,
  legacyHeaders: false,
});

// Verifikasi email / kirim ulang verifikasi
export const emailVerificationRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  message: tooMany("Terlalu banyak permintaan. Silakan coba lagi nanti."),
  standardHeaders: true,
  legacyHeaders: false,
});