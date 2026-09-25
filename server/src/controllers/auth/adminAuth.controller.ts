import { Request, Response } from "express";
import { loginAdmin  } from "../../services/auth.service";
import { clearAuthCookie, setAuthCookie } from "../../utils/cookie";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
    }

    const { user, token } = await loginAdmin(email, password);
    setAuthCookie(res, token);

    return res.json({
      success: true,
      message: "Login admin berhasil",
      data: { admin: { id: user.id, email: user.email, name: user.name, role: user.role } },
    });
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ success: false, message: "Email atau password salah" });
    }
    console.error("Admin login error:", error);
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