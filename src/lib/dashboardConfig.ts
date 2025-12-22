import {
  Home,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";

export type SidebarLink = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export const STUDENT_LINKS: SidebarLink[] = [
  { label: "Find Mentors", href: "/user/dashboard/mentors", icon: Home },
  { label: "My Bookings", href: "mybookings", icon: Calendar },
  { label: "Profile", href: "profile", icon: User },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Settings", href: "/setting", icon: Settings },
  { label: "Logout", href: "/", icon: LogOut },
];

export const MENTOR_LINKS: SidebarLink[] = [
  { label: "Dashboard", href: "/mentor/dashboard", icon: LayoutDashboard },
  { label: "My Sessions", href: "sessions", icon: Calendar },
  { label: "Messages", href: "messages", icon: MessageCircle },
  { label: "Settings", href: "settings", icon: Settings },
  { label: "Logout", href: "/", icon: LogOut },
];

export const ADMIN_LINKS: SidebarLink[] = [
  {
    label: "Mentors",
    href: "/admin/dashboard/pending/mentors",
    icon: LayoutDashboard,
  },
  { label: "settings", href: "settings", icon: LayoutDashboard },
  { label: "users", href: "users", icon: LayoutDashboard },
];
