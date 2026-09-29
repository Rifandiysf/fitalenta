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

export type Pagination = {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
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

export type ApiEnvelope<T> = {
    success: boolean;
    data: T;
    message?: string;
};