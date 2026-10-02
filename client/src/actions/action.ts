'use server';
import { headers } from "next/headers";

export async function getClientInfo() {
    const h = await headers();
    const ip =
        h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "";
    const userAgent = h.get("user-agent") ?? "";
    return { ip, userAgent };
}