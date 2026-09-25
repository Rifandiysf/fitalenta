export type ImpactStat = {
    value: number;
    suffix?: string;
    label: string;
};

export const impactStats: readonly ImpactStat[] = [
    { value: 750, suffix: "+", label: "Participants" },
    { value: 30, suffix: "+", label: "Events & Training" },
    { value: 120, suffix: "+", label: "Universities, Schools, and Institutions" },
    { value: 122, suffix: "+", label: "Philanthropy Affiliates" },
];