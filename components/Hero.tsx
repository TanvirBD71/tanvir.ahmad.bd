"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import HeroFloatingIcons from "@/components/HeroFloatingIcons";
import HeroSpecialParticles from "@/components/HeroSpecialParticles";
import { SocialIcon } from "@/components/SocialIcons";
import { contact, site } from "@/lib/content";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="relative overflow-hidden medical-atmosphere"
    >
      <div className="medical-pattern absolute inset-0 opacity-70" aria-hidden="true" />
      <HeroSpecialParticles />
      <HeroFloatingIcons />
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-57px)] max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-6 md:py-20">
        <div className="order-2 md:order-1">
          <motion.p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-teal"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45 }}
          >
            {site.title}
          </motion.p>
          <motion.h1
            id="hero-name"
            className="group/name relative inline-block cursor-default text-4xl font-extrabold tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-7xl"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.05 }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.02,
                    y: -2,
                  }
            }
          >
            <span
              className="relative z-10 inline-block transition-[color,filter,background-position] duration-500 ease-out group-hover/name:bg-gradient-to-r group-hover/name:from-teal group-hover/name:via-[#14b8a6] group-hover/name:to-coral group-hover/name:bg-clip-text group-hover/name:text-transparent group-hover/name:drop-shadow-[0_4px_18px_rgba(13,148,136,0.45)]"
            >
              {site.name}
            </span>
            <span
              className="absolute -bottom-1.5 left-0 h-0 w-0 rounded-full bg-gradient-to-r from-teal via-[#2dd4bf] to-coral opacity-0 shadow-[0_4px_14px_rgba(13,148,136,0.4)] transition-all duration-500 ease-out group-hover/name:h-[6px] group-hover/name:w-full group-hover/name:opacity-100 sm:group-hover/name:h-[7px] md:group-hover/name:h-2"
              aria-hidden="true"
            />
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.12 }}
          >
            {site.tagline}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.18 }}
          >
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Download CV / Resume (opens in new tab)"
              className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-coral px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/25 transition hover:bg-coral-hover"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
            <a
              href="#contact"
              title="Go to contact form"
              className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-navy/15 bg-panel/80 px-5 py-3 text-sm font-semibold text-navy backdrop-blur transition hover:border-teal/40 hover:text-teal-dark dark:border-teal/25"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.ul
            className="mt-7 flex flex-wrap items-center gap-2.5"
            aria-label="Social links"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.24 }}
          >
            {contact.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    social.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={social.name}
                  title={social.name}
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-navy/10 bg-panel/80 text-navy shadow-sm shadow-navy/5 backdrop-blur transition duration-300 hover:scale-110 hover:border-coral/35 hover:bg-teal-light/80 hover:text-teal hover:shadow-md hover:shadow-teal/15 focus-visible:text-coral active:scale-105 dark:border-teal/20"
                >
                  <SocialIcon name={social.icon} />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="order-1 flex justify-center md:order-2 md:justify-end"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.1 }}
        >
          {/* Outer: CSS float only — keeps motion buttery (GPU transform) */}
          <div
            className={`relative w-full max-w-[22rem] md:max-w-[26rem] ${
              reduceMotion ? "" : "hero-float"
            }`}
          >
            {/* Inner: hover lift separate from float so they don't fight */}
            <div className="group hero-portrait-hover relative will-change-transform">
              <div
                className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-teal/35 via-transparent to-accent-rose/30 blur-2xl transition duration-700 ease-out group-hover:from-teal/60 group-hover:via-teal/20 group-hover:to-coral/45 group-hover:blur-3xl"
                aria-hidden="true"
              />
              <div className="hero-portrait relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-teal/45 bg-gradient-to-br from-teal-light via-white to-slate-100 shadow-2xl shadow-navy/15 transition-[border-color,box-shadow,filter,transform] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-3 group-hover:scale-[1.045] group-hover:border-teal/80 group-hover:brightness-[1.05] group-hover:shadow-[0_0_0_8px_rgba(13,148,136,0.2),0_0_36px_rgba(13,148,136,0.28),0_28px_56px_-12px_rgba(30,41,59,0.3)]">
                <Image
                  src={site.headshotSrc}
                  alt={site.headshotAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 22rem, 26rem"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.05]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
