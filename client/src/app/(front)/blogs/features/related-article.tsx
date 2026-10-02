import Image from "next/image";
import Link from "next/link";
import type { ArticleItem } from "@/types/article";
import { ImageUrl } from "@/lib/services/event-service";

export function RelatedArticles({ articles }: { articles: ArticleItem[] }) {
    return (
        <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Explore more</p>
            <h2 className="mt-1 text-xl font-bold text-primary">Related Articles</h2>
            <div className="mt-2 h-1 w-10 rounded-full bg-secondary" />

            <ul className="mt-6 space-y-5">
                {articles.map((a) => {
                    const src = ImageUrl(a.image);
                    return (
                        <li key={a.id}>
                            <Link href={`/blog/${a.slug}`} className="group flex items-start gap-4">
                                <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                    {src && <Image src={src} alt="" fill sizes="64px" className="object-cover" />}
                                </span>
                                <span className="text-sm font-semibold leading-snug text-primary group-hover:underline">
                                    {a.title}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}