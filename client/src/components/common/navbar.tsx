"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { authLinks, navItems } from "@/constants/site-config";

function isActive(pathname: string, href: string) {
    return href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[#10302B]/10 bg-primary text-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 md:px-8">
                <Logo width={108} height={50}/>

                {/* Desktop */}
                <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => {
                        const active = isActive(pathname, item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active
                                    ? "bg-muted-foreground/30 text-secondary"
                                    : "text-white hover:bg-muted-foreground/30"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    <Button
                        asChild
                        variant="ghost"
                        className="font-medium hover:bg-muted-foreground/30 hover:text-white"
                    >
                        <Link href={authLinks.login.href}>{authLinks.login.label}</Link>
                    </Button>
                    <Button
                        asChild
                        className="bg-white text-black font-semibold hover:bg-secondary focus-visible:ring-primary"
                    >
                        <Link href={authLinks.register.href}>
                            {authLinks.register.label}
                        </Link>
                    </Button>
                </div>

                {/* Mobile */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" aria-hidden />
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="flex w-[85vw] max-w-sm flex-col gap-0 p-6 border-none bg-primary text-white"
                    >
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <SheetDescription className="sr-only">
                            Site navigation
                        </SheetDescription>

                        <nav aria-label="Mobile" className="mt-8 flex-1">
                            <ul className="space-y-1">
                                {navItems.map((item) => {
                                    const active = isActive(pathname, item.href);
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                aria-current={active ? "page" : undefined}
                                                onClick={() => setOpen(false)}
                                                className={`block rounded-md px-3 py-3 text-lg font-medium ${active
                                                        ? "bg-muted-foreground/30 text-secondary"
                                                        : "text-white hover:bg-muted-foreground/30"
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="grid gap-3 border-t border-[#10302B]/10 pt-6">
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-[#10302B]/30 bg-transparent font-semibold"
                                onClick={() => setOpen(false)}
                            >
                                <Link href={authLinks.login.href}>{authLinks.login.label}</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                className="bg-white font-semibold text-black hover:bg-secondary"
                                onClick={() => setOpen(false)}
                            >
                                <Link href={authLinks.register.href}>
                                    {authLinks.register.label}
                                </Link>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}