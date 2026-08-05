"use client";

import { useReducedMotion } from "framer-motion";
import {
  Activity,
  Bandage,
  Cross,
  HeartPulse,
  Hospital,
  Pill,
  Stethoscope,
  Syringe,
  Thermometer,
} from "lucide-react";

const ICONS = [
  {
    Icon: Stethoscope,
    className: "left-[3%] top-[8%] text-teal/40",
    size: 52,
    duration: 9.5,
    delay: 0,
    drift: 22,
  },
  {
    Icon: Syringe,
    className: "right-[4%] top-[14%] text-coral/35",
    size: 46,
    duration: 10.2,
    delay: 1.2,
    drift: 26,
  },
  {
    Icon: HeartPulse,
    className: "left-[6%] top-[38%] text-accent-rose/35",
    size: 48,
    duration: 11,
    delay: 0.6,
    drift: 20,
  },
  {
    Icon: Pill,
    className: "right-[5%] top-[42%] text-teal/32",
    size: 42,
    duration: 9.8,
    delay: 1.8,
    drift: 24,
  },
  {
    Icon: Thermometer,
    className: "left-[8%] top-[62%] text-navy/25",
    size: 44,
    duration: 10.6,
    delay: 0.3,
    drift: 18,
  },
  {
    Icon: Activity,
    className: "right-[7%] top-[68%] text-teal/30",
    size: 48,
    duration: 8.8,
    delay: 2.1,
    drift: 22,
  },
  {
    Icon: Hospital,
    className: "left-[4%] top-[82%] text-teal/28",
    size: 46,
    duration: 11.4,
    delay: 1.0,
    drift: 20,
  },
  {
    Icon: Bandage,
    className: "right-[6%] top-[88%] text-coral/28",
    size: 40,
    duration: 9.2,
    delay: 1.5,
    drift: 16,
  },
  {
    Icon: Cross,
    className: "left-[48%] top-[18%] text-teal/22",
    size: 38,
    duration: 12,
    delay: 0.9,
    drift: 14,
  },
  {
    Icon: Stethoscope,
    className: "right-[42%] top-[55%] text-navy/18",
    size: 44,
    duration: 10.8,
    delay: 2.4,
    drift: 18,
  },
  {
    Icon: Syringe,
    className: "left-[40%] top-[78%] text-coral/22",
    size: 40,
    duration: 9.6,
    delay: 0.5,
    drift: 20,
  },
  {
    Icon: HeartPulse,
    className: "right-[28%] top-[28%] text-accent-rose/22",
    size: 42,
    duration: 11.2,
    delay: 1.7,
    drift: 16,
  },
] as const;

export default function FloatingMedicalIcons() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {ICONS.map(({ Icon, className, size, duration, delay, drift }, index) => (
        <div
          key={index}
          className={`absolute ${className}`}
          style={
            reduceMotion
              ? { opacity: 0.35 }
              : {
                  animation: `medical-float ${duration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) ${delay}s infinite`,
                  ["--float-drift" as string]: `${drift}px`,
                  willChange: "transform, opacity",
                }
          }
        >
          <div className="rounded-3xl border border-white/50 bg-panel/50 p-3.5 shadow-md shadow-navy/5 backdrop-blur-[3px] sm:p-4 dark:border-teal/20">
            <Icon
              style={{ width: size, height: size }}
              strokeWidth={1.5}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
