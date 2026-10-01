import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";
import { imageUrl, isPastEvent, stripHtml, timeAgo } from "@/lib/utils";
import type { EventItem } from "@/types/event";

export function EventCard({ event }: { event: EventItem }) {
    const past = isPastEvent(event.eventDate);
    const src = imageUrl(event.image);

    return (
        <article className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
            <Link
                href={`/events/${event.slug}`}
                className="relative block aspect-video overflow-hidden bg-slate-100"
            >
                {src && (
                    <Image
                        src={src}
                        alt={event.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                    />
                )}
                {event.isFeatured && (
                    <span className="absolute left-3 top-3 rounded-full bg-brand-orange px-3 py-1 text-xs font-medium text-white">
                        Featured
                    </span>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-white">
                    {past ? "Past Event" : "Upcoming"}
                </span>
            </Link>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays className="size-4 text-brand-orange" />
                    {timeAgo(event.eventDate)}
                    {event.category && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                            {event.category.name}
                        </span>
                    )}
                </p>
                <h3 className="line-clamp-2 text-lg font-bold leading-snug text-primary">
                    <Link href={`/events/${event.slug}`}>{event.title}</Link>
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {stripHtml(event.description)}
                </p>
                <Link
                    href={`/events/${event.slug}`}
                    className="mt-auto flex items-center justify-center gap-1 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                    {past ? "View Recap" : "View Details"}
                    <ChevronRight className="size-4" />
                </Link>
            </div>
        </article>
    );
}