import { Request, Response } from "express";
import * as companyService from "../../services/company.service";

export async function index(req: Request, res: Response) {
  try {
    const companies = await companyService.getAdminCompanies();
    return res.json({ success: true, data: companies });
  } catch (error) {
    console.error("Get admin companies error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { name, website, industry, employeeCount, location, description, isActive } = req.body || {};

    if (!name || !industry || !location || !description) {
      return res.status(400).json({ success: false, message: "Name, industry, location, dan description wajib diisi" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Logo wajib diunggah" });
    }

    const logoPath = `/uploads/company-logos/${req.file.filename}`;
    const company = await companyService.createCompany(
      { name, website, industry, employeeCount, location, description, isActive: isActive === "true" || isActive === true },
      logoPath
    );

    return res.status(201).json({ success: true, message: "Perusahaan berhasil ditambahkan", data: company });
  } catch (error) {
    console.error("Create company error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { name, website, industry, employeeCount, location, description, isActive } = req.body || {};

    if (!name || !industry || !location || !description) {
      return res.status(400).json({ success: false, message: "Name, industry, location, dan description wajib diisi" });
    }

    const logoPath = req.file ? `/uploads/company-logos/${req.file.filename}` : undefined;
    const company = await companyService.updateCompany(
      id,
      { name, website, industry, employeeCount, location, description, isActive: isActive === "true" || isActive === true },
      logoPath
    );

    return res.json({ success: true, message: "Perusahaan berhasil diperbarui", data: company });
  } catch (error: any) {
    if (error.message === "COMPANY_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Perusahaan tidak ditemukan" });
    }
    console.error("Update company error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await companyService.deleteCompany(id);
    return res.json({ success: true, message: "Perusahaan berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "COMPANY_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Perusahaan tidak ditemukan" });
    }
    console.error("Delete company error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}