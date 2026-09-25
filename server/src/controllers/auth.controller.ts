import { Request, Response } from "express";
import { registerUser, loginByRole } from "../services/auth.service";
import { setAuthCookie, clearAuthCookie } from "../utils/cookie";

const VALID_LOGIN_ROLES = ["user", "admin"] as const;
type LoginRole = (typeof VALID_LOGIN_ROLES)[number];

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name, phone, address } = req.body || {};

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, dan nama wajib diisi",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password minimal 6 karakter" });
    }

    const { user, token } = await registerUser({ email, password, name, phone, address });
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
    const { email, password, role } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
    }

    if (role !== undefined && !VALID_LOGIN_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Role tidak valid, gunakan salah satu dari: ${VALID_LOGIN_ROLES.join(", ")}`,
      });
    }

    const loginRole: LoginRole = role === "admin" ? "admin" : "user";

    const { user, token } = await loginByRole(email, password, loginRole);
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