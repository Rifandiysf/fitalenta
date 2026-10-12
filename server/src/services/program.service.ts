import prisma from "../config/prisma";

export async function getPublicPrograms({ categoryId }: { categoryId?: number }) {
  return prisma.program.findMany({
    where: {
      status: "active",
      ...(categoryId ? { categoryId } : {}),
    },
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getProgramById(id: number) {
  const program = await prisma.program.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!program) throw new Error("PROGRAM_NOT_FOUND");
  return program;
}