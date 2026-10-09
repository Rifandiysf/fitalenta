import prisma from "../config/prisma";

export async function getPublicTeamMembers() {
  return prisma.teamMember.findMany({
    where: { isActive: true },
    select: { id: true, name: true, position: true, bio: true, image: true },
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
}