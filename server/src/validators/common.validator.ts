import { param, query, ValidationChain } from "express-validator";
import { MAX_PAGE_SIZE, SEARCH_MAX_LENGTH } from "../config/admin.config";

export const idParamRule: ValidationChain = param("id")
  .isInt({ min: 1 })
  .withMessage("ID tidak valid")
  .toInt();

export const paginationRules: ValidationChain[] = [
  query("page").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("Page harus berupa angka minimal 1").toInt(),
  query("limit")
    .optional({ values: "falsy" })
    .isInt({ min: 1, max: MAX_PAGE_SIZE })
    .withMessage(`Limit harus berupa angka 1 sampai ${MAX_PAGE_SIZE}`)
    .toInt(),
];

export const searchRule: ValidationChain = query("search")
  .optional({ values: "falsy" })
  .trim()
  .isLength({ max: SEARCH_MAX_LENGTH })
  .withMessage(`Kata kunci maksimal ${SEARCH_MAX_LENGTH} karakter`);

export function enumQueryRule(field: string, label: string, values: string[]): ValidationChain {
  return query(field)
    .optional({ values: "falsy" })
    .isIn(values)
    .withMessage(`${label} harus salah satu dari: ${values.join(", ")}`);
}