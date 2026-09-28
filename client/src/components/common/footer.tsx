import Link from "next/link";
import { Icon, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { navItems, siteConfig } from "@/constants/site-config";
import { getContactMock } from "@/constants/contact-constant";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

const linkClass =
    "text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#10302B]";

const socialIcons = { facebook: FaFacebookF, instagram: FaInstagram, linkedin: FaLinkedin } as const;

function FooterHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            {children}
        </h2>
    );
}

export async function Footer() {
    const contact = await getContactMock();

    return (
        <footer className="bg-primary text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:py-20">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:gap-10">
                    <div className="max-w-xs">
                        <Logo tone="light" width={108} height={25} />
                        <p className="mt-5 text-base leading-relaxed text-white/70">
                            {siteConfig.description}
                        </p>
                    </div>

                    <nav aria-label="Footer">
                        <FooterHeading>Explore</FooterHeading>
                        <ul className="mt-5 space-y-3 text-base">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className={linkClass}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <FooterHeading>Contact us</FooterHeading>
                        <address className="mt-5 space-y-4 text-base not-italic">
                            <p className="flex items-start gap-3">
                                <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                                <a
                                    href={contact.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkClass}
                                >
                                    {contact.addressLines.map((line) => (
                                        <span key={line} className="block">{line}</span>
                                    ))}
                                </a>
                            </p>
                            <p className="flex items-center gap-3">
                                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                                <p className={linkClass}>
                                    {contact.phone}
                                </p>
                            </p>
                            <p className="flex items-center gap-3">
                                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                                <p className={linkClass}>
                                    {contact.email}
                                </p>
                            </p>
                            <Link
                                href="/contact"
                                className="mt-6 inline-block rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#10302B]"
                            >
                                Contact Us
                            </Link>
                        </address>
                    </div>

                    <div>
                        <FooterHeading>Follow Us</FooterHeading>
                        {contact.socials.length > 0 && (
                            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                                {contact.socials.map((social) => {
                                    const Icon = socialIcons[social.name]
                                    return (
                                        <li key={social.href}>
                                            <a
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={linkClass}
                                            >
                                                <Icon size={24}/>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="mt-14 border-t border-white/15 pt-6 text-sm text-white/50">
                    <p>
                        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer >
    );
}