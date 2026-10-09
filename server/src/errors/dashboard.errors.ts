import { AppError } from "../utils/app-error";

export const DashboardErrors = {
  registrationNotFound: () =>
    new AppError("REGISTRATION_NOT_FOUND", 404, "Data pendaftaran tidak ditemukan"),
};