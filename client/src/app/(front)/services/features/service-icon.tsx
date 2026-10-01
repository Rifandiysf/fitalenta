import { createElement } from "react";
import { Briefcase, icons, type LucideIcon } from "lucide-react";

const toPascal = (name: string) =>
    name
        .trim()
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join("");

function resolveIcon(name?: string | null): LucideIcon {
    if (!name) return Briefcase;
    return (icons as Record<string, LucideIcon>)[toPascal(name)] ?? Briefcase;
}

export function ServiceIcon({
    name,
    size = 24,
    className,
}: {
    name?: string | null;
    size?: number;
    className?: string;
}) {
    return createElement(resolveIcon(name), { size, className, "aria-hidden": true });
}