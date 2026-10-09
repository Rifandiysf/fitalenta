import type { Metadata } from "next";
import { DashboardView } from "./features/dashboard-view";

export const metadata: Metadata = {
    title: "Dashboard Admin - FITALENTA",
};

export default function AdminDashboardPage() {
    return <DashboardView />;
}