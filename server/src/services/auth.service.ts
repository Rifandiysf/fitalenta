import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { signToken } from "../utils/jwt";

const DUMMY_HASH = "$2a$12$CwTycUXWue0Thq9StjUM0uJ8vE1eV6nNKD.krgO0.7q0vQqJqkq0O";

interface RegisterInput {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export async function registerUser(data: RegisterInput) {
  const email = data.email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("EMAIL_TAKEN");

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: data.name.trim(),
      phone: data.phone.trim(),
      role: "user",
    },
  });

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  const valid = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
  if (!user || !valid) throw new Error("INVALID_CREDENTIALS");

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  return { user, token };
}