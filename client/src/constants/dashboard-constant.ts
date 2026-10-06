import type { SelectionStatus } from "@/types/dashboard";

export const STATUS_LABEL: Record<SelectionStatus, string> = {
    pending: "Menunggu",
    screening: "Seleksi Berkas",
    interview: "Wawancara",
    accepted: "Diterima",
    rejected: "Tidak Lolos",
};

export const STATUS_STYLE: Record<SelectionStatus, string> = {
    pending: "border-slate-200 bg-slate-100 text-slate-700",
    screening: "border-blue-200 bg-blue-50 text-blue-700",
    interview: "border-amber-200 bg-amber-50 text-amber-700",
    accepted: "border-emerald-200 bg-emerald-50 text-emerald-700",
    rejected: "border-red-200 bg-red-50 text-red-700",
};

import type { MyRegistration } from "@/types/dashboard";

export const PREVIEW_REGISTRATIONS: MyRegistration[] = [
    {
        id: 1,
        status: "interview",
        createdAt: "2026-09-20T08:00:00.000Z",
        program: { id: 1, name: "Program Reguler" },
        placement: null,
    },
    {
        id: 2,
        status: "accepted",
        createdAt: "2026-08-05T08:00:00.000Z",
        program: { id: 4, name: "Program Hybrid" },
        placement: { company: "PT Contoh Jepang", location: "Okinawa" },
    },
];

export const statusLabel = (s: string) => STATUS_LABEL[s as SelectionStatus] ?? s;
export const statusStyle = (s: string) =>
    STATUS_STYLE[s as SelectionStatus] ?? STATUS_STYLE.pending;