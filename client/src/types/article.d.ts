import { Pagination } from "./pagination";

export type ArticleCategory = {
    id: number;
    name: string;
};

export type ArticleAuthor = {
    id: number;
    name: string;
};

export type ArticleItem = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string | null;
    isFeatured: boolean;
    categoryId?: number | null;
    category?: ArticleCategory | null;
    author?: ArticleAuthor | null;
    publishedAt: string;
    views: number;
    createdAt?: string;
};

export type ArticlesListData = {
    articles: ArticleItem[];
    pagination: Pagination;
};

export type ArticleDetailData = {
    article: ArticleItem;
    relatedArticles: ArticleItem[];
};
