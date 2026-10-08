import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { AppError } from "../utils/app-error";

const MULTER_MESSAGES: Record<string, string> = {
  LIMIT_FILE_SIZE: "Ukuran file melebihi batas maksimal 5 MB",
  LIMIT_UNEXPECTED_FILE: "Field file tidak dikenali",
};

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      success: false,
      code: error.code,
      message: error.message,
      ...(error.details ? { errors: error.details } : {}),
    });
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      code: error.code,
      message: MULTER_MESSAGES[error.code] ?? error.message,
    });
  }

  console.error("Unhandled error:", error);
  return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
}