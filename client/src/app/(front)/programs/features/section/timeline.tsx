import { toLines } from "@/lib/utils";
import { Program } from "@/types/program";

export function TimelineSection({ program }: { program: Program }) {
    const steps = toLines(program.timelineText);
    if (steps.length === 0) return null;
    return (
        <section>
            <h2 className="mb-8 text-center text-3xl font-extrabold uppercase tracking-wide text-primary">Timeline Program</h2>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, i) => (
                    <li key={i} className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100 flex flex-col items-center gap-4 p-6 text-center">
                        <span className="grid size-12 place-items-center rounded-full bg-primary text-xl font-bold text-white">{i + 1}</span>
                        <p className="text-sm leading-relaxed text-slate-500">{step}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
