import prisma from "../../config/prisma";
import { Prisma, TeamMember } from "../../../generated/prisma/client";
import { TEAM_MEMBER_UPLOAD_FOLDER } from "../../config/about.config";
import { TeamMemberErrors } from "../../errors/teamMember.errors";
import {
  CreateExpertInput,
  ExpertItem,
  ExpertListFilters,
  ExpertListResult,
  ExpertSummary,
  TeamMemberCms,
  UpdateExpertInput,
} from "../../types/team-member.types";
import { removePublicUpload, toUploadedPath, withUploadCleanup } from "../../utils/file";
import { buildPaginationMeta, resolvePagination } from "../../utils/pagination";
import { getAbout } from "../about.service";

const ORDER_BY: Prisma.TeamMemberOrderByWithRelationInput[] = [{ order: "asc" }, { id: "asc" }];

function toExpertItem(member: TeamMember): ExpertItem {
  return {
    id: member.id,
    name: member.name,
    position: member.position,
    bio: member.bio,
    image: member.image,
    order: member.order,
    isActive: member.isActive,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
  };
}

function buildWhere({ search, isActive }: ExpertListFilters): Prisma.TeamMemberWhereInput {
  return {
    ...(isActive !== undefined ? { isActive } : {}),
    ...(search ? { OR: [{ name: { contains: search } }, { position: { contains: search } }] } : {}),
  };
}

function emptyToNull(value?: string): string | null | undefined {
  return value === undefined ? undefined : value || null;
}

async function findOrFail(id: number): Promise<TeamMember> {
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) throw TeamMemberErrors.notFound();
  return member;
}

async function nextOrder(): Promise<number> {
  const { _max } = await prisma.teamMember.aggregate({ _max: { order: true } });
  return (_max.order ?? 0) + 1;
}

async function getSummary(): Promise<ExpertSummary> {
  const [total, active] = await Promise.all([
    prisma.teamMember.count(),
    prisma.teamMember.count({ where: { isActive: true } }),
  ]);
  return { total, active, inactive: total - active };
}

export async function listExperts(filters: ExpertListFilters): Promise<ExpertListResult> {
  const { page, limit, skip, take } = resolvePagination(filters);
  const where = buildWhere(filters);

  const [members, total, summary] = await Promise.all([
    prisma.teamMember.findMany({ where, orderBy: ORDER_BY, skip, take }),
    prisma.teamMember.count({ where }),
    getSummary(),
  ]);

  return { items: members.map(toExpertItem), meta: buildPaginationMeta(total, page, limit), summary };
}

export async function getCms(filters: ExpertListFilters): Promise<TeamMemberCms> {
  const [expert, team_member] = await Promise.all([listExperts(filters), getAbout()]);
  return { expert, team_member };
}

export async function getExpertById(id: number): Promise<ExpertItem> {
  return toExpertItem(await findOrFail(id));
}

export async function createExpert(input: CreateExpertInput, file?: Express.Multer.File): Promise<ExpertItem> {
  const image = toUploadedPath(TEAM_MEMBER_UPLOAD_FOLDER, file);

  return withUploadCleanup(image, async () => {
    const member = await prisma.teamMember.create({
      data: {
        name: input.name,
        position: input.position,
        bio: emptyToNull(input.bio),
        image,
        order: input.order ?? (await nextOrder()),
        isActive: input.isActive,
      },
    });
    return toExpertItem(member);
  });
}

export async function updateExpert(
  id: number,
  input: UpdateExpertInput,
  file?: Express.Multer.File
): Promise<ExpertItem> {
  const newImage = toUploadedPath(TEAM_MEMBER_UPLOAD_FOLDER, file);
  const replacesImage = newImage !== undefined || input.removeImage === true;

  return withUploadCleanup(newImage, async () => {
    const existing = await findOrFail(id);

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: input.name,
        position: input.position,
        bio: emptyToNull(input.bio),
        order: input.order,
        isActive: input.isActive,
        image: replacesImage ? (newImage ?? null) : undefined,
      },
    });

    if (replacesImage) await removePublicUpload(existing.image);
    return toExpertItem(member);
  });
}

export async function deleteExpert(id: number): Promise<void> {
  const existing = await findOrFail(id);
  await prisma.teamMember.delete({ where: { id } });
  await removePublicUpload(existing.image);
}

export async function reorderExperts(ids: number[]): Promise<ExpertItem[]> {
  const found = await prisma.teamMember.count({ where: { id: { in: ids } } });
  if (found !== ids.length) throw TeamMemberErrors.someNotFound();

  await prisma.$transaction(
    ids.map((id, index) => prisma.teamMember.update({ where: { id }, data: { order: index + 1 } }))
  );

  const members = await prisma.teamMember.findMany({ orderBy: ORDER_BY });
  return members.map(toExpertItem);
}