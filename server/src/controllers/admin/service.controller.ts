import { Request, Response } from "express";
import * as serviceService from "../../services/service.service";
import { getStringQuery } from "../../utils/request";

export async function index(req: Request, res: Response) {
  try {
    const pageParam = getStringQuery(req, "page");
    const result = await serviceService.getAdminServices({ page: pageParam ? parseInt(pageParam) : 1 });
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Get admin services error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { name, short, description, price, duration, isFeatured, icon } = req.body || {};

    if (!name || !short || !description) {
      return res.status(400).json({ success: false, message: "Name, short, dan description wajib diisi" });
    }

    const service = await serviceService.createService({
      name,
      short,
      description,
      price: price ? parseFloat(price) : undefined,
      duration,
      isFeatured: isFeatured === "true" || isFeatured === true,
      icon,
    });

    return res.status(201).json({ success: true, message: "Layanan berhasil dibuat", data: service });
  } catch (error) {
    console.error("Create service error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { name, short, description, price, duration, isFeatured, icon } = req.body || {};

    if (!name || !short || !description) {
      return res.status(400).json({ success: false, message: "Name, short, dan description wajib diisi" });
    }

    const service = await serviceService.updateService(id, {
      name,
      short,
      description,
      price: price ? parseFloat(price) : undefined,
      duration,
      isFeatured: isFeatured === "true" || isFeatured === true,
      icon,
    });

    return res.json({ success: true, message: "Layanan berhasil diperbarui", data: service });
  } catch (error: any) {
    if (error.message === "SERVICE_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Layanan tidak ditemukan" });
    }
    console.error("Update service error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await serviceService.deleteService(id);
    return res.json({ success: true, message: "Layanan berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "SERVICE_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Layanan tidak ditemukan" });
    }
    console.error("Delete service error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}