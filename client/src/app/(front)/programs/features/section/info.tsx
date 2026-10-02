import { installmentLabel } from "@/helpers/program-helper";
import { formatDate, formatIDR } from "@/lib/utils";
import { Program } from "@/types/program";
import { Banknote, Calendar, Clock, Headset, Landmark, LayoutGrid, LucideIcon, RefreshCw, Tag, Users } from "lucide-react";

function InfoItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-4">
            <Icon className="mt-0.5 size-6 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
            <div>
                <dt className="text-sm text-slate-800">{label}</dt>
                <dd className="mt-1 text-sm text-slate-500">{value}</dd>
            </div>
        </div>
    );
}

export function InfoSection({ program }: { program: Program }) {
    return (
        <section className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <div className="bg-primary px-6 py-3.5 text-center font-bold uppercase tracking-wide text-white">Informasi Tambahan</div>
            <div className="p-6">
                <dl className="grid gap-6 md:grid-cols-2">
                    <InfoItem icon={Tag} label="Kategori Program" value={program.category?.name} />
                    <InfoItem icon={LayoutGrid} label="Tipe / Format Program" value={program.programFormat} />
                    <InfoItem icon={RefreshCw} label="Skema Pembayaran" value={installmentLabel(program.installmentPlan)} />
                    <InfoItem icon={Banknote} label="DP / Uang Muka" value={program.downPayment != null ? formatIDR(program.downPayment) : undefined} />
                    <InfoItem icon={Landmark} label="Dana Talang Keberangkatan" value={program.bridgeFund} />
                    <InfoItem icon={Users} label="Kuota Program" value={program.capacity != null ? `${program.capacity} peserta` : undefined} />
                    <InfoItem icon={Calendar} label="Batas Pendaftaran" value={program.registrationDeadline ? formatDate(program.registrationDeadline, "id-ID") : undefined} />
                    <InfoItem icon={Clock} label="Tanggal Mulai" value={program.startDate ? formatDate(program.startDate, "id-ID") : undefined} />
                </dl>

                {program.contactInfo && (
                    <div className="mt-6 border-t border-slate-100 pt-6">
                        <p className="flex items-center gap-2 text-sm text-slate-800">
                            <Headset className="size-4" aria-hidden /> Kontak Informasi
                        </p>
                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-500">{program.contactInfo}</p>
                    </div>
                )}
            </div>
        </section>
    );
}