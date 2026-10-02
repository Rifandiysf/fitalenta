import { CheckList } from "@/components/common/checklist";
import { toLines } from "@/lib/utils";
import { Program } from "@/types/program";

export function RequirementsSection({ program }: { program: Program }) {
    const items = toLines(program.requirementsText ?? program.requirements);
    if (items.length === 0) return null;
    return (
        <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <div className="bg-primary px-6 py-3.5 text-center font-bold uppercase tracking-wide text-white">Persyaratan Peserta</div>
            <div className="p-6">
                <CheckList items={items} className="md:columns-2 md:gap-8" />
            </div>
        </section>
    );
}