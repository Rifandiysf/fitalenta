import prisma from "../../config/prisma";

export async function getMyPayments(userId: number) {
  return prisma.payment.findMany({
    where: { registration: { userId } },
    include: { registration: { include: { program: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function attachPaymentProof(userId: number, paymentId: number, proofImagePath: string) {
  const payment = await prisma.payment.findFirst({
    where: { id: paymentId, registration: { userId } },
  });
  if (!payment) throw new Error("PAYMENT_NOT_FOUND");

  return prisma.payment.update({
    where: { id: paymentId },
    data: { proofImage: proofImagePath, paymentDate: new Date() },
  });
}