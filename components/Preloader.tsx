"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  HeartPulse,
  Stethoscope,
  Syringe,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

export const PRELOADER_DONE_EVENT = "portfolio-preloader-done";

const MIN_MS = 2000;
const MAX_MS = 3600;
const EXIT_MS = 1100;

const PRELOADER_ICONS = [
  {
    Icon: Stethoscope,
    className: "left-[8%] top-[18%] text-teal-light/70",
    size: 40,
    duration: 7.5,
    delay: 0,
    drift: 16,
  },
  {
    Icon: Syringe,
    className: "right-[10%] top-[22%] text-white/55",
    size: 36,
    duration: 8.2,
    delay: 0.4,
    drift: 18,
  },
  {
    Icon: HeartPulse,
    className: "left-[12%] bottom-[20%] text-coral/60",
    size: 38,
    duration: 9,
    delay: 0.8,
    drift: 14,
  },
  {
    Icon: Activity,
    className: "right-[12%] bottom-[18%] text-teal-light/60",
    size: 36,
    duration: 7.8,
    delay: 1.1,
    drift: 16,
  },
] as const;

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [imageReady, setImageReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const reduceMotion = useReducedMotion();
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
    setShow(false);
  };

  useEffect(() => {
    if (reduceMotion) {
      const t = window.setTimeout(finish, 400);
      return () => window.clearTimeout(t);
    }

    const minTimer = window.setTimeout(() => setMinElapsed(true), MIN_MS);
    const maxTimer = window.setTimeout(finish, MAX_MS);

    const preload = new window.Image();
    preload.src = site.headshotSrc;
    const markReady = () => setImageReady(true);
    if (preload.complete) markReady();
    else {
      preload.onload = markReady;
      preload.onerror = markReady;
    }

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- finish is stable via ref
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || finishedRef.current) return;
    if (imageReady && minElapsed) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageReady, minElapsed, reduceMotion]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex min-h-[100dvh] w-screen flex-col items-center justify-center overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.04,
                  filter: "blur(10px)",
                }
          }
          transition={{
            duration: reduceMotion ? 0.2 : EXIT_MS / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-teal-dark via-[#0f766e] to-navy"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-teal/40 blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.35, 0.6, 0.35], scale: [1, 1.1, 1] }
            }
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-coral/25 blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.25, 0.5, 0.25], scale: [1, 1.08, 1] }
            }
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            aria-hidden="true"
          />

          {/* Floating medical icons */}
          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
            {PRELOADER_ICONS.map(
              ({ Icon, className, size, duration, delay, drift }, index) => (
                <div
                  key={index}
                  className={`absolute ${className}`}
                  style={
                    reduceMotion
                      ? { opacity: 0.5 }
                      : {
                          animation: `medical-float ${duration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) ${delay}s infinite`,
                          ["--float-drift" as string]: `${drift}px`,
                        }
                  }
                >
                  <div className="rounded-2xl border border-white/25 bg-white/15 p-3 backdrop-blur-sm">
                    <Icon style={{ width: size, height: size }} strokeWidth={1.5} />
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              className="relative mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-white/80 shadow-2xl shadow-black/30 sm:h-48 sm:w-48 md:h-56 md:w-56"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={site.headshotSrc}
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                className="object-cover object-[50%_12%]"
                onLoad={() => setImageReady(true)}
                onError={() => setImageReady(true)}
              />
            </motion.div>

            <motion.p
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {site.name}
            </motion.p>
            <motion.p
              className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-light sm:text-base"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              {site.title}
            </motion.p>

            <motion.div
              className="mt-10 h-1.5 w-36 overflow-hidden rounded-full bg-white/20 sm:w-44"
              aria-hidden="true"
            >
              <motion.div
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-teal-light via-white to-coral"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 1.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <p className="mt-4 text-xs font-medium tracking-wide text-white/70">
              Loading portfolio…
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
