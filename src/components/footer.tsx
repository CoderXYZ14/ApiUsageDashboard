import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 w-full bg-white/80 backdrop-blur-md dark:bg-slate-900/80 border-t border-blue-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-blue-600/70 dark:text-blue-400/70">
            © 2025 API Dashboard Inc. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link
              className="text-sm text-blue-600/70 dark:text-blue-400/70 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm text-blue-600/70 dark:text-blue-400/70 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
