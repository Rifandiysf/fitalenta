import fs from "fs";
import path from "path";
import prisma from "../config/prisma";

export async function getPublicUniversityPartners() {
  const partners = await prisma.universityPartner.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  const totalStudents = partners.reduce((sum, p) => sum + p.studentCount, 0);
  const totalUniversities = partners.length;
  const totalProvinces = new Set(partners.map((p) => p.location)).size;

  return { partners, totalStudents, totalUniversities, totalProvinces };
}

export async function getAdminUniversityPartners() {
  return prisma.universityPartner.findMany({ orderBy: { order: "asc" } });
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
    const oldPath = path.join(process.cwd(), "uploads", "university-logos", path.basename(existing.logo));
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
    const logoPath = path.join(process.cwd(), "uploads", "university-logos", path.basename(existing.logo));
    if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
  }

  await prisma.universityPartner.delete({ where: { id } });
}