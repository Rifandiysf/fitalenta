import { DEFAULT_PAGE_SIZE } from "../config/admin.config";

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function resolvePagination({ page = 1, limit = DEFAULT_PAGE_SIZE }: PaginationQuery) {
  return { page, limit, skip: (page - 1) * limit, take: limit };
}

export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  return { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) };
}