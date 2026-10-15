import { Pencil, Trash2 } from "lucide-react";
import { ContentThumbnail } from "@/components/editor/content-thumbnail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { excerptPreview } from "@/helpers/editor/editor-content-helper";
import { cn } from "@/lib/utils";
import type { EditorExpert } from "@/types/editor/editor-team-member";

const COLUMNS = ["Anggota", "Bio", "Urutan", "Status", "Aksi"];
const EDGE = "first:pl-(--card-spacing) last:pr-(--card-spacing)";

type ExpertTableProps = {
    items?: EditorExpert[];
    emptyMessage: string;
    stale?: boolean;
    onEdit: (item: EditorExpert) => void;
    onDelete: (item: EditorExpert) => void;
};

function LoadingRows() {
    return Array.from({ length: 5 }, (_, row) => (
        <TableRow key={row}>
            {COLUMNS.map((column) => (
                <TableCell key={column} className={EDGE}>
                    <Skeleton className="h-5 w-full max-w-28" />
                </TableCell>
            ))}
        </TableRow>
    ));
}

export function ExpertTable({ items, emptyMessage, stale, onEdit, onDelete }: ExpertTableProps) {
    return (
        <Table className={cn("transition-opacity", stale && "opacity-60")}>
            <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                    {COLUMNS.map((column) => (
                        <TableHead
                            key={column}
                            className={cn(EDGE, "h-10 text-xs tracking-wide uppercase", column === "Aksi" && "text-right")}
                        >
                            {column}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {!items ? (
                    <LoadingRows />
                ) : items.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={COLUMNS.length} className="h-32 text-center text-muted-foreground">
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className={cn(EDGE, "min-w-56 py-3 whitespace-normal")}>
                                <div className="flex items-center gap-3">
                                    <ContentThumbnail image={item.image} alt={item.name} />
                                    <div className="min-w-0">
                                        <div className="line-clamp-1 font-medium">{item.name}</div>
                                        <div className="line-clamp-1 text-xs text-muted-foreground">{item.position}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className={cn(EDGE, "max-w-md whitespace-normal text-muted-foreground")}>
                                {item.bio ? (
                                    <span className="line-clamp-2">{excerptPreview(item.bio, 160)}</span>
                                ) : (
                                    "-"
                                )}
                            </TableCell>
                            <TableCell className={cn(EDGE, "tabular-nums")}>{item.order}</TableCell>
                            <TableCell className={EDGE}>
                                <Badge variant={item.isActive ? "default" : "outline"}>
                                    {item.isActive ? "Aktif" : "Nonaktif"}
                                </Badge>
                            </TableCell>
                            <TableCell className={EDGE}>
                                <div className="flex justify-end gap-1.5">
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        aria-label={`Edit ${item.name}`}
                                        onClick={() => onEdit(item)}
                                    >
                                        <Pencil aria-hidden />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        aria-label={`Hapus ${item.name}`}
                                        onClick={() => onDelete(item)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 aria-hidden />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
