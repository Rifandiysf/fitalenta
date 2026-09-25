import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Expert, experts } from "@/constants/expert-constant";

const HEADING_ID = "experts-heading";

/** Warna placeholder foto; berputar sesuai urutan expert. */
const PLACEHOLDER_TONES = [
    "from-[#7FB0A2] to-[#2F6F62]",
    "from-[#2F6F62] to-primary",
    "from-primary to-[#10302B]",
] as const;

function ExpertCard({ expert, index }: { expert: Expert; index: number }) {
    const tone = PLACEHOLDER_TONES[index % PLACEHOLDER_TONES.length];

    return (
        <article>
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl">
                {expert.photo ? (
                    <Image
                        src={expert.photo}
                        alt={expert.name}
                        fill
                        sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                    />
                ) : (
                    // Placeholder: isi `photo` di experts.ts untuk menggantinya dengan foto asli.
                    <div
                        aria-hidden
                        className={`flex h-full w-full items-end justify-center bg-linear-to-br ${tone}`}
                    >
                        <User
                            className="h-3/5 w-3/5 text-white/25"
                            strokeWidth={1}
                            fill="currentColor"
                        />
                    </div>
                )}
            </div>

            <h3 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
                {expert.name}
            </h3>
            <p className="mt-1 text-base text-[#2F6F62] sm:text-lg">{expert.role}</p>
        </article>
    );
}

export function ExpertsSection() {
    return (
        <section
            id="experts"
            aria-labelledby={HEADING_ID}
            className="bg-white text-[#10302B]"
        >
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 lg:py-28">
                <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#2F6F62] sm:text-sm">
                            <span aria-hidden className="h-2.5 w-2.5 bg-secondary" />
                            OUR EXPERTS
                        </p>

                        <h2
                            id={HEADING_ID}
                            className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                        >
                            People Behind Our Programs.
                        </h2>

                        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[#10302B]/75 sm:text-lg">
                            Our programs are supported by professionals and practitioners with
                            experience in their respective fields.
                        </p>
                    </div>

                    <Button
                        asChild
                        size="lg"
                        className="h-12 self-start bg-primary px-7 text-base font-semibold text-white hover:bg-primary/80 focus-visible:ring-primary lg:self-auto"
                    >
                        <Link href="/experts">
                            Meet Our Experts
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </Link>
                    </Button>
                </header>

                <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                    {experts.map((expert, index) => (
                        <li key={expert.name}>
                            <ExpertCard expert={expert} index={index} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}