import { AppError } from "../utils/app-error";

const validationError = (field: string, message: string) =>
  new AppError("VALIDATION_ERROR", 400, "Data yang dikirim tidak valid", [{ field, message }]);

export const ProgramErrors = {
  notFound: () => new AppError("PROGRAM_NOT_FOUND", 404, "Program tidak ditemukan"),
  categoryNotFound: () => validationError("categoryId", "Kategori program tidak ditemukan"),
  invalidDateRange: () => validationError("endDate", "Tanggal selesai tidak boleh sebelum tanggal mulai"),
  capacityBelowParticipants: (current: number) =>
    validationError("capacity", `Kuota tidak boleh kurang dari jumlah peserta saat ini (${current})`),
  hasRegistrations: () =>
    new AppError(
      "PROGRAM_HAS_REGISTRATIONS",
      409,
      "Program tidak dapat dihapus karena sudah memiliki pendaftar. Ubah statusnya menjadi nonaktif."
    ),
};