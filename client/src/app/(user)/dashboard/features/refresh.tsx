"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RefreshButton() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    return (
        <Button
            variant="outline"
            disabled={pending}
            onClick={() => startTransition(() => router.refresh())}
            className="border-primary font-semibold text-primary"
        >
            <RefreshCw className={pending ? "animate-spin" : undefined} aria-hidden />
            {pending ? "Memuat..." : "Refresh"}
        </Button>
    );
}