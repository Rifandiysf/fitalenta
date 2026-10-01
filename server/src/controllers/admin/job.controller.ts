import { Request, Response } from "express";
import * as jobService from "../../services/job.service";

export async function index(req: Request, res: Response) {
  try {
    const jobs = await jobService.getAdminJobs();
    return res.json({ success: true, data: jobs });
  } catch (error) {
    console.error("Get admin jobs error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const job = await jobService.getAdminJobById(id);
    return res.json({ success: true, data: job });
  } catch (error: any) {
    if (error.message === "JOB_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Lowongan tidak ditemukan" });
    }
    console.error("Get job error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const {
      companyId, title, type, location, salaryMin, salaryMax,
      description, responsibilities, requirements, benefits, howToApply, order, isActive,
    } = req.body || {};

    if (!companyId || !title || !type || !location || !description || !responsibilities || !requirements || !benefits || !howToApply || !order) {
      return res.status(400).json({
        success: false,
        message: "companyId, title, type, location, description, responsibilities, requirements, benefits, howToApply, dan order wajib diisi",
      });
    }

    const job = await jobService.createJob({
      companyId: parseInt(companyId),
      title, type, location,
      salaryMin: salaryMin ? parseFloat(salaryMin) : undefined,
      salaryMax: salaryMax ? parseFloat(salaryMax) : undefined,
      description, responsibilities, requirements, benefits, howToApply,
      order: parseInt(order),
      isActive: isActive === "true" || isActive === true,
    });

    return res.status(201).json({ success: true, message: "Lowongan berhasil dibuat", data: job });
  } catch (error) {
    console.error("Create job error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const {
      companyId, title, type, location, salaryMin, salaryMax,
      description, responsibilities, requirements, benefits, howToApply, order, isActive,
    } = req.body || {};

    if (!companyId || !title || !type || !location || !description || !responsibilities || !requirements || !benefits || !howToApply || !order) {
      return res.status(400).json({
        success: false,
        message: "companyId, title, type, location, description, responsibilities, requirements, benefits, howToApply, dan order wajib diisi",
      });
    }

    const job = await jobService.updateJob(id, {
      companyId: parseInt(companyId),
      title, type, location,
      salaryMin: salaryMin ? parseFloat(salaryMin) : undefined,
      salaryMax: salaryMax ? parseFloat(salaryMax) : undefined,
      description, responsibilities, requirements, benefits, howToApply,
      order: parseInt(order),
      isActive: isActive === "true" || isActive === true,
    });

    return res.json({ success: true, message: "Lowongan berhasil diperbarui", data: job });
  } catch (error: any) {
    if (error.message === "JOB_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Lowongan tidak ditemukan" });
    }
    console.error("Update job error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await jobService.deleteJob(id);
    return res.json({ success: true, message: "Lowongan berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "JOB_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Lowongan tidak ditemukan" });
    }
    console.error("Delete job error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}