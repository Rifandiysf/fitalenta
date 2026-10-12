"use client";

import type { ReactNode } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ConfirmDeleteDialogProps = {
    title: string;
    description: ReactNode;
    pending: boolean;
    errorMessage?: string;
    onConfirm: () => void;
    onClose: () => void;
};

export function ConfirmDeleteDialog({
    title,
    description,
    pending,
    errorMessage,
    onConfirm,
    onClose,
}: ConfirmDeleteDialogProps) {
    return (
        <AlertDialog open onOpenChange={(open) => !open && !pending && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                {errorMessage && (
                    <Alert variant="destructive">
                        <CircleAlert aria-hidden />
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={pending}
                        onClick={(event) => {
                            event.preventDefault();
                            onConfirm();
                        }}
                    >
                        {pending && <Loader2 className="animate-spin" aria-hidden />}
                        {pending ? "Menghapus..." : "Hapus"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
