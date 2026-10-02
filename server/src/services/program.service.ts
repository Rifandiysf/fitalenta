import prisma from "../config/prisma";

export async function getPublicPrograms({ categoryId }: { categoryId?: number }) {
  return prisma.program.findMany({
    where: {
      status: "active",
      ...(categoryId ? { categoryId } : {}),
    },
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getProgramById(id: number) {
  const program = await prisma.program.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!program) throw new Error("PROGRAM_NOT_FOUND");
  return program;
}

export async function getAdminPrograms({ page = 1 }: { page?: number }) {
  const perPage = 10;
  const skip = (page - 1) * perPage;

  const [programs, total] = await Promise.all([
    prisma.program.findMany({
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      skip,
      take: perPage,
    }),
    prisma.program.count(),
  ]);

  return { programs, pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) } };
}

export async function getAdminProgramById(id: number) {
  const program = await prisma.program.findUnique({ where: { id }, include: { category: true } });
  if (!program) throw new Error("PROGRAM_NOT_FOUND");
  return program;
}

interface ProgramInput {
  categoryId?: number;
  name: string;
  programFormat?: string;
  description?: string;
  requirements?: string;
  schedule?: string;
  duration?: string;
  capacity?: number;
  status?: "active" | "inactive" | "full";
  isRunning?: boolean;
  contactInfo?: string;
  registrationDeadline?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  trainingCost?: number;
  trainingFeeDetails?: string;
  departureCost?: number;
  departureFeeDetails?: string;
  installmentPlan?: string;
  downPayment?: number;
  jobMatchingCost?: number;
  bridgeFund?: string;
  timelineText?: string;
  requirementsText?: string;
  sortOrder?: number;
}

export async function createProgram(data: ProgramInput) {
  return prisma.program.create({
    data: {
      categoryId: data.categoryId,
      name: data.name,
      programFormat: data.programFormat,
      description: data.description,
      requirements: data.requirements,
      schedule: data.schedule,
      duration: data.duration,
      capacity: data.capacity,
      status: data.status ?? "active",
      isRunning: data.isRunning ?? false,
      contactInfo: data.contactInfo,
      registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : undefined,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      location: data.location,
      trainingCost: data.trainingCost,
      trainingFeeDetails: data.trainingFeeDetails,
      departureCost: data.departureCost,
      departureFeeDetails: data.departureFeeDetails,
      installmentPlan: data.installmentPlan,
      downPayment: data.downPayment,
      jobMatchingCost: data.jobMatchingCost,
      bridgeFund: data.bridgeFund,
      timelineText: data.timelineText,
      requirementsText: data.requirementsText,
      sortOrder: data.sortOrder,
    },
  });
}

export async function updateProgram(id: number, data: ProgramInput) {
  const existing = await prisma.program.findUnique({ where: { id } });
  if (!existing) throw new Error("PROGRAM_NOT_FOUND");

  return prisma.program.update({
    where: { id },
    data: {
      categoryId: data.categoryId,
      name: data.name,
      programFormat: data.programFormat,
      description: data.description,
      requirements: data.requirements,
      schedule: data.schedule,
      duration: data.duration,
      capacity: data.capacity,
      status: data.status,
      isRunning: data.isRunning,
      contactInfo: data.contactInfo,
      registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : undefined,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      location: data.location,
      trainingCost: data.trainingCost,
      trainingFeeDetails: data.trainingFeeDetails,
      departureCost: data.departureCost,
      departureFeeDetails: data.departureFeeDetails,
      installmentPlan: data.installmentPlan,
      downPayment: data.downPayment,
      jobMatchingCost: data.jobMatchingCost,
      bridgeFund: data.bridgeFund,
      timelineText: data.timelineText,
      requirementsText: data.requirementsText,
      sortOrder: data.sortOrder,
    },
  });
}

export async function deleteProgram(id: number) {
  const existing = await prisma.program.findUnique({ where: { id } });
  if (!existing) throw new Error("PROGRAM_NOT_FOUND");
  await prisma.program.delete({ where: { id } });
}

export async function toggleProgramRunning(id: number) {
  const existing = await prisma.program.findUnique({ where: { id } });
  if (!existing) throw new Error("PROGRAM_NOT_FOUND");
  return prisma.program.update({ where: { id }, data: { isRunning: !existing.isRunning } });
}