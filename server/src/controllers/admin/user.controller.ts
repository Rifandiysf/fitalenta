import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { CreateUserInput, UpdateUserInput, UserListFilters } from "../../types/admin.types";
import * as userService from "../../services/admin/user.service";

const currentUserId = (req: Request) => req.user!.userId;

export async function summary(_req: Request, res: Response) {
  const data = await userService.getSummary();
  return res.json({ success: true, data });
}

export async function index(req: Request, res: Response) {
  const { items, meta } = await userService.listUsers(matchedData<UserListFilters>(req), currentUserId(req));
  return res.json({ success: true, data: items, meta });
}

export async function show(req: Request, res: Response) {
  const { id } = matchedData<{ id: number }>(req);
  const data = await userService.getUserById(id, currentUserId(req));
  return res.json({ success: true, data });
}

export async function store(req: Request, res: Response) {
  const data = await userService.createUser(matchedData<CreateUserInput>(req), currentUserId(req));
  return res.status(201).json({ success: true, message: "User berhasil dibuat", data });
}

export async function update(req: Request, res: Response) {
  const { id, ...input } = matchedData<UpdateUserInput & { id: number }>(req);
  const data = await userService.updateUser(id, input, currentUserId(req));
  return res.json({ success: true, message: "User berhasil diperbarui", data });
}

export async function destroy(req: Request, res: Response) {
  const { id } = matchedData<{ id: number }>(req);
  await userService.deleteUser(id, currentUserId(req));
  return res.json({ success: true, message: "User berhasil dihapus" });
}