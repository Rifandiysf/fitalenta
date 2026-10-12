import { Layers, LayoutDashboard, TrendingUp, type LucideIcon } from "lucide-react";

export type AdminNavLink = {
    title: string;
    href: string;
    icon?: LucideIcon;
};

export type AdminNavEntry =
    | ({ type: "link" } & AdminNavLink & { icon: LucideIcon })
    | { type: "group"; title: string; icon: LucideIcon; items: AdminNavLink[] };

export const ADMIN_ROLES: readonly string[] = ["admin", "editor"];

export const ADMIN_NAV: AdminNavEntry[] = [
    { type: "link", title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
        type: "group",
        title: "Manajemen",
        icon: Layers,
        items: [
            { title: "Pembayaran", href: "/admin/pembayaran" },
            { title: "Seleksi & Penempatan", href: "/admin/seleksi" },
            { title: "Program", href: "/admin/program" },
            { title: "User", href: "/admin/user" },
        ],
    },
    { type: "link", title: "Laporan Keuangan", href: "/admin/laporan-keuangan", icon: TrendingUp },
];

export function isActivePath(pathname: string, href: string) {
    if (href === "/admin") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function getAdminPageTitle(pathname: string) {
    const links = ADMIN_NAV.flatMap((entry) => (entry.type === "group" ? entry.items : [entry]));
    const match = links
        .filter((link) => isActivePath(pathname, link.href))
        .sort((a, b) => b.href.length - a.href.length)[0];
    return match?.title ?? "Admin";
}
