import { Request, Response } from "express";
import * as clientService from "../services/client.service";

export async function index(req: Request, res: Response) {
  try {
    const clients = await clientService.getPublicClients();
    return res.json({ success: true, data: clients });
  } catch (error) {
    console.error("Get clients error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}