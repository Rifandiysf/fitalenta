import { Request, Response } from "express";
import * as galleryService from "../../services/gallery.service";

export async function index(req: Request, res: Response) {
  try {
    const gallery = await galleryService.getAdminGallery();
    return res.json({ success: true, data: gallery });
  } catch (error) {
    console.error("Get admin gallery error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { title, categoryId, description, eventDate, isFeatured, order } = req.body || {};

    if (!title || !categoryId) {
      return res.status(400).json({ success: false, message: "Title dan categoryId wajib diisi" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Gambar wajib diunggah" });
    }

    const imagePath = `/uploads/gallery/${req.file.filename}`;
    const item = await galleryService.createGalleryItem(
      {
        title,
        categoryId: parseInt(categoryId),
        description,
        eventDate,
        isFeatured: isFeatured === "true" || isFeatured === true,
        order: order ? parseInt(order) : undefined,
      },
      imagePath
    );

    return res.status(201).json({ success: true, message: "Gambar berhasil diunggah", data: item });
  } catch (error) {
    console.error("Create gallery error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { title, categoryId, description, eventDate, isFeatured, order } = req.body || {};

    if (!title || !categoryId) {
      return res.status(400).json({ success: false, message: "Title dan categoryId wajib diisi" });
    }

    const imagePath = req.file ? `/uploads/gallery/${req.file.filename}` : undefined;
    const item = await galleryService.updateGalleryItem(
      id,
      {
        title,
        categoryId: parseInt(categoryId),
        description,
        eventDate,
        isFeatured: isFeatured === "true" || isFeatured === true,
        order: order ? parseInt(order) : undefined,
      },
      imagePath
    );

    return res.json({ success: true, message: "Gambar berhasil diperbarui", data: item });
  } catch (error: any) {
    if (error.message === "GALLERY_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Gambar tidak ditemukan" });
    }
    console.error("Update gallery error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await galleryService.deleteGalleryItem(id);
    return res.json({ success: true, message: "Gambar berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "GALLERY_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Gambar tidak ditemukan" });
    }
    console.error("Delete gallery error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}