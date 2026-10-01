import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { PartnersListData } from "@/types/partner";

export async function getPartners(): Promise<PartnersListData> {
    const { data } = await api.get<ApiResponse<PartnersListData>>("/partners");
    return data.data;
}