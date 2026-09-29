import { Request, Response } from "express";
import * as eventService from "../services/event.service";

export async function index(req: Request, res: Response) {
  try {
    const search = req.query.search as string | undefined;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;

    const result = await eventService.getPublicEvents({ search, page });
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Get events error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function featured(req: Request, res: Response) {
  try {
    const events = await eventService.getFeaturedEvents(3);
    return res.json({ success: true, data: events });
  } catch (error) {
    console.error("Get featured events error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string;
    const ipAddress = req.ip || "unknown";
    const userAgent = (req.headers["user-agent"] as string) || "unknown";

    const event = await eventService.getEventBySlug(slug, ipAddress, userAgent);
    const googleCalendarUrl = eventService.generateGoogleCalendarUrl(event);
    const relatedEvents = await eventService.getFeaturedEvents(3);

    return res.json({ success: true, data: { event, googleCalendarUrl, relatedEvents } });
  } catch (error: any) {
    if (error.message === "EVENT_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Event tidak ditemukan" });
    }
    console.error("Get event detail error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}