export type AuthRole = "admin" | "user";

export function normalizeRole(role: unknown): AuthRole {
    return String(role).toLowerCase() === "admin" ? "admin" : "user";
}

export function getHomeByRole(role: AuthRole): string {
    return role === "admin" ? "/admin/dashboard" : "/dashboard";
}