import type { TeamMember } from "@/types/expert";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

export async function getPublicTeamMembers(): Promise<TeamMember[]> {
    try {
        const res = await fetch(`${API_URL}/team-members`, {
            next: { revalidate: 300, tags: ["team-members"] },
        });

        if (!res.ok) return [];

        const json = await res.json();
        return (json.data ?? json) as TeamMember[];
    } catch (error) {
        console.error("Failed to fetch team members:", error);
        return [];
    }
}