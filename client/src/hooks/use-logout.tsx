"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { logout } from "@/services/auth-service";

export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const clearUser = useAuthStore((state) => state.clearUser);

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            clearUser();
            queryClient.clear();
            router.push("/login");
            router.refresh();
        },
    });
}