import prisma from "../config/prisma";
import resend from "../config/resend";

interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}

export async function submitContactMessage(data: ContactInput) {
  const contactMessage = await prisma.contactMessage.create({ data });

  await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM as string,
    to: process.env.CONTACT_EMAIL_TO as string,
    replyTo: data.email,
    subject: `[Contact Form] ${data.subject}`,
    html: `
      <h2>Pesan Baru dari Website</h2>
      <p><strong>Nama:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Telepon:</strong> ${data.phone}</p>` : ""}
      ${data.company ? `<p><strong>Perusahaan:</strong> ${data.company}</p>` : ""}
      <p><strong>Subjek:</strong> ${data.subject}</p>
      <p><strong>Pesan:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `,
  });

  return contactMessage;
}

interface AdminContactQuery {
  page?: number;
}

export async function getAdminContactMessages({ page = 1 }: AdminContactQuery) {
  const perPage = 10;
  const skip = (page - 1) * perPage;

  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, skip, take: perPage }),
    prisma.contactMessage.count(),
  ]);

  return { messages, pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) } };
}

export async function getContactMessageById(id: number) {
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) throw new Error("MESSAGE_NOT_FOUND");

  if (!message.isRead) {
    await prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
    message.isRead = true;
  }

  return message;
}

export async function deleteContactMessage(id: number) {
  const existing = await prisma.contactMessage.findUnique({ where: { id } });
  if (!existing) throw new Error("MESSAGE_NOT_FOUND");
  await prisma.contactMessage.delete({ where: { id } });
}