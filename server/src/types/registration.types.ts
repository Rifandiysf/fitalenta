import { Prisma } from "../../generated/prisma/client";

export type RegistrationProfileInput = Pick<
  Prisma.RegistrationUncheckedCreateInput,
  | "nik"
  | "gender"
  | "birthPlace"
  | "lastEducation"
  | "major"
  | "educationInstitution"
  | "currentActivity"
  | "maritalStatus"
  | "parentPhone"
  | "parentRelationship"
  | "ktpProvinceCode"
  | "ktpProvinceName"
  | "ktpCityCode"
  | "ktpCityName"
  | "ktpAddress"
  | "domicileProvinceCode"
  | "domicileProvinceName"
  | "domicileCityCode"
  | "domicileCityName"
  | "domicileAddress"
>;

export interface CreateRegistrationInput extends RegistrationProfileInput {
  programId: number;
  birthDate: string;
  fullName?: string;
  phone?: string;
}

export interface CreateRegistrationResult {
  registrationId: number;
  registrationCode: string;
  invoiceNumber: string;
  amount: string;
  installmentPlan: string | null;
}