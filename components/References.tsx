"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { references } from "@/lib/content";

export default function References() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const count = references.items.length;

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, count - 1));
    const child = track.children[clamped] as HTMLElement | undefined;
    if (child) {
      track.scrollTo({
        left: child.offsetLeft - track.offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    let nearest = 0;
    let best = Infinity;
    Array.from(track.children).forEach((el, i) => {
      const distance = Math.abs(
        (el as HTMLElement).offsetLeft - track.offsetLeft - track.scrollLeft,
      );
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const buttonClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal/30 text-teal transition hover:bg-teal hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-teal";

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

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
        >
          <ul
            ref={trackRef}
            onScroll={handleScroll}
            aria-label="Recommendations carousel"
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {references.items.map((item) => (
              <li
                key={item.name}
                className="relative w-[85%] flex-none snap-start sm:w-[47%] lg:w-[32.5%]"
              >
                <div className="glass-panel relative flex h-full flex-col rounded-3xl p-6">
                  <span
                    className="absolute bottom-6 left-0 top-6 w-1.5 rounded-r-full bg-[#0f766e] dark:bg-[#2dd4bf]"
                    aria-hidden="true"
                  />
                  <Quote
                    className="mb-4 h-6 w-6 text-[#0d9488] dark:text-[#2dd4bf]"
                    aria-hidden="true"
                  />
                  <blockquote className="pl-2 text-base leading-relaxed text-[#334155] dark:text-slate-200">
                    “{item.quote}”
                  </blockquote>
                  <footer className="mt-auto pl-2 pt-5">
                    <p className="font-semibold text-[#0f172a] dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#64748b] dark:text-slate-400">
                      {item.role}
                    </p>
                  </footer>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
              aria-label="Previous recommendation"
              className={buttonClass}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2">
              {references.items.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to recommendation ${i + 1} from ${item.name}`}
                  aria-current={i === active ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all ${
                    i === active
                      ? "w-6 bg-teal"
                      : "w-2.5 bg-teal/30 hover:bg-teal/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === count - 1}
              aria-label="Next recommendation"
              className={buttonClass}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
