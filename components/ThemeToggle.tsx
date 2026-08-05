"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal/25 bg-panel/70 text-navy shadow-sm transition hover:border-teal/45 hover:bg-teal-light/70 hover:text-teal-dark dark:border-teal/35 dark:bg-brand-navy/55 dark:hover:bg-teal/25 dark:hover:text-white ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-coral" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5 text-teal" aria-hidden="true" />
      )}
    </button>
  );
}
