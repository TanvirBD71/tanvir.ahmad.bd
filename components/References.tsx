"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { references } from "@/lib/content";

export default function References() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection
      id="references"
      ariaLabelledby="references-heading"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-teal-light/35 via-transparent to-transparent dark:from-teal/10" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          id="references-heading"
          eyebrow={references.eyebrow}
          title={references.title}
          description={references.description}
        />

        <ul className="grid gap-5 md:grid-cols-2">
          {references.items.map((item, i) => (
            <motion.li
              key={item.name}
              className="glass-panel relative rounded-3xl p-6"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion ? 0 : i * 0.07,
              }}
            >
              <span
                className="absolute bottom-6 left-0 top-6 w-1.5 rounded-r-full bg-[#0f766e] dark:bg-[#2dd4bf]"
                aria-hidden="true"
              />
              <Quote className="mb-4 h-6 w-6 text-[#0d9488] dark:text-[#2dd4bf]" aria-hidden="true" />
              <blockquote className="pl-2 text-base leading-relaxed text-[#334155] dark:text-slate-200">
                “{item.quote}”
              </blockquote>
              <footer className="mt-5 pl-2">
                <p className="font-semibold text-[#0f172a] dark:text-white">{item.name}</p>
                <p className="text-sm text-[#64748b] dark:text-slate-400">{item.role}</p>
              </footer>
            </motion.li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
