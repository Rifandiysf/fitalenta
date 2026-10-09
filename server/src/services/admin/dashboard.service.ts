import prisma from "../../config/prisma";
import { Prisma, PaymentStatus, PlacementStage, RegistrationStatus } from "../../../generated/prisma/client";
import {
  NEW_REGISTRANT_WINDOW_DAYS,
  PENDING_ACTION_PAYMENT_STATUSES,
  REVENUE_PAYMENT_STATUSES,
} from "../../config/admin.config";
import { DashboardErrors } from "../../errors/dashboard.errors";
import {
  DashboardFilterOptions,
  DashboardSummary,
  RegistrationDetail,
  RegistrationFilters,
  RegistrationListItem,
} from "../../types/admin.types";
import { PaginationMeta, buildPaginationMeta, resolvePagination } from "../../utils/pagination";
import {
  registrationDetailInclude,
  registrationListInclude,
  toRegistrationDetail,
  toRegistrationListItem,
} from "./dashboard.mapper";

const MS_PER_DAY = 86_400_000;

function buildRegistrationWhere(filters: RegistrationFilters): Prisma.RegistrationWhereInput {
  const { search, programId, paymentStatus, selectionStatus, placementStatus } = filters;

  return {
    ...(programId ? { programId } : {}),
    ...(paymentStatus ? { payments: { some: { status: paymentStatus } } } : {}),
    ...(selectionStatus ? { selectionStatuses: { some: { status: selectionStatus } } } : {}),
    ...(placementStatus ? { placementStatuses: { some: { status: placementStatus } } } : {}),
    ...(search
      ? {
          OR: [
            { registrationCode: { contains: search } },
            { user: { name: { contains: search } } },
            { user: { email: { contains: search } } },
            { user: { phone: { contains: search } } },
          ],
        }
      : {}),
  };
}

export async function getSummary(now = new Date()): Promise<DashboardSummary> {
  const since = new Date(now.getTime() - NEW_REGISTRANT_WINDOW_DAYS * MS_PER_DAY);

  const [totalRegistrants, newRegistrants, revenue, pendingVerification] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { registrationDate: { gte: since } } }),
    prisma.payment.aggregate({
      where: { status: { in: REVENUE_PAYMENT_STATUSES } },
      _sum: { amountPaid: true },
      _count: { _all: true },
    }),
    prisma.payment.count({ where: { status: { in: PENDING_ACTION_PAYMENT_STATUSES } } }),
  ]);

  return {
    totalRegistrants,
    newRegistrants: { count: newRegistrants, windowDays: NEW_REGISTRANT_WINDOW_DAYS },
    revenue: {
      total: (revenue._sum.amountPaid ?? 0).toString(),
      paidCount: revenue._count._all,
    },
    pendingVerification,
  };
}

export async function getFilterOptions(): Promise<DashboardFilterOptions> {
  const programs = await prisma.program.findMany({
    select: { id: true, name: true, programFormat: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return {
    programs,
    paymentStatuses: Object.values(PaymentStatus),
    selectionStatuses: Object.values(RegistrationStatus),
    placementStatuses: Object.values(PlacementStage),
  };
}

export async function listRegistrations(
  filters: RegistrationFilters
): Promise<{ items: RegistrationListItem[]; meta: PaginationMeta }> {
  const { page, limit, skip, take } = resolvePagination(filters);
  const where = buildRegistrationWhere(filters);

  const [total, registrations] = await Promise.all([
    prisma.registration.count({ where }),
    prisma.registration.findMany({
      where,
      include: registrationListInclude,
      orderBy: { registrationDate: "desc" },
      skip,
      take,
    }),
  ]);

  return {
    items: registrations.map(toRegistrationListItem),
    meta: buildPaginationMeta(total, page, limit),
  };
}

export async function getRegistrationDetail(id: number): Promise<RegistrationDetail> {
  const registration = await prisma.registration.findUnique({
    where: { id },
    include: registrationDetailInclude,
  });
  if (!registration) throw DashboardErrors.registrationNotFound();

  return toRegistrationDetail(registration);
}