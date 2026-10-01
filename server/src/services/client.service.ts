import fs from "fs";
import path from "path";
import prisma from "../config/prisma";

export async function getPublicClients() {
  return prisma.client.findMany({ orderBy: { name: "asc" } });
}

export async function getAdminClients() {
  return prisma.client.findMany({ orderBy: { name: "asc" } });
}

interface ClientInput {
  name: string;
  website?: string;
}

export async function createClient(data: ClientInput, logoPath: string) {
  return prisma.client.create({ data: { ...data, logo: logoPath } });
}

export async function updateClient(id: number, data: ClientInput, logoPath?: string) {
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) throw new Error("CLIENT_NOT_FOUND");

  if (logoPath && existing.logo) {
    const oldPath = path.join(process.cwd(), "uploads", "clients", path.basename(existing.logo));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  return prisma.client.update({
    where: { id },
    data: { ...data, ...(logoPath ? { logo: logoPath } : {}) },
  });
}

export async function deleteClient(id: number) {
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) throw new Error("CLIENT_NOT_FOUND");

  const logoPath = path.join(process.cwd(), "uploads", "clients", path.basename(existing.logo));
  if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);

  await prisma.client.delete({ where: { id } });
}

export async function toggleClient(id: number) {
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) throw new Error("CLIENT_NOT_FOUND");
  return prisma.client.update({ where: { id }, data: { isFeatured: !existing.isFeatured } });
}