import { Request } from "express";

export function getStringParam(req: Request, key: string): string {
  const value = req.params[key];
  return Array.isArray(value) ? value[0] : (value as string);
}

export function getStringQuery(req: Request, key: string): string | undefined {
  const value = req.query[key];
  if (Array.isArray(value)) return value[0] as string;
  return value as string | undefined;
}