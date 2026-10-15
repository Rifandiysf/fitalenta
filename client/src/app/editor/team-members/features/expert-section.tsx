"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck, Plus, RefreshCw, Users, X } from "lucide-react";
import { AdminTablePagination } from "@/components/admin/admin-table-pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useDebounced } from "@/hooks/use-debounced";
import { useEditorExperts } from "@/hooks/editor/use-editor-team-members";
import type { EditorExpert, EditorExpertParams } from "@/types/editor/editor-team-member";
import { DeleteExpertDialog } from "./delete-expert-dialog";
import { ExpertFormSheet } from "./expert-form-sheet";
import { ExpertStatCards } from "./expert-stat-cards";
import { ExpertTable } from "./expert-table";
import { ExpertToolbar } from "./expert-toolbar";

export function ExpertSection() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isActive, setIsActive] = useState<EditorExpertParams["isActive"]>("all");

    const [formTarget, setFormTarget] = useState<EditorExpert | "new" | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<EditorExpert | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    const debouncedSearch = useDebounced(search);
    const params: EditorExpertParams = { page, search: debouncedSearch.trim(), isActive };
    const list = useEditorExperts(params);

    const isFiltered = params.search !== "" || isActive !== "all";

    function handleSearchChange(value: string) {
        setSearch(value);
        setPage(1);
    }

    function handleStatusChange(value: EditorExpertParams["isActive"]) {
        setIsActive(value);
        setPage(1);
    }

    function handleSaved(message: string) {
        setFormTarget(null);
        setNotice(message);
    }

    function handleDeleted(item: EditorExpert) {
        setDeleteTarget(null);
        setNotice(`${item.name} berhasil dihapus.`);
        if (page > 1 && list.data?.items.length === 1) setPage(page - 1);
    }

    function description() {
        if (!list.data) return "Memuat data tim...";
        if (isFiltered) return `${list.data.meta.total} anggota cocok dengan filter.`;
        return `Menampilkan ${list.data.meta.total} anggota, diurutkan berdasarkan urutan tampil.`;
    }

    return (
        <div role="tabpanel" id="team-panel-experts" aria-labelledby="team-tab-experts" className="space-y-6">
            <ExpertStatCards summary={list.data?.summary} />

            {notice && (
                <Alert>
                    <CircleCheck aria-hidden />
                    <AlertTitle className="pr-8">{notice}</AlertTitle>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute top-2 right-2"
                        aria-label="Tutup pemberitahuan"
                        onClick={() => setNotice(null)}
                    >
                        <X aria-hidden />
                    </Button>
                </Alert>
            )}

            <Card>
                <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <Users className="size-5" aria-hidden />
                        </span>
                        <div className="space-y-0.5">
                            <CardTitle className="text-base">Daftar tim & pakar</CardTitle>
                            <CardDescription>{description()}</CardDescription>
                        </div>
                    </div>
                    <CardAction className="flex gap-2">
                        <Button variant="outline" onClick={() => list.refetch()} disabled={list.isFetching}>
                            <RefreshCw
                                className={list.isFetching ? "animate-spin" : undefined}
                                data-icon="inline-start"
                                aria-hidden
                            />
                            Refresh
                        </Button>
                        <Button onClick={() => setFormTarget("new")}>
                            <Plus data-icon="inline-start" aria-hidden />
                            Tambah anggota
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <ExpertToolbar
                        search={search}
                        isActive={isActive}
                        onSearchChange={handleSearchChange}
                        onStatusChange={handleStatusChange}
                    />
                </CardContent>

                <CardContent className="px-0">
                    {list.isError ? (
                        <div className="px-(--card-spacing)">
                            <Alert variant="destructive">
                                <CircleAlert aria-hidden />
                                <AlertTitle>Data tim gagal dimuat</AlertTitle>
                                <AlertDescription>{list.error.message}</AlertDescription>
                            </Alert>
                        </div>
                    ) : (
                        <ExpertTable
                            items={list.isPending ? undefined : list.data.items}
                            stale={list.isPlaceholderData}
                            emptyMessage={
                                isFiltered
                                    ? "Tidak ada anggota yang cocok dengan filter."
                                    : "Belum ada anggota tim. Klik \"Tambah anggota\" untuk membuat yang pertama."
                            }
                            onEdit={setFormTarget}
                            onDelete={setDeleteTarget}
                        />
                    )}
                </CardContent>

                {list.data && (
                    <CardFooter>
                        <AdminTablePagination
                            meta={list.data.meta}
                            itemLabel="anggota"
                            disabled={list.isPlaceholderData}
                            onPageChange={setPage}
                        />
                    </CardFooter>
                )}
            </Card>

            {formTarget && (
                <ExpertFormSheet
                    key={formTarget === "new" ? "new" : formTarget.id}
                    target={formTarget}
                    onClose={() => setFormTarget(null)}
                    onSaved={handleSaved}
                />
            )}

            {deleteTarget && (
                <DeleteExpertDialog
                    key={deleteTarget.id}
                    item={deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    onDeleted={handleDeleted}
                />
            )}
        </div>
    );
}
