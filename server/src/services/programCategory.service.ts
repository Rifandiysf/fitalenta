import prisma from "../config/prisma";

export async function getPublicProgramCategories() {
  return prisma.programCategory.findMany({ orderBy: { name: "asc" } });
}

export async function getAdminProgramCategories() {
  return prisma.programCategory.findMany({ orderBy: { name: "asc" } });
}

interface ProgramCategoryInput {
  name: string;
  description?: string;
}

export async function createProgramCategory(data: ProgramCategoryInput) {
  return prisma.programCategory.create({ data });
}

export async function updateProgramCategory(id: number, data: ProgramCategoryInput) {
  const existing = await prisma.programCategory.findUnique({ where: { id } });
  if (!existing) throw new Error("CATEGORY_NOT_FOUND");
  return prisma.programCategory.update({ where: { id }, data });
}

export async function deleteProgramCategory(id: number) {
  const existing = await prisma.programCategory.findUnique({ where: { id } });
  if (!existing) throw new Error("CATEGORY_NOT_FOUND");
  await prisma.programCategory.delete({ where: { id } });
}