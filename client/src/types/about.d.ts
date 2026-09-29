import { type LucideIcon } from "lucide-react";

export type AboutContent = {
    hero: { title: string; subtitle: string };
    story: { paragraphs: string[]; image?: string };
    vision: string;
    missions: string[];
    journey: { year: string; text: string }[];
    values: { title: string; desc: string; icon: LucideIcon }[];
    director: string;
    team: string;
};