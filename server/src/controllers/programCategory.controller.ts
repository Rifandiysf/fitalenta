import { Request, Response } from "express";
import * as programCategoryService from "../services/programCategory.service";

export async function index(req: Request, res: Response) {
  try {
    const categories = await programCategoryService.getPublicProgramCategories();
    return res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Get program categories error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}