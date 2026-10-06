export type TeamMember = {
    id: number;
    name: string;
    position: string;
    bio: string | null;
    image: string | null;
};

export type TeamMembersData = TeamMember[];