import fs from "fs";
import path from "path";
import prisma from "../config/prisma";

export async function getPublicGallery() {
  return prisma.gallery.findMany({
    where: { isFeatured: false },
    include: { category: true },
    orderBy: { eventDate: "desc" },
  });
}

export async function getGalleryById(id: number) {
  const image = await prisma.gallery.findUnique({ where: { id }, include: { category: true } });
  if (!image) throw new Error("GALLERY_NOT_FOUND");

  const relatedImages = await prisma.gallery.findMany({ where: { isFeatured: true }, take: 3 });

  return { image, relatedImages };
}

export async function getAdminGallery() {
  return prisma.gallery.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
}

interface GalleryInput {
  title: string;
  categoryId: number;
  description?: string;
  eventDate?: string;
  isFeatured?: boolean;
  order?: number;
}

export async function createGalleryItem(data: GalleryInput, imagePath: string) {
  return prisma.gallery.create({
    data: {
      title: data.title,
      categoryId: data.categoryId,
      description: data.description,
      eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
      isFeatured: data.isFeatured ?? false,
      order: data.order ?? 0,
      image: imagePath,
    },
  });
}

export async function updateGalleryItem(id: number, data: GalleryInput, imagePath?: string) {
  const existing = await prisma.gallery.findUnique({ where: { id } });
  if (!existing) throw new Error("GALLERY_NOT_FOUND");

  if (imagePath && existing.image) {
    const oldPath = path.join(process.cwd(), "uploads", "gallery", path.basename(existing.image));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  return prisma.gallery.update({
    where: { id },
    data: {
      title: data.title,
      categoryId: data.categoryId,
      description: data.description,
      eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
      isFeatured: data.isFeatured ?? false,
      order: data.order ?? existing.order,
      ...(imagePath ? { image: imagePath } : {}),
    },
  });
}

export async function deleteGalleryItem(id: number) {
  const existing = await prisma.gallery.findUnique({ where: { id } });
  if (!existing) throw new Error("GALLERY_NOT_FOUND");

  const imgPath = path.join(process.cwd(), "uploads", "gallery", path.basename(existing.image));
  if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

  await prisma.gallery.delete({ where: { id } });
}