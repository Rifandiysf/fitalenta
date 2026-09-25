export type NavItem = {
    label: string;
    href: string;
};

export const siteConfig = {
    logo: "/fitalenta.png",
    name: "FITALENTA",
    tagline: "Empowering people",
    description: "We are dedicated to empowering businesses and individuals through innovative talent managementand business consulting solutions.",
} as const;

export const navItems: readonly NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Event", href: "/event" },
    { label: "Services", href: "/services" },
    { label: "Program", href: "/program" },
    { label: "Blog", href: "/insights" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const authLinks = {
    login: { label: "Login", href: "/login" },
    register: { label: "Registrasi", href: "/register" },
} as const satisfies Record<string, NavItem>;

export const contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
} = {
    // email: "",
    // phone: "",
    // address: "",
};

export const socialLinks: readonly NavItem[] = [
    // { label: "Instagram", href: "https://instagram.com/..." },
];