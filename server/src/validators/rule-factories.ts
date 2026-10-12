import { body, ValidationChain } from "express-validator";

interface RuleOptions {
  label: string;
  optional?: boolean;
  nullable?: boolean;
}

interface TextOptions extends RuleOptions {
  max: number;
}

interface IntOptions extends RuleOptions {
  min: number;
  max?: number;
}

interface DecimalOptions extends RuleOptions {
  min: number;
  max: number;
}

const isFilled = (value: unknown) => value !== null && value !== "";

function startRule(field: string, { label, optional = false, nullable = false }: RuleOptions): ValidationChain {
  const chain = body(field);

  if (nullable) return chain.optional({ values: "undefined" }).if(isFilled);
  if (optional) return chain.optional();
  return chain.exists().withMessage(`${label} wajib diisi`).bail();
}

export function textRule(field: string, options: TextOptions): ValidationChain {
  const { label, max, nullable = false } = options;
  const text = startRule(field, options).isString().withMessage(`${label} harus berupa teks`).bail().trim();
  const filled = nullable ? text : text.notEmpty().withMessage(`${label} tidak boleh kosong`).bail();

  return filled.isLength({ max }).withMessage(`${label} maksimal ${max} karakter`);
}

export function intRule(field: string, options: IntOptions): ValidationChain {
  const { label, min, max } = options;
  const message =
    max === undefined ? `${label} harus berupa angka minimal ${min}` : `${label} harus berupa angka ${min} sampai ${max}`;

  return startRule(field, options)
    .isInt(max === undefined ? { min } : { min, max })
    .withMessage(message)
    .toInt();
}

export function decimalRule(field: string, options: DecimalOptions): ValidationChain {
  const { label, min, max } = options;

  return startRule(field, options)
    .isFloat({ min, max })
    .withMessage(`${label} harus berupa angka ${min} sampai ${max}`)
    .toFloat();
}

export function dateRule(field: string, options: RuleOptions): ValidationChain {
  return startRule(field, options)
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage(`${options.label} harus berformat YYYY-MM-DD`)
    .toDate();
}

export function enumRule(field: string, values: string[], options: RuleOptions): ValidationChain {
  return startRule(field, options)
    .isIn(values)
    .withMessage(`${options.label} harus salah satu dari: ${values.join(", ")}`);
}

export function booleanRule(chain: ValidationChain, label: string): ValidationChain {
  return chain
    .optional({ values: "null" })
    .isBoolean()
    .withMessage(`${label} harus true atau false`)
    .toBoolean();
}