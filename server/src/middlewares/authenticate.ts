import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { COOKIE_NAME } from "../utils/cookie";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Tidak ada akses, silakan login terlebih dahulu",
    });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Sesi tidak valid atau sudah habis, silakan login ulang",
    });
  }
}