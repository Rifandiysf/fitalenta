import { Search } from "lucide-react";

export function EventSearch({ defaultValue }: { defaultValue?: string }) {
    return (
        <form action="/events" role="search" className="mx-auto flex max-w-2xl gap-3">
            <label htmlFor="event-search" className="sr-only">Search events</label>
            <input
                id="event-search"
                name="search"
                type="search"
                defaultValue={defaultValue}
                placeholder="Search events..."
                className="h-12 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
                type="submit"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
            >
                <Search className="size-4" />
                Search
            </button>
        </form>
    );
}