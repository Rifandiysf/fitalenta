"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ADMIN_ROLES } from "@/constants/admin-nav";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AdminHeader } from "./admin-header";
import { AdminSidebarContent } from "./admin-sidebar";

function ShellSkeleton() {
    return (
        <div aria-busy="true" aria-label="Memuat panel admin" className="flex min-h-svh">
            <Skeleton className="hidden w-64 shrink-0 rounded-none lg:block" />
            <div className="flex-1 space-y-4 p-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <Skeleton key={index} className="h-36 rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}

/** Kerangka panel admin: sidebar, header, dan penjaga akses berdasarkan role. */
export function AdminShell({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { data: user, isError } = useCurrentUser();
    const allowed = user ? ADMIN_ROLES.includes(user.role) : false;

    useEffect(() => {
        if (isError) router.replace("/login?next=/admin");
        else if (user && !allowed) router.replace("/dashboard");
    }, [isError, user, allowed, router]);

    if (!user || !allowed) return <ShellSkeleton />;

    return (
        <div className="flex min-h-svh bg-muted/30">
            <aside className="sticky top-0 hidden h-svh w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground lg:block">
                <AdminSidebarContent user={user} />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <AdminHeader user={user} />
                <div className="flex-1 p-4 md:p-6">{children}</div>
            </div>
        </div>
    );
}
