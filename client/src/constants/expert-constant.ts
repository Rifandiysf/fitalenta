export type Expert = {
    name: string;
    role: string;
    /** Path foto di /public, contoh: "/experts/agus-ismail.jpg". Kosongkan untuk memakai placeholder. */
    photo?: string;
};

export const experts: readonly Expert[] = [
    { name: "Agus Ismail", role: "HR & Sales Expert" },
    { name: "Achmad Zakaria", role: "Leadership Expert" },
    { name: "Anindya Wadhani", role: "Personal Branding Expert" },
];