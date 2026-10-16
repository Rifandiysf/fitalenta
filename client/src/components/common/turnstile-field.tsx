"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_ENABLED, TURNSTILE_MISCONFIGURED, TURNSTILE_SITE_KEY } from "@/constants/auth-constant";
import type { TurnstileController } from "@/hooks/use-turnstile";

export function TurnstileField({ controller }: { controller: TurnstileController }) {
    if (TURNSTILE_MISCONFIGURED) {
        return (
            <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                Verifikasi keamanan belum dikonfigurasi. Hubungi administrator.
            </p>
        );
    }

    if (!TURNSTILE_ENABLED) return null;

    return (
        <div className="space-y-2">
            <div className="min-h-16.25">
                <Turnstile
                    key={controller.widgetKey}
                    siteKey={TURNSTILE_SITE_KEY}
                    options={{ theme: "auto", size: "flexible", language: "id" }}
                    onSuccess={controller.onSuccess}
                    onExpire={controller.onExpire}
                    onError={controller.onError}
                    onTimeout={controller.onError}
                />
            </div>
            {controller.failed && (
                <p role="alert" className="text-sm text-destructive">
                    Verifikasi keamanan gagal dimuat. Periksa koneksi Anda atau muat ulang halaman.
                </p>
            )}
        </div>
    );
}
