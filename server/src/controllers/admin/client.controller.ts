import { Request, Response } from "express";
import * as clientService from "../../services/client.service";

export async function index(req: Request, res: Response) {
  try {
    const clients = await clientService.getAdminClients();
    return res.json({ success: true, data: clients });
  } catch (error) {
    console.error("Get admin clients error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { name, website } = req.body || {};

    if (!name) {
      return res.status(400).json({ success: false, message: "Name wajib diisi" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Logo wajib diunggah" });
    }

    const logoPath = `/uploads/clients/${req.file.filename}`;
    const client = await clientService.createClient({ name, website }, logoPath);

    return res.status(201).json({ success: true, message: "Klien berhasil ditambahkan", data: client });
  } catch (error) {
    console.error("Create client error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { name, website } = req.body || {};

    if (!name) {
      return res.status(400).json({ success: false, message: "Name wajib diisi" });
    }

    const logoPath = req.file ? `/uploads/clients/${req.file.filename}` : undefined;
    const client = await clientService.updateClient(id, { name, website }, logoPath);

    return res.json({ success: true, message: "Klien berhasil diperbarui", data: client });
  } catch (error: any) {
    if (error.message === "CLIENT_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Klien tidak ditemukan" });
    }
    console.error("Update client error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await clientService.deleteClient(id);
    return res.json({ success: true, message: "Klien berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "CLIENT_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Klien tidak ditemukan" });
    }
    console.error("Delete client error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function toggle(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const client = await clientService.toggleClient(id);
    return res.json({ success: true, message: "Status klien berhasil diubah", data: client });
  } catch (error: any) {
    if (error.message === "CLIENT_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Klien tidak ditemukan" });
    }
    console.error("Toggle client error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}