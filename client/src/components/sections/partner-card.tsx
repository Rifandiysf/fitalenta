import Image from "next/image";

type Partner = {
    name: string;
    /** Path logo di /public, contoh: "/partners/nama-mitra.png". Kosongkan untuk menampilkan nama saja. */
    logo?: string;
};

/**
 * GANTI dengan 37 mitra & client FITALENTA yang sebenarnya.
 * Contoh: { name: "Nama Mitra", logo: "/partners/nama-mitra.png" }
 * Baris atas dan bawah dibagi otomatis dari daftar ini.
 */
const partners: Partner[] = Array.from({ length: 37 }, (_, i) => ({
    name: `Partner ${i + 1}`,
}));

const splitAt = Math.ceil(partners.length / 2);
const rowTop = partners.slice(0, splitAt);
const rowBottom = partners.slice(splitAt);

function PartnerCard({ partner }: { partner: Partner }) {
    return (
        <div className="flex h-24 w-44 items-center justify-center border border-[#10302B]/15 bg-white px-6 sm:h-28 sm:w-56">
            {partner.logo ? (
                <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={56}
                    className="h-10 w-auto max-w-full object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-12"
                />
            ) : (
                <span className="text-center text-base font-semibold text-[#10302B]/60 sm:text-lg">
                    {partner.name}
                </span>
            )}
        </div>
    );
}

function MarqueeRow({
    items,
    direction,
    duration,
}: {
    items: Partner[];
    direction: "left" | "right";
    duration: number;
}) {
    return (
        <div className="fit-marquee-row mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div
                className={`fit-marquee-track ${direction === "left" ? "fit-marquee-left" : "fit-marquee-right"
                    }`}
                style={{ animationDuration: `${duration}s` }}
            >
                {items.map((p) => (
                    <div key={p.name} className="shrink-0 pr-4">
                        <PartnerCard partner={p} />
                    </div>
                ))}
                {items.map((p) => (
                    <div
                        key={`dup-${p.name}`}
                        aria-hidden
                        className="fit-marquee-dup shrink-0 pr-4"
                    >
                        <PartnerCard partner={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PartnersSection() {
    return (
        <section id="partners" className="text-[#10302B]">
            <style>{`
        .fit-marquee-row { overflow: hidden; }
        .fit-marquee-track { display: flex; width: max-content; animation: fit-marquee-left linear infinite; }
        .fit-marquee-right { animation-name: fit-marquee-right; }
        .fit-marquee-row:hover .fit-marquee-track { animation-play-state: paused; }
        @keyframes fit-marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fit-marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
        .fit-marquee-row { overflow-x: auto; }
        .fit-marquee-track { animation: none; }
        .fit-marquee-dup { display: none; }
        }
        `}</style>

            <div className="py-20 lg:py-28">
                <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-8">
                    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#2F6F62] sm:text-sm">
                        <span aria-hidden className="h-2.5 w-2.5 bg-secondary" />
                        OUR PARTNERS
                    </p>

                    <h2
                        id="partner"
                        className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                    >
                        Working Together With Our Partner and Clients.
                    </h2>

                    <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#10302B]/75 sm:text-lg">
                        We collaborate with companies, educational institutions,
                        organizations, and communities across different sectors.
                    </p>
                </div>


                <div className="mt-12 space-y-4 lg:mt-16">
                    <MarqueeRow items={rowTop} direction="left" duration={70} />
                    <MarqueeRow items={rowBottom} direction="right" duration={60} />
                </div>
            </div>
        </section>
    );
}