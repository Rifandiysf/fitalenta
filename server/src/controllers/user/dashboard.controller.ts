import { Request, Response } from "express";
import * as dashboardService from "../../services/user/dashboard.service";

export async function show(req: Request, res: Response) {
  try {
    const summary = await dashboardService.getDashboardSummary(req.user!.userId);
    return res.json({ success: true, data: summary });
  } catch (error) {
    console.error("Get dashboard summary error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}