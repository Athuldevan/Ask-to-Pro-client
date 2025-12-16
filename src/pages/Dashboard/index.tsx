import { Outlet } from "react-router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { STUDENT_LINKS, MENTOR_LINKS, type SidebarLink } from "@/lib/dashboardConfig";

interface DashboardLayoutProps {
  role?: "student" | "mentor" | "admin";
}

export default function Dashboard({ role = "student" }: DashboardLayoutProps) {
  const links: SidebarLink[] = role === "mentor" ? MENTOR_LINKS : STUDENT_LINKS;

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
