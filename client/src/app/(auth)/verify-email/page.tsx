import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { VerifyEmailView } from "../features/verify-email-view";

export const metadata: Metadata = {
    title: "Verifikasi Email - FITALENTA",
    referrer: "no-referrer",
    robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ token?: string | string[] }> };

export default async function VerifyEmailPage({ searchParams }: Props) {
    const { token } = await searchParams;

    return (
        <main className="flex min-h-svh flex-col justify-center bg-background px-6 py-12 md:px-10">
            <div className="mx-auto w-full max-w-md">
                <Link
                    href="/"
                    className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    Kembali ke FITALENTA
                </Link>

                <div className="rounded-2xl border bg-card px-6 py-8 shadow-sm sm:px-8 sm:py-10">
                    <VerifyEmailView token={typeof token === "string" && token ? token : undefined} />
                </div>
            </div>
        </main>
    );
}
