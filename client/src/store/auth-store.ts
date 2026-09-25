import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: string;
};

type AuthState = {
    user: AuthUser | null;
    setUser: (user: AuthUser) => void;
    clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: "fitalenta-auth-user",
        },
    ),
);