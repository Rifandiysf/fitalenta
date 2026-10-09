import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { RegistrationFilters } from "../../types/admin.types";
import * as dashboardService from "../../services/admin/dashboard.service";

export async function summary(_req: Request, res: Response) {
  const data = await dashboardService.getSummary();
  return res.json({ success: true, data });
}

export async function filters(_req: Request, res: Response) {
  const data = await dashboardService.getFilterOptions();
  return res.json({ success: true, data });
}

export async function registrations(req: Request, res: Response) {
  const { items, meta } = await dashboardService.listRegistrations(matchedData<RegistrationFilters>(req));
  return res.json({ success: true, data: items, meta });
}

export async function registrationDetail(req: Request, res: Response) {
  const { id } = matchedData<{ id: number }>(req);
  const data = await dashboardService.getRegistrationDetail(id);
  return res.json({ success: true, data });
}