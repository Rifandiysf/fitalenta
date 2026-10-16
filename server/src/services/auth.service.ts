import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import resend from "../config/resend";
import { signToken } from "../utils/jwt";
import {
  signEmailVerificationToken,
  verifyEmailVerificationToken,
} from "../utils/emailVerification";

const DUMMY_HASH = "$2a$12$CwTycUXWue0Thq9StjUM0uJ8vE1eV6nNKD.krgO0.7q0vQqJqkq0O";

interface RegisterInput {
  email: string;
  password: string;
  name: string;
  phone: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendVerificationEmail(user: { id: number; email: string; name: string }) {
  const clientUrl = (process.env.CLIENT_URL || process.env.CORS_ORIGIN || "http://localhost:3000").replace(/\/$/, "");
  const token = signEmailVerificationToken(user.id, user.email);
  const link = `${clientUrl}/verify-email?token=${encodeURIComponent(token)}`;

  await resend.emails.send({
    from: (process.env.AUTH_EMAIL_FROM || process.env.CONTACT_EMAIL_FROM) as string,
    to: user.email,
    subject: "Verifikasi email akun FITALENTA",
    html: `
      <p>Halo ${escapeHtml(user.name)},</p>
      <p>Terima kasih telah mendaftar di FITALENTA. Klik tombol di bawah untuk memverifikasi email Anda (berlaku 24 jam):</p>
      <p><a href="${link}" style="display:inline-block;padding:10px 18px;background:#0f3d6e;color:#fff;border-radius:6px;text-decoration:none">Verifikasi Email</a></p>
      <p>Jika Anda tidak merasa mendaftar, abaikan email ini.</p>
    `,
  });
}

function queueVerificationEmail(user: { id: number; email: string; name: string }) {
  sendVerificationEmail(user).catch((err) => console.error("Send verification email error:", err));
}

export async function registerUser(data: RegisterInput): Promise<void> {
  const email = data.email.trim().toLowerCase();

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    if (!existing.emailVerifiedAt) queueVerificationEmail(existing);
    return;
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: data.name.trim(),
        phone: data.phone.trim(),
        role: "user",
      },
    });
    queueVerificationEmail(user);
  } catch (error: any) {
    if (error?.code === "P2002") return; // race: email sama didaftarkan bersamaan
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  const valid = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
  if (!user || !valid) throw new Error("INVALID_CREDENTIALS");

  if (user.role === "user" && !user.emailVerifiedAt) throw new Error("EMAIL_NOT_VERIFIED");

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  return { user, token };
}

export async function verifyEmail(token: string): Promise<void> {
  let payload: { userId: number; email: string };
  try {
    payload = verifyEmailVerificationToken(token);
  } catch {
    throw new Error("INVALID_TOKEN");
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || user.email !== payload.email) throw new Error("INVALID_TOKEN");
  if (user.emailVerifiedAt) return;

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerifiedAt: new Date() },
  });
}

export async function resendVerification(email: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (user && user.role === "user" && !user.emailVerifiedAt) queueVerificationEmail(user);
}