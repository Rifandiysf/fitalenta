import type { Metadata } from "next";
import { ProgramFormView } from "../features/program-form-view";

export const metadata: Metadata = {
    title: "Edit Program - FITALENTA",
};

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function AdminProgramEditPage({ params }: PageProps) {
    const { id } = await params;
    return <ProgramFormView programId={Number(id)} />;
}
