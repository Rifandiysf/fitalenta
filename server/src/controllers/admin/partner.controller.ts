import { Request, Response } from "express";
import * as partnerService from "../../services/partner.service";

export async function indexClients(req: Request, res: Response) {
  try {
    const clients = await partnerService.getAdminClients();
    return res.json({ success: true, data: clients });
  } catch (error) {
    console.error("Get admin clients error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function storeClient(req: Request, res: Response) {
  try {
    const { name, website } = req.body || {};

    if (!name) {
      return res.status(400).json({ success: false, message: "Name wajib diisi" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Logo wajib diunggah" });
    }

    const logoPath = `/uploads/partners/${req.file.filename}`;
    const client = await partnerService.createClient({ name, website }, logoPath);

    return res.status(201).json({ success: true, message: "Klien berhasil ditambahkan", data: client });
  } catch (error) {
    console.error("Create client error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function updateClient(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { name, website } = req.body || {};

    if (!name) {
      return res.status(400).json({ success: false, message: "Name wajib diisi" });
    }

    const logoPath = req.file ? `/uploads/partners/${req.file.filename}` : undefined;
    const client = await partnerService.updateClient(id, { name, website }, logoPath);

    return res.json({ success: true, message: "Klien berhasil diperbarui", data: client });
  } catch (error: any) {
    if (error.message === "CLIENT_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Klien tidak ditemukan" });
    }
    console.error("Update client error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroyClient(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await partnerService.deleteClient(id);
    return res.json({ success: true, message: "Klien berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "CLIENT_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Klien tidak ditemukan" });
    }
    console.error("Delete client error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function toggleClient(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const client = await partnerService.toggleClient(id);
    return res.json({ success: true, message: "Status klien berhasil diubah", data: client });
  } catch (error: any) {
    if (error.message === "CLIENT_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Klien tidak ditemukan" });
    }
    console.error("Toggle client error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function indexUniversityPartners(req: Request, res: Response) {
  try {
    const partners = await partnerService.getAdminUniversityPartners();
    return res.json({ success: true, data: partners });
  } catch (error) {
    console.error("Get admin university partners error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function storeUniversityPartner(req: Request, res: Response) {
  try {
    const { name, location, studentCount, order, isActive } = req.body || {};

    if (!name || !location || !studentCount || !order) {
      return res.status(400).json({ success: false, message: "Name, location, studentCount, dan order wajib diisi" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Logo wajib diunggah" });
    }

    const logoPath = `/uploads/partners/${req.file.filename}`;
    const partner = await partnerService.createUniversityPartner(
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

export async function updateUniversityPartner(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { name, location, studentCount, order, isActive } = req.body || {};

    if (!name || !location || !studentCount || !order) {
      return res.status(400).json({ success: false, message: "Name, location, studentCount, dan order wajib diisi" });
    }

    const logoPath = req.file ? `/uploads/partners/${req.file.filename}` : undefined;
    const partner = await partnerService.updateUniversityPartner(
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

export async function destroyUniversityPartner(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await partnerService.deleteUniversityPartner(id);
    return res.json({ success: true, message: "Universitas mitra berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "UNIVERSITY_PARTNER_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Universitas mitra tidak ditemukan" });
    }
    console.error("Delete university partner error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}
