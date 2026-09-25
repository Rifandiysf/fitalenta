import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const HEADING_ID = "cta-heading";

export function CtaSection() {
    return (
        <section
            aria-labelledby={HEADING_ID}
            className="px-6 py-20 text-white md:px-8 lg:py-28"
        >
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-8 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10 sm:-right-16 sm:-top-16 lg:-right-10 lg:-top-10 lg:h-96 lg:w-96"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-40 -top-40 h-112 w-md rounded-full border border-white/10 sm:-right-32 sm:-top-32 lg:-right-28 lg:-top-28 lg:h-144 lg:w-xl"
                />

                <div className="relative max-w-3xl">
                    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-white/80 sm:text-sm">
                        <span aria-hidden className="h-2.5 w-2.5 bg-secondary" />
                        LET&apos;S CONNECT
                    </p>

                    <h2
                        id={HEADING_ID}
                        className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
                    >
                        Let&apos;s Explore What We Can Build Together.
                    </h2>

                    <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
                        Have a business need, partnership opportunity, program idea, or
                        question about our services? Get in touch with the FITALENTA team.
                    </p>

                    <Button
                        asChild
                        size="lg"
                        className="mt-10 h-12 bg-white px-7 text-base font-semibold text-primary hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                        <Link href="/contact">
                            Contact Us
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}