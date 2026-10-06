import type { Metadata } from "next";
import { DashboardView } from "./features/view";
import { PREVIEW_REGISTRATIONS } from "@/constants/dashboard-constant";

export const metadata: Metadata = {
    title: "Dashboard - FITALENTA",
    robots: { index: false },
};

type Props = { searchParams: Promise<{ preview?: string }> };

export default async function DashboardPage({ searchParams }: Props) {
    const { preview } = await searchParams;
    const registrations = preview === "filled" ? PREVIEW_REGISTRATIONS : [];

    return (
        <main className="bg-linear-to-b from-slate-50 to-white">
            <div className="mx-auto max-w-6xl px-4 py-10">
                <DashboardView userName={"Rifandi Yusuf"} registrations={registrations} />
            </div>
        </main>
    );
}