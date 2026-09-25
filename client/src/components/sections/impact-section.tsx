import { ImpactStat, impactStats } from "@/constants/impact-constant";


const HEADING_ID = "impact-heading";

function StatItem({ stat }: { stat: ImpactStat }) {
    return (
        <div className="flex flex-col-reverse justify-end border-t border-white/20 pt-6">
            <dt className="mt-4 max-w-[16rem] text-base leading-snug text-white/75 sm:text-lg">
                {stat.label}
            </dt>
            <dd>
                <span className="block text-5xl font-semibold leading-none tracking-tight tabular-nums sm:text-6xl">
                    {stat.value.toLocaleString("en-US")}
                    {stat.suffix}
                </span>
                <span aria-hidden className="mt-4 block h-1 w-10 bg-secondary" />
            </dd>
        </div>
    );
}

export function ImpactSection() {
    return (
        <section
            id="impact"
            aria-labelledby={HEADING_ID}
            className="bg-primary text-white"
        >
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 lg:py-28">
                <header className="max-w-4xl">
                    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-white/80 sm:text-sm">
                        <span aria-hidden className="h-2.5 w-2.5 bg-secondary" />
                        OUR IMPACT
                    </p>

                    <h2
                        id={HEADING_ID}
                        className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                    >
                        Creating Impact Through Every Program and Partnership.
                    </h2>
                </header>

                <div className="mt-8 grid gap-6 text-base leading-relaxed text-white/75 sm:text-lg lg:grid-cols-2 lg:gap-12">
                    <p>
                        Our activities bring together individuals, businesses, educational
                        institutions, and other organizations through training, events,
                        development programs, and collaborative initiatives.
                    </p>
                    <p>
                        Through these activities, we continue to create opportunities for
                        learning, professional development, business collaboration, and
                        social contribution.
                    </p>
                </div>

                <dl className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
                    {impactStats.map((stat) => (
                        <StatItem key={stat.label} stat={stat} />
                    ))}
                </dl>
            </div>
        </section>
    );
}