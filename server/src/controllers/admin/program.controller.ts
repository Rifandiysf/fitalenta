import { Request, Response } from "express";
import { matchedData } from "express-validator";
import * as programService from "../../services/admin/program.service";
import { CreateProgramInput, ProgramListFilters, UpdateProgramInput } from "../../types/program.types";

export async function summary(_req: Request, res: Response) {
  const data = await programService.getSummary();
  return res.json({ success: true, data });
}

export async function options(_req: Request, res: Response) {
  const data = await programService.getOptions();
  return res.json({ success: true, data });
}

export async function index(req: Request, res: Response) {
  const { items, meta } = await programService.listPrograms(matchedData<ProgramListFilters>(req));
  return res.json({ success: true, data: items, meta });
}

export async function show(req: Request, res: Response) {
  const { id } = matchedData<{ id: number }>(req);
  const data = await programService.getProgramById(id);
  return res.json({ success: true, data });
}

export async function store(req: Request, res: Response) {
  const data = await programService.createProgram(matchedData<CreateProgramInput>(req));
  return res.status(201).json({ success: true, message: "Program berhasil dibuat", data });
}

export async function update(req: Request, res: Response) {
  const { id, ...input } = matchedData<UpdateProgramInput & { id: number }>(req);
  const data = await programService.updateProgram(id, input);
  return res.json({ success: true, message: "Program berhasil diperbarui", data });
}

export async function destroy(req: Request, res: Response) {
  const { id } = matchedData<{ id: number }>(req);
  await programService.deleteProgram(id);
  return res.json({ success: true, message: "Program berhasil dihapus" });
}