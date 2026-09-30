import { Pagination } from "./pagination";

export type EventCategory = {
    id: number;
    name: string;
};

export type EventItem = {
    id: number;
    title: string;
    slug: string;
    description: string;
    eventDate: string;
    location: string;
    link?: string | null;
    isFeatured: boolean;
    maxParticipants?: number | null;
    categoryId: number;
    category?: EventCategory | null;
    image?: string | null;
    views: number;
    createdAt?: string;
};

export type EventsListData = {
    events: EventItem[];
    pagination: Pagination;
};

export type EventDetailData = {
    event: EventItem;
    googleCalendarUrl: string;
    relatedEvents: EventItem[];
};