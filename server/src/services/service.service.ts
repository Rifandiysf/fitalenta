import prisma from "../config/prisma";

export async function getPublicServices() {
  return prisma.service.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getServiceById(id: number, ipAddress: string, userAgent: string) {
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) throw new Error("SERVICE_NOT_FOUND");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alreadyViewed = await prisma.serviceView.findFirst({
    where: { serviceId: service.id, ipAddress, createdAt: { gte: today } },
  });

  if (!alreadyViewed) {
    await prisma.serviceView.create({ data: { serviceId: service.id, ipAddress, userAgent } });
    await prisma.service.update({ where: { id: service.id }, data: { views: { increment: 1 } } });
    service.views += 1;
  }

  return service;
}

export async function getAdminServices({ page = 1 }: { page?: number }) {
  const perPage = 10;
  const skip = (page - 1) * perPage;

  const [services, total] = await Promise.all([
    prisma.service.findMany({ orderBy: { createdAt: "desc" }, skip, take: perPage }),
    prisma.service.count(),
  ]);

  return { services, pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) } };
}

interface ServiceInput {
  name: string;
  short: string;
  description: string;
  price?: number;
  duration?: string;
  isFeatured?: boolean;
  icon?: string;
}

export async function createService(data: ServiceInput) {
  return prisma.service.create({ data });
}

export async function updateService(id: number, data: ServiceInput) {
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) throw new Error("SERVICE_NOT_FOUND");
  return prisma.service.update({ where: { id }, data });
}

export async function deleteService(id: number) {
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) throw new Error("SERVICE_NOT_FOUND");
  await prisma.service.delete({ where: { id } });
}