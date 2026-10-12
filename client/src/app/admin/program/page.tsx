import { Suspense } from "react";
import type { Metadata } from "next";
import { ProgramManagementView } from "./features/program-management-view";

export const metadata: Metadata = {
    title: "Manajemen Program - FITALENTA",
};

export default function AdminProgramPage() {
    return (
        <Suspense fallback={null}>
            <ProgramManagementView />
        </Suspense>
    );
}
