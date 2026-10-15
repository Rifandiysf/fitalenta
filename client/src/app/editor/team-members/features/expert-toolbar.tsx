"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EXPERT_STATUS_OPTIONS } from "@/constants/editor/editor-team-member-constant";
import type { EditorExpertParams } from "@/types/editor/editor-team-member";

type ExpertToolbarProps = {
    search: string;
    isActive: EditorExpertParams["isActive"];
    onSearchChange: (value: string) => void;
    onStatusChange: (value: EditorExpertParams["isActive"]) => void;
};

export function ExpertToolbar({ search, isActive, onSearchChange, onStatusChange }: ExpertToolbarProps) {
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <Search
                    className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                />
                <Input
                    type="search"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Cari nama atau jabatan..."
                    aria-label="Cari anggota tim"
                    className="h-9 pl-8"
                />
            </div>

            <Select value={isActive} onValueChange={(value) => onStatusChange(value as EditorExpertParams["isActive"])}>
                <SelectTrigger className="h-9 w-full sm:w-44" aria-label="Filter status">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {EXPERT_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
