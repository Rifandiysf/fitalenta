import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { GalleryItem } from "@/types/gallery";
import { imageUrl, timeAgo } from "@/lib/utils";

export function GalleryCard({ item }: { item: GalleryItem }) {
    const src = imageUrl(item.image);
    const date = item.eventDate ?? item.createdAt;
    const href = `/gallery/${item.id}`;

    return (
        <article className="group flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
            <Link href={href} className="relative block aspect-4/3 overflow-hidden bg-slate-100">
                {src && (
                    <Image
                        src={src}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                    />
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-snug text-primary">
                    <Link href={href}>{item.title}</Link>
                </h3>
                {date && (
                    <p className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays className="size-4 text-primary" />
                        {timeAgo(date)}
                    </p>
                )}
                <Link
                    href={href}
                    className="mt-auto flex items-center justify-between pt-2 text-sm font-semibold text-primary"
                >
                    View Gallery
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </Link>
            </div>
        </article>
    );
}