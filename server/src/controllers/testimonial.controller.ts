import { Request, Response } from "express";
import * as testimonialService from "../services/testimonial.service";

export async function index(req: Request, res: Response) {
  try {
    const testimonials = await testimonialService.getPublicTestimonials();
    return res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Get testimonials error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}