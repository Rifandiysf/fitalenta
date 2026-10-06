import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { cn, formatDate } from "@/lib/utils";
import type { MyRegistration } from "@/types/dashboard";
import { statusLabel, statusStyle } from "@/constants/dashboard-constant";

export function RegistrationTable({ registrations }: { registrations: MyRegistration[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Tanggal Daftar</TableHead>
                    <TableHead>Status Seleksi</TableHead>
                    <TableHead>Penempatan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {registrations.map((r) => {
                    const placement = [r.placement?.company, r.placement?.location].filter(Boolean).join(", ");
                    return (
                        <TableRow key={r.id}>
                            <TableCell className="font-semibold text-primary">{r.program.name}</TableCell>
                            <TableCell className="text-muted-foreground">{formatDate(r.createdAt, "id-ID")}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={cn("font-medium", statusStyle(r.status))}>
                                    {statusLabel(r.status)}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{placement || "-"}</TableCell>
                            <TableCell className="text-right">
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/programs/${r.program.id}`}>Lihat Program</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}