import { Request, Response } from "express";
import * as galleryService from "../services/gallery.service";

export async function index(req: Request, res: Response) {
  try {
    const gallery = await galleryService.getPublicGallery();
    return res.json({ success: true, data: gallery });
  } catch (error) {
    console.error("Get gallery error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const result = await galleryService.getGalleryById(id);
    return res.json({ success: true, data: result });
  } catch (error: any) {
    if (error.message === "GALLERY_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Gambar tidak ditemukan" });
    }
    console.error("Get gallery detail error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}