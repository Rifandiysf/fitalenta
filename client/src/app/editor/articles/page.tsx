import { Suspense } from "react";
import type { Metadata } from "next";
import { ArticleManagementView } from "./features/article-management-view";

export const metadata: Metadata = {
    title: "Manajemen Artikel - FITALENTA",
};

export default function EditorArticlesPage() {
    return (
        <Suspense fallback={null}>
            <ArticleManagementView />
        </Suspense>
    );
}
