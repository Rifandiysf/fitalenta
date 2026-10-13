import { Suspense } from "react";
import type { Metadata } from "next";
import { ReportManagementView } from "./features/report-management-view";

export const metadata: Metadata = {
    title: "Laporan Keuangan - FITALENTA",
};

export default function AdminFinancialReportPage() {
    return (
        <Suspense fallback={null}>
            <ReportManagementView />
        </Suspense>
    );
}
