import fs from "fs";
import path from "path";
import prisma from "../config/prisma";

export async function getPublicTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAdminTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

interface TestimonialInput {
  clientName: string;
  company: string;
  content: string;
  rating: number;
}

export async function createTestimonial(data: TestimonialInput, imagePath?: string) {
  return prisma.testimonial.create({ data: { ...data, image: imagePath } });
}

export async function updateTestimonial(id: number, data: TestimonialInput, imagePath?: string) {
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) throw new Error("TESTIMONIAL_NOT_FOUND");

  if (imagePath && existing.image) {
    const oldPath = path.join(process.cwd(), "uploads", "testimonials", path.basename(existing.image));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  return prisma.testimonial.update({
    where: { id },
    data: { ...data, ...(imagePath ? { image: imagePath } : {}) },
  });
}

export async function deleteTestimonial(id: number) {
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) throw new Error("TESTIMONIAL_NOT_FOUND");

  if (existing.image) {
    const imgPath = path.join(process.cwd(), "uploads", "testimonials", path.basename(existing.image));
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await prisma.testimonial.delete({ where: { id } });
}

export async function toggleTestimonial(id: number) {
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) throw new Error("TESTIMONIAL_NOT_FOUND");
  return prisma.testimonial.update({ where: { id }, data: { isFeatured: !existing.isFeatured } });
}