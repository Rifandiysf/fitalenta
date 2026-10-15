import { UserCheck, UserX, Users } from "lucide-react";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import type { EditorExpertSummary } from "@/types/editor/editor-team-member";

export function ExpertStatCards({ summary }: { summary?: EditorExpertSummary }) {
    return (
        <div className="grid gap-4 sm:grid-cols-3">
            <AdminStatCard title="Total anggota" value={summary?.total} note="Seluruh anggota tersimpan" icon={Users} />
            <AdminStatCard title="Aktif" value={summary?.active} note="Tampil di website" icon={UserCheck} />
            <AdminStatCard title="Nonaktif" value={summary?.inactive} note="Disembunyikan dari website" icon={UserX} />
        </div>
    );
}
