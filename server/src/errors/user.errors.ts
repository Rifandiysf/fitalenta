import { AppError } from "../utils/app-error";

export const UserErrors = {
  notFound: () => new AppError("USER_NOT_FOUND", 404, "User tidak ditemukan"),
  emailTaken: () => new AppError("EMAIL_TAKEN", 409, "Email sudah digunakan"),
  cannotDeleteSelf: () =>
    new AppError("CANNOT_DELETE_SELF", 403, "Anda tidak dapat menghapus akun yang sedang digunakan"),
  cannotChangeOwnRole: () =>
    new AppError("CANNOT_CHANGE_OWN_ROLE", 403, "Anda tidak dapat mengubah role akun sendiri"),
  hasRelatedData: () =>
    new AppError(
      "USER_HAS_RELATED_DATA",
      409,
      "User tidak dapat dihapus karena masih memiliki data pendaftaran atau artikel"
    ),
};