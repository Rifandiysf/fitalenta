import { getEvents } from "@/services/event-service";
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