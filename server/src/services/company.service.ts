import fs from "fs";
import path from "path";
import prisma from "../config/prisma";

export async function getActiveCompanies() {
  return prisma.company.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
}

export async function getAdminCompanies() {
  return prisma.company.findMany({ orderBy: { name: "asc" } });
}

interface CompanyInput {
  name: string;
  website?: string;
  industry: string;
  employeeCount?: string;
  location: string;
  description: string;
  isActive?: boolean;
}

export async function createCompany(data: CompanyInput, logoPath: string) {
  return prisma.company.create({ data: { ...data, logo: logoPath } });
}

export async function updateCompany(id: number, data: CompanyInput, logoPath?: string) {
  const existing = await prisma.company.findUnique({ where: { id } });
  if (!existing) throw new Error("COMPANY_NOT_FOUND");

  if (logoPath && existing.logo) {
    const oldPath = path.join(process.cwd(), "uploads", "company-logos", path.basename(existing.logo));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  return prisma.company.update({
    where: { id },
    data: { ...data, ...(logoPath ? { logo: logoPath } : {}) },
  });
}

export async function deleteCompany(id: number) {
  const existing = await prisma.company.findUnique({ where: { id } });
  if (!existing) throw new Error("COMPANY_NOT_FOUND");

  if (existing.logo) {
    const logoPath = path.join(process.cwd(), "uploads", "company-logos", path.basename(existing.logo));
    if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
  }

  await prisma.company.delete({ where: { id } });
}