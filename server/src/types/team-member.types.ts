import { PaginationMeta, PaginationQuery } from "../utils/pagination";

export interface AboutDocument {
  hero: { title: string; subtitle: string };
  story: { paragraphs: string[]; image: string | null };
  vision: string;
  missions: string[];
  journey: { year: string; text: string }[];
  values: { icon: string; title: string; desc: string }[];
  director: string | null;
  team: string | null;
}

export interface AboutContent extends AboutDocument {
  updatedAt: Date | null;
}

export interface AboutUpdateInput {
  hero?: { title?: string; subtitle?: string };
  story?: { paragraphs?: string[] };
  vision?: string;
  missions?: string[];
  journey?: { year: string; text: string }[];
  values?: { icon: string; title: string; desc: string }[];
}

export interface ExpertItem {
  id: number;
  name: string;
  position: string;
  bio: string | null;
  image: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpertListFilters extends PaginationQuery {
  search?: string;
  isActive?: boolean;
}

export interface ExpertSummary {
  total: number;
  active: number;
  inactive: number;
}

export interface ExpertListResult {
  items: ExpertItem[];
  meta: PaginationMeta;
  summary: ExpertSummary;
}

export interface CreateExpertInput {
  name: string;
  position: string;
  bio?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateExpertInput {
  name?: string;
  position?: string;
  bio?: string;
  order?: number;
  isActive?: boolean;
  removeImage?: boolean;
}

export interface TeamMemberCms {
  expert: ExpertListResult;
  team_member: AboutContent;
}