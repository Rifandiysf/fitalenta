import { Navbar } from "@/components/common/navbar";
import type { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-full flex-col">
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    );
}