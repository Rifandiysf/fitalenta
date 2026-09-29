import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/common/page-hero";
import { ContactForm } from "./features/contact-form";
import { getContactMock } from "@/constants/contact-constant";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Contact - FITALENTA",
    description: "Hubungi FITALENTA. Kami senang mendengar dari Anda.",
};

const socialIcons = { facebook: FaFacebookF, instagram: FaInstagram, linkedin: FaLinkedin } as const;

function InfoCard({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) {
    return (
        <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e8f1fb] text-[#0e4a8f]">
                <Icon size={22} aria-hidden />
            </div>
            <div>
                <h3 className="font-bold text-primary">{title}</h3>
                <div className="mt-1 text-slate-600">{children}</div>
            </div>
        </div>
    );
}

export default async function ContactPage() {
    const contact = await getContactMock();

    return (
        <main>
            <PageHero
                badge="FITALENTA Contact"
                title="Get in Touch"
                subtitle="We'd love to hear from you. Let's start a conversation."
                crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
            />

            <section className="bg-slate-50 py-16">
                <div className="mx-auto grid max-w-6xl items-start gap-8 px-6 lg:grid-cols-2">
                    {/* Form */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                        <h2 className="mb-6 text-2xl font-extrabold text-primary">Send Us a Message</h2>
                        <ContactForm />
                    </div>

                    {/* Info + map */}
                    <div className="space-y-4">
                        <h2 className="mb-2 text-2xl font-extrabold text-primary">Contact Information</h2>
                        <InfoCard icon={MapPin} title="Address">
                            <address className="not-italic">
                                {contact.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
                            </address>
                        </InfoCard>
                        <InfoCard icon={Phone} title="Phone">
                            <p className="hover:text-primary">{contact.phone}</p>
                        </InfoCard>
                        <InfoCard icon={Mail} title="Email">
                            <p className="hover:text-primary">{contact.email}</p>
                        </InfoCard>

                        <div className="flex items-center justify-between pt-6">
                            <h2 className="text-2xl font-extrabold text-primary">Office Location</h2>
                            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e4a8f] hover:underline">
                                Buka di Maps <ExternalLink size={14} aria-hidden />
                            </a>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                            <iframe
                                title="Lokasi kantor FITALENTA"
                                src={contact.mapEmbedUrl}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="aspect-16/10 w-full border-0"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 text-center">
                <h2 className="mb-6 text-2xl font-extrabold text-primary">Connect With Us on Social Media</h2>
                <div className="flex justify-center gap-4">
                    {contact.socials.map((social) => {
                        const Icon = socialIcons[social.name];
                        return (
                            <a
                                key={social.name}
                                href={social.href}
                                aria-label={social.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-primary hover:text-white"
                            >
                                <Icon size={22} aria-hidden />
                            </a>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}