import type { AdminProgramStatus } from "@/types/admin-program";

export const PROGRAMS_PER_PAGE = 10;

type StatusMeta = { label: string; variant: "default" | "outline" | "destructive" };

export const PROGRAM_STATUS_META: Record<AdminProgramStatus, StatusMeta> = {
    active: { label: "Aktif", variant: "default" },
    inactive: { label: "Nonaktif", variant: "outline" },
    full: { label: "Penuh", variant: "destructive" },
};

export const PROGRAM_STATUS_OPTIONS: { value: AdminProgramStatus; label: string }[] = [
    { value: "active", label: PROGRAM_STATUS_META.active.label },
    { value: "inactive", label: PROGRAM_STATUS_META.inactive.label },
    { value: "full", label: PROGRAM_STATUS_META.full.label },
];

export const RUNNING_FILTER_OPTIONS = [
    { value: "all", label: "Semua jadwal" },
    { value: "true", label: "Sedang berjalan" },
    { value: "false", label: "Tidak berjalan" },
] as const;

// Mirror server/src/config/program.config.ts
export const PROGRAM_LIMITS = {
    short: 191,
    long: 20000,
    capacity: 100000,
    sortOrder: 9999,
    money: 99_999_999.99,
} as const;

export const INSTALLMENT_PLAN_PATTERN = /^(none|\d{1,2}_installments)$/;

export const INSTALLMENT_PLANS = ["none", ...[2, 3, 4, 5, 6, 8, 10, 12].map((count) => `${count}_installments`)];

/** Nilai awal program baru; sama dengan default kolom di database. */
export const NEW_PROGRAM_DEFAULTS = {
    location: "Jakarta, Indonesia & Jepang",
    bridgeFund: "Tersedia",
    trainingCost: "16000000",
    departureCost: "30000000",
    sortOrder: "999",
} as const;
