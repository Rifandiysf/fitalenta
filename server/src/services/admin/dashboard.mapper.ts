import { Prisma } from "../../../generated/prisma/client";
import { RegistrationDetail, RegistrationListItem } from "../../types/admin.types";
import { toApplicant, toDateOnly, toDocuments } from "../user/registration.mapper";

export const registrationListInclude = {
  user: { select: { id: true, name: true, email: true, phone: true } },
  program: { select: { id: true, name: true, programFormat: true, trainingCost: true } },
  payments: {
    orderBy: { createdAt: "desc" },
    take: 1,
    select: {
      invoiceNumber: true,
      status: true,
      amount: true,
      amountPaid: true,
      nextDueDate: true,
      currentInstallmentNumber: true,
      installmentAmounts: true,
    },
  },
  selectionStatuses: { orderBy: { createdAt: "desc" }, take: 1, select: { status: true } },
  placementStatuses: { orderBy: { createdAt: "desc" }, take: 1, select: { status: true } },
} satisfies Prisma.RegistrationInclude;

export const registrationDetailInclude = {
  user: { select: { name: true, email: true, phone: true } },
  program: {
    select: { id: true, name: true, programFormat: true, trainingCost: true, installmentPlan: true },
  },
  payments: { orderBy: { createdAt: "desc" } },
  selectionStatuses: { orderBy: { createdAt: "desc" } },
  placementStatuses: { orderBy: { createdAt: "desc" } },
  statusHistory: { orderBy: { changedAt: "desc" } },
} satisfies Prisma.RegistrationInclude;

type RegistrationListRecord = Prisma.RegistrationGetPayload<{
  include: typeof registrationListInclude;
}>;

type RegistrationDetailRecord = Prisma.RegistrationGetPayload<{
  include: typeof registrationDetailInclude;
}>;

function countInstallments(installmentAmounts: Prisma.JsonValue | null): number | null {
  return Array.isArray(installmentAmounts) && installmentAmounts.length > 0
    ? installmentAmounts.length
    : null;
}

export function toRegistrationListItem(registration: RegistrationListRecord): RegistrationListItem {
  const { user, program } = registration;
  const [payment] = registration.payments;
  const [selection] = registration.selectionStatuses;
  const [placement] = registration.placementStatuses;
  const installmentTotal = payment ? countInstallments(payment.installmentAmounts) : null;

  return {
    id: registration.id,
    registrationCode: registration.registrationCode,
    registrationDate: registration.registrationDate,
    participant: {
      userId: user?.id ?? null,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? null,
      photoPath: registration.photoPath,
    },
    program: {
      id: program?.id ?? null,
      name: program?.name ?? "",
      programFormat: program?.programFormat ?? null,
      trainingCost: program?.trainingCost.toString() ?? "0",
    },
    payment: payment
      ? {
          invoiceNumber: payment.invoiceNumber,
          status: payment.status,
          amount: payment.amount.toString(),
          amountPaid: payment.amountPaid.toString(),
          nextDueDate: toDateOnly(payment.nextDueDate),
          installment:
            installmentTotal !== null && payment.currentInstallmentNumber > 0
              ? { current: payment.currentInstallmentNumber, total: installmentTotal }
              : null,
        }
      : null,
    progress: {
      interview: registration.registrationStatus,
      selection: selection?.status ?? null,
      placement: placement?.status ?? null,
    },
    documents: {
      n4CertificatePath: registration.n4CertificatePath,
      sswCertificatePath: registration.sswCertificatePath,
    },
  };
}

export function toRegistrationDetail(registration: RegistrationDetailRecord): RegistrationDetail {
  const { program } = registration;

  return {
    registrationId: registration.id,
    registrationCode: registration.registrationCode,
    registrationDate: registration.registrationDate,
    registrationStatus: registration.registrationStatus,
    selectionNotes: registration.selectionNotes,
    program: {
      id: program?.id ?? null,
      name: program?.name ?? "",
      programFormat: program?.programFormat ?? null,
      trainingCost: program?.trainingCost.toString() ?? "0",
      installmentPlan: program?.installmentPlan ?? null,
    },
    applicant: toApplicant(registration),
    documents: toDocuments(registration),
    payments: registration.payments.map((payment) => ({
      id: payment.id,
      invoiceNumber: payment.invoiceNumber,
      status: payment.status,
      amount: payment.amount.toString(),
      amountPaid: payment.amountPaid.toString(),
      paymentMethod: payment.paymentMethod,
      dueDate: toDateOnly(payment.dueDate),
      nextDueDate: toDateOnly(payment.nextDueDate),
      paymentDate: payment.paymentDate,
      proofImage: payment.proofImage,
      notes: payment.notes,
    })),
    selections: registration.selectionStatuses.map((selection) => ({
      status: selection.status,
      notes: selection.notes,
      evaluatedAt: selection.evaluatedAt,
    })),
    placements: registration.placementStatuses.map((placement) => ({
      status: placement.status,
      companyName: placement.companyName,
      placementDate: toDateOnly(placement.placementDate),
      notes: placement.notes,
    })),
    statusHistory: registration.statusHistory.map((history) => ({
      oldStatus: history.oldStatus,
      newStatus: history.newStatus,
      notes: history.notes,
      changedAt: history.changedAt,
    })),
  };
}