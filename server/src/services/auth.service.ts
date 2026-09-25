import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { signToken } from "../utils/jwt";

type LoginRole = "user" | "admin";
type UserRole = "user" | "admin" | "editor";

const ROLE_GROUPS: Record<LoginRole, UserRole[]> = {
  user: ["user"],
  admin: ["admin", "editor"],
};

interface RegisterInput {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
}

export async function registerUser(data: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
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

export async function loginByRole(email: string, password: string, loginRole: LoginRole) {
  const allowedRoles = ROLE_GROUPS[loginRole];

  const user = await prisma.user.findFirst({
    where: { email, role: { in: allowedRoles } },
  });
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("INVALID_CREDENTIALS");

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  return { user, token };
}