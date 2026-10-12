import { AppError } from "../utils/app-error";

export interface FieldIssue {
  field: string;
  message: string;
}

export const SelectionPlacementErrors = {
  notFound: () => new AppError("REGISTRATION_NOT_FOUND", 404, "Data peserta tidak ditemukan"),
  nothingToUpdate: () =>
    new AppError("NOTHING_TO_UPDATE", 400, "Data seleksi atau penyaluran wajib dikirim minimal salah satu"),
  invalidPlacement: (issues: FieldIssue[]) =>
    new AppError("VALIDATION_ERROR", 400, "Data yang dikirim tidak valid", issues),
  selectionNotPassed: () =>
    new AppError(
      "SELECTION_NOT_PASSED",
      409,
      "Penyaluran hanya dapat diproses untuk peserta yang lolos seleksi diklat"
    ),
};