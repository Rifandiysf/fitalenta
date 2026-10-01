export type Testimonial = {
    id: number;
    clientName: string;
    company: string;
    content: string;
    rating: number;
    image: string | null;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TestimonialsListData = Testimonial[];