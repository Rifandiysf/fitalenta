export { cn } from "cn"

const TZ = "Asia/Jakarta";
const hasTime = (iso: string) => iso.length > 10;

export function formatDate(iso: string, locale = "en-US") {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: TZ,
    }).format(new Date(iso));
}

export function formatTime(iso: string) {
    if (!hasTime(iso)) return undefined;
    const t = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: TZ,
    })
        .format(new Date(iso))
        .replace(".", ":");
    return `${t} WIB`;
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
];

export function timeAgo(iso: string, locale = "en") {
    const diff = (new Date(iso).getTime() - Date.now()) / 1000;
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });
    for (const [unit, secs] of UNITS) {
        if (Math.abs(diff) >= secs) return rtf.format(Math.trunc(diff / secs), unit);
    }
    return rtf.format(0, "minute");
}

export function isPastEvent(iso: string) {
    const d = new Date(iso);
    if (!hasTime(iso)) d.setHours(23, 59, 59, 999);
    return d.getTime() < Date.now();
}

export function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, " ").replace(/[ \t]+/g, " ").trim();
}