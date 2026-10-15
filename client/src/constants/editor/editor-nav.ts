import { CalendarDays, Images, LayoutDashboard, Newspaper } from "lucide-react";
import type { AdminAreaConfig } from "@/constants/admin-nav";

export const EDITOR_ROLES: readonly string[] = ["admin", "editor"];

export const EDITOR_AREA: AdminAreaConfig = {
    basePath: "/editor",
    areaLabel: "Editor CMS",
    roles: EDITOR_ROLES,
    nav: [
        { type: "link", title: "Dashboard", href: "/editor/dashboard", icon: LayoutDashboard },
        {
            type: "group",
            title: "Konten",
            icon: Newspaper,
            items: [
                { title: "Artikel", href: "/editor/articles" },
                { title: "Event", href: "/editor/events" },
                { title: "Galeri", href: "/editor/gallery" },
            ],
        },
    ],
};

export const EDITOR_SHORTCUTS = [
    {
        title: "Artikel",
        description: "Tulis dan atur artikel blog yang tampil di website.",
        href: "/editor/articles",
        createHref: "/editor/articles/new",
        icon: Newspaper,
    },
    {
        title: "Event",
        description: "Kelola jadwal event, lokasi, dan tautan pendaftaran.",
        href: "/editor/events",
        createHref: "/editor/events/new",
        icon: CalendarDays,
    },
    {
        title: "Galeri",
        description: "Unggah dan atur dokumentasi foto kegiatan.",
        href: "/editor/gallery",
        createHref: null,
        icon: Images,
    },
] as const;
