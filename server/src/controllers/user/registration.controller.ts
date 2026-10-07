import { Request, Response } from "express";
import * as registrationService from "../../services/user/registration.service";

export async function index(req: Request, res: Response) {
  try {
    const registrations = await registrationService.getMyRegistrations(req.user!.userId);
    return res.json({ success: true, data: registrations });
  } catch (error) {
    console.error("Get my registrations error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const registration = await registrationService.getMyRegistrationById(req.user!.userId, id);
    return res.json({ success: true, data: registration });
  } catch (error: any) {
    if (error.message === "REGISTRATION_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Pendaftaran tidak ditemukan" });
    }
    console.error("Get my registration detail error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}