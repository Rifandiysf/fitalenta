import type { Metadata } from "next";
import { ProgramFormView } from "../features/program-form-view";

export const metadata: Metadata = {
    title: "Tambah Program - FITALENTA",
};

export default function AdminProgramCreatePage() {
    return <ProgramFormView />;
}
