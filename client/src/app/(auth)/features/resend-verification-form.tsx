"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { TurnstileField } from "@/components/common/turnstile-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RESEND_COOLDOWN_SECONDS } from "@/constants/auth-constant";
import { useCooldown } from "@/hooks/use-cooldown";
import { useResendVerification } from "@/hooks/use-resend-verification";
import { useTurnstile } from "@/hooks/use-turnstile";
import { resendVerificationSchema } from "@/schemas/auth";

export function ResendVerificationForm() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string>();

    const { mutate, isPending, isSuccess, data, error } = useResendVerification();
    const turnstile = useTurnstile();
    const cooldown = useCooldown(RESEND_COOLDOWN_SECONDS);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!turnstile.ready || cooldown.remaining > 0) return;

        const result = resendVerificationSchema.safeParse({ email });
        if (!result.success) {
            setEmailError(result.error.issues[0]?.message);
            return;
        }

        mutate(
            { ...result.data, turnstileToken: turnstile.token },
            { onSuccess: cooldown.start, onSettled: turnstile.reset },
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
            <div className="space-y-2">
                <Label htmlFor="resend-email">Kirim ulang email verifikasi</Label>
                <div className="relative">
                    <Mail
                        aria-hidden
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        id="resend-email"
                        type="email"
                        autoComplete="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(undefined);
                        }}
                        aria-invalid={Boolean(emailError)}
                        aria-describedby={emailError ? "resend-email-error" : undefined}
                        className="h-12 pl-10"
                    />
                </div>
                {emailError && (
                    <p id="resend-email-error" className="text-sm text-destructive">
                        {emailError}
                    </p>
                )}
            </div>

            {isSuccess && (
                <p
                    role="status"
                    className="flex items-start gap-2 rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {data}
                </p>
            )}

            {error && (
                <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error.message}
                </p>
            )}

            <TurnstileField controller={turnstile} />

            <Button
                type="submit"
                disabled={isPending || !turnstile.ready || cooldown.remaining > 0}
                suppressHydrationWarning
                className="h-12 w-full bg-secondary text-base font-semibold text-secondary-foreground hover:bg-secondary/90"
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                        Mengirim...
                    </>
                ) : cooldown.remaining > 0 ? (
                    `Kirim ulang dalam ${cooldown.remaining} dtk`
                ) : (
                    <>
                        Kirim Email Verifikasi
                        <Send className="ml-2 h-4 w-4" aria-hidden />
                    </>
                )}
            </Button>
        </form>
    );
}
