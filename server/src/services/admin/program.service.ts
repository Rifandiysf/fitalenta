import prisma from "../../config/prisma";
import { Prisma, ProgramStatus } from "../../../generated/prisma/client";
import { ProgramErrors } from "../../errors/program.errors";
import {
  CreateProgramInput,
  ProgramDetail,
  ProgramInput,
  ProgramListFilters,
  ProgramListItem,
  ProgramOptions,
  ProgramSummary,
  UpdateProgramInput,
} from "../../types/program.types";
import { PaginationMeta, buildPaginationMeta, resolvePagination } from "../../utils/pagination";
import {
  programDetailInclude,
  programListSelect,
  toProgramDetail,
  toProgramListItem,
} from "./program.mapper";

const ORDER_BY: Prisma.ProgramOrderByWithRelationInput[] = [{ sortOrder: "asc" }, { createdAt: "desc" }];

const NULLABLE_FIELDS = [
  "programFormat",
  "categoryId",
  "description",
  "requirements",
  "schedule",
  "duration",
  "capacity",
  "contactInfo",
  "registrationDeadline",
  "startDate",
  "endDate",
  "location",
  "trainingFeeDetails",
  "departureFeeDetails",
  "bridgeFund",
  "timelineText",
  "requirementsText",
] as const;

function buildWhere({ search, categoryId, status, isRunning }: ProgramListFilters): Prisma.ProgramWhereInput {
  return {
    ...(categoryId ? { categoryId } : {}),
    ...(status ? { status } : {}),
    ...(isRunning !== undefined ? { isRunning } : {}),
    ...(search
      ? { OR: [{ name: { contains: search } }, { programFormat: { contains: search } }] }
      : {}),
  };
}

function normalizeInput(input: ProgramInput): ProgramInput {
  const normalized: ProgramInput = { ...input };

  for (const field of NULLABLE_FIELDS) {
    if (normalized[field] === "") (normalized as Record<string, unknown>)[field] = null;
  }

  return normalized;
}

async function findOrFail(id: number) {
  const program = await prisma.program.findUnique({ where: { id }, include: programDetailInclude });
  if (!program) throw ProgramErrors.notFound();
  return program;
}

async function assertCategoryExists(categoryId: number | null | undefined): Promise<void> {
  if (!categoryId) return;

  const exists = await prisma.programCategory.count({ where: { id: categoryId } });
  if (!exists) throw ProgramErrors.categoryNotFound();
}

function assertDateRange(startDate: Date | null | undefined, endDate: Date | null | undefined): void {
  if (startDate && endDate && endDate < startDate) throw ProgramErrors.invalidDateRange();
}

function assertCapacity(capacity: number | null | undefined, currentParticipants: number): void {
  if (capacity !== null && capacity !== undefined && capacity < currentParticipants) {
    throw ProgramErrors.capacityBelowParticipants(currentParticipants);
  }
}

export async function getSummary(): Promise<ProgramSummary> {
  const [byStatus, capacity] = await Promise.all([
    prisma.program.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.program.aggregate({ _sum: { capacity: true } }),
  ]);

  const countOf = (status: ProgramStatus) => byStatus.find((row) => row.status === status)?._count._all ?? 0;

  return {
    total: byStatus.reduce((sum, row) => sum + row._count._all, 0),
    active: countOf("active"),
    inactive: countOf("inactive"),
    full: countOf("full"),
    totalCapacity: capacity._sum.capacity ?? 0,
  };
}

export async function getOptions(): Promise<ProgramOptions> {
  const [categories, formats] = await Promise.all([
    prisma.programCategory.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.program.findMany({
      where: { programFormat: { not: null } },
      select: { programFormat: true },
      distinct: ["programFormat"],
      orderBy: { programFormat: "asc" },
    }),
  ]);

  return {
    categories,
    programFormats: formats.map((row) => row.programFormat as string),
    statuses: Object.values(ProgramStatus),
  };
}

export async function listPrograms(
  filters: ProgramListFilters
): Promise<{ items: ProgramListItem[]; meta: PaginationMeta }> {
  const { page, limit, skip, take } = resolvePagination(filters);
  const where = buildWhere(filters);

  const [total, programs] = await Promise.all([
    prisma.program.count({ where }),
    prisma.program.findMany({ where, select: programListSelect, orderBy: ORDER_BY, skip, take }),
  ]);

  return { items: programs.map(toProgramListItem), meta: buildPaginationMeta(total, page, limit) };
}

export async function getProgramById(id: number): Promise<ProgramDetail> {
  return toProgramDetail(await findOrFail(id));
}

export async function createProgram(input: CreateProgramInput): Promise<ProgramDetail> {
  const data = normalizeInput(input) as CreateProgramInput;

  await assertCategoryExists(data.categoryId);
  assertDateRange(data.startDate, data.endDate);

  const program = await prisma.program.create({
    data,
    include: programDetailInclude,
  });
  return toProgramDetail(program);
}

export async function updateProgram(id: number, input: UpdateProgramInput): Promise<ProgramDetail> {
  const existing = await findOrFail(id);
  const data = normalizeInput(input);

  await assertCategoryExists(data.categoryId);
  assertDateRange(
    data.startDate !== undefined ? data.startDate : existing.startDate,
    data.endDate !== undefined ? data.endDate : existing.endDate
  );
  assertCapacity(data.capacity, existing.currentParticipants);

  const program = await prisma.program.update({
    where: { id },
    data,
    include: programDetailInclude,
  });
  return toProgramDetail(program);
}

export async function deleteProgram(id: number): Promise<void> {
  const existing = await findOrFail(id);
  if (existing._count.registrations > 0) throw ProgramErrors.hasRegistrations();

  await prisma.program.delete({ where: { id } });
}