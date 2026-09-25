import { Testimonial, testimonials } from "@/constants/testimonial-constant";
import { Quote } from "lucide-react";

const HEADING_ID = "testimonials-heading";

function getInitials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const { quote, name, role, organization } = testimonial;
    const affiliation = [role, organization].filter(Boolean).join(", ");

    return (
        <figure className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-[#10302B]/10 sm:p-8">
            <Quote
                aria-hidden
                className="h-8 w-8 text-primary/30"
                fill="currentColor"
                strokeWidth={0}
            />

            <blockquote className="mt-5 flex-1">
                <p className="text-base leading-relaxed sm:text-lg">
                    &ldquo;{quote}&rdquo;
                </p>
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4 border-t border-[#10302B]/10 pt-6">
                <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
                >
                    {getInitials(name)}
                </span>
                <span className="block min-w-0">
                    <span className="block font-semibold">{name}</span>
                    {affiliation && (
                        <span className="block text-sm text-[#10302B]/70">
                            {affiliation}
                        </span>
                    )}
                </span>
            </figcaption>
        </figure>
    );
}

export function TestimonialsSection() {
    return (
        <section
            id="testimonials"
            aria-labelledby={HEADING_ID}
            className="bg-[#EEF3F1] text-[#10302B]"
        >
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
                        <li key={testimonial.name} className="mb-6 break-inside-avoid">
                            <TestimonialCard testimonial={testimonial} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}