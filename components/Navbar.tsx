"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HeartPulse, Menu, Stethoscope, X } from "lucide-react";
import { useEffect, useState } from "react";
import NavParticles from "@/components/NavParticles";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, site } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-teal/10" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden border-b border-teal/20 backdrop-blur-xl ${
          scrolled
            ? "bg-gradient-to-r from-teal-light/90 via-panel/90 to-teal-light/80"
            : "bg-gradient-to-r from-teal/15 via-panel/75 to-coral/10"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(13,148,136,0.18),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.1),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(45,212,191,0.16),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.1),transparent_50%)]"
          aria-hidden="true"
        />
        <NavParticles />

        <nav
          className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 md:px-6"
          aria-label="Primary"
        >
          <a
            href="#hero"
            title={`${site.name} — Home`}
            className="focus-ring group inline-flex min-w-0 items-center gap-2 rounded-xl px-1.5 py-1 text-base font-bold tracking-tight text-navy transition hover:text-teal-dark sm:text-lg"
          >
            <Stethoscope
              className="h-[1.15rem] w-[1.15rem] shrink-0 text-teal transition group-hover:scale-110 group-hover:text-teal-dark"
              strokeWidth={2.25}
              aria-hidden="true"
            />
            <span className="truncate">{site.name}</span>
            <HeartPulse
              className="h-[1.15rem] w-[1.15rem] shrink-0 text-teal transition group-hover:scale-110 group-hover:text-coral"
              strokeWidth={2.25}
              aria-hidden="true"
            />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  title={link.label}
                  className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-navy-soft transition-colors hover:bg-teal/10 hover:text-teal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal/25 bg-white/60 text-navy transition hover:border-teal/45 hover:bg-teal-light/70 lg:hidden dark:bg-brand-navy/50 dark:hover:bg-teal/25"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 top-[61px] z-40 bg-brand-navy/40 backdrop-blur-sm lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="glass-panel ml-auto h-full w-[min(100%,20rem)] rounded-none border-y-0 border-r-0 border-l-teal/20 p-6"
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: "100%" }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.04 * i,
                      duration: reduceMotion ? 0 : 0.25,
                    }}
                  >
                    <a
                      href={link.href}
                      className="focus-ring block rounded-xl px-3 py-3 text-base font-medium text-navy transition-colors hover:bg-teal-light/60 hover:text-teal-dark"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
