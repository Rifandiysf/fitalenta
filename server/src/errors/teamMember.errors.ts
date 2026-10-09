import { AppError } from "../utils/app-error";

export const TeamMemberErrors = {
  notFound: () => new AppError("TEAM_MEMBER_NOT_FOUND", 404, "Anggota tim tidak ditemukan"),
  someNotFound: () =>
    new AppError("TEAM_MEMBER_NOT_FOUND", 404, "Sebagian anggota tim yang diurutkan tidak ditemukan"),
  imageRequired: () => new AppError("IMAGE_REQUIRED", 400, "File gambar wajib diunggah (field: image)"),
  nothingToUpdate: () =>
    new AppError("NOTHING_TO_UPDATE", 400, "Tidak ada data yang dikirim untuk diperbarui"),
};