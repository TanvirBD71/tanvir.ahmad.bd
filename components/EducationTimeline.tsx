"use client";

import { motion, useReducedMotion } from "framer-motion";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { education } from "@/lib/content";

export default function EducationTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection
      id="education"
      ariaLabelledby="education-heading"
      className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
    >
      <SectionHeading
        id="education-heading"
        eyebrow={education.eyebrow}
        title={education.title}
        description={education.description}
      />

      <ol className="relative space-y-0 border-l-2 border-teal/25 pl-8 md:pl-10">
        {education.items.map((item, i) => (
          <motion.li
            key={`${item.institution}-${item.period}`}
            className="relative pb-10 last:pb-0"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              delay: reduceMotion ? 0 : i * 0.08,
            }}
          >
            <span
              className="absolute -left-[2.55rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-teal bg-white shadow md:-left-[2.85rem]"
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            </span>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-teal">
              {item.period}
            </p>
            <h3 className="text-xl font-bold text-navy">{item.credential}</h3>
            <p className="mt-1 font-medium text-navy-soft">{item.institution}</p>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted">{item.detail}</p>
          </motion.li>
        ))}
      </ol>
    </MotionSection>
  );
}
