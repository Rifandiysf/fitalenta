import { Request, Response } from "express";
import { submitContactMessage } from "../services/contact.service";

export async function submit(req: Request, res: Response) {
  try {
    const { name, email, subject, message, phone, company } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Nama, email, subjek, dan pesan wajib diisi",
      });
    }

    if (message.length < 10) {
      return res.status(400).json({ success: false, message: "Pesan minimal 10 karakter" });
    }

    await submitContactMessage({ name, email, subject, message, phone, company });

    return res.status(201).json({
      success: true,
      message: "Terima kasih atas pesan Anda. Kami akan segera menghubungi Anda kembali.",
    });
  } catch (error) {
    console.error("Contact submit error:", error);
    return res.status(500).json({ success: false, message: "Gagal mengirim pesan, silakan coba lagi" });
  }
}