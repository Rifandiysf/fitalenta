import Image from "next/image";
import Link from "next/link";
import type { ArticleItem } from "@/types/article";
import { imageUrl } from "@/lib/utils";

export function RelatedArticles({ articles }: { articles: ArticleItem[] }) {
    return (
        <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Explore more</p>
            <h2 className="mt-1 text-xl font-bold text-primary">Related Articles</h2>
            <div className="mt-2 h-1 w-10 rounded-full bg-secondary" />

            <ul className="mt-6 space-y-5">
                {articles.map((article) => {
                    const src = imageUrl(article.image);
                    return (
                        <li key={article.id}>
                            <Link href={`/articles/${article.slug}`} className="group flex items-start gap-4">
                                <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                    {src && <Image src={src} alt="" fill sizes="64px" className="object-cover" />}
                                </span>
                                <span className="text-sm font-semibold leading-snug text-primary group-hover:underline">
                                    {article.title}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}