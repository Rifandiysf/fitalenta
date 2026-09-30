"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactFieldErrors } from "@/lib/validations/contact";
import { sendContact, toContactError } from "@/lib/services/contact-service";

const field =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-[#0e4a8f] focus:ring-2 focus:ring-[#0e4a8f]/20";
const label = "mb-1.5 block text-sm font-semibold text-slate-700";
const invalid = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

function FieldError({ name, message }: { name: string; message?: string }) {
    if (!message) return null;
    return (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600">
            {message}
        </p>
    );
}

export function ContactForm() {
    const [errors, setErrors] = useState<ContactFieldErrors>({});
    const [formError, setFormError] = useState<string>();

    const mutation = useMutation({
        mutationFn: sendContact,
        onError: (err) => {
            const e = toContactError(err);
            setErrors(e.fieldErrors);
            setFormError(e.message);
        },
    });

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (mutation.isPending) return;

        const form = e.currentTarget;
        const raw = Object.fromEntries(new FormData(form));

        if (raw.website) {
            form.reset();
            return;
        }

        const parsed = contactSchema.safeParse(raw);
        if (!parsed.success) {
            const fe = z.flattenError(parsed.error).fieldErrors;
            setErrors(
                Object.fromEntries(
                    Object.entries(fe).map(([k, v]) => [k, v?.[0]]),
                ) as ContactFieldErrors,
            );
            setFormError(undefined);
            return;
        }

        setErrors({});
        setFormError(undefined);
        mutation.mutate(parsed.data, { onSuccess: () => form.reset() });
    }

    const err = (name: keyof ContactFieldErrors) => errors[name];
    const aria = (name: keyof ContactFieldErrors) => ({
        "aria-invalid": err(name) ? true : undefined,
        "aria-describedby": err(name) ? `${name}-error` : undefined,
    });

    return (
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <Label htmlFor="name" className={label}>Name</Label>
                    <Input id="name" name="name" required autoComplete="name" className={cn(field, err("name") && invalid)} {...aria("name")} />
                    <FieldError name="name" message={errors.name} />
                </div>
                <div>
                    <Label htmlFor="email" className={label}>Email</Label>
                    <Input id="email" name="email" type="email" required autoComplete="email" className={cn(field, err("email") && invalid)} {...aria("email")} />
                    <FieldError name="email" message={errors.email} />
                </div>
            </div>

            <div>
                <Label htmlFor="subject" className={label}>Subject</Label>
                <Input id="subject" name="subject" required className={cn(field, err("subject") && invalid)} {...aria("subject")} />
                <FieldError name="subject" message={errors.subject} />
            </div>

            <div>
                <Label htmlFor="message" className={label}>Message</Label>
                <textarea id="message" name="message" required rows={6} className={cn(field, "resize-y", err("message") && invalid)} {...aria("message")} />
                <FieldError name="message" message={errors.message} />
            </div>

            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0a2a57] px-6 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {mutation.isPending ? (
                    <>Sending... <Loader2 size={16} className="animate-spin" aria-hidden /></>
                ) : (
                    <>Send Message <Send size={16} aria-hidden /></>
                )}
            </button>

            <div aria-live="polite" className="min-h-6 text-sm">
                {mutation.isSuccess && (
                    <p className="font-medium text-emerald-700">
                        Terima kasih! Pesan Anda sudah terkirim.
                    </p>
                )}
                {mutation.isError && formError && (
                    <p className="font-medium text-red-600">{formError}</p>
                )}
            </div>
        </form>
    );
}