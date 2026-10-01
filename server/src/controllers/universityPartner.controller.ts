import { Request, Response } from "express";
import * as universityPartnerService from "../services/universityPartner.service";

export async function index(req: Request, res: Response) {
  try {
    const result = await universityPartnerService.getPublicUniversityPartners();
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Get university partners error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}