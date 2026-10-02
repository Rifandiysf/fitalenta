import type { Metadata } from "next";
import type { ProgramCategory } from "@/types/program";
import { getPrograms } from "@/lib/services/program-service";
import { CategoryFilter } from "./features/category-filter";
import { ProgramCard } from "./features/program-card";
import PageHero from "@/components/common/page-hero";

export const metadata: Metadata = {
    title: "Program - FITALENTA",
    description: "Persiapkan kompetensi, karier, dan peluang kerja Anda melalui program FITALENTA.",
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function ProgramsPage({ searchParams }: Props) {
    const { category } = await searchParams;
    const activeId = Number(category) || undefined;

    const all = await getPrograms();

    const categories = [
        ...new Map(
            all.flatMap((p) => (p.category ? [[p.category.id, p.category] as const] : [])),
        ).values(),
    ] satisfies ProgramCategory[];

    const programs = activeId ? all.filter((p) => p.categoryId === activeId) : all;

    return (
        <>
            <PageHero
                badge="Program FITALENTA"
                title="Our Programs"
                subtitle="Persiapkan kompetensi, karier, dan peluang kerja Anda melalui program FITALENTA."
                crumbs={[{ label: "Home", href: "/" }, { label: "Programs" }]}
            />

            <section className="bg-slate-50 py-12">
                <div className="mx-auto max-w-6xl px-4">
                    <CategoryFilter categories={categories} activeId={activeId} />

                    {programs.length === 0 ? (
                        <p className="py-20 text-center text-slate-500">Belum ada program pada kategori ini.</p>
                    ) : (
                        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {programs.map((program) => (
                                <li key={program.id} className="flex">
                                    <div className="w-full"><ProgramCard program={program} /></div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </>
    );
}