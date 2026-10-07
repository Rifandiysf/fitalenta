import { Request, Response } from "express";
import * as paymentService from "../../services/user/payment.service";

export async function index(req: Request, res: Response) {
  try {
    const payments = await paymentService.getMyPayments(req.user!.userId);
    return res.json({ success: true, data: payments });
  } catch (error) {
    console.error("Get my payments error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function uploadProof(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Bukti pembayaran wajib diunggah" });
    }

    const proofImagePath = `/uploads/payment-proofs/${req.file.filename}`;
    const payment = await paymentService.attachPaymentProof(req.user!.userId, id, proofImagePath);

    return res.json({ success: true, message: "Bukti pembayaran berhasil diunggah", data: payment });
  } catch (error: any) {
    if (error.message === "PAYMENT_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Tagihan tidak ditemukan" });
    }
    console.error("Upload payment proof error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}