import { api } from "@/lib/axios";
import { EXPERTS_PER_PAGE, type AboutImageSlot } from "@/constants/editor/editor-team-member-constant";
import type { ApiResponse } from "@/types/api";
import type { AdminPageMeta } from "@/types/pagination";
import type {
    EditorAbout,
    EditorAboutPayload,
    EditorExpert,
    EditorExpertList,
    EditorExpertParams,
    EditorExpertPayload,
    EditorExpertSummary,
} from "@/types/editor/editor-team-member";

const BASE = "/admin/team-members";
const ENDPOINTS = {
    experts: `${BASE}/experts`,
    about: `${BASE}/about`,
} as const;

function toFormData(payload: EditorExpertPayload): FormData {
    const body = new FormData();
    body.append("name", payload.name);
    body.append("position", payload.position);
    body.append("bio", payload.bio);
    body.append("order", String(payload.order));
    body.append("isActive", String(payload.isActive));
    if (payload.image) body.append("image", payload.image);
    else if (payload.removeImage) body.append("removeImage", "true");
    return body;
}

const MULTIPART = { headers: { "Content-Type": "multipart/form-data" } };

type ExpertListBody = {
    data: EditorExpert[] | { items: EditorExpert[]; meta: AdminPageMeta; summary: EditorExpertSummary };
    meta?: AdminPageMeta;
    summary?: EditorExpertSummary;
};

export async function getEditorExperts({ page, search, isActive }: EditorExpertParams): Promise<EditorExpertList> {
    const { data } = await api.get<ExpertListBody>(ENDPOINTS.experts, {
        params: {
            page,
            limit: EXPERTS_PER_PAGE,
            search: search || undefined,
            isActive: isActive === "all" ? undefined : isActive,
        },
    });

    const body = data.data;
    const items = Array.isArray(body) ? body : body.items;
    const meta = Array.isArray(body) ? data.meta : body.meta;
    const summary = Array.isArray(body) ? data.summary : body.summary;

    return {
        items,
        meta: meta ?? { total: items.length, page, limit: EXPERTS_PER_PAGE, totalPages: 1 },
        summary: summary ?? { total: items.length, active: 0, inactive: 0 },
    };
}

export async function createEditorExpert(payload: EditorExpertPayload): Promise<EditorExpert> {
    const { data } = await api.post<ApiResponse<EditorExpert>>(ENDPOINTS.experts, toFormData(payload), MULTIPART);
    return data.data;
}

export async function updateEditorExpert(id: number, payload: EditorExpertPayload): Promise<EditorExpert> {
    const { data } = await api.put<ApiResponse<EditorExpert>>(
        `${ENDPOINTS.experts}/${id}`,
        toFormData(payload),
        MULTIPART,
    );
    return data.data;
}

export async function deleteEditorExpert(id: number): Promise<void> {
    await api.delete<ApiResponse<null>>(`${ENDPOINTS.experts}/${id}`);
}

export async function getEditorAbout(): Promise<EditorAbout> {
    const { data } = await api.get<ApiResponse<EditorAbout>>(ENDPOINTS.about);
    return data.data;
}

export async function updateEditorAbout(payload: EditorAboutPayload): Promise<EditorAbout> {
    const { data } = await api.put<ApiResponse<EditorAbout>>(ENDPOINTS.about, payload);
    return data.data;
}

export async function uploadEditorAboutImage(slot: AboutImageSlot, file: File): Promise<void> {
    const body = new FormData();
    body.append("image", file);
    await api.post<ApiResponse<unknown>>(`${ENDPOINTS.about}/images/${slot}`, body, MULTIPART);
}

export async function deleteEditorAboutImage(slot: AboutImageSlot): Promise<void> {
    await api.delete<ApiResponse<unknown>>(`${ENDPOINTS.about}/images/${slot}`);
}