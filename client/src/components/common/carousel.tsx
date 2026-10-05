"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Cols = 1 | 2 | 3 | 4;
type Gap = "sm" | "md" | "lg";

export type CarouselProps = {
    children: ReactNode;
    label: string;
    perView?: { base?: Cols; md?: Cols; lg?: Cols };
    gap?: Gap;
    prevLabel?: string;
    nextLabel?: string;
    className?: string;
    buttonClassName?: string;
    controlsClassName?: string;
};

const BASE: Record<Cols, string> = { 1: "[--cols:1]", 2: "[--cols:2]", 3: "[--cols:3]", 4: "[--cols:4]" };
const MD: Record<Cols, string> = { 1: "md:[--cols:1]", 2: "md:[--cols:2]", 3: "md:[--cols:3]", 4: "md:[--cols:4]" };
const LG: Record<Cols, string> = { 1: "lg:[--cols:1]", 2: "lg:[--cols:2]", 3: "lg:[--cols:3]", 4: "lg:[--cols:4]" };
const GAP: Record<Gap, string> = { sm: "[--gap:0.75rem]", md: "[--gap:1rem]", lg: "[--gap:1.5rem]" };

const SLIDE = "shrink-0 snap-start basis-[calc((100%_-_(var(--cols)_-_1)_*_var(--gap))_/_var(--cols))]";

const DEFAULT_BUTTON =
    "grid size-11 place-items-center rounded-full bg-white text-slate-800 ring-1 ring-slate-300 transition hover:bg-primary hover:text-white hover:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40";

export function Carousel({
    children,
    label,
    perView = { base: 1, md: 2, lg: 3 },
    gap = "lg",
    prevLabel = "Sebelumnya",
    nextLabel = "Berikutnya",
    className,
    buttonClassName,
    controlsClassName,
}: CarouselProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const update = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, [update]);

    function scrollByPage(dir: 1 | -1) {
        const el = trackRef.current;
        const slide = el?.firstElementChild as HTMLElement | null;
        if (!el || !slide) return;

        const gapPx = parseFloat(getComputedStyle(el).columnGap) || 0;
        const step = slide.offsetWidth + gapPx;
        const visible = Math.max(1, Math.round((el.clientWidth + gapPx) / step));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        el.scrollBy({ left: dir * visible * step, behavior: reduce ? "auto" : "smooth" });
    }

    const { base = 1, md = base, lg = md } = perView;

    return (
        <div className={className}>
            <div
                ref={trackRef}
                onScroll={update}
                role="region"
                aria-roledescription="carousel"
                aria-label={label}
                tabIndex={0}
                className={cn(
                    "-mx-1 flex scroll-px-1 snap-x snap-mandatory gap-(--gap) overflow-x-auto px-1 py-1",
                    "scrollbar-none [&::-webkit-scrollbar]:hidden",
                    "focus-visible:outline-2 focus-visible:outline-primary",
                    GAP[gap],
                    BASE[base],
                    MD[md],
                    LG[lg],
                )}
            >
                {Children.map(children, (child) => (
                    <div role="group" aria-roledescription="slide" className={SLIDE}>
                        {child}
                    </div>
                ))}
            </div>

            {(canPrev || canNext) && (
                <div className={cn("mt-8 flex justify-end gap-3", controlsClassName)}>
                    <button type="button" aria-label={prevLabel} disabled={!canPrev} onClick={() => scrollByPage(-1)} className={buttonClassName ?? DEFAULT_BUTTON}>
                        <ChevronLeft className="size-5" aria-hidden />
                    </button>
                    <button type="button" aria-label={nextLabel} disabled={!canNext} onClick={() => scrollByPage(1)} className={buttonClassName ?? DEFAULT_BUTTON}>
                        <ChevronRight className="size-5" aria-hidden />
                    </button>
                </div>
            )}
        </div>
    );
}