import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Service, services } from "@/constants/service-constant";


const HEADING_ID = "services-heading";

function ServiceItem({ service }: { service: Service }) {
    return (
        <li className="border-t border-[#10302B]/15 last:border-b">
            <Link
                href={`/services/${service.slug}`}
                className="group block px-4 py-7 transition-colors hover:bg-[#EEF3F1] focus-visible:bg-[#EEF3F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-6 sm:py-8"
            >
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {service.title}
                </h3>

                <p className="mt-3 max-w-xl text-base leading-relaxed text-[#10302B]/75">
                    {service.description}
                </p>

                <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary sm:text-base">
                    Learn More
                    <span className="sr-only">&nbsp;about {service.title}</span>
                    <ArrowRight
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                        aria-hidden
                    />
                </span>
            </Link>
        </li>
    );
}

export function ServicesSection() {
    return (
        <section
            id="services"
            aria-labelledby={HEADING_ID}
            className="bg-white text-[#10302B]"
        >
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-8 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:py-28">
                <header className="self-start lg:sticky lg:top-28">
                    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#2F6F62] sm:text-sm">
                        <span aria-hidden className="h-2.5 w-2.5 bg-secondary" />
                        OUR SERVICES
                    </p>

                    <h2
                        id={HEADING_ID}
                        className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                    >
                        Solutions for People, Business, and Organizations.
                    </h2>

                    <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-[#10302B]/75 sm:text-lg">
                        Our services cover different needs across human capital, education,
                        business development, branding, events, and professional
                        development.
                    </p>
                </header>

                <ul>
                    {services.map((service) => (
                        <ServiceItem key={service.slug} service={service} />
                    ))}
                </ul>
            </div>
        </section>
    );
}