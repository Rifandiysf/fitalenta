import type { Metadata } from "next";
import { UserManagementView } from "./features/user-management-view";

export const metadata: Metadata = {
    title: "Manajemen User - FITALENTA",
};

export default function AdminUserPage() {
    return <UserManagementView />;
}
