import prisma from "../config/prisma";

function textToArray(text: string): string[] {
  return text.split("\n").map((line) => line.trim()).filter((line) => line !== "");
}

interface PublicJobQuery {
  search?: string;
  location?: string;
  type?: string;
  page?: number;
}

export async function getPublicJobs({ search, location, type, page = 1 }: PublicJobQuery) {
  const perPage = 9;
  const skip = (page - 1) * perPage;

  const where = {
    isActive: true,
    ...(location ? { location } : {}),
    ...(type ? { type } : {}),
    ...(search ? { OR: [{ title: { contains: search } }, { description: { contains: search } }] } : {}),
  };

  const [jobs, total, locations, types] = await Promise.all([
    prisma.job.findMany({
      where,
      include: { company: true },
      orderBy: [{ order: "asc" }, { postedAt: "desc" }],
      skip,
      take: perPage,
    }),
    prisma.job.count({ where }),
    prisma.job.findMany({ where: { isActive: true }, select: { location: true }, distinct: ["location"] }),
    prisma.job.findMany({ where: { isActive: true }, select: { type: true }, distinct: ["type"] }),
  ]);

  return {
    jobs,
    pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
    filters: { locations: locations.map((l) => l.location), types: types.map((t) => t.type) },
  };
}

export async function getJobById(id: number) {
  const job = await prisma.job.findUnique({ where: { id }, include: { company: true } });
  if (!job || !job.isActive) throw new Error("JOB_NOT_FOUND");

  const similarJobs = await prisma.job.findMany({
    where: { isActive: true, id: { not: job.id }, OR: [{ type: job.type }, { location: job.location }] },
    include: { company: true },
    take: 3,
  });

  return { job, similarJobs };
}

export async function getAdminJobs() {
  return prisma.job.findMany({ include: { company: true }, orderBy: [{ order: "asc" }, { postedAt: "desc" }] });
}

export async function getAdminJobById(id: number) {
  const job = await prisma.job.findUnique({ where: { id }, include: { company: true } });
  if (!job) throw new Error("JOB_NOT_FOUND");
  return job;
}

interface JobInput {
  companyId: number;
  title: string;
  type: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  howToApply: string;
  order: number;
  isActive?: boolean;
}

export async function createJob(data: JobInput) {
  return prisma.job.create({
    data: {
      companyId: data.companyId,
      title: data.title,
      type: data.type,
      location: data.location,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      description: data.description,
      responsibilities: textToArray(data.responsibilities),
      requirements: textToArray(data.requirements),
      benefits: textToArray(data.benefits),
      howToApply: data.howToApply,
      order: data.order,
      isActive: data.isActive ?? true,
      postedAt: new Date(),
    },
  });
}

export async function updateJob(id: number, data: JobInput) {
  const existing = await prisma.job.findUnique({ where: { id } });
  if (!existing) throw new Error("JOB_NOT_FOUND");

  return prisma.job.update({
    where: { id },
    data: {
      companyId: data.companyId,
      title: data.title,
      type: data.type,
      location: data.location,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      description: data.description,
      responsibilities: textToArray(data.responsibilities),
      requirements: textToArray(data.requirements),
      benefits: textToArray(data.benefits),
      howToApply: data.howToApply,
      order: data.order,
      isActive: data.isActive ?? existing.isActive,
    },
  });
}

export async function deleteJob(id: number) {
  const existing = await prisma.job.findUnique({ where: { id } });
  if (!existing) throw new Error("JOB_NOT_FOUND");
  await prisma.job.delete({ where: { id } });
}