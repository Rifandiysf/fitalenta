export type Article = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    /** Format ISO, contoh: "2026-03-15". */
    date: string;
    /** Path gambar di /public, contoh: "/insights/judul-artikel.jpg". Kosongkan untuk memakai placeholder. */
    image?: string;
};

/**
 * PLACEHOLDER: ganti dengan artikel terbaru dari website existing.
 * Artikel pertama tampil sebagai artikel utama, tiga berikutnya sebagai daftar.
 * Slug harus unik (dipakai sebagai key dan URL).
 */
export const articles: readonly Article[] = [
    {
        slug: "judul-artikel-1",
        title: "Judul artikel utama",
        excerpt: "Ringkasan singkat artikel utama dari website existing.",
        category: "Career Development",
        date: "2026-01-01",
    },
    {
        slug: "judul-artikel-2",
        title: "Judul artikel kedua",
        excerpt: "Ringkasan singkat artikel kedua.",
        category: "Business",
        date: "2026-01-01",
    },
    {
        slug: "judul-artikel-3",
        title: "Judul artikel ketiga",
        excerpt: "Ringkasan singkat artikel ketiga.",
        category: "Education",
        date: "2026-01-01",
    },
    {
        slug: "judul-artikel-4",
        title: "Judul artikel keempat",
        excerpt: "Ringkasan singkat artikel keempat.",
        category: "Human Capital",
        date: "2026-01-01",
    },
];