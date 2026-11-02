"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Ambulance,
  Baby,
  Bandage,
  Briefcase,
  ClipboardList,
  Cross,
  FlaskConical,
  Globe,
  GraduationCap,
  Hand,
  Heart,
  HeartHandshake,
  HeartPulse,
  Megaphone,
  Palette,
  Pill,
  Ribbon,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Thermometer,
  Users,
  Wind,
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
  Briefcase,
  Palette,
  HeartHandshake,
  ClipboardList,
  Sparkles,
  Hand,
  Scissors,
  Ambulance,
  Syringe,
  Baby,
  Users,
  Thermometer,
  Cross,
  Wind,
  Bandage,
  FlaskConical,
  Heart,
  Ribbon,
  Globe,
  Megaphone,
  GraduationCap,
};

type SkillItem = {
  name: string;
  icon: string;
};

// One clean chip style for every skill group (clinical, design & freelance):
// a small icon tile and the skill name in a single pill. Chips were made
// compact in Nov 2026 (smaller tile, padding and gaps) because the clinical
// list had grown long enough to dominate the scroll on phones.
function SkillGroup({
  title,
  items,
  reduceMotion,
  className,
}: {
  title: string;
  items: SkillItem[];
  reduceMotion: boolean | null;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="mb-3 text-lg font-semibold text-navy">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((skill, i) => {
          const Icon = iconMap[skill.icon] ?? Stethoscope;
          return (
            <motion.li
              key={skill.name}
              className="glass-panel inline-flex max-w-full items-center gap-2 rounded-xl px-3 py-2 transition hover:border-teal/30"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                // Cap the stagger so the last chips don't fade in late.
                delay: reduceMotion ? 0 : Math.min(i * 0.03, 0.3),
              }}
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-[13px] font-semibold leading-snug text-navy sm:text-sm">
                {skill.name}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

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

        <SkillGroup
          title="Clinical skills"
          items={skills.clinical}
          reduceMotion={reduceMotion}
          className={skills.other.length > 0 ? "mb-6" : "mb-8"}
        />

        <SkillGroup
          title="Design & freelance"
          items={skills.other}
          reduceMotion={reduceMotion}
          className="mb-8"
        />

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
