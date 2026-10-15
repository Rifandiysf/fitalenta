"use client";

import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { useDeleteEditorExpert } from "@/hooks/editor/use-editor-team-members";
import type { EditorExpert } from "@/types/editor/editor-team-member";

type DeleteExpertDialogProps = {
    item: EditorExpert;
    onClose: () => void;
    onDeleted: (item: EditorExpert) => void;
};

export function DeleteExpertDialog({ item, onClose, onDeleted }: DeleteExpertDialogProps) {
    const remove = useDeleteEditorExpert();

    return (
        <ConfirmDeleteDialog
            title="Hapus anggota tim ini?"
            description={
                <>
                    <strong className="text-foreground">{item.name}</strong> beserta fotonya akan dihapus permanen dan
                    hilang dari website. Untuk menyembunyikan sementara, ubah statusnya menjadi nonaktif. Tindakan ini
                    tidak dapat dibatalkan.
                </>
            }
            pending={remove.isPending}
            errorMessage={remove.isError ? remove.error.message : undefined}
            onConfirm={() => remove.mutate(item.id, { onSuccess: () => onDeleted(item) })}
            onClose={onClose}
        />
    );
}
