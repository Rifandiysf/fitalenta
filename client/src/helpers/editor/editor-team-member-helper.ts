import type { AboutFormValues, ExpertFormValues } from "@/schemas/editor/editor-team-member";
import type { EditorAbout, EditorExpert } from "@/types/editor/editor-team-member";

export function createEmptyExpertForm(): ExpertFormValues {
    return { name: "", position: "", bio: "", order: "0", isActive: true, removeImage: false };
}

export function toExpertFormValues(expert: EditorExpert): ExpertFormValues {
    return {
        name: expert.name,
        position: expert.position,
        bio: expert.bio ?? "",
        order: String(expert.order),
        isActive: expert.isActive,
        removeImage: false,
    };
}

export function toAboutFormValues(about: EditorAbout): AboutFormValues {
    return {
        heroTitle: about.hero.title,
        heroSubtitle: about.hero.subtitle,
        vision: about.vision,
    };
}
