import prisma from "../../config/prisma";

export async function getDashboardSummary(userId: number) {
  const [totalRegistrations, activeRegistrations, unpaidPayments, unreadNotifications, latestRegistration] =
    await Promise.all([
      prisma.registration.count({ where: { userId } }),
      prisma.registration.count({ where: { userId, registrationStatus: "menunggu" } }),
      prisma.payment.count({
        where: { registration: { userId }, status: { in: ["pending", "overdue"] } },
      }),
      prisma.notification.count({ where: { userId, isRead: false } }),
      prisma.registration.findFirst({
        where: { userId },
        include: { program: true },
        orderBy: { registrationDate: "desc" },
      }),
    ]);

  return {
    totalRegistrations,
    activeRegistrations,
    unpaidPayments,
    unreadNotifications,
    latestRegistration,
  };
}