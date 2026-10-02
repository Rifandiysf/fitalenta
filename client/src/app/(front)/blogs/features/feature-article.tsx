import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ArticleItem } from "@/types/article";
import { imageUrl, stripHtml } from "@/lib/utils";

export function FeaturedArticle({ article }: { article: ArticleItem }) {
    const src = imageUrl(article.image);

    return (
        <section className="bg-white py-12">
            <div className="mx-auto max-w-6xl px-4">
                <p className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-primary">
                    <span className="h-1 w-10 rounded-full bg-secondary" />
                    Featured article
                </p>
                <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 md:grid-cols-2">
                    <div className="relative aspect-square bg-slate-100">
                        {src && (
                            <Image
                                src={src}
                                alt={article.title}
                                fill
                                priority
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover"
                            />
                        )}
                    </div>
                    <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
                        <h2 className="text-3xl font-bold leading-tight text-primary">
                            {article.title}
                        </h2>
                        <p className="leading-relaxed text-slate-600">{stripHtml(article.excerpt)}</p>
                        <Link
                            href={`/blog/${article.slug}`}
                            className="inline-flex w-fit items-center gap-1 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
                        >
                            Read More
                            <ChevronRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}