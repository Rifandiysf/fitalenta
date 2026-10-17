"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/auth-service";

/** Setelah reset berhasil, user diarahkan ke login untuk masuk dengan password baru. */
export function useResetPassword() {
    const router = useRouter();

    return useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            router.push("/login?reset=1");
        },
    });
}
