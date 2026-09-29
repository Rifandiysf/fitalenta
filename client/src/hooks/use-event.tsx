import { getEvents } from "@/lib/apis/auth/event-api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function eventsQueryKey(search: string, page: number) {
    return ["events", { search, page }] as const;
}

export function useEvents(search: string, page: number) {
    return useQuery({
        queryKey: eventsQueryKey(search, page),
        queryFn: () => getEvents({ search: search || undefined, page }),
        placeholderData: keepPreviousData,
    });
}