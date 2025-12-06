import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NavBar() {
    return (
      <>
      <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
    

        {/* ---------- LEFT: Logo + Name ---------- */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">👥</span>
          </div>
          <span className="text-xl  text-gray-900 dark:text-white">
            MentorConnect
          </span>
        </div>

          {/* ---------- MIDDLE: Nav Links ---------- */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-300">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
          <Link to="/about" className="hover:text-purple-600 transition">About</Link>
          <Link to="/contact" className="hover:text-purple-600 transition">Contact</Link>
        </div>

        {/* ---------- RIGHT: Theme Toggle + Auth Buttons ---------- */}
        <div className="flex items-center gap-4">

          {/* DARK MODE TOGGLE */}
          <ModeToggle/>

          {/* LOGIN */}
          <Link to="/login">
            <Button variant="ghost" className="font-semibold">
              Login
            </Button>
          </Link>

          {/* SIGNUP */}
          <Link to="/signup">
            <Button className="bg-black dark:bg-white text-white dark:text-black font-semibold px-5 rounded-lg">
              Signup
            </Button>
          </Link>
        </div>
        </nav>
      </header>
       </>
    )
    
}