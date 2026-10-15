"use client";

import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { EDITOR_AREA } from "@/constants/editor/editor-nav";

/** Kerangka panel editor: memakai shell admin dengan navigasi & role khusus editor. */
export function EditorShell({ children }: { children: ReactNode }) {
    return <AdminShell area={EDITOR_AREA}>{children}</AdminShell>;
}
