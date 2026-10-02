import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
    email: z.email("Format email tidak valid").max(255),
    subject: z.string().trim().min(3, "Subjek minimal 3 karakter").max(150),
    message: z
        .string()
        .trim()
        .min(10, "Pesan minimal 10 karakter")
        .max(2000, "Pesan maksimal 2000 karakter"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;