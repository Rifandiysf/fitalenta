import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { AppError } from "../utils/app-error";
import { collectUploadedFiles, removeFiles } from "../utils/file";

export function validate(rules: ValidationChain[]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.all(rules.map((rule) => rule.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) return next();

    await removeFiles(collectUploadedFiles(req));

    const errors = result.array({ onlyFirstError: true }).map((error) => ({
      field: error.type === "field" ? error.path : undefined,
      message: error.msg as string,
    }));

    throw new AppError("VALIDATION_ERROR", 400, "Data yang dikirim tidak valid", errors);
  };
}