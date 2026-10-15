export const EXPERTS_PER_PAGE = 10;

export const EXPERT_LIMITS = {
    name: 191,
    position: 191,
    bio: 2000,
} as const;

export const ABOUT_LIMITS = {
    heroTitle: 191,
    heroSubtitle: 500,
    paragraph: 5000,
    vision: 2000,
    mission: 500,
    journeyYear: 20,
    journeyText: 1000,
    valueIcon: 60,
    valueTitle: 191,
    valueDesc: 1000,
} as const;

export const EXPERT_STATUS_OPTIONS = [
    { value: "all", label: "Semua status" },
    { value: "true", label: "Aktif" },
    { value: "false", label: "Nonaktif" },
] as const;

export const TEAM_MEMBER_SECTIONS = [
    { value: "experts", label: "Tim & pakar" },
    { value: "about", label: "Konten About" },
] as const;

export const ABOUT_IMAGE_SLOTS = [
    { slot: "story", label: "Foto cerita", hint: "Tampil di bagian cerita perusahaan." },
    { slot: "director", label: "Foto direktur", hint: "Tampil di bagian direktur." },
    { slot: "team", label: "Foto tim", hint: "Tampil di bagian tim." },
] as const;

export type AboutImageSlot = (typeof ABOUT_IMAGE_SLOTS)[number]["slot"];
export type TeamMemberSection = (typeof TEAM_MEMBER_SECTIONS)[number]["value"];
