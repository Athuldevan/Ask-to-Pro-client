import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center"></div>
                <span className="text-gray-900 dark:text-white">
                  MentorConnect
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Connecting mentors and mentees for professional growth.
              </p>
            </div>

            <div>
              <h4 className="text-gray-900 dark:text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 dark:text-white mb-4">
                For Mentors
              </h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Become a Mentor
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 dark:text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-violet-600 dark:hover:bg-violet-600 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-violet-600 dark:hover:bg-violet-600 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-violet-600 dark:hover:bg-violet-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-violet-600 dark:hover:bg-violet-600 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 MentorConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
