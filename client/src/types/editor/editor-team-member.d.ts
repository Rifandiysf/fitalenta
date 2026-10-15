import type { AdminPageMeta } from "@/types/pagination";

export type EditorExpert = {
    id: number;
    name: string;
    position: string;
    bio: string | null;
    image: string | null;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

export type EditorExpertSummary = {
    total: number;
    active: number;
    inactive: number;
};

export type EditorExpertList = {
    items: EditorExpert[];
    meta: AdminPageMeta;
    summary: EditorExpertSummary;
};

export type EditorExpertParams = {
    page: number;
    search: string;
    isActive: "all" | "true" | "false";
};

export type EditorExpertPayload = {
    name: string;
    position: string;
    bio: string;
    order: number;
    isActive: boolean;
    image: File | null;
    removeImage: boolean;
};

export type EditorAboutJourney = { year: string; text: string };
export type EditorAboutValue = { icon: string; title: string; desc: string };

export type EditorAbout = {
    hero: { title: string; subtitle: string };
    story: { paragraphs: string[]; image: string | null };
    vision: string;
    missions: string[];
    journey: EditorAboutJourney[];
    values: EditorAboutValue[];
    director: string | null;
    team: string | null;
    updatedAt: string | null;
};

/** Sama dengan AboutUpdateInput di backend. */
export type EditorAboutPayload = {
    hero: { title: string; subtitle: string };
    story: { paragraphs: string[] };
    vision: string;
    missions: string[];
    journey: EditorAboutJourney[];
    values: EditorAboutValue[];
};
