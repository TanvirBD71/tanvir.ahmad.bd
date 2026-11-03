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

    // Fallback if event was missed (e.g. fast path). Must stay above the
    // preloader's MAX_MS (1,800) so it never fires before a slow finish.
    const fallback = window.setTimeout(() => setReady(true), 2400);

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
        duration: reduceMotion ? 0.2 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0,
      }}
    >
      {children}
    </motion.div>
  );
}
