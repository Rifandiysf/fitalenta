"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AboutImageSlot } from "@/constants/editor/editor-team-member-constant";
import { EDITOR_CMS_KEY } from "@/hooks/editor/use-editor-cms";
import {
    createEditorExpert,
    deleteEditorAboutImage,
    deleteEditorExpert,
    getEditorAbout,
    getEditorExperts,
    updateEditorAbout,
    updateEditorExpert,
    uploadEditorAboutImage,
} from "@/services/editor/editor-team-member-service";
import type { EditorAboutPayload, EditorExpertParams, EditorExpertPayload } from "@/types/editor/editor-team-member";

const EDITOR_TEAM_KEY = ["editor", "team-members"] as const;
const EDITOR_ABOUT_KEY = ["editor", "about"] as const;

export function useEditorExperts(params: EditorExpertParams) {
    return useQuery({
        queryKey: [...EDITOR_TEAM_KEY, "list", params],
        queryFn: () => getEditorExperts(params),
        placeholderData: keepPreviousData,
    });
}

type SaveVariables = { id?: number; payload: EditorExpertPayload };

function useInvalidateExperts() {
    const queryClient = useQueryClient();
    return () =>
        Promise.all([
            queryClient.invalidateQueries({ queryKey: EDITOR_TEAM_KEY }),
            queryClient.invalidateQueries({ queryKey: EDITOR_CMS_KEY }),
        ]);
}

export function useSaveEditorExpert() {
    const invalidate = useInvalidateExperts();

    return useMutation({
        mutationFn: ({ id, payload }: SaveVariables) =>
            id !== undefined ? updateEditorExpert(id, payload) : createEditorExpert(payload),
        onSuccess: invalidate,
    });
}

export function useDeleteEditorExpert() {
    const invalidate = useInvalidateExperts();

    return useMutation({
        mutationFn: deleteEditorExpert,
        onSuccess: invalidate,
    });
}

export function useEditorAbout() {
    return useQuery({
        queryKey: [...EDITOR_ABOUT_KEY, "detail"],
        queryFn: getEditorAbout,
    });
}

export function useSaveEditorAbout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: EditorAboutPayload) => updateEditorAbout(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: EDITOR_ABOUT_KEY }),
    });
}

export function useUploadEditorAboutImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ slot, file }: { slot: AboutImageSlot; file: File }) => uploadEditorAboutImage(slot, file),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: EDITOR_ABOUT_KEY }),
    });
}

export function useDeleteEditorAboutImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (slot: AboutImageSlot) => deleteEditorAboutImage(slot),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: EDITOR_ABOUT_KEY }),
    });
}