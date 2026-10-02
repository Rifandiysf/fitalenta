import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceItem } from "@/types/service";
import { ServiceIcon } from "./service-icon";

export function ServiceCard({ service }: { service: ServiceItem }) {
    return (
        <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <ServiceIcon name={service.icon} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-primary">{service.title}</h3>
            <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">{service.summary}</p>
            <div className="mt-auto border-t border-slate-100 pt-5">
                <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                    Learn More
                    <ArrowRight size={14} aria-hidden />
                </Link>
            </div>
        </article>
    );
}