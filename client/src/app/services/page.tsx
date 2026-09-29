import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServices } from "@/constants/service-constant";
import PageHero from "@/components/common/page-hero";

export const metadata: Metadata = {
    title: "Our Services - FITALENTA",
    description: "Empowering businesses and individuals with tailored solutions.",
};

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <main>
            <PageHero
                badge="FITALENTA Services"
                title="Our Services"
                subtitle="Empowering businesses and individuals with tailored solutions"
                crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
            />

            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mx-auto mb-12 max-w-xl text-center">
                        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[#e8590c]">What we offer</p>
                        <h2 className="text-3xl font-extrabold text-[#0a2a57]">Our Services</h2>
                        <div className="mx-auto mt-5 h-1 w-12 rounded bg-[#e8590c]" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {services.map((s) => {
                            const Icon = s.icon;
                            return (
                                <article
                                    key={s.slug}
                                    className="flex basis-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
                                >
                                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#e8f1fb] text-[#0e4a8f]">
                                        <Icon size={24} aria-hidden />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-[#0a2a57]">{s.title}</h3>
                                    <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">{s.summary}</p>
                                    <div className="mt-auto border-t border-slate-100 pt-5">
                                        <Link
                                            href={`/services/${s.slug}`}
                                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0a2a57] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                                        >
                                            Learn More <ArrowRight size={14} aria-hidden />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 text-center">
                <div className="mx-auto max-w-6xl px-6">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[#0e4a8f]">Let&apos;s connect</p>
                    <h2 className="text-3xl font-extrabold text-[#0a2a57]">Not Sure Which Service You Need?</h2>
                    <p className="mb-8 mt-3 text-slate-600">Our team of experts is here to help you find the perfect solution for your business.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[#0a2a57] px-7 py-3 font-bold text-white hover:opacity-90">
                        Get in Touch <ArrowRight size={16} aria-hidden />
                    </Link>
                </div>
            </section>
        </main>
    );
}