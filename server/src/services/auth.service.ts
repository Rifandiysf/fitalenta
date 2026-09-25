import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { signToken } from "../utils/jwt";

interface RegisterInput {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
}

export async function registerUser(data: RegisterInput) {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) throw new Error("EMAIL_TAKEN");

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      phone: data.phone,
      address: data.address,
      role: "user",
    },
  });

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: { email, role: "user" },
  });
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("INVALID_CREDENTIALS");

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  return { user, token };
}

export async function loginAdmin(email: string, password: string) {
  const admin = await prisma.user.findFirst({
    where: { email, role: { in: ["admin", "editor"] } },
  });
  if (!admin) throw new Error("INVALID_CREDENTIALS");

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) throw new Error("INVALID_CREDENTIALS");

  const token = signToken({ userId: admin.id, email: admin.email, role: admin.role });
  return { user: admin, token };
}