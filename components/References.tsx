"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { references } from "@/lib/content";

const AUTOPLAY_MS = 4000;
const RESUME_AFTER_MS = 6000;

const childLeft = (track: HTMLUListElement, i: number) =>
  (track.children[i] as HTMLElement).offsetLeft - track.offsetLeft;
const stepSize = (track: HTMLUListElement) =>
  track.children.length > 1 ? childLeft(track, 1) - childLeft(track, 0) : 0;
const setWidth = (track: HTMLUListElement, count: number) =>
  track.children.length > count ? childLeft(track, count) - childLeft(track, 0) : 0;

export default function References() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const resumeTimer = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const count = references.items.length;
  // The list is rendered twice; scrolling past the first set wraps
  // seamlessly back by one set width, giving an endless loop.
  const loopItems = [...references.items, ...references.items];

  const wrapIfNeeded = (track: HTMLUListElement) => {
    const width = setWidth(track, count);
    if (width > 0 && track.scrollLeft - childLeft(track, 0) >= width) {
      track.scrollLeft -= width;
    }
  };

  const updateActive = (track: HTMLUListElement) => {
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
    setActive(nearest % count);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    wrapIfNeeded(track);
    updateActive(track);
  };

  const pauseBriefly = () => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(
      () => setPaused(false),
      RESUME_AFTER_MS,
    );
  };

  const goBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    pauseBriefly();
    const step = stepSize(track);
    if (step === 0) return;
    // Stepping back from the very start: jump one set forward first so
    // there is a previous card to slide to.
    if (dir < 0 && track.scrollLeft - childLeft(track, 0) < step / 2) {
      track.scrollLeft += setWidth(track, count);
    }
    track.scrollBy({
      left: dir * step,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    pauseBriefly();
    const width = setWidth(track, count);
    const step = stepSize(track);
    if (width === 0 || step === 0) return;
    const origin = childLeft(track, 0);
    const current = track.scrollLeft - origin;
    // Choose whichever copy of the target card is closer, so dots can
    // move the carousel in either direction without a long rewind.
    let target = index * step;
    if (Math.abs(target + width - current) < Math.abs(target - current)) {
      target += width;
    }
    track.scrollTo({
      left: origin + target,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  // Only autoplay while the section is on screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || !inView) return;
    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || document.hidden) return;
      const step = stepSize(track);
      if (step > 0) {
        track.scrollBy({ left: step, behavior: "smooth" });
      }
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, inView]);

  useEffect(
    () => () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  const buttonClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal/30 text-teal transition hover:bg-teal hover:text-white";

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
            onPointerDown={pauseBriefly}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Recommendations carousel"
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {loopItems.map((item, i) => (
              <li
                key={`${item.name}-${i}`}
                aria-hidden={i >= count ? true : undefined}
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
              onClick={() => goBy(-1)}
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
                  onClick={() => goTo(i)}
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
              onClick={() => goBy(1)}
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
