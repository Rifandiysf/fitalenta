export type ServicePoint = {
    title: string;
    desc: string;
};

export type ServiceContent = {
    intro: string;
    listTitle?: string;
    points?: ServicePoint[];
    secondParagraph?: string;
    images?: string;
    closing?: string;
    description?: string;
};

export type ServiceItem = {
    slug: string;
    title: string;
    icon?: string | null;
    summary: string;
    content: ServiceContent;
};

export type ServicesListData = ServiceItem[];

export type ServiceDetailData = ServiceItem & {
    id: number;
    views: number;
};