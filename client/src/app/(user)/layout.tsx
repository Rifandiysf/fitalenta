import type { ReactNode } from "react";
import { UserNavbar } from "@/components/common/user-navbar";

export default function UserLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-svh flex-col">
            <UserNavbar userName={"Rifandi Yusuf"} />
            <div className="flex-1">{children}</div>
        </div>
    );
}