import { Request, Response } from "express";
import * as programCategoryService from "../../services/programCategory.service";

export async function index(req: Request, res: Response) {
  try {
    const categories = await programCategoryService.getAdminProgramCategories();
    return res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Get admin program categories error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { name, description } = req.body || {};
    if (!name) {
      return res.status(400).json({ success: false, message: "Name wajib diisi" });
    }

    const category = await programCategoryService.createProgramCategory({ name, description });
    return res.status(201).json({ success: true, message: "Kategori program berhasil dibuat", data: category });
  } catch (error) {
    console.error("Create program category error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { name, description } = req.body || {};
    if (!name) {
      return res.status(400).json({ success: false, message: "Name wajib diisi" });
    }

    const category = await programCategoryService.updateProgramCategory(id, { name, description });
    return res.json({ success: true, message: "Kategori program berhasil diperbarui", data: category });
  } catch (error: any) {
    if (error.message === "CATEGORY_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Kategori tidak ditemukan" });
    }
    console.error("Update program category error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await programCategoryService.deleteProgramCategory(id);
    return res.json({ success: true, message: "Kategori program berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "CATEGORY_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Kategori tidak ditemukan" });
    }
    console.error("Delete program category error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}