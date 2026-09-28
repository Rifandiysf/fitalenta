export type Testimonial = {
    quote: string;
    name: string;
    role?: string;
    organization?: string;
};

export const testimonials: readonly Testimonial[] = [
    {
        quote: "Isi testimonial pertama dari website existing.",
        name: "Nama Peserta 1",
        role: "Jabatan",
        organization: "Institusi",
    },
    {
        quote: "Isi testimonial kedua dari website existing.",
        name: "Nama Mitra 2",
        role: "Jabatan",
        organization: "Perusahaan",
    },
    {
        quote: "Isi testimonial ketiga dari website existing.",
        name: "Nama Peserta 3",
        role: "Jabatan",
        organization: "Institusi",
    },
];