import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Masukkan email yang valid"),
    password: z.string().min(1, "Password wajib diisi"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        name: z.string().min(1, "Nama wajib diisi"),
        email: z
            .string()
            .min(1, "Email wajib diisi")
            .email("Masukkan email yang valid"),
        phone: z
            .string()
            .min(1, "Nomor telepon wajib diisi")
            .min(9, "Nomor telepon terlalu pendek"),
        password: z
            .string()
            .min(1, "Password wajib diisi")
            .min(6, "Password minimal 6 karakter"),
        confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Konfirmasi password tidak cocok",
        path: ["confirmPassword"],
    });

export type RegisterInput = z.infer<typeof registerSchema>;
