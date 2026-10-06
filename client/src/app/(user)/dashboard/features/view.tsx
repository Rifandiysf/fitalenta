import Link from "next/link";
import { Briefcase, ClipboardCheck, Inbox, NotebookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MyRegistration } from "@/types/dashboard";
import { StatCard } from "./stat-card";
import { RefreshButton } from "./refresh";
import { statusLabel } from "@/constants/dashboard-constant";
import { RegistrationTable } from "./registration-table";

type Props = {
    userName: string;
    registrations: MyRegistration[];
};

export function DashboardView({ userName, registrations }: Props) {
    const latest = registrations[0];
    const placement = [latest?.placement?.company, latest?.placement?.location]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="space-y-8">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                        Dashboard Status Program
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        Selamat Datang, <strong className="text-primary">{userName}</strong>
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                        {registrations.length === 0
                            ? "Anda belum memiliki program yang terdaftar."
                            : `Anda memiliki ${registrations.length} program yang terdaftar.`}
                    </p>
                </div>
                <RefreshButton />
            </header>

            <section aria-label="Ringkasan" className="grid gap-5 md:grid-cols-3">
                <StatCard icon={ClipboardCheck} title="Status Seleksi" value={latest && statusLabel(latest.status)} />
                <StatCard icon={Briefcase} title="Penempatan Kerja" value={placement} />
                <StatCard icon={NotebookText} title="Program Saya" value={latest?.program.name} />
            </section>

            <Card className="gap-0 py-0">
                <CardHeader className="border-b px-6 py-5">
                    <CardTitle className="text-xl text-primary">Detail Program Anda</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {registrations.length === 0 ? (
                        <div className="flex flex-col items-center px-6 py-14 text-center">
                            <span className="grid size-20 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-100">
                                <Inbox className="size-9 text-slate-400" strokeWidth={1.5} aria-hidden />
                            </span>
                            <h2 className="mt-6 text-lg font-bold text-primary">Data tidak tersedia</h2>
                            <p className="mt-2 text-sm text-muted-foreground">Anda belum terdaftar dalam program magang.</p>
                            <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
                                <Link href="/programs">Daftar Program Magang</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <RegistrationTable registrations={registrations} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}