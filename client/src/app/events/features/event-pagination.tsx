import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Pagination } from "@/types/event";

function href(page: number, search?: string) {
    const qs = new URLSearchParams();
    if (search) qs.set("search", search);
    if (page > 1) qs.set("page", String(page));
    const s = qs.toString();
    return s ? `/events?${s}` : "/events";
}

export function EventPagination({
    pagination,
    search,
}: {
    pagination: Pagination;
    search?: string;
}) {
    const { page, perPage, total, totalPages } = pagination;
    if (total === 0) return null;

    const from = (page - 1) * perPage + 1;
    const to = Math.min(page * perPage, total);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const item = "flex h-10 min-w-10 items-center justify-center px-3 text-sm transition";

    return (
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">
                Showing {from} to {to} of {total} results
            </p>
            {totalPages > 1 && (
                <nav aria-label="Pagination" className="flex overflow-hidden rounded-lg bg-primary text-white">
                    {page > 1 ? (
                        <Link href={href(page - 1, search)} aria-label="Previous page" className={cn(item, "hover:bg-white/10")}>
                            <ChevronLeft className="size-4" />
                        </Link>
                    ) : (
                        <span className={cn(item, "opacity-40")}><ChevronLeft className="size-4" /></span>
                    )}
                    {pages.map((p) => (
                        <Link
                            key={p}
                            href={href(p, search)}
                            aria-current={p === page ? "page" : undefined}
                            className={cn(item, p === page ? "bg-white/20 font-semibold" : "hover:bg-white/10")}
                        >
                            {p}
                        </Link>
                    ))}
                    {page < totalPages ? (
                        <Link href={href(page + 1, search)} aria-label="Next page" className={cn(item, "hover:bg-white/10")}>
                            <ChevronRight className="size-4" />
                        </Link>
                    ) : (
                        <span className={cn(item, "opacity-40")}><ChevronRight className="size-4" /></span>
                    )}
                </nav>
            )}
        </div>
    );
}