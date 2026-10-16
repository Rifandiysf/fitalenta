import axios from "axios";
import { ApiError } from "@/lib/api-error";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data as { message?: string; code?: string } | undefined;
            const message = data?.message ?? "Something went wrong. Please try again.";
            return Promise.reject(new ApiError(message, { status: error.response?.status, code: data?.code }));
        }
        return Promise.reject(error);
    },
);