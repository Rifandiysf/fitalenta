import { Request, Response } from "express";
import * as notificationService from "../../services/user/notification.service";

export async function index(req: Request, res: Response) {
  try {
    const notifications = await notificationService.getMyNotifications(req.user!.userId);
    const unreadCount = await notificationService.getUnreadCount(req.user!.userId);
    return res.json({ success: true, data: { notifications, unreadCount } });
  } catch (error) {
    console.error("Get my notifications error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function markRead(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const notification = await notificationService.markAsRead(req.user!.userId, id);
    return res.json({ success: true, message: "Notifikasi ditandai terbaca", data: notification });
  } catch (error: any) {
    if (error.message === "NOTIFICATION_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Notifikasi tidak ditemukan" });
    }
    console.error("Mark notification read error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function markAllRead(req: Request, res: Response) {
  try {
    await notificationService.markAllAsRead(req.user!.userId);
    return res.json({ success: true, message: "Semua notifikasi ditandai terbaca" });
  } catch (error) {
    console.error("Mark all notifications read error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}