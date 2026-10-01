import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { TestimonialsListData } from "@/types/testimonial";

export async function getTestimonials(): Promise<TestimonialsListData> {
    const { data } = await api.get<ApiResponse<TestimonialsListData>>("/testimonials");
    return data.data;
}