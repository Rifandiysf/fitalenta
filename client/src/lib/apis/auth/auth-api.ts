import { api } from "@/lib/axios";
import type { LoginInput, RegisterInput } from "@/lib/validations/auth";
import type { AuthUser } from "@/store/auth-store";
import { ApiResponse } from "@/types/api";

type AuthPayload = { user: AuthUser };

export async function login(payload: LoginInput): Promise<AuthPayload> {
    const { data } = await api.post<ApiResponse<AuthPayload>>("/auth/login", payload);
    return data.data;
}

export async function register(payload: RegisterInput): Promise<AuthPayload> {
    const { data } = await api.post<ApiResponse<AuthPayload>>("/auth/register", payload);
    return data.data;
}

export async function logout(): Promise<void> {
    await api.post<ApiResponse<null>>("/auth/logout");
}

export async function fetchCurrentUser(): Promise<AuthUser> {
    const { data } = await api.get<ApiResponse<AuthPayload>>("/auth/me");
    return data.data.user;
}