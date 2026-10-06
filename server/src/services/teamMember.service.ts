import prisma from "../config/prisma";

interface TeamMemberInput {
  name: string;
  position: string;
  bio?: string | null;
  image?: string | null;
  order?: number;
  isActive?: boolean;
}

export async function getPublicTeamMembers() {
  return prisma.teamMember.findMany({
    where: { isActive: true },
    select: { id: true, name: true, position: true, bio: true, image: true },
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
}

export async function getAdminTeamMembers({ page = 1 }: { page?: number }) {
  const perPage = 10;
  const skip = (page - 1) * perPage;

  const [teamMembers, total] = await Promise.all([
    prisma.teamMember.findMany({
      orderBy: [{ order: "asc" }, { id: "asc" }],
      skip,
      take: perPage,
    }),
    prisma.teamMember.count(),
  ]);

  return {
    teamMembers,
    pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function getTeamMemberById(id: number) {
  const teamMember = await prisma.teamMember.findUnique({ where: { id } });
  if (!teamMember) throw new Error("TEAM_MEMBER_NOT_FOUND");
  return teamMember;
}

export async function createTeamMember(data: TeamMemberInput) {
  return prisma.teamMember.create({ data });
}

export async function updateTeamMember(id: number, data: TeamMemberInput) {
  const existing = await prisma.teamMember.findUnique({ where: { id } });
  if (!existing) throw new Error("TEAM_MEMBER_NOT_FOUND");
  return prisma.teamMember.update({ where: { id }, data });
}

export async function deleteTeamMember(id: number) {
  const existing = await prisma.teamMember.findUnique({ where: { id } });
  if (!existing) throw new Error("TEAM_MEMBER_NOT_FOUND");
  await prisma.teamMember.delete({ where: { id } });
}