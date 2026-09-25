import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { setAuthCookie, clearAuthCookie } from "../utils/cookie";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, confirmPassword, name, phone } = req.body || {};

    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Nama, email, phone, password, dan konfirmasi password wajib diisi",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 6 karakter",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Konfirmasi password tidak cocok" });
    }

    const { user, token } = await registerUser({ email, password, name, phone });
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: { user: { id: user.id, email: user.email, name: user.name, role: user.role } },
    });
  } catch (error: any) {
    if (error.message === "EMAIL_TAKEN") {
      return res.status(409).json({ success: false, message: "Email sudah terdaftar" });
    }
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
    }

    const { user, token } = await loginUser(email, password);
    setAuthCookie(res, token);

    return res.json({
      success: true,
      message: "Login berhasil",
      data: { user: { id: user.id, email: user.email, name: user.name, role: user.role } },
    });
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ success: false, message: "Email atau password salah" });
    }
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
  }
}

export async function logout(req: Request, res: Response) {
  clearAuthCookie(res);
  return res.json({ success: true, message: "Logout berhasil" });
}

export async function me(req: Request, res: Response) {
  return res.json({ success: true, data: { user: req.user } });
}