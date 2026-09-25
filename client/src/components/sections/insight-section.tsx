import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Article, articles } from "@/constants/article-constant";

const HEADING_ID = "insights-heading";
const SIDE_ARTICLE_COUNT = 3;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
});

function articleHref(article: Article) {
    return `/insights/${article.slug}`;
}

function ArticleImage({
    article,
    sizes,
}: {
    article: Article;
    sizes: string;
}) {
    if (article.image) {
        return (
            <Image
                src={article.image}
                alt=""
                fill
                sizes={sizes}
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
            />
        );
    }

    // Placeholder: isi `image` di articles.ts untuk menggantinya dengan gambar asli.
    return (
        <div
            aria-hidden
            className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#7FB0A2] to-[#2F6F62]"
        >
            <FileText className="h-1/3 w-1/3 text-white/30" strokeWidth={1} />
        </div>
    );
}

function ArticleMeta({ article }: { article: Article }) {
    return (
        <p className="flex flex-wrap items-center gap-x-3 text-xs font-semibold tracking-[0.12em] text-[#2F6F62] sm:text-sm">
            <span className="uppercase">{article.category}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[#10302B]/30" />
            <time
                dateTime={article.date}
                className="font-medium tracking-normal text-[#10302B]/60"
            >
                {dateFormatter.format(new Date(article.date))}
            </time>
        </p>
    );
}

function FeaturedArticle({ article }: { article: Article }) {
    return (
        <article>
            <Link
                href={articleHref(article)}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl">
                    <ArticleImage
                        article={article}
                        sizes="(min-width: 1024px) 700px, 100vw"
                    />
                </div>

                <div className="mt-6">
                    <ArticleMeta article={article} />
                    <h3 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                        {article.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-[#10302B]/75 sm:text-lg">
                        {article.excerpt}
                    </p>
                </div>
            </Link>
        </article>
    );
}

function ArticleRow({ article }: { article: Article }) {
    return (
        <article className="border-t border-[#10302B]/15 first:border-t-0 first:pt-0">
            <Link
                href={articleHref(article)}
                className="group flex gap-5 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
                    <ArticleImage article={article} sizes="112px" />
                </div>

                <div className="min-w-0">
                    <ArticleMeta article={article} />
                    <h3 className="mt-2 text-balance text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-xl">
                        {article.title}
                    </h3>
                </div>
            </Link>
        </article>
    );
}

export function InsightsSection() {
    const [featured, ...rest] = articles;
    const sideArticles = rest.slice(0, SIDE_ARTICLE_COUNT);

    return (
        <section
            id="insights"
            aria-labelledby={HEADING_ID}
            className="bg-white text-[#10302B]"
        >
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 lg:py-28">
                <header className="max-w-3xl">
                    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#2F6F62] sm:text-sm">
                        <span aria-hidden className="h-2.5 w-2.5 bg-primary" />
                        FITALENTA INSIGHTS
                    </p>

                    <h2
                        id={HEADING_ID}
                        className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                    >
                        Ideas, Knowledge, and Opportunities.
                    </h2>

                    <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#10302B]/75 sm:text-lg">
                        Explore articles and information about career development,
                        business, education, human capital, and other topics relevant to our
                        community.
                    </p>
                </header>

                {featured && (
                    <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[7fr_5fr] lg:gap-16">
                        <FeaturedArticle article={featured} />

                        {sideArticles.length > 0 && (
                            <div className="lg:self-center">
                                {sideArticles.map((article) => (
                                    <ArticleRow key={article.slug} article={article} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <Button
                    asChild
                    size="lg"
                    className="mt-12 h-12 bg-primary px-7 text-base font-semibold text-white hover:bg-primary/80 focus-visible:ring-primary"
                >
                    <Link href="/insights">
                        View All Articles
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                </Button>
            </div>
        </section>
    );
}