"use client";

import { useState, type FormEvent } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import { CheckboxField, NumberField, TextareaField, TextField } from "@/components/editor/form-fields";
import { ImageUploadField } from "@/components/editor/image-upload-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { EXPERT_LIMITS } from "@/constants/editor/editor-team-member-constant";
import { createEmptyExpertForm, toExpertFormValues } from "@/helpers/editor/editor-team-member-helper";
import { focusFirstInvalidField } from "@/helpers/registration-helper";
import { useCmsForm } from "@/hooks/editor/use-cms-form";
import { useSaveEditorExpert } from "@/hooks/editor/use-editor-team-members";
import { collectErrors } from "@/schemas/editor/editor-common";
import { buildExpertSchema, type ExpertFormValues } from "@/schemas/editor/editor-team-member";
import type { EditorExpert } from "@/types/editor/editor-team-member";

type ExpertFormSheetProps = {
    target: EditorExpert | "new";
    onClose: () => void;
    onSaved: (message: string) => void;
};

export function ExpertFormSheet({ target, onClose, onSaved }: ExpertFormSheetProps) {
    const editing = target === "new" ? null : target;
    const save = useSaveEditorExpert();
    const form = useCmsForm<ExpertFormValues>("expert", editing ? toExpertFormValues(editing) : createEmptyExpertForm());

    const [image, setImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string>();

    const canRemoveImage = Boolean(editing?.image) && !image;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const result = buildExpertSchema().safeParse(form.values);
        if (!result.success) {
            form.setErrors(collectErrors<keyof ExpertFormValues>(result.error.issues));
            focusFirstInvalidField();
            return;
        }

        save.mutate(
            { id: editing?.id, payload: { ...result.data, removeImage: canRemoveImage && result.data.removeImage, image } },
            {
                onSuccess: () =>
                    onSaved(editing ? "Anggota tim berhasil diperbarui." : "Anggota tim baru berhasil ditambahkan."),
            },
        );
    }

    return (
        <Sheet open onOpenChange={(open) => !open && !save.isPending && onClose()}>
            <SheetContent className="gap-0 sm:max-w-lg">
                <SheetHeader className="border-b">
                    <SheetTitle>{editing ? "Edit anggota tim" : "Tambah anggota tim"}</SheetTitle>
                    <SheetDescription>
                        {editing ? "Perbarui profil anggota tim." : "Tambahkan anggota tim atau pakar baru ke website."}
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                        <ImageUploadField
                            id="expert-image"
                            label="Foto"
                            hint={editing ? "Opsional. Kosongkan jika tidak ingin mengganti foto." : undefined}
                            currentImage={form.values.removeImage ? null : editing?.image}
                            file={image}
                            error={imageError}
                            aspectClassName="aspect-square max-w-48"
                            onChange={(file) => {
                                setImage(file);
                                setImageError(undefined);
                            }}
                            onError={setImageError}
                        />
                        {canRemoveImage && (
                            <CheckboxField
                                form={form}
                                name="removeImage"
                                label="Hapus foto saat ini"
                                description="Foto akan dihapus dari server saat perubahan disimpan."
                            />
                        )}

                        <TextField form={form} name="name" label="Nama" required />
                        <TextField form={form} name="position" label="Jabatan" required />
                        <TextareaField
                            form={form}
                            name="bio"
                            label="Bio"
                            rows={5}
                            hint={`Opsional. Maksimal ${EXPERT_LIMITS.bio.toLocaleString("id-ID")} karakter.`}
                        />
                        <NumberField
                            form={form}
                            name="order"
                            label="Urutan"
                            required
                            hint="Semakin kecil angkanya, semakin awal tampil di website."
                        />
                        <CheckboxField
                            form={form}
                            name="isActive"
                            label="Tampilkan di website"
                            description="Anggota nonaktif disembunyikan dari halaman publik tetapi datanya tetap tersimpan."
                        />

                        {save.isError && (
                            <Alert variant="destructive">
                                <CircleAlert aria-hidden />
                                <AlertTitle>Gagal menyimpan anggota tim</AlertTitle>
                                <AlertDescription>{save.error.message}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <SheetFooter className="border-t sm:flex-row sm:justify-end">
                        <Button type="button" variant="outline" onClick={onClose} disabled={save.isPending}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={save.isPending}>
                            {save.isPending && <Loader2 className="animate-spin" data-icon="inline-start" aria-hidden />}
                            {save.isPending ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
