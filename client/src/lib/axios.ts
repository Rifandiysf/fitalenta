import axios from "axios";

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
            const message =
                (error.response?.data as { message?: string } | undefined)?.message ??
                "Something went wrong. Please try again.";
            return Promise.reject(new Error(message));
        }
        return Promise.reject(error);
    },
);
