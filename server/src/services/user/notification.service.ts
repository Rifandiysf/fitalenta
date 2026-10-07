import prisma from "../../config/prisma";

export async function getMyNotifications(userId: number) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function markAsRead(userId: number, id: number) {
  const notification = await prisma.notification.findFirst({ where: { id, userId } });
  if (!notification) throw new Error("NOTIFICATION_NOT_FOUND");
  return prisma.notification.update({ where: { id }, data: { isRead: true } });
}

export async function markAllAsRead(userId: number) {
  await prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
}

export async function getUnreadCount(userId: number) {
  return prisma.notification.count({ where: { userId, isRead: false } });
}