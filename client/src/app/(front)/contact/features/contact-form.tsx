"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

const field =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-[#0e4a8f] focus:ring-2 focus:ring-[#0e4a8f]/20";

export function ContactForm() {

    return (
        <form className="space-y-5" noValidate={false}>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <Label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">Name</Label>
                    <Input id="name" name="name" required minLength={2} autoComplete="name" className={field} />
                </div>
                <div>
                    <Label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">Email</Label>
                    <Input id="email" name="email" type="email" required autoComplete="email" className={field} />
                </div>
            </div>
            <div>
                <Label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-slate-700">Subject</Label>
                <Input id="subject" name="subject" required className={field} />
            </div>
            <div>
                <Label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-slate-700">Message</Label>
                <textarea id="message" name="message" required minLength={10} rows={6} className={`${field} resize-y`} />
            </div>

            <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0a2a57] px-6 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                Send Message <Send size={16} aria-hidden />
            </button>

            {/* <div aria-live="polite" className="min-h-6 text-sm">
                {status === "success" && <p className="font-medium text-emerald-700">Terima kasih! Pesan Anda sudah terkirim.</p>}
                {status === "error" && <p className="font-medium text-red-600">{error}</p>}
            </div> */}
        </form>
    );
}