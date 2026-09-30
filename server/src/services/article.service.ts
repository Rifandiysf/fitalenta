import fs from "fs";
import path from "path";
import prisma from "../config/prisma";
import { slugify } from "../utils/slug";

async function generateUniqueSlug(title: string, excludeId?: number): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let counter = 2;

  while (
    await prisma.article.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
    })
  ) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}

interface PublicArticleQuery {
  search?: string;
  categoryId?: number;
  page?: number;
}

export async function getPublicArticles({ search, categoryId, page = 1 }: PublicArticleQuery) {
  const perPage = 7;
  const skip = (page - 1) * perPage;

  const where = {
    eventDate: { not: null, lte: new Date() },
    ...(categoryId ? { categoryId } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { content: { contains: search } },
            { excerpt: { contains: search } },
          ],
        }
      : {}),
  };

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: { category: true, author: { select: { id: true, name: true } } },
      orderBy: { eventDate: "desc" },
      skip,
      take: perPage,
    }),
    prisma.article.count({ where }),
  ]);

  return {
    articles,
    pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function getFeaturedArticles(limit = 3) {
  return prisma.article.findMany({
    where: { isFeatured: true, eventDate: { not: null, lte: new Date() } },
    orderBy: { eventDate: "desc" },
    take: limit,
    include: { category: true },
  });
}

export async function getArticleBySlug(slug: string, ipAddress: string, userAgent: string) {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true, author: { select: { id: true, name: true } } },
  });
  if (!article) throw new Error("ARTICLE_NOT_FOUND");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alreadyViewed = await prisma.articleView.findFirst({
    where: { articleId: article.id, ipAddress, createdAt: { gte: today } },
  });

  if (!alreadyViewed) {
    await prisma.articleView.create({ data: { articleId: article.id, ipAddress, userAgent } });
    await prisma.article.update({ where: { id: article.id }, data: { views: { increment: 1 } } });
    article.views += 1;
  }

  const relatedArticles = await prisma.article.findMany({
    where: {
      id: { not: article.id },
      eventDate: { not: null, lte: new Date() },
    },
    orderBy: { eventDate: "desc" },
    take: 3,
  });

  return { article, relatedArticles };
}

interface AdminArticleQuery {
  page?: number;
}

export async function getAdminArticles({ page = 1 }: AdminArticleQuery) {
  const perPage = 10;
  const skip = (page - 1) * perPage;

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      include: { category: true, author: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: perPage,
    }),
    prisma.article.count(),
  ]);

  return { articles, pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) } };
}

export async function getArticleById(id: number) {
  const article = await prisma.article.findUnique({
    where: { id },
    include: { category: true, author: { select: { id: true, name: true } } },
  });
  if (!article) throw new Error("ARTICLE_NOT_FOUND");
  return article;
}

interface ArticleInput {
  title: string;
  content: string;
  excerpt: string;
  eventDate?: string;
  isFeatured?: boolean;
  categoryId?: number;
  authorId: number;
}

export async function createArticle(data: ArticleInput, imagePath?: string) {
  const slug = await generateUniqueSlug(data.title);

  return prisma.article.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt,
      eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
      isFeatured: data.isFeatured ?? false,
      categoryId: data.categoryId ?? 2,
      authorId: data.authorId,
      image: imagePath,
    },
  });
}

export async function updateArticle(id: number, data: ArticleInput, imagePath?: string) {
  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) throw new Error("ARTICLE_NOT_FOUND");

  const slug = await generateUniqueSlug(data.title, id);

  if (imagePath && existing.image) {
    const oldPath = path.join(process.cwd(), "uploads", "articles", path.basename(existing.image));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  return prisma.article.update({
    where: { id },
    data: {
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt,
      eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
      isFeatured: data.isFeatured ?? false,
      categoryId: data.categoryId ?? 2,
      ...(imagePath ? { image: imagePath } : {}),
    },
  });
}

export async function deleteArticle(id: number) {
  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) throw new Error("ARTICLE_NOT_FOUND");

  if (existing.image) {
    const imgPath = path.join(process.cwd(), "uploads", "articles", path.basename(existing.image));
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await prisma.article.delete({ where: { id } });
}