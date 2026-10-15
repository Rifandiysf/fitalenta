"use client";

import { useState } from "react";
import type { TeamMemberSection } from "@/constants/editor/editor-team-member-constant";
import { AboutSection } from "./about-section";
import { ExpertSection } from "./expert-section";
import { SectionTabs } from "./section-tabs";

export function TeamMemberManagementView() {
    const [section, setSection] = useState<TeamMemberSection>("experts");

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Manajemen Tim</h2>
                <p className="max-w-2xl text-sm text-muted-foreground">
                    Kelola anggota tim & pakar serta konten halaman About yang tampil di website FITALENTA.
                </p>
            </div>

            <SectionTabs value={section} onChange={setSection} />

            {section === "experts" ? <ExpertSection /> : <AboutSection />}
        </div>
    );
}
