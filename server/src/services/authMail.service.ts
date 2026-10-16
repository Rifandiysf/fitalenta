import resend from "../config/resend";
import { PASSWORD_RESET_TTL_MINUTES } from "../config/password.config";
import { signEmailVerificationToken } from "../utils/emailVerification";
import { escapeHtml } from "../utils/html";
import { signPasswordResetToken } from "../utils/passwordResetToken";

interface MailRecipient {
  id: number;
  email: string;
  name: string;
}

interface PasswordResetRecipient extends MailRecipient {
  password: string;
}

interface ActionEmail {
  name: string;
  intro: string;
  buttonLabel: string;
  link: string;
  outro: string;
}

function buildClientLink(path: string, token: string): string {
  const baseUrl = (process.env.CLIENT_URL || process.env.CORS_ORIGIN || "http://localhost:3000").replace(/\/$/, "");
  return `${baseUrl}${path}?token=${encodeURIComponent(token)}`;
}

function renderActionEmail({ name, intro, buttonLabel, link, outro }: ActionEmail): string {
  return `
    <p>Halo ${escapeHtml(name)},</p>
    <p>${intro}</p>
    <p>
      <a href="${escapeHtml(link)}" style="display:inline-block;padding:10px 18px;background:#0f3d6e;color:#fff;border-radius:6px;text-decoration:none">${buttonLabel}</a>
    </p>
    <p>${outro}</p>
  `;
}

async function deliver(to: string, subject: string, html: string): Promise<void> {
  const { error } = await resend.emails.send({
    from: (process.env.AUTH_EMAIL_FROM || process.env.CONTACT_EMAIL_FROM) as string,
    to,
    subject,
    html,
  });
  if (error) throw new Error(error.message);
}

function dispatch(task: Promise<void>, context: string): void {
  task.catch((error) => console.error(`${context} error:`, error));
}

export function queueVerificationEmail(user: MailRecipient): void {
  const link = buildClientLink("/verify-email", signEmailVerificationToken(user.id, user.email));
  const html = renderActionEmail({
    name: user.name,
    intro: "Terima kasih telah mendaftar di FITALENTA. Klik tombol di bawah untuk memverifikasi email Anda (berlaku 24 jam):",
    buttonLabel: "Verifikasi Email",
    link,
    outro: "Jika Anda tidak merasa mendaftar, abaikan email ini.",
  });
  dispatch(deliver(user.email, "Verifikasi email akun FITALENTA", html), "Send verification email");
}

export function queuePasswordResetEmail(user: PasswordResetRecipient): void {
  const link = buildClientLink("/reset-password", signPasswordResetToken(user));
  const html = renderActionEmail({
    name: user.name,
    intro: `Kami menerima permintaan reset password akun FITALENTA Anda. Klik tombol di bawah untuk membuat password baru (berlaku ${PASSWORD_RESET_TTL_MINUTES} menit):`,
    buttonLabel: "Reset Password",
    link,
    outro: "Jika Anda tidak meminta reset password, abaikan email ini. Password Anda tidak akan berubah.",
  });
  dispatch(deliver(user.email, "Reset password akun FITALENTA", html), "Send password reset email");
}