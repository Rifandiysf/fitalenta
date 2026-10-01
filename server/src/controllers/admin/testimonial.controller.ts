import { Request, Response } from "express";
import * as testimonialService from "../../services/testimonial.service";

export async function index(req: Request, res: Response) {
  try {
    const testimonials = await testimonialService.getAdminTestimonials();
    return res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Get admin testimonials error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { clientName, company, content, rating } = req.body || {};

    if (!clientName || !company || !content || !rating) {
      return res.status(400).json({ success: false, message: "Client name, company, content, dan rating wajib diisi" });
    }

    const imagePath = req.file ? `/uploads/testimonials/${req.file.filename}` : undefined;
    const testimonial = await testimonialService.createTestimonial(
      { clientName, company, content, rating: parseInt(rating) },
      imagePath
    );

    return res.status(201).json({ success: true, message: "Testimoni berhasil ditambahkan", data: testimonial });
  } catch (error) {
    console.error("Create testimonial error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { clientName, company, content, rating } = req.body || {};

    if (!clientName || !company || !content || !rating) {
      return res.status(400).json({ success: false, message: "Client name, company, content, dan rating wajib diisi" });
    }

    const imagePath = req.file ? `/uploads/testimonials/${req.file.filename}` : undefined;
    const testimonial = await testimonialService.updateTestimonial(
      id,
      { clientName, company, content, rating: parseInt(rating) },
      imagePath
    );

    return res.json({ success: true, message: "Testimoni berhasil diperbarui", data: testimonial });
  } catch (error: any) {
    if (error.message === "TESTIMONIAL_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Testimoni tidak ditemukan" });
    }
    console.error("Update testimonial error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await testimonialService.deleteTestimonial(id);
    return res.json({ success: true, message: "Testimoni berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "TESTIMONIAL_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Testimoni tidak ditemukan" });
    }
    console.error("Delete testimonial error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function toggle(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const testimonial = await testimonialService.toggleTestimonial(id);
    return res.json({ success: true, message: "Status testimoni berhasil diubah", data: testimonial });
  } catch (error: any) {
    if (error.message === "TESTIMONIAL_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Testimoni tidak ditemukan" });
    }
    console.error("Toggle testimonial error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}