import { Request, Response } from "express";
import * as teamMemberService from "../services/teamMember.service";

export async function index(req: Request, res: Response) {
  try {
    const teamMembers = await teamMemberService.getPublicTeamMembers();
    return res.json({ success: true, data: teamMembers });
  } catch (error) {
    console.error("Get team members error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}