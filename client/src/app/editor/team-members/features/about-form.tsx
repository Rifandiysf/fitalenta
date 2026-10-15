"use client";

import { useState, type FormEvent } from "react";
import { CircleAlert, Loader2, Save } from "lucide-react";
import { FormCard } from "@/components/editor/form-card";
import { TextareaField, TextField } from "@/components/editor/form-fields";
import { ListField, ListRowField } from "@/components/editor/list-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { collectListErrors } from "@/helpers/editor/editor-list-helper";
import { toAboutFormValues } from "@/helpers/editor/editor-team-member-helper";
import { focusFirstInvalidField } from "@/helpers/registration-helper";
import { useCmsForm } from "@/hooks/editor/use-cms-form";
import { useSaveEditorAbout } from "@/hooks/editor/use-editor-team-members";
import { collectErrors } from "@/schemas/editor/editor-common";
import { buildAboutSchema, type AboutFormValues } from "@/schemas/editor/editor-team-member";
import type { EditorAbout, EditorAboutJourney, EditorAboutValue } from "@/types/editor/editor-team-member";

const LIST_FIELDS = ["paragraphs", "missions", "journey", "values"] as const;

type AboutFormProps = {
    about: EditorAbout;
    onSaved: () => void;
};

export function AboutForm({ about, onSaved }: AboutFormProps) {
    const save = useSaveEditorAbout();
    const form = useCmsForm<AboutFormValues>("about", toAboutFormValues(about));

    const [paragraphs, setParagraphs] = useState<string[]>(() => about.story.paragraphs);
    const [missions, setMissions] = useState<string[]>(() => about.missions);
    const [journey, setJourney] = useState<EditorAboutJourney[]>(() => about.journey);
    const [values, setValues] = useState<EditorAboutValue[]>(() => about.values);
    const [listErrors, setListErrors] = useState<Record<string, Record<string, string>>>({});

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const result = buildAboutSchema().safeParse({ ...form.values, paragraphs, missions, journey, values });
        if (!result.success) {
            const { issues } = result.error;
            form.setErrors(
                collectErrors<keyof AboutFormValues>(
                    issues.filter((issue) => !(LIST_FIELDS as readonly PropertyKey[]).includes(issue.path[0])),
                ),
            );
            setListErrors(Object.fromEntries(LIST_FIELDS.map((field) => [field, collectListErrors(issues, field)])));
            focusFirstInvalidField();
            return;
        }
        setListErrors({});

        const data = result.data;
        save.mutate(
            {
                hero: { title: data.heroTitle, subtitle: data.heroSubtitle },
                story: { paragraphs: data.paragraphs },
                vision: data.vision,
                missions: data.missions,
                journey: data.journey,
                values: data.values,
            },
            { onSuccess: onSaved },
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid items-start gap-6 xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2">
                    <FormCard title="Hero" description="Judul dan subjudul di bagian atas halaman About.">
                        <TextField form={form} name="heroTitle" label="Judul hero" required />
                        <TextareaField form={form} name="heroSubtitle" label="Subjudul hero" required rows={3} />
                    </FormCard>

                    <FormCard title="Cerita perusahaan" description="Paragraf cerita yang tampil di halaman About.">
                        <ListField<string>
                            id="about-paragraphs"
                            label="Paragraf cerita"
                            itemLabel="Paragraf"
                            items={paragraphs}
                            errors={listErrors.paragraphs}
                            createItem={() => ""}
                            onChange={setParagraphs}
                            renderItem={({ item, rowId, setItem, errorFor }) => (
                                <ListRowField
                                    id={rowId}
                                    label="Isi paragraf"
                                    required
                                    multiline
                                    rows={5}
                                    value={item}
                                    error={errorFor()}
                                    onChange={setItem}
                                />
                            )}
                        />
                    </FormCard>

                    <FormCard title="Perjalanan" description="Tonggak waktu perusahaan, diurutkan seperti di website.">
                        <ListField<EditorAboutJourney>
                            id="about-journey"
                            label="Tonggak perjalanan"
                            itemLabel="Tonggak"
                            items={journey}
                            errors={listErrors.journey}
                            createItem={() => ({ year: "", text: "" })}
                            onChange={setJourney}
                            renderItem={({ item, rowId, setItem, errorFor }) => (
                                <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
                                    <ListRowField
                                        id={`${rowId}-year`}
                                        label="Tahun"
                                        required
                                        placeholder="2024"
                                        value={item.year}
                                        error={errorFor("year")}
                                        onChange={(year) => setItem({ ...item, year })}
                                    />
                                    <ListRowField
                                        id={`${rowId}-text`}
                                        label="Keterangan"
                                        required
                                        multiline
                                        rows={2}
                                        value={item.text}
                                        error={errorFor("text")}
                                        onChange={(text) => setItem({ ...item, text })}
                                    />
                                </div>
                            )}
                        />
                    </FormCard>

                    <FormCard title="Nilai perusahaan" description="Nilai-nilai yang tampil dengan ikon di halaman About.">
                        <ListField<EditorAboutValue>
                            id="about-values"
                            label="Daftar nilai"
                            itemLabel="Nilai"
                            items={values}
                            errors={listErrors.values}
                            createItem={() => ({ icon: "", title: "", desc: "" })}
                            onChange={setValues}
                            renderItem={({ item, rowId, setItem, errorFor }) => (
                                <>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <ListRowField
                                            id={`${rowId}-title`}
                                            label="Judul"
                                            required
                                            value={item.title}
                                            error={errorFor("title")}
                                            onChange={(title) => setItem({ ...item, title })}
                                        />
                                        <ListRowField
                                            id={`${rowId}-icon`}
                                            label="Ikon"
                                            required
                                            placeholder="mis. target"
                                            hint="Nama ikon Lucide."
                                            value={item.icon}
                                            error={errorFor("icon")}
                                            onChange={(icon) => setItem({ ...item, icon })}
                                        />
                                    </div>
                                    <ListRowField
                                        id={`${rowId}-desc`}
                                        label="Deskripsi"
                                        required
                                        multiline
                                        rows={3}
                                        value={item.desc}
                                        error={errorFor("desc")}
                                        onChange={(desc) => setItem({ ...item, desc })}
                                    />
                                </>
                            )}
                        />
                    </FormCard>
                </div>

                <div className="space-y-6">
                    <FormCard title="Visi & misi" description="Arah dan tujuan perusahaan.">
                        <TextareaField form={form} name="vision" label="Visi" required rows={5} />
                        <ListField<string>
                            id="about-missions"
                            label="Misi"
                            itemLabel="Misi"
                            items={missions}
                            errors={listErrors.missions}
                            createItem={() => ""}
                            onChange={setMissions}
                            renderItem={({ item, rowId, setItem, errorFor }) => (
                                <ListRowField
                                    id={rowId}
                                    label="Isi misi"
                                    required
                                    multiline
                                    rows={3}
                                    value={item}
                                    error={errorFor()}
                                    onChange={setItem}
                                />
                            )}
                        />
                    </FormCard>
                </div>
            </div>

            {save.isError && (
                <Alert variant="destructive">
                    <CircleAlert aria-hidden />
                    <AlertTitle>Gagal menyimpan konten About</AlertTitle>
                    <AlertDescription>{save.error.message}</AlertDescription>
                </Alert>
            )}

            <div className="sticky bottom-0 z-20 -mx-4 flex items-center justify-end gap-2 border-t bg-background/90 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
                <Button type="submit" disabled={save.isPending}>
                    {save.isPending ? (
                        <Loader2 className="animate-spin" data-icon="inline-start" aria-hidden />
                    ) : (
                        <Save data-icon="inline-start" aria-hidden />
                    )}
                    {save.isPending ? "Menyimpan..." : "Simpan perubahan"}
                </Button>
            </div>
        </form>
    );
}
