import { Request, Response } from "express";
import * as aboutService from "../services/about.service";
import * as teamMemberService from "../services/teamMember.service";

export async function show(_req: Request, res: Response) {
  const [items, team_member] = await Promise.all([
    teamMemberService.getPublicTeamMembers(),
    aboutService.getAbout(),
  ]);
  return res.json({ success: true, data: { expert: { items }, team_member } });
}