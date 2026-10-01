import { Request, Response } from "express";
import * as jobService from "../services/job.service";
import { getStringQuery, getStringParam } from "../utils/request";

export async function index(req: Request, res: Response) {
  try {
    const search = getStringQuery(req, "search");
    const location = getStringQuery(req, "location");
    const type = getStringQuery(req, "type");
    const pageParam = getStringQuery(req, "page");

    const result = await jobService.getPublicJobs({ search, location, type, page: pageParam ? parseInt(pageParam) : 1 });
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Get jobs error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const id = parseInt(getStringParam(req, "id"));
    const result = await jobService.getJobById(id);
    return res.json({ success: true, data: result });
  } catch (error: any) {
    if (error.message === "JOB_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Lowongan tidak ditemukan" });
    }
    console.error("Get job detail error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}