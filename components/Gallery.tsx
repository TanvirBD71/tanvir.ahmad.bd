"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { gallery, type GalleryItem } from "@/lib/content";

function usesContainFit(fit: GalleryItem["imageFit"]) {
  return fit === "contain";
}

export default function Gallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = gallery.items.find((item) => item.id === activeId) ?? null;

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeId]);

  const lightbox =
    portalReady &&
    createPortal(
      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-brand-navy/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setActiveId(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
          >
            <motion.div
              className={`relative flex max-h-[min(92dvh,100dvh)] w-full flex-col overflow-hidden rounded-t-3xl bg-panel text-navy shadow-2xl dark:shadow-black/50 sm:max-h-[90dvh] sm:rounded-3xl ${
                usesContainFit(active.imageFit) ? "sm:max-w-3xl" : "sm:max-w-lg"
              }`}
              style={{ paddingTop: "env(safe-area-inset-top)" }}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 border-b border-navy/10 px-4 py-3 sm:hidden">
                <p className="truncate text-sm font-semibold text-navy">
                  {active.title}
                </p>
                <button
                  type="button"
                  className="focus-ring inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-teal px-3 text-white shadow-md"
                  onClick={() => setActiveId(null)}
                  aria-label="Close details and return to gallery"
                >
                  <X className="h-5 w-5" strokeWidth={2.5} />
                  <span className="text-sm font-semibold">Close</span>
                </button>
              </div>

              <button
                type="button"
                className="focus-ring absolute right-3 top-3 z-10 hidden min-h-11 min-w-11 items-center justify-center rounded-full bg-teal text-white shadow-lg sm:inline-flex"
                onClick={() => setActiveId(null)}
                aria-label="Close details and return to gallery"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>

              <div className="min-h-0 flex-1 overflow-y-auto">
                <div
                  className={`relative w-full ${
                    active.aspectClass
                      ? active.aspectClass
                      : usesContainFit(active.imageFit)
                        ? "aspect-[16/10]"
                        : "aspect-[4/3]"
                  } ${usesContainFit(active.imageFit) ? "bg-panel-muted" : ""}`}
                  style={
                    active.imageSrc
                      ? undefined
                      : {
                          background: `linear-gradient(145deg, ${active.color}, ${active.color}99)`,
                        }
                  }
                >
                  {active.imageSrc ? (
                    <Image
                      src={active.imageSrc}
                      alt={active.imageAlt || active.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 32rem"
                      className={
                        usesContainFit(active.imageFit)
                          ? "object-contain"
                          : "object-cover"
                      }
                      style={{
                        objectPosition: active.imageObjectPosition || "center",
                      }}
                    />
                  ) : null}
                </div>
                <div className="p-5 pb-8 sm:pb-5">
                  <h3
                    id="gallery-lightbox-title"
                    className="text-xl font-bold text-navy"
                  >
                    {active.title}
                  </h3>
                  <p className="mt-2 text-muted">{active.caption}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <MotionSection
      id="gallery"
      ariaLabelledby="gallery-heading"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-panel-muted/80 to-transparent dark:from-brand-navy/60" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          id="gallery-heading"
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          description={gallery.description}
        />

        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.items.map((item, i) => (
            <li key={item.id} className="mb-4 break-inside-avoid">
              <motion.button
                type="button"
                className="focus-ring group w-full overflow-hidden rounded-2xl text-left"
                onClick={() => setActiveId(item.id)}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : i * 0.05,
                }}
                aria-label={`View details: ${item.title}`}
              >
                <div
                  className={`relative w-full overflow-hidden rounded-2xl ${
                    item.aspectClass
                      ? item.aspectClass
                      : i % 3 === 0
                        ? "aspect-[4/5]"
                        : i % 3 === 1
                          ? "aspect-square"
                          : "aspect-[5/4]"
                  } ${usesContainFit(item.imageFit) ? "bg-panel-muted" : ""}`}
                  style={
                    item.imageSrc
                      ? undefined
                      : {
                          background: `linear-gradient(145deg, ${item.color}cc, ${item.color}66)`,
                        }
                  }
                >
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={
                        usesContainFit(item.imageFit)
                          ? "object-contain"
                          : "object-cover"
                      }
                      style={{
                        objectPosition: item.imageObjectPosition || "center",
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#020617]/75 via-[#020617]/35 to-transparent px-3 pb-3 pt-10 md:from-[#020617]/80 md:px-4 md:pb-4 md:pt-12 dark:from-black/80">
                    <p className="line-clamp-2 text-sm font-semibold text-white drop-shadow-sm md:text-base">
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.button>
            </li>
          ))}
        </ul>
      </div>

      {lightbox}
    </MotionSection>
  );
}
