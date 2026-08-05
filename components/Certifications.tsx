"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { certifications } from "@/lib/content";

export default function Certifications() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection
      id="certifications"
      ariaLabelledby="certifications-heading"
      className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
    >
      <SectionHeading
        id="certifications-heading"
        eyebrow={certifications.eyebrow}
        title={certifications.title}
        description={certifications.description}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.items.map((item, i) => (
          <motion.li
            key={item.title}
            className="glass-panel group rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/10"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              delay: reduceMotion ? 0 : i * 0.05,
            }}
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal transition group-hover:bg-teal group-hover:text-white">
              <Award className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.issuer}</p>
            <p className="mt-3 text-sm font-semibold text-teal">{item.year}</p>
          </motion.li>
        ))}
      </ul>
    </MotionSection>
  );
}
