"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditorAbout } from "@/hooks/editor/use-editor-team-members";
import { AboutForm } from "./about-form";

function FormSkeleton() {
    return (
        <div aria-busy="true" aria-label="Memuat konten About" className="grid gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-2">
                <Skeleton className="h-56 rounded-xl" />
                <Skeleton className="h-80 rounded-xl" />
            </div>
            <Skeleton className="h-96 rounded-xl" />
        </div>
    );
}

export function AboutSection() {
    const about = useEditorAbout();
    const [notice, setNotice] = useState<string | null>(null);

    return (
        <div role="tabpanel" id="team-panel-about" aria-labelledby="team-tab-about" className="space-y-6">
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

            {about.isError ? (
                <Alert variant="destructive">
                    <CircleAlert aria-hidden />
                    <AlertTitle>Konten About gagal dimuat</AlertTitle>
                    <AlertDescription>{about.error.message}</AlertDescription>
                </Alert>
            ) : about.data ? (
                <AboutForm
                    key={about.data.updatedAt ?? "empty"}
                    about={about.data}
                    onSaved={() => setNotice("Konten halaman About berhasil disimpan.")}
                />
            ) : (
                <FormSkeleton />
            )}
        </div>
    );
}
