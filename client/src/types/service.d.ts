export type ServicePoint = {
    title: string;
    desc: string;
};

export type ServiceSection = {
    title?: string;
    ordered?: boolean;
    points: ServicePoint[];
};

export type ServiceContent = {
    intro: string;
    sections: ServiceSection[];
    closing?: string;
    tagline?: string;
    images?: string[];
};

export type ServiceItem = {
    slug: string;
    title: string;
    icon?: string | null;
    summary: string;
    content: ServiceContent;
    isFeatured?: boolean;
};

export type ServicesListData = ServiceItem[];

export type ServiceDetailData = ServiceItem & { id: number; views: number };