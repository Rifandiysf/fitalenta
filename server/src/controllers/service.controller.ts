import { Request, Response } from "express";
import * as serviceService from "../services/service.service";

export async function index(req: Request, res: Response) {
  try {
    const services = await serviceService.getPublicServices();
    return res.json({ success: true, data: services });
  } catch (error) {
    console.error("Get services error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string;
    const ipAddress = req.ip || "unknown";
    const userAgent = (req.headers["user-agent"] as string) || "unknown";

    const service = await serviceService.getServiceBySlug(slug, ipAddress, userAgent);
    return res.json({ success: true, data: service });
  } catch (error: any) {
    if (error.message === "SERVICE_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Layanan tidak ditemukan" });
    }
    console.error("Get service detail error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}