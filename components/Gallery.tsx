"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MotionSection from "@/components/MotionSection";
import SectionHeading from "@/components/SectionHeading";
import { gallery, type GalleryItem } from "@/lib/content";

function usesContainFit(fit: GalleryItem["imageFit"]) {
  return fit === "contain";
}

export default function Gallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const active = gallery.items.find((item) => item.id === activeId) ?? null;

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
                aria-label={`Enlarge: ${item.title}`}
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
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#020617]/80 via-[#020617]/25 to-transparent p-4 transition group-hover:from-[#020617]/90 dark:from-black/85 dark:via-black/35 dark:group-hover:from-black/95">
                    <p className="font-semibold text-white drop-shadow-sm">{item.title}</p>
                    <p className="mt-1 text-sm text-white/90 drop-shadow-sm">{item.caption}</p>
                  </div>
                </div>
              </motion.button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-navy/75 p-4 backdrop-blur-sm"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setActiveId(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
          >
            <motion.div
              className={`relative w-full overflow-hidden rounded-3xl bg-panel text-navy shadow-2xl dark:shadow-black/50 ${
                usesContainFit(active.imageFit) ? "max-w-3xl" : "max-w-lg"
              }`}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
            >
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
                    sizes="32rem"
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
              <div className="p-5">
                <h3 id="gallery-lightbox-title" className="text-xl font-bold text-navy">
                  {active.title}
                </h3>
                <p className="mt-2 text-muted">{active.caption}</p>
              </div>
              <button
                type="button"
                className="focus-ring absolute right-3 top-3 inline-flex rounded-full bg-panel/90 p-2 text-navy shadow"
                onClick={() => setActiveId(null)}
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MotionSection>
  );
}
