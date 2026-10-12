export const PROGRAM_LIMITS = {
  short: 191,
  long: 20000,
  capacity: 100000,
  sortOrder: 9999,
  money: 99_999_999.99,
} as const;

export const INSTALLMENT_PLAN_PATTERN = /^(none|\d{1,2}_installments)$/;