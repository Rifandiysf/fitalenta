"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";

const LINKS = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/programs", label: "Program" },
    { href: "/pendaftaran", label: "Pendaftaran" },
    { href: "/pembayaran", label: "Pembayaran" },
];

function isActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function UserNavbar() {
    const pathname = usePathname();
    const { data } = useCurrentUser();

    return (
        <header className="sticky top-0 z-50 border-b border-[#10302B]/10 bg-primary text-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 md:px-8">
                <Logo width={108} height={50} />

                <div className="flex items-center gap-2">
                    <nav
                        aria-label="Menu pengguna"
                        className="hidden items-center gap-1 lg:flex"
                    >
                        {LINKS.map(({ href, label }) => {
                            const active = isActive(pathname, href);

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                        active
                                            ? "bg-muted-foreground/30 text-secondary"
                                            : "text-white hover:bg-muted-foreground/30"
                                    )}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={cn(
                                "ml-2 flex items-center gap-2 rounded-md px-2 py-1.5",
                                "text-sm font-medium text-white",
                                "outline-none transition-colors",
                                "hover:bg-muted-foreground/30",
                                "focus-visible:ring-2 focus-visible:ring-primary"
                            )}
                        >
                            <Avatar className="size-8">
                                <AvatarFallback className="bg-white text-primary">
                                    <User className="size-4" />
                                </AvatarFallback>
                            </Avatar>

                            <span className="hidden max-w-32 truncate sm:inline">
                                {data?.name}
                            </span>

                            <ChevronDown
                                className="size-4"
                                aria-hidden
                            />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-52"
                        >
                            <DropdownMenuLabel className="truncate">
                                {data?.name}
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            {LINKS.map(({ href, label }) => (
                                <DropdownMenuItem
                                    key={href}
                                    asChild
                                    className="lg:hidden"
                                >
                                    <Link href={href}>
                                        {label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}

                            <DropdownMenuSeparator className="lg:hidden" />

                            <DropdownMenuItem variant="destructive">
                                <LogOut aria-hidden />
                                Keluar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}