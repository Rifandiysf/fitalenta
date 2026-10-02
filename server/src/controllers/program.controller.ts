import { Request, Response } from "express";
import * as programService from "../services/program.service";
import { getStringQuery, getStringParam } from "../utils/request";

export async function index(req: Request, res: Response) {
  try {
    const categoryId = getStringQuery(req, "categoryId");
    const programs = await programService.getPublicPrograms({
      categoryId: categoryId ? parseInt(categoryId) : undefined,
    });
    return res.json({ success: true, data: programs });
  } catch (error) {
    console.error("Get programs error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const id = parseInt(getStringParam(req, "id"));
    const program = await programService.getProgramById(id);
    return res.json({ success: true, data: program });
  } catch (error: any) {
    if (error.message === "PROGRAM_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Program tidak ditemukan" });
    }
    console.error("Get program detail error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}