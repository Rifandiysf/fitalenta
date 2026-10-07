import { Request, Response } from "express";
import * as profileService from "../../services/user/profile.service";

export async function show(req: Request, res: Response) {
  try {
    const profile = await profileService.getProfile(req.user!.userId);
    return res.json({ success: true, data: profile });
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Pengguna tidak ditemukan" });
    }
    console.error("Get profile error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { name, phone, address, birthPlace, birthDate } = req.body || {};
    const profile = await profileService.updateProfile(req.user!.userId, {
      name,
      phone,
      address,
      birthPlace,
      birthDate,
    });
    return res.json({ success: true, message: "Profil berhasil diperbarui", data: profile });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}