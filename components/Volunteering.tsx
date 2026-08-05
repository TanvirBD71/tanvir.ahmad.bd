"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HandHeart, Megaphone, Palette, type LucideIcon } from "lucide-react";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { volunteering } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Megaphone,
  HandHeart,
  Palette,
};

export default function Volunteering() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection
      id="volunteering"
      ariaLabelledby="volunteering-heading"
      className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
    >
      <SectionHeading
        id="volunteering-heading"
        eyebrow={volunteering.eyebrow}
        title={volunteering.title}
        description={volunteering.description}
      />

      <ul className="grid gap-5 md:grid-cols-3">
        {volunteering.items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Megaphone;
          return (
            <motion.li
              key={item.role}
              className="glass-panel group rounded-3xl p-6 transition hover:-translate-y-1 hover:border-teal/35 hover:shadow-lg hover:shadow-teal/10"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion ? 0 : i * 0.07,
              }}
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/10 text-teal transition group-hover:bg-teal group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold text-teal">{item.period}</p>
              <h3 className="mt-1 text-lg font-bold text-navy">{item.role}</h3>
              <p className="mt-1 text-sm font-medium text-navy-soft">{item.organization}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
            </motion.li>
          );
        })}
      </ul>
    </MotionSection>
  );
}
