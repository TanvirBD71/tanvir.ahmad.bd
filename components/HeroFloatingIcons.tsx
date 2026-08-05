"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import {
  Activity,
  HeartPulse,
  Pill,
  Stethoscope,
  Syringe,
  Thermometer,
} from "lucide-react";
import { useEffect, useRef } from "react";

const ICONS = [
  {
    Icon: Stethoscope,
    className: "left-[4%] top-[16%] text-teal/55",
    size: 56,
    duration: 8.5,
    delay: 0,
    drift: 20,
    parallax: 18,
  },
  {
    Icon: Syringe,
    className: "right-[5%] top-[18%] text-coral/50",
    size: 50,
    duration: 9.2,
    delay: 0.5,
    drift: 24,
    parallax: -16,
  },
  {
    Icon: HeartPulse,
    className: "left-[8%] bottom-[20%] text-accent-rose/50",
    size: 52,
    duration: 10,
    delay: 1,
    drift: 18,
    parallax: 14,
  },
  {
    Icon: Pill,
    className: "right-[9%] bottom-[18%] text-teal/45",
    size: 46,
    duration: 8.8,
    delay: 1.3,
    drift: 22,
    parallax: -12,
  },
  {
    Icon: Thermometer,
    className: "left-[42%] top-[10%] text-navy/30",
    size: 44,
    duration: 11,
    delay: 0.3,
    drift: 14,
    parallax: 10,
  },
  {
    Icon: Activity,
    className: "right-[36%] bottom-[10%] text-teal/40",
    size: 48,
    duration: 9.6,
    delay: 1.6,
    drift: 16,
    parallax: -14,
  },
] as const;

export default function HeroFloatingIcons() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(nx * 28);
      my.set(ny * 20);
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my, reduceMotion]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
      aria-hidden="true"
    >
      {ICONS.map(({ Icon, className, size, duration, delay, drift, parallax }, index) => (
        <motion.div
          key={index}
          className={`absolute ${className}`}
          style={
            reduceMotion
              ? undefined
              : {
                  x: springX,
                  y: springY,
                }
          }
        >
          <div
            className="hero-icon-float"
            style={
              reduceMotion
                ? { opacity: 0.55 }
                : {
                    animation: `medical-float ${duration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) ${delay}s infinite`,
                    ["--float-drift" as string]: `${drift}px`,
                    transform: `translateX(${parallax * 0.15}px)`,
                  }
            }
          >
            <div className="rounded-3xl border border-teal/25 bg-panel/70 p-4 shadow-lg shadow-teal/10 backdrop-blur-md dark:border-teal/30">
              <Icon style={{ width: size, height: size }} strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
