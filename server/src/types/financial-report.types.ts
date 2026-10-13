import { PaymentMethod, PaymentStatus } from "../../generated/prisma/client";
import { PaginationQuery } from "../utils/pagination";

export interface ReportFilters extends PaginationQuery {
  search?: string;
  status?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ReportRow {
  id: number;
  invoiceNumber: string;
  receiptNumber: string | null;
  participantName: string;
  email: string;
  program: string;
  amount: string;
  amountPaid: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDate: Date | null;
  createdAt: Date;
}

export interface ReportSummary {
  totalRecords: number;
  paidCount: number;
  totalBilled: string;
  totalCollected: string;
  totalOutstanding: string;
}

export interface ImportRowError {
  row: number;
  field: string | null;
  message: string;
}

export interface ImportResult {
  dryRun: boolean;
  committed: boolean;
  totalRows: number;
  toCreate: number;
  toUpdate: number;
  created: number;
  updated: number;
  errorCount: number;
  errors: ImportRowError[];
}