import type { PaymentMethod, PaymentStatus } from "@/types/dashboard";
import type { AdminPageMeta } from "@/types/pagination";

export type { PaymentMethod, PaymentStatus };

export type UserPaymentState = "awaiting_payment" | "awaiting_verification" | "paid" | "cancelled";

export type MyPaymentSummary = {
    totalInvoices: number;
    awaitingPayment: number;
    awaitingVerification: number;
    paid: number;
    overdue: number;
    totalAmount: string;
    totalPaid: string;
    totalRemaining: string;
};

export type PaymentAccount = {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
};

export type MyPaymentInstallment = {
    /** Jumlah cicilan yang sudah diverifikasi. */
    current: number;
    total: number;
    amounts: string[];
};

export type MyPaymentItem = {
    id: number;
    invoiceNumber: string;
    receiptNumber: string | null;
    status: PaymentStatus;
    state: UserPaymentState;
    isOverdue: boolean;
    issuedAt: string | null;
    amount: string;
    amountPaid: string;
    remainingAmount: string;
    /** Nominal yang harus dibayar sekarang (cicilan berikutnya atau sisa tagihan). */
    amountDue: string;
    paymentMethod: PaymentMethod;
    dueDate: string | null;
    nextDueDate: string | null;
    /** nextDueDate ?? dueDate, sudah dihitung backend. */
    deadline: string | null;
    paymentDate: string | null;
    proofImage: string | null;
    verifiedAt: string | null;
    notes: string | null;
    installment: MyPaymentInstallment | null;
    registration: { id: number; registrationCode: string };
    program: { id: number | null; name: string; programFormat: string | null };
    actions: { canUploadProof: boolean };
};

export type MyPaymentHistoryItem = {
    id: number;
    oldStatus: PaymentStatus | null;
    newStatus: PaymentStatus | null;
    amountChanged: string | null;
    changedAt: string;
};

export type MyPaymentDetail = MyPaymentItem & {
    /** null jika tagihan sudah lunas / dibatalkan. */
    paymentAccount: PaymentAccount | null;
    history: MyPaymentHistoryItem[];
};

export type MyPaymentList = {
    items: MyPaymentItem[];
    meta: AdminPageMeta;
};

export type MyPaymentParams = {
    page: number;
    status: PaymentStatus | "all";
};
