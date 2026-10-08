import fs from "fs/promises";
import { Request } from "express";

export function collectUploadedFiles(req: Request): Express.Multer.File[] {
  if (req.files) {
    return Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
  }
  return req.file ? [req.file] : [];
}

export async function removeFiles(files: Express.Multer.File[]): Promise<void> {
  await Promise.allSettled(files.map((file) => fs.unlink(file.path)));
}

export function toPublicUploadPath(folder: string, filename: string): string {
  return `/uploads/${folder}/${filename}`;
}