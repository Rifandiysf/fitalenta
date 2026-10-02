import { CheckList } from "@/components/common/checklist";
import { formatIDR, toLines } from "@/lib/utils";
import { Program } from "@/types/program";

function CostPanel({ title, amount, details }: { title: string; amount: string; details: string[] }) {
    return (
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <div className="bg-primary px-6 py-4 text-center text-white">
                <p className="font-bold uppercase tracking-wide">{title}</p>
                <p className="mt-1 text-2xl font-extrabold">{amount}</p>
            </div>
            <div className="p-6">{details.length > 0 ? <CheckList items={details} /> : <p className="text-sm text-slate-500">-</p>}</div>
        </div>
    );
}

export function CostSection({ program: p }: { program: Program }) {
    const training = toLines(p.trainingFeeDetails);
    const departure = toLines(p.departureFeeDetails);
    return (
        <section>
            <h2 className="mb-8 text-center text-3xl font-extrabold uppercase tracking-wide text-primary">Biaya &amp; Detail Program</h2>
            <div className="grid items-start gap-5 md:grid-cols-2">
                <CostPanel title="Biaya Pelatihan" amount={formatIDR(p.trainingCost)} details={training} />
                <CostPanel title="Biaya Keberangkatan" amount={formatIDR(p.departureCost)} details={departure} />
            </div>
        </section>
    );
}