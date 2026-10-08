import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { CreateRegistrationInput } from "../../types/registration.types";
import { collectUploadedFiles, removeFiles } from "../../utils/file";
import { mapUploadedFiles } from "../../services/user/registration-files";
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

export async function store(req: Request, res: Response) {
  const uploadedFiles = collectUploadedFiles(req);

  try {
    const input = matchedData<CreateRegistrationInput>(req);
    const result = await registrationService.createRegistration(
      req.user!.userId,
      input,
      mapUploadedFiles(req.files)
    );
    return res.status(201).json({ success: true, message: "Pendaftaran berhasil", data: result });
  } catch (error) {
    await removeFiles(uploadedFiles);
    throw error;
  }
}