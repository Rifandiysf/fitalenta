import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { ABOUT_UPLOAD_FOLDER, AboutImageSlot } from "../../config/about.config";
import { TeamMemberErrors } from "../../errors/teamMember.errors";
import * as aboutService from "../../services/about.service";
import * as teamMemberService from "../../services/admin/teamMember.service";
import {
  AboutUpdateInput,
  CreateExpertInput,
  ExpertListFilters,
  UpdateExpertInput,
} from "../../types/team-member.types";
import { toPublicUploadPath } from "../../utils/file";

export async function index(req: Request, res: Response) {
  const data = await teamMemberService.getCms(matchedData<ExpertListFilters>(req));
  return res.json({ success: true, data });
}

export async function listExperts(req: Request, res: Response) {
  const { items, meta, summary } = await teamMemberService.listExperts(matchedData<ExpertListFilters>(req));
  return res.json({ success: true, data: items, meta, summary });
}

export async function showExpert(req: Request, res: Response) {
  const { id } = matchedData<{ id: number }>(req);
  const data = await teamMemberService.getExpertById(id);
  return res.json({ success: true, data });
}

export async function storeExpert(req: Request, res: Response) {
  const data = await teamMemberService.createExpert(matchedData<CreateExpertInput>(req), req.file);
  return res.status(201).json({ success: true, message: "Expert berhasil dibuat", data });
}

export async function updateExpert(req: Request, res: Response) {
  const { id, ...input } = matchedData<UpdateExpertInput & { id: number }>(req);
  const data = await teamMemberService.updateExpert(id, input, req.file);
  return res.json({ success: true, message: "Expert berhasil diperbarui", data });
}

export async function destroyExpert(req: Request, res: Response) {
  const { id } = matchedData<{ id: number }>(req);
  await teamMemberService.deleteExpert(id);
  return res.json({ success: true, message: "Expert berhasil dihapus" });
}

export async function reorderExperts(req: Request, res: Response) {
  const { ids } = matchedData<{ ids: number[] }>(req);
  const data = await teamMemberService.reorderExperts(ids);
  return res.json({ success: true, message: "Urutan expert berhasil diperbarui", data });
}

export async function showAbout(_req: Request, res: Response) {
  const data = await aboutService.getAbout();
  return res.json({ success: true, data });
}

export async function updateAbout(req: Request, res: Response) {
  const data = await aboutService.updateAbout(matchedData<AboutUpdateInput>(req));
  return res.json({ success: true, message: "Konten About berhasil diperbarui", data });
}

export async function uploadAboutImage(req: Request, res: Response) {
  const { slot } = matchedData<{ slot: AboutImageSlot }>(req);
  if (!req.file) throw TeamMemberErrors.imageRequired();

  const path = toPublicUploadPath(ABOUT_UPLOAD_FOLDER, req.file.filename);
  const data = await aboutService.setAboutImage(slot, path);
  return res.json({ success: true, message: "Gambar About berhasil diperbarui", data });
}

export async function destroyAboutImage(req: Request, res: Response) {
  const { slot } = matchedData<{ slot: AboutImageSlot }>(req);
  const data = await aboutService.setAboutImage(slot, null);
  return res.json({ success: true, message: "Gambar About berhasil dihapus", data });
}