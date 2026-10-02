import { Request, Response } from "express";
import * as programService from "../../services/program.service";
import { getStringQuery } from "../../utils/request";

export async function index(req: Request, res: Response) {
  try {
    const pageParam = getStringQuery(req, "page");
    const result = await programService.getAdminPrograms({ page: pageParam ? parseInt(pageParam) : 1 });
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Get admin programs error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const program = await programService.getAdminProgramById(id);
    return res.json({ success: true, data: program });
  } catch (error: any) {
    if (error.message === "PROGRAM_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Program tidak ditemukan" });
    }
    console.error("Get program error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const body = req.body || {};

    if (!body.name) {
      return res.status(400).json({ success: false, message: "Name wajib diisi" });
    }

    const program = await programService.createProgram({
      categoryId: body.categoryId ? parseInt(body.categoryId) : undefined,
      name: body.name,
      programFormat: body.programFormat,
      description: body.description,
      requirements: body.requirements,
      schedule: body.schedule,
      duration: body.duration,
      capacity: body.capacity ? parseInt(body.capacity) : undefined,
      status: body.status,
      isRunning: body.isRunning === "true" || body.isRunning === true,
      contactInfo: body.contactInfo,
      registrationDeadline: body.registrationDeadline,
      startDate: body.startDate,
      endDate: body.endDate,
      location: body.location,
      trainingCost: body.trainingCost ? parseFloat(body.trainingCost) : undefined,
      trainingFeeDetails: body.trainingFeeDetails,
      departureCost: body.departureCost ? parseFloat(body.departureCost) : undefined,
      departureFeeDetails: body.departureFeeDetails,
      installmentPlan: body.installmentPlan,
      downPayment: body.downPayment ? parseFloat(body.downPayment) : undefined,
      jobMatchingCost: body.jobMatchingCost ? parseFloat(body.jobMatchingCost) : undefined,
      bridgeFund: body.bridgeFund,
      timelineText: body.timelineText,
      requirementsText: body.requirementsText,
      sortOrder: body.sortOrder ? parseInt(body.sortOrder) : undefined,
    });

    return res.status(201).json({ success: true, message: "Program berhasil dibuat", data: program });
  } catch (error) {
    console.error("Create program error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const body = req.body || {};

    if (!body.name) {
      return res.status(400).json({ success: false, message: "Name wajib diisi" });
    }

    const program = await programService.updateProgram(id, {
      categoryId: body.categoryId ? parseInt(body.categoryId) : undefined,
      name: body.name,
      programFormat: body.programFormat,
      description: body.description,
      requirements: body.requirements,
      schedule: body.schedule,
      duration: body.duration,
      capacity: body.capacity ? parseInt(body.capacity) : undefined,
      status: body.status,
      isRunning: body.isRunning === "true" || body.isRunning === true,
      contactInfo: body.contactInfo,
      registrationDeadline: body.registrationDeadline,
      startDate: body.startDate,
      endDate: body.endDate,
      location: body.location,
      trainingCost: body.trainingCost ? parseFloat(body.trainingCost) : undefined,
      trainingFeeDetails: body.trainingFeeDetails,
      departureCost: body.departureCost ? parseFloat(body.departureCost) : undefined,
      departureFeeDetails: body.departureFeeDetails,
      installmentPlan: body.installmentPlan,
      downPayment: body.downPayment ? parseFloat(body.downPayment) : undefined,
      jobMatchingCost: body.jobMatchingCost ? parseFloat(body.jobMatchingCost) : undefined,
      bridgeFund: body.bridgeFund,
      timelineText: body.timelineText,
      requirementsText: body.requirementsText,
      sortOrder: body.sortOrder ? parseInt(body.sortOrder) : undefined,
    });

    return res.json({ success: true, message: "Program berhasil diperbarui", data: program });
  } catch (error: any) {
    if (error.message === "PROGRAM_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Program tidak ditemukan" });
    }
    console.error("Update program error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await programService.deleteProgram(id);
    return res.json({ success: true, message: "Program berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "PROGRAM_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Program tidak ditemukan" });
    }
    console.error("Delete program error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function toggleRunning(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const program = await programService.toggleProgramRunning(id);
    return res.json({ success: true, message: "Status berjalan program berhasil diubah", data: program });
  } catch (error: any) {
    if (error.message === "PROGRAM_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Program tidak ditemukan" });
    }
    console.error("Toggle program running error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}