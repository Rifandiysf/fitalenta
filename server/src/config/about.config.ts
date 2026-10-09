export const ABOUT_SETTING_KEY = "about_page";
export const ABOUT_SETTING_GROUP = "about";

export const ABOUT_IMAGE_SLOTS = ["story", "director", "team"] as const;
export type AboutImageSlot = (typeof ABOUT_IMAGE_SLOTS)[number];

export const ABOUT_UPLOAD_FOLDER = "about";
export const TEAM_MEMBER_UPLOAD_FOLDER = "team-members";

export const ICON_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]{0,49}$/;

export const ABOUT_LIMITS = {
  heroTitle: 255,
  heroSubtitle: 1000,
  vision: 1000,
  paragraphs: { count: 10, length: 3000 },
  missions: { count: 10, length: 1000 },
  journey: { count: 20, year: 20, text: 2000 },
  values: { count: 8, title: 100, desc: 255 },
} as const;

export const EXPERT_LIMITS = {
  name: 255,
  position: 255,
  bio: 5000,
  order: 9999,
  reorderItems: 200,
} as const;