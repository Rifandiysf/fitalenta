import { totalEstimate } from "@/helpers/program-helper";
import { formatIDR } from "@/lib/utils";
import { Program } from "@/types/program";
import { Calculator, LucideIcon, Plane, Wallet } from "lucide-react";

function SummaryItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <Icon className="size-8 text-primary" strokeWidth={1.5} aria-hidden />
            <p className="text-sm text-slate-600">{label}</p>
            <p className="font-bold text-primary">{value}</p>
        </div>
    );
}

export function SummarySection({ program: p }: { program: Program }) {
    return (
        <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <div className="border-b bg-slate-50 px-6 py-3.5 text-center font-bold uppercase tracking-wide text-primary">
                Ringkasan Biaya &amp; Pembayaran
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-3">
                <SummaryItem icon={Wallet} label="Biaya Pelatihan" value={formatIDR(p.trainingCost)} />
                <SummaryItem icon={Plane} label="Keberangkatan" value={formatIDR(p.departureCost)} />
                <SummaryItem icon={Calculator} label="Total Estimasi" value={formatIDR(totalEstimate(p))} />
            </div>
        </section>
    );
}