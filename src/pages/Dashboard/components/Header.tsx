import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router";

interface HeaderProps {
  role: "user" | "mentor" | "admin";
}

export default function Header({ role }: HeaderProps) {
  const welcomeText =
    role === "mentor"
      ? "Welcome back, Mentor!"
      : role === "admin"
        ? "Welcome back, Admin!"
        : "Welcome back, Student!";
  return (
    <header
      className="w-full h-20 
        bg-white dark:bg-gray-950 
        border-b border-gray-200 dark:border-gray-800
        flex items-center justify-between px-8 shadow-sm"
    >
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {welcomeText}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Find the perfect mentor for you
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search Box */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 
             text-gray-400 dark:text-gray-500 
             h-4 w-4"
          />

          <Input
            placeholder="Search mentors..."
            className="
              pl-10 w-64 rounded-xl 
              bg-[#faf5ff] dark:bg-gray-900 
              text-gray-800 dark:text-gray-200
              border border-gray-300 dark:border-gray-700
              focus-visible:ring-[#7e22ce]
            "
          />
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <ModeToggle />
          <Bell className="text-gray-600 dark:text-gray-300 w-6 h-6 hover:text-[#7e22ce] transition" />

          {/* Red Ping */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Avatar */}
        <Link to={`/${role === "student" ? "user" : role}/dashboard/profile`}>
          <Avatar className="h-10 w-10 border-2 border-[#7e22ce]">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#7e22ce] text-white font-bold"></AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
