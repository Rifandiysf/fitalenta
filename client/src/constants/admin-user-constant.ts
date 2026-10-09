import type { AdminUserRole } from "@/types/admin-user";

export const ADMIN_USER_ROLES = ["user", "editor", "admin"] as const satisfies readonly AdminUserRole[];

type RoleMeta = {
    label: string;
    subtitle: string;
    variant: "outline" | "secondary" | "destructive";
};

export const ROLE_META: Record<AdminUserRole, RoleMeta> = {
    user: { label: "Peserta", subtitle: "Peserta FITALENTA", variant: "outline" },
    editor: { label: "Editor", subtitle: "Editor konten", variant: "secondary" },
    admin: { label: "Admin", subtitle: "Administrator", variant: "destructive" },
};

export const ROLE_FILTER_OPTIONS = [
    { value: "all", label: "Semua tipe" },
    ...ADMIN_USER_ROLES.map((role) => ({ value: role, label: ROLE_META[role].label })),
] as const;

export const USERS_PER_PAGE = 10;
