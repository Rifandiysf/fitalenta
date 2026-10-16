import { Request, Response } from "express";
import * as contactService from "../../services/contact.service";
import { getStringQuery } from "../../utils/request";
import { INVALID_PAGE_RESPONSE, parsePageQuery } from "../../utils/pagination";

export async function index(req: Request, res: Response) {
  try {
    const page = parsePageQuery(getStringQuery(req, "page"));
    if (page === null) return res.status(400).json(INVALID_PAGE_RESPONSE);
    const result = await contactService.getAdminContactMessages({ page });
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Get contact messages error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const message = await contactService.getContactMessageById(id);
    return res.json({ success: true, data: message });
  } catch (error: any) {
    if (error.message === "MESSAGE_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Pesan tidak ditemukan" });
    }
    console.error("Get contact message error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await contactService.deleteContactMessage(id);
    return res.json({ success: true, message: "Pesan berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "MESSAGE_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Pesan tidak ditemukan" });
    }
    console.error("Delete contact message error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}