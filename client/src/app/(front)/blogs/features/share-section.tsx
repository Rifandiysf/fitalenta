import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
    const url = encodeURIComponent(`${SITE_URL}/blogs/${slug}`);
    const text = encodeURIComponent(title);

    const links = [
        { label: "Facebook", icon: FaFacebookF, color: "bg-blue-600", href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
        { label: "X (Twitter)", icon: FaXTwitter, color: "bg-slate-900", href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
        { label: "WhatsApp", icon: FaWhatsapp, color: "bg-green-600", href: `https://wa.me/?text=${text}%20${url}` },
        { label: "LinkedIn", icon: FaLinkedinIn, color: "bg-blue-700", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    ];

    return (
        <section className="bg-white py-12">
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-100 bg-slate-50 px-6 py-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Share</p>
                <h2 className="mt-1 text-2xl font-bold text-primary">Share this article:</h2>
                <ul className="mt-6 flex justify-center gap-3">
                    {links.map(({ label, icon: Icon, color, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Share on ${label}`}
                                className={`flex size-11 items-center justify-center rounded-lg text-white transition hover:opacity-85 ${color}`}
                            >
                                <Icon className="size-5" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}