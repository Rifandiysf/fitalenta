import { Prisma } from "../../../generated/prisma/client";
import { RegistrationResult } from "../../types/registration.types";

export const registrationResultInclude = {
  user: { select: { name: true, email: true, phone: true } },
  program: { select: { id: true, name: true, programFormat: true, installmentPlan: true } },
  payments: { select: { invoiceNumber: true, amount: true, status: true } },
} satisfies Prisma.RegistrationInclude;

type RegistrationRecord = Prisma.RegistrationGetPayload<{
  include: typeof registrationResultInclude;
}>;

function toDateOnly(date: Date | null): string | null {
  return date ? date.toISOString().slice(0, 10) : null;
}

export function toRegistrationResult(registration: RegistrationRecord): RegistrationResult {
  const { user, program, payments } = registration;
  const [payment] = payments;

  return {
    registrationId: registration.id,
    registrationCode: registration.registrationCode,
    registrationStatus: registration.registrationStatus,
    registrationDate: registration.registrationDate,
    program: {
      id: program?.id ?? null,
      name: program?.name ?? "",
      programFormat: program?.programFormat ?? null,
    },
    payment: {
      invoiceNumber: payment.invoiceNumber,
      amount: payment.amount.toString(),
      status: payment.status,
      installmentPlan: program?.installmentPlan ?? null,
    },
    applicant: {
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? null,
      nik: registration.nik,
      gender: registration.gender,
      birthPlace: registration.birthPlace,
      birthDate: toDateOnly(registration.birthDate),
      lastEducation: registration.lastEducation,
      major: registration.major,
      educationInstitution: registration.educationInstitution,
      currentActivity: registration.currentActivity,
      maritalStatus: registration.maritalStatus,
      parentRelationship: registration.parentRelationship,
      parentPhone: registration.parentPhone,
      ktp: {
        provinceCode: registration.ktpProvinceCode,
        provinceName: registration.ktpProvinceName,
        cityCode: registration.ktpCityCode,
        cityName: registration.ktpCityName,
        address: registration.ktpAddress,
      },
      domicile: {
        provinceCode: registration.domicileProvinceCode,
        provinceName: registration.domicileProvinceName,
        cityCode: registration.domicileCityCode,
        cityName: registration.domicileCityName,
        address: registration.domicileAddress,
      },
    },
    documents: {
      photoPath: registration.photoPath,
      n4CertificatePath: registration.n4CertificatePath,
      sswCertificatePath: registration.sswCertificatePath,
    },
  };
}