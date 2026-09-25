"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { login } from "@/lib/apis/auth/auth-api";

export function useLogin() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: login,
        onSuccess: ({ user }) => {
            setUser(user);
            router.push("/dashboard");
            router.refresh();
        },
    });
}