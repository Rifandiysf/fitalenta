import { Request, Response } from "express";
import * as teamMemberService from "../../services/teamMember.service";
import { getStringQuery } from "../../utils/request";

function toBoolean(value: unknown, fallback: boolean): boolean {
  if (value === undefined || value === null || value === "") return fallback;
  return value === true || value === "true";
}

function toOrder(value: unknown): number {
  const n = parseInt(String(value ?? "0"));
  return Number.isNaN(n) ? 0 : n;
}

export async function index(req: Request, res: Response) {
  try {
    const pageParam = getStringQuery(req, "page");
    const page = pageParam ? parseInt(pageParam) : 1;
    const result = await teamMemberService.getAdminTeamMembers({ page: page > 0 ? page : 1 });
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Get admin team members error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const teamMember = await teamMemberService.getTeamMemberById(id);
    return res.json({ success: true, data: teamMember });
  } catch (error: any) {
    if (error.message === "TEAM_MEMBER_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Anggota tim tidak ditemukan" });
    }
    console.error("Get team member detail error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function store(req: Request, res: Response) {
  try {
    const { name, position, bio, image, order, isActive } = req.body || {};

    if (!name || !position) {
      return res.status(400).json({ success: false, message: "Nama dan posisi wajib diisi" });
    }

    const teamMember = await teamMemberService.createTeamMember({
      name,
      position,
      bio: bio || null,
      image: image || null,
      order: toOrder(order),
      isActive: toBoolean(isActive, true),
    });

    return res.status(201).json({ success: true, message: "Anggota tim berhasil dibuat", data: teamMember });
  } catch (error) {
    console.error("Create team member error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const { name, position, bio, image, order, isActive } = req.body || {};

    if (!name || !position) {
      return res.status(400).json({ success: false, message: "Nama dan posisi wajib diisi" });
    }

    const teamMember = await teamMemberService.updateTeamMember(id, {
      name,
      position,
      bio: bio || null,
      image: image || null,
      order: toOrder(order),
      isActive: toBoolean(isActive, true),
    });

    return res.json({ success: true, message: "Anggota tim berhasil diperbarui", data: teamMember });
  } catch (error: any) {
    if (error.message === "TEAM_MEMBER_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Anggota tim tidak ditemukan" });
    }
    console.error("Update team member error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    await teamMemberService.deleteTeamMember(id);
    return res.json({ success: true, message: "Anggota tim berhasil dihapus" });
  } catch (error: any) {
    if (error.message === "TEAM_MEMBER_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Anggota tim tidak ditemukan" });
    }
    console.error("Delete team member error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}