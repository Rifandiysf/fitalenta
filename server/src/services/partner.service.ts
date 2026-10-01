import fs from "fs";
import path from "path";
import prisma from "../config/prisma";

export async function getPublicPartners() {
  const [clients, universityPartners] = await Promise.all([
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.universityPartner.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const mappedClients = clients.map((c) => ({ name: c.name, logo: c.logo }));
  const mappedUniversities = universityPartners.map((u) => ({ name: u.name, logo: u.logo }));

  return [...mappedClients, ...mappedUniversities];
}

export async function getAdminClients() {
  return prisma.client.findMany({ orderBy: { name: "asc" } });
}

export async function getAdminUniversityPartners() {
  return prisma.universityPartner.findMany({ orderBy: { order: "asc" } });
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
    const oldPath = path.join(process.cwd(), "uploads", "partners", path.basename(existing.logo));
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

  if (existing.logo) {
    const logoPath = path.join(process.cwd(), "uploads", "partners", path.basename(existing.logo));
    if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
  }

  await prisma.client.delete({ where: { id } });
}

export async function toggleClient(id: number) {
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) throw new Error("CLIENT_NOT_FOUND");
  return prisma.client.update({ where: { id }, data: { isFeatured: !existing.isFeatured } });
}

interface UniversityPartnerInput {
  name: string;
  location: string;
  studentCount: number;
  order: number;
  isActive?: boolean;
}

export async function createUniversityPartner(data: UniversityPartnerInput, logoPath: string) {
  return prisma.universityPartner.create({ data: { ...data, logo: logoPath } });
}

export async function updateUniversityPartner(id: number, data: UniversityPartnerInput, logoPath?: string) {
  const existing = await prisma.universityPartner.findUnique({ where: { id } });
  if (!existing) throw new Error("UNIVERSITY_PARTNER_NOT_FOUND");

  if (logoPath && existing.logo) {
    const oldPath = path.join(process.cwd(), "uploads", "partners", path.basename(existing.logo));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  return prisma.universityPartner.update({
    where: { id },
    data: { ...data, ...(logoPath ? { logo: logoPath } : {}) },
  });
}

export async function deleteUniversityPartner(id: number) {
  const existing = await prisma.universityPartner.findUnique({ where: { id } });
  if (!existing) throw new Error("UNIVERSITY_PARTNER_NOT_FOUND");

  if (existing.logo) {
    const logoPath = path.join(process.cwd(), "uploads", "partners", path.basename(existing.logo));
    if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
  }

  await prisma.universityPartner.delete({ where: { id } });
}
