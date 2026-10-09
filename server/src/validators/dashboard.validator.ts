import { query, ValidationChain } from "express-validator";
import { PaymentStatus, PlacementStage, RegistrationStatus } from "../../generated/prisma/client";
import { enumQueryRule, idParamRule, paginationRules, searchRule } from "./common.validator";

export const listRegistrationsRules: ValidationChain[] = [
  ...paginationRules,
  searchRule,
  query("programId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("Program tidak valid").toInt(),
  enumQueryRule("paymentStatus", "Status pembayaran", Object.values(PaymentStatus)),
  enumQueryRule("selectionStatus", "Status seleksi", Object.values(RegistrationStatus)),
  enumQueryRule("placementStatus", "Status penyaluran", Object.values(PlacementStage)),
];

export const registrationDetailRules: ValidationChain[] = [idParamRule];