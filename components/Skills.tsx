"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { skills } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Activity,
  HeartPulse,
  Pill,
  ShieldCheck,
};

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection
      id="skills"
      ariaLabelledby="skills-heading"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-teal-light/40 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          id="skills-heading"
          eyebrow={skills.eyebrow}
          title={skills.title}
          description={skills.description}
        />

        <ul className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {skills.clinical.map((skill, i) => {
            const Icon = iconMap[skill.icon] ?? Stethoscope;
            return (
              <motion.li
                key={skill.name}
                className="glass-panel flex flex-col items-start gap-3 rounded-2xl p-4 transition hover:border-teal/30 md:p-5"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : i * 0.04,
                }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-navy md:text-base">
                  {skill.name}
                </span>
              </motion.li>
            );
          })}
        </ul>

        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <h3 className="mb-6 text-lg font-semibold text-navy">Languages</h3>
          <ul className="space-y-6">
            {skills.languages.map((lang) => (
              <li key={lang.name}>
                <div className="mb-2 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-semibold text-navy">{lang.name}</p>
                    <p className="text-sm text-muted">{lang.note}</p>
                  </div>
                  <span className="rounded-full bg-[#0f766e]/15 px-3 py-1 text-sm font-semibold text-[#0f766e] dark:bg-[#0f766e]/40 dark:text-[#5eead4]">
                    {lang.label}
                  </span>
                </div>
                <div
                  className="h-3 overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700"
                  role="progressbar"
                  aria-valuenow={lang.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${lang.name}: ${lang.label}`}
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#0f766e] via-[#0d9488] to-[#115e59]"
                    initial={reduceMotion ? { width: `${lang.level}%` } : { width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MotionSection>
  );
}
