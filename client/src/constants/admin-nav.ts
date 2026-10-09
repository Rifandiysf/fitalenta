import { Layers, LayoutDashboard, TrendingUp, type LucideIcon } from "lucide-react";

export type AdminNavLink = {
    title: string;
    href: string;
    icon?: LucideIcon;
};

export type AdminNavEntry =
    | ({ type: "link" } & AdminNavLink & { icon: LucideIcon })
    | { type: "group"; title: string; icon: LucideIcon; items: AdminNavLink[] };

/** Role yang boleh masuk panel admin; mengikuti authorize("admin", "editor") di server. */
export const ADMIN_ROLES: readonly string[] = ["admin", "editor"];

/**
 * Menu sidebar admin. Item "Manajemen" dikelompokkan sebagai subnav, sehingga judul
 * tiap item tidak perlu lagi memakai awalan "Manajemen".
 */
export const ADMIN_NAV: AdminNavEntry[] = [
    { type: "link", title: "Dashboard", href: "/admin", icon: LayoutDashboard },
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
    // "/admin" hanya aktif untuk dashboard, bukan seluruh halaman di bawahnya
    if (href === "/admin") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
}

/** Judul halaman untuk header, diambil dari item menu yang cocok dengan URL aktif. */
export function getAdminPageTitle(pathname: string) {
    const links = ADMIN_NAV.flatMap((entry) => (entry.type === "group" ? entry.items : [entry]));
    const match = links
        .filter((link) => isActivePath(pathname, link.href))
        .sort((a, b) => b.href.length - a.href.length)[0];
    return match?.title ?? "Admin";
}
