import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight, User } from "lucide-react";
import type { ArticleItem } from "@/types/article";
import { formatDate, stripHtml } from "@/lib/utils";
import { ImageUrl } from "@/lib/services/event-service";

export function BlogCard({ article }: { article: ArticleItem }) {
    const src = ImageUrl(article.image);
    const href = `/blogs/${article.slug}`;

    return (
        <article className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
            <Link href={href} className="relative block aspect-video overflow-hidden bg-slate-100">
                {src && (
                    <Image
                        src={src}
                        alt={article.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                    />
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
                    {article.category?.name ?? "Blog"}
                </span>
            </Link>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="line-clamp-3 text-lg font-bold leading-snug text-brand-navy">
                    <Link href={href}>{article.title}</Link>
                </h3>
                <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">
                    {stripHtml(article.excerpt)}
                </p>
                <ul className="mt-1 space-y-2 text-sm text-slate-500">
                    <li className="flex items-center gap-2">
                        <User className="size-4 text-brand-blue" />
                        {article.author?.name ?? "Admin"}
                    </li>
                    <li className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-brand-blue" />
                        {formatDate(article.publishedAt)}
                    </li>
                </ul>
                <Link
                    href={href}
                    className="mt-auto inline-flex w-fit items-center gap-1 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                >
                    Read More
                    <ChevronRight className="size-4" />
                </Link>
            </div>
        </article>
    );
}