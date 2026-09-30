import { isAxiosError } from "axios";
import { api } from "@/lib/axios";
import type {
    ContactErrorBody,
    ContactPayload,
    ContactResponse,
} from "@/types/contact";

export async function sendContact(payload: ContactPayload): Promise<ContactResponse> {
    const { data } = await api.post<ContactResponse>("/contact", payload);
    return data;
}

export class ContactError extends Error {
    fieldErrors: Record<string, string> = {};
}

export function toContactError(err: unknown): ContactError {
    const result = new ContactError("Gagal mengirim pesan. Silakan coba lagi.");

    if (!isAxiosError<ContactErrorBody>(err)) return result;

    if (!err.response) {
        result.message = "Tidak dapat terhubung ke server. Periksa koneksi Anda.";
        return result;
    }

    const { status, data } = err.response;

    if (status === 429) {
        result.message = "Terlalu banyak percobaan. Silakan coba lagi beberapa saat lagi.";
        return result;
    }

    if (data?.errors) {
        for (const [key, val] of Object.entries(data.errors)) {
            result.fieldErrors[key] = Array.isArray(val) ? val[0] : val;
        }
    }

    if (data?.message) result.message = data.message;
    else if (status >= 500) result.message = "Terjadi kesalahan pada server. Coba lagi nanti.";

    return result;
}