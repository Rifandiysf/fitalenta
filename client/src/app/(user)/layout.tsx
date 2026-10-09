import type { ReactNode } from "react";
import { UserNavbar } from "@/components/common/user-navbar";
import { Footer } from "@/components/common/footer";

export default function UserLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-svh flex-col">
            <UserNavbar />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}