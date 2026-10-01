import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";
import { imageUrl, safely } from "@/lib/utils";
import { getTestimonials } from "@/lib/services/testimonial-service";

const HEADING_ID = "testimonials-heading";

function getInitials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

function Rating({ value }: { value: number }) {
    const stars = Math.min(5, Math.max(0, Math.round(value)));
    if (stars === 0) return null;

    return (
        <div role="img" aria-label={`Rating ${stars} dari 5`} className="mt-4 flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    aria-hidden
                    className={i < stars ? "h-4 w-4 text-amber-400" : "h-4 w-4 text-slate-300"}
                    fill="currentColor"
                    strokeWidth={0}
                />
            ))}
        </div>
    );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const { content, clientName, company, rating, image } = testimonial;
    const photo = imageUrl(image);

    return (
        <figure className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-[#10302B]/10 sm:p-8">
            <Quote aria-hidden className="h-8 w-8 text-primary/30" fill="currentColor" strokeWidth={0} />
            <Rating value={rating} />

            <blockquote className="mt-5 flex-1">
                <p className="text-base leading-relaxed sm:text-lg">&ldquo;{content}&rdquo;</p>
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4 border-t border-[#10302B]/10 pt-6">
                {photo ? (
                    <Image
                        src={photo}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                ) : (
                    <span
                        aria-hidden
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
                    >
                        {getInitials(clientName)}
                    </span>
                )}
                <span className="block min-w-0">
                    <span className="block font-semibold">{clientName}</span>
                    {company && <span className="block text-sm text-[#10302B]/70">{company}</span>}
                </span>
            </figcaption>
        </figure>
    );
}

export async function TestimonialsSection() {
    const testimonials = await safely(getTestimonials, [], "testimonials");
    if (testimonials.length === 0) return null;

    return (
        <section id="testimonials" aria-labelledby={HEADING_ID} className="bg-slate-50 text-[#10302B]">
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 lg:py-28">
                <header className="max-w-3xl">
                    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#2F6F62] sm:text-sm">
                        <span aria-hidden className="h-2.5 w-2.5 bg-primary" />
                        TESTIMONIALS
                    </p>

                    <h2
                        id={HEADING_ID}
                        className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                    >
                        What Our Participants and Partners Say.
                    </h2>

                    <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#10302B]/75 sm:text-lg">
                        Hear directly from people and organizations who have participated in
                        our programs and worked with FITALENTA.
                    </p>
                </header>

                <ul className="mt-12 columns-1 gap-6 md:columns-2 lg:mt-16 lg:columns-3">
                    {testimonials.map((testimonial) => (
                        <li key={testimonial.id} className="mb-6 break-inside-avoid">
                            <TestimonialCard testimonial={testimonial} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}