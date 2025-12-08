import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, Home, Calendar, MessageCircle, Settings } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarLinks = [
    { label: "Dashboard", href: "/user/dashboard", icon: Home },
    { label: "My Bookings", href: "/mybookings", icon: Calendar },
    { label: "Messages", href: "/messages", icon: MessageCircle },
    { label: "Settings", href: "/setting", icon: Settings },
  ];

  return (
    <nav
      className={cn(
        "h-screen flex flex-col border-r border-gray-200 dark:border-gray-800 bg-[#faf5ff] dark:bg-[#0d0f1a] transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-6">
        {/* Brand */}
        {!collapsed && (
          <h2 className="text-xl font-extrabold tracking-tight text-[#7e22ce] dark:text-[#b983ff]">
            Ask to Pro
          </h2>
        )}

        {/* Collapse/Expand Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {collapsed ? (
            <ChevronsRight className="h-5 w-5 text-[#7e22ce]" />
          ) : (
            <ChevronsLeft className="h-5 w-5 text-[#7e22ce]" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col space-y-2 mt-4 px-3">
        {sidebarLinks.map((item) => {
          const active = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 justify-start rounded-lg font-medium transition",
                  "text-gray-700 dark:text-gray-300 hover:bg-[#f3e8ff] hover:text-[#7e22ce]",
                  "dark:hover:bg-gray-800 dark:hover:text-[#b983ff]",
                  active &&
                    "bg-[#7e22ce] text-white hover:bg-[#6c1fa5] dark:bg-[#7e22ce] dark:text-white",
                  collapsed && "justify-center"
                )}
              >
                <Icon className="h-5 w-5" />
                {!collapsed && item.label}
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      {!collapsed && (
        <p className="px-6 pb-6 text-gray-500 dark:text-gray-600 text-sm">
          © Ask to Pro
        </p>
      )}
    </nav>
  );
}
