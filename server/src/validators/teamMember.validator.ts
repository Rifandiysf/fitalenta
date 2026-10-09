import { body, param, query, ValidationChain } from "express-validator";
import { ABOUT_IMAGE_SLOTS, ABOUT_LIMITS, EXPERT_LIMITS, ICON_NAME_PATTERN } from "../config/about.config";
import { idParamRule, paginationRules, searchRule } from "./common.validator";

interface TextOptions {
  label: string;
  max: number;
  optional?: boolean;
  allowEmpty?: boolean;
}

function textRule(field: string, { label, max, optional = false, allowEmpty = false }: TextOptions): ValidationChain {
  const presence = optional
    ? body(field).optional()
    : body(field).exists().withMessage(`${label} wajib diisi`).bail();
  const text = presence.isString().withMessage(`${label} harus berupa teks`).bail().trim();
  const filled = allowEmpty ? text : text.notEmpty().withMessage(`${label} tidak boleh kosong`).bail();

  return filled.isLength({ max }).withMessage(`${label} maksimal ${max} karakter`);
}

function listRule(field: string, label: string, max: number, min = 0): ValidationChain {
  return body(field)
    .optional()
    .isArray({ min, max })
    .withMessage(`${label} harus berisi ${min} sampai ${max} item`);
}

function objectRule(field: string, label: string): ValidationChain {
  return body(field).optional().isObject().withMessage(`${label} harus berupa object`);
}

function booleanRule(chain: ValidationChain, label: string): ValidationChain {
  return chain
    .optional({ values: "null" })
    .isBoolean()
    .withMessage(`${label} harus true atau false`)
    .toBoolean();
}

const orderRule = body("order")
  .optional({ values: "null" })
  .isInt({ min: 0, max: EXPERT_LIMITS.order })
  .withMessage(`Urutan harus berupa angka 0 sampai ${EXPERT_LIMITS.order}`)
  .toInt();

const expertFieldRules = (optional: boolean): ValidationChain[] => [
  textRule("name", { label: "Nama", max: EXPERT_LIMITS.name, optional }),
  textRule("position", { label: "Posisi", max: EXPERT_LIMITS.position, optional }),
  textRule("bio", { label: "Bio", max: EXPERT_LIMITS.bio, optional: true, allowEmpty: true }),
  orderRule,
  booleanRule(body("isActive"), "isActive"),
];

export const listExpertsRules: ValidationChain[] = [
  ...paginationRules,
  searchRule,
  booleanRule(query("isActive"), "isActive"),
];

export const expertIdRules: ValidationChain[] = [idParamRule];

export const createExpertRules: ValidationChain[] = expertFieldRules(false);

export const updateExpertRules: ValidationChain[] = [
  idParamRule,
  ...expertFieldRules(true),
  booleanRule(body("removeImage"), "removeImage"),
];

export const reorderExpertsRules: ValidationChain[] = [
  body("ids")
    .isArray({ min: 1, max: EXPERT_LIMITS.reorderItems })
    .withMessage(`ids harus berupa array berisi 1 sampai ${EXPERT_LIMITS.reorderItems} ID`)
    .bail()
    .custom((ids: unknown[]) => new Set(ids.map(String)).size === ids.length)
    .withMessage("ids tidak boleh berisi ID yang sama"),
  body("ids.*").isInt({ min: 1 }).withMessage("ID tidak valid").toInt(),
];

const A = ABOUT_LIMITS;

export const updateAboutRules: ValidationChain[] = [
  objectRule("hero", "hero"),
  textRule("hero.title", { label: "Judul hero", max: A.heroTitle, optional: true }),
  textRule("hero.subtitle", { label: "Subjudul hero", max: A.heroSubtitle, optional: true }),

  objectRule("story", "story"),
  listRule("story.paragraphs", "story.paragraphs", A.paragraphs.count, 1),
  textRule("story.paragraphs.*", { label: "Paragraf", max: A.paragraphs.length }),

  textRule("vision", { label: "Visi", max: A.vision, optional: true }),

  listRule("missions", "missions", A.missions.count, 1),
  textRule("missions.*", { label: "Misi", max: A.missions.length }),

  listRule("journey", "journey", A.journey.count),
  textRule("journey.*.year", { label: "Tahun journey", max: A.journey.year }),
  textRule("journey.*.text", { label: "Teks journey", max: A.journey.text }),

  listRule("values", "values", A.values.count),
  body("values.*.icon")
    .exists()
    .withMessage("Icon wajib diisi")
    .bail()
    .isString()
    .withMessage("Icon harus berupa teks")
    .bail()
    .trim()
    .matches(ICON_NAME_PATTERN)
    .withMessage("Nama icon tidak valid (contoh: Zap, UserRound)"),
  textRule("values.*.title", { label: "Judul value", max: A.values.title }),
  textRule("values.*.desc", { label: "Deskripsi value", max: A.values.desc }),
];

export const aboutImageSlotRules: ValidationChain[] = [
  param("slot")
    .isIn([...ABOUT_IMAGE_SLOTS])
    .withMessage(`Slot gambar harus salah satu dari: ${ABOUT_IMAGE_SLOTS.join(", ")}`),
];