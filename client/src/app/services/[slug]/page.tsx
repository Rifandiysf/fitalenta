import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getService, getServices } from "@/constants/service-constant";
import PageHero from "@/components/common/page-hero";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const service = await getService((await params).slug);
    return service
        ? { title: `${service.title} - FITALENTA`, description: service.content.intro.slice(0, 155) }
        : {};
}

export default async function ServiceDetailPage({ params }: Props) {
    const service = await getService((await params).slug);
    if (!service) notFound();

    const { content } = service;
    const Icon = service.icon;

    return (
        <main>
            <PageHero
                badge="Our Services"
                title={service.title}
                crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
            />

            <section className="bg-slate-50 py-16">
                <div className="mx-auto grid max-w-6xl items-start gap-8 px-6 lg:grid-cols-[1fr_340px]">
                    <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                        <h2 className="mb-5 text-2xl font-extrabold text-[#0a2a57]">{service.title}</h2>
                        <p className="leading-relaxed text-slate-700">{content.intro}</p>

                        {content.points && (
                            <>
                                {content.listTitle && <p className="mb-4 mt-8 font-semibold text-slate-900">{content.listTitle}</p>}
                                <ul className="space-y-5">
                                    {content.points.map((p) => (
                                        <li key={p.title} className="border-l-4 border-[#e8590c] pl-4">
                                            <h3 className="font-bold text-slate-900">{p.title}</h3>
                                            <p className="mt-1 leading-relaxed text-slate-600">{p.desc}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {content.closing && <p className="mt-8 leading-relaxed text-slate-700">{content.closing}</p>}
                    </article>

                    {/* Sidebar sticky, tidak tertimpa tombol chat karena sekarang berada di kolom sendiri */}
                    <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
                        <div className="bg-linear-to-br from-[#071d40] to-[#0e4a8f] p-7 text-white">
                            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-white/15">
                                <Icon size={24} aria-hidden />
                            </div>
                            <h2 className="text-xl font-bold leading-snug">{service.title}</h2>
                        </div>
                        <div className="p-6">
                            <Link href="/contact" className="block rounded-xl bg-[#f05a22] px-5 py-3.5 text-center font-bold text-white hover:opacity-90">
                                Request This Service
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-linear-to-br from-[#0a2a57] to-[#0e4a8f] py-20 text-center text-white">
                <div className="mx-auto max-w-3xl px-6">
                    <p className="mb-2 text-sm uppercase tracking-wide text-white/70">Ready when you are</p>
                    <h2 className="text-3xl font-extrabold">Ready to Get Started?</h2>
                    <p className="mb-8 mt-3 text-lg text-white/90">
                        Let&apos;s work together to elevate your business with our {service.title} service.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-bold text-[#0a2a57] hover:opacity-90">
                        Contact Us <ArrowRight size={16} aria-hidden />
                    </Link>
                </div>
            </section>
        </main>
    );
}