import { Request, Response } from "express";
import { matchedData } from "express-validator";
import * as selectionPlacementService from "../../services/admin/selectionPlacement.service";
import { ParticipantFilters, ParticipantUpdateInput } from "../../types/selection-placement.types";

export async function summary(_req: Request, res: Response) {
  const data = await selectionPlacementService.getSummary();
  return res.json({ success: true, data });
}

export function options(_req: Request, res: Response) {
  return res.json({ success: true, data: selectionPlacementService.getOptions() });
}

export async function index(req: Request, res: Response) {
  const { items, meta } = await selectionPlacementService.listParticipants(matchedData<ParticipantFilters>(req));
  return res.json({ success: true, data: items, meta });
}

export async function show(req: Request, res: Response) {
  const { id } = matchedData<{ id: number }>(req);
  const data = await selectionPlacementService.getParticipantById(id);
  return res.json({ success: true, data });
}

export async function update(req: Request, res: Response) {
  const { id, ...input } = matchedData<ParticipantUpdateInput & { id: number }>(req);
  const data = await selectionPlacementService.updateParticipant(id, input, req.user!.userId);
  return res.json({ success: true, message: "Data seleksi dan penyaluran berhasil diperbarui", data });
}