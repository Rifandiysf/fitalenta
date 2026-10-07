import prisma from "../../config/prisma";

export async function getMyRegistrations(userId: number) {
  return prisma.registration.findMany({
    where: { userId },
    include: {
      program: true,
      selectionStatuses: { orderBy: { createdAt: "desc" }, take: 1 },
      placementStatuses: { orderBy: { createdAt: "desc" }, take: 1 },
      payments: true,
    },
    orderBy: { registrationDate: "desc" },
  });
}

export async function getMyRegistrationById(userId: number, id: number) {
  const registration = await prisma.registration.findFirst({
    where: { id, userId },
    include: {
      program: true,
      statusHistory: { orderBy: { changedAt: "desc" } },
      selectionStatuses: { orderBy: { createdAt: "desc" } },
      placementStatuses: { orderBy: { createdAt: "desc" } },
      payments: { include: { paymentHistory: { orderBy: { changedAt: "desc" } } } },
    },
  });
  if (!registration) throw new Error("REGISTRATION_NOT_FOUND");
  return registration;
}