import { CircleCheck } from "lucide-react";

export function CheckList({ items, className }: { items: string[]; className?: string }) {
    return (
        <ul className={className ?? "space-y-3"}>
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 break-inside-avoid pb-3 text-sm leading-relaxed text-slate-700">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                    {item}
                </li>
            ))}
        </ul>
    );
}