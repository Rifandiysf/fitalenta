import { z } from "zod";
import { ADMIN_USER_ROLES } from "@/constants/admin-user-constant";

const PASSWORD_MIN = 6; // mirror PASSWORD_MIN_LENGTH di server
const PASSWORD_MAX = 72; // mirror PASSWORD_MAX_LENGTH di server

/** Mirror PHONE_PATTERN di server/src/config/registration.config.ts */
export const PHONE_PATTERN = /^(\+62|62|0)8\d{7,12}$/;

/** Spasi, tanda hubung, dan tanda kurung dibuang: "0812-3456 7890" -> "081234567890". */
const normalizePhone = (value: string) => value.replace(/[\s().-]/g, "");

const baseShape = {
    name: z.string().trim().min(3, "Nama minimal 3 karakter").max(255, "Nama maksimal 255 karakter"),
    email: z
        .string()
        .trim()
        .min(1, "Email wajib diisi")
        .email("Masukkan email yang valid")
        .max(255, "Email maksimal 255 karakter"),
    // opsional
    phone: z
        .string()
        .trim()
        .transform(normalizePhone)
        .refine((value) => value === "" || PHONE_PATTERN.test(value), "Nomor telepon tidak valid (contoh: 081234567890)"),
    role: z.enum(ADMIN_USER_ROLES, { error: "Tipe user wajib dipilih" }),
};

export const createUserSchema = z.object({
    ...baseShape,
    password: z
        .string()
        .min(PASSWORD_MIN, `Password minimal ${PASSWORD_MIN} karakter`)
        .max(PASSWORD_MAX, `Password maksimal ${PASSWORD_MAX} karakter`),
});

/** Saat edit, password boleh kosong (tidak diubah). */
export const updateUserSchema = z.object({
    ...baseShape,
    password: z
        .string()
        .max(PASSWORD_MAX, `Password maksimal ${PASSWORD_MAX} karakter`)
        .refine((value) => value === "" || value.length >= PASSWORD_MIN, `Password minimal ${PASSWORD_MIN} karakter`),
});

/** State mentah form; role disimpan sebagai string karena berasal dari komponen Select. */
export type UserFormValues = {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
};
