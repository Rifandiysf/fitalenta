import { Request, Response } from "express";
import * as partnerService from "../services/partner.service";

export async function index(req: Request, res: Response) {
  try {
    const partners = await partnerService.getPublicPartners();
    return res.json({ success: true, data: partners });
  } catch (error) {
    console.error("Get partners error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}
