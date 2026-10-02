import { cache } from "react";
import { api } from "@/lib/axios";
import type {
    ProgramDetailData,
    ProgramsListData,
} from "@/types/program";
import type { ApiResponse } from "@/types/api";

export async function getPrograms(): Promise<ProgramsListData> {
    const { data } = await api.get<ApiResponse<ProgramsListData>>("/programs");
    return data.data;
}

export const getProgramById = cache(
    async (id: number): Promise<ProgramDetailData | undefined> => {
        const res = await api.get<ApiResponse<ProgramDetailData>>(`/programs/${id}`, {
            validateStatus: (s) => s < 500,
        });
        if (res.status === 404) return undefined;
        if (!res.data.success) {
            throw new Error(res.data.message ?? "Gagal memuat program");
        }
        return res.data.data;
    },
);