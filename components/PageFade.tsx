"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { PRELOADER_DONE_EVENT } from "@/components/Preloader";

export default function PageFade({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onDone = () => setReady(true);
    window.addEventListener(PRELOADER_DONE_EVENT, onDone);

    // Fallback if event was missed (e.g. fast path)
    const fallback = window.setTimeout(() => setReady(true), 4200);

    return () => {
      window.removeEventListener(PRELOADER_DONE_EVENT, onDone);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={
        ready
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: reduceMotion ? 0 : 12 }
      }
      transition={{
        duration: reduceMotion ? 0.2 : 1.05,
        ease: [0.22, 1, 0.36, 1],
        delay: reduceMotion ? 0 : 0.12,
      }}
    >
      {children}
    </motion.div>
  );
}
