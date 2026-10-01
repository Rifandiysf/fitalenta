import { Request, Response } from "express";
import * as universityPartnerService from "../../services/universityPartner.service";

export async function index(req: Request, res: Response) {
  try {
    const partners = await universityPartnerService.getAdminUniversityPartners();
    return res.json({ success: true, data: partners });
  } catch (error) {
    console.error("Get admin university partners error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { name, location, studentCount, order, isActive } = req.body || {};

    if (!name || !location || !studentCount || !order) {
      return res.status(400).json({ success: false, message: "Name, location, studentCount, dan order wajib diisi" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Logo wajib diunggah" });
    }

    const logoPath = `/uploads/university-logos/${req.file.filename}`;
    const partner = await universityPartnerService.createUniversityPartner(
      {
        name,
        location,
        studentCount: parseInt(studentCount),
        order: parseInt(order),
        isActive: isActive === "true" || isActive === true,
      },
      logoPath
    );

    return res.status(201).json({ success: true, message: "Universitas mitra berhasil ditambahkan", data: partner });
  } catch (error) {
    console.error("Create university partner error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { name, location, studentCount, order, isActive } = req.body || {};

    if (!name || !location || !studentCount || !order) {
      return res.status(400).json({ success: false, message: "Name, location, studentCount, dan order wajib diisi" });
    }

    const logoPath = req.file ? `/uploads/university-logos/${req.file.filename}` : undefined;
    const partner = await universityPartnerService.updateUniversityPartner(
      id,
      {
        name,
        location,
        studentCount: parseInt(studentCount),
        order: parseInt(order),
        isActive: isActive === "true" || isActive === true,
      },
      logoPath
    );

    return res.json({ success: true, message: "Universitas mitra berhasil diperbarui", data: partner });
  } catch (error: any) {
    if (error.message === "UNIVERSITY_PARTNER_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Universitas mitra tidak ditemukan" });
    }
    console.error("Update university partner error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await universityPartnerService.deleteUniversityPartner(id);
    return res.json({ success: true, message: "Universitas mitra berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "UNIVERSITY_PARTNER_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Universitas mitra tidak ditemukan" });
    }
    console.error("Delete university partner error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}