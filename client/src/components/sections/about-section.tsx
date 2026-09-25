import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
    return (
        <section id="about" className="bg-white text-[#10302B]">
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 lg:py-28">
                <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#2F6F62] sm:text-sm">
                            <span aria-hidden className="h-2.5 w-2.5 bg-secondary" />
                            ABOUT FITALENTA
                        </p>

                        <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            Connecting People, Education, and Business.
                        </h2>
                    </div>

                    <div className="lg:pt-9">
                        <div className="max-w-xl space-y-4 text-base leading-relaxed text-[#10302B]/75 sm:text-lg">
                            <p>
                                FITALENTA is a business and career consulting company that
                                provides solutions in human capital, education, business
                                development, branding, events, and other professional services.
                            </p>
                            <p>
                                We aim to bridge the gap between education and the world of
                                work while creating opportunities for individuals and
                                organizations to develop.
                            </p>
                        </div>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="mt-8 h-12 border-primary/30 bg-transparent px-7 text-base font-semibold text-primary hover:bg-primary hover:text-white"
                        >
                            <Link href="/about">
                                Learn More About Us
                                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}