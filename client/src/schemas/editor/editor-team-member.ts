import { z } from "zod";
import { CONTENT_LIMITS } from "@/constants/editor/editor-content-constant";
import { ABOUT_LIMITS, EXPERT_LIMITS } from "@/constants/editor/editor-team-member-constant";
import { optionalText, requiredInt, requiredText } from "@/schemas/editor/editor-common";

export type ExpertFormValues = {
    name: string;
    position: string;
    bio: string;
    order: string;
    isActive: boolean;
    removeImage: boolean;
};

export function buildExpertSchema() {
    return z.object({
        name: requiredText("Nama", EXPERT_LIMITS.name),
        position: requiredText("Jabatan", EXPERT_LIMITS.position),
        bio: optionalText("Bio", EXPERT_LIMITS.bio),
        order: requiredInt("Urutan", 0, CONTENT_LIMITS.order),
        isActive: z.boolean(),
        removeImage: z.boolean(),
    });
}

export type AboutFormValues = {
    heroTitle: string;
    heroSubtitle: string;
    vision: string;
};

export function buildAboutSchema() {
    return z.object({
        heroTitle: requiredText("Judul hero", ABOUT_LIMITS.heroTitle),
        heroSubtitle: requiredText("Subjudul hero", ABOUT_LIMITS.heroSubtitle),
        vision: requiredText("Visi", ABOUT_LIMITS.vision),
        paragraphs: z.array(requiredText("Paragraf", ABOUT_LIMITS.paragraph)),
        missions: z.array(requiredText("Misi", ABOUT_LIMITS.mission)),
        journey: z.array(
            z.object({
                year: requiredText("Tahun", ABOUT_LIMITS.journeyYear),
                text: requiredText("Keterangan", ABOUT_LIMITS.journeyText),
            }),
        ),
        values: z.array(
            z.object({
                icon: requiredText("Ikon", ABOUT_LIMITS.valueIcon),
                title: requiredText("Judul nilai", ABOUT_LIMITS.valueTitle),
                desc: requiredText("Deskripsi nilai", ABOUT_LIMITS.valueDesc),
            }),
        ),
    });
}
