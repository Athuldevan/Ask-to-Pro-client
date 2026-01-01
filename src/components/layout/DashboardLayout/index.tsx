import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
    STUDENT_LINKS,
    MENTOR_LINKS,
    ADMIN_LINKS,
    type SidebarLink,
} from "@/lib/dashboardConfig";

type UserRole = "student" | "mentor" | "admin";

interface DashboardLayoutProps {
    role?: UserRole;
}

const ROLE_LINKS: Record<UserRole, SidebarLink[]> = {
    student: STUDENT_LINKS,
    mentor: MENTOR_LINKS,
    admin: ADMIN_LINKS,
};

export default function DashboardLayout({ role = "student" }: DashboardLayoutProps) {
    const links = ROLE_LINKS[role];

    return (
        <>
            <Header role={role} />
            <div className="flex h-screen">
                <Sidebar links={links} />
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
