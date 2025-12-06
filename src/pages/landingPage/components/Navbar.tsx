import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <>
      <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* ---------- LEFT: Logo + Name ---------- */}
          <div className="flex items-center gap-3 text-7xl">
            <TypographyH1 className = "text-fuchsia-300">
              <span className="text-54xl">Ask to Pro</span>
            </TypographyH1>
          </div>

          {/* ---------- MIDDLE: Nav Links ---------- */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-300">
            <Link to="/" className="hover:text-purple-600 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-purple-600 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-purple-600 transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* DARK MODE TOGGLE */}
            <ModeToggle />

            {/* LOGIN */}
            <Link to="/login">
              <Button variant="default">Login</Button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
