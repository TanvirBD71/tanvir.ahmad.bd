"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  alpha: number;
  color: string;
};

const COLORS = [
  "rgba(13, 148, 136, 0.48)",
  "rgba(30, 41, 59, 0.28)",
  "rgba(13, 148, 136, 0.3)",
  "rgba(249, 115, 22, 0.2)",
];

function createParticles(width: number, height: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const vx = (Math.random() - 0.5) * 0.26;
    const vy = -0.08 - Math.random() * 0.18;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.1 + Math.random() * 2.4,
      vx,
      vy,
      baseVx: vx,
      baseVy: vy,
      alpha: 0.28 + Math.random() * 0.45,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });
}

/** Full-viewport interactive particles (mouse + touch). */
export default function PageParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let disposed = false;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.max(36, Math.floor((width * height) / 16000)));
      particles = createParticles(width, height, count);

      if (reduceMotion) {
        ctx.clearRect(0, 0, width, height);
        for (const p of particles) {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.55;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    };

    const updatePointer = (clientX: number, clientY: number, active: boolean) => {
      pointerRef.current = { x: clientX, y: clientY, active };
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY, true);
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      updatePointer(e.touches[0].clientX, e.touches[0].clientY, true);
    };

    const onTouchEnd = () => {
      pointerRef.current.active = false;
    };

    resize();

    if (reduceMotion) {
      window.addEventListener("resize", resize);
      return () => {
        disposed = true;
        window.removeEventListener("resize", resize);
      };
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    const tick = () => {
      if (disposed) return;
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      const radius = Math.min(180, Math.max(110, width * 0.16));

      for (const p of particles) {
        let ax = 0;
        let ay = 0;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < radius) {
            const force = (1 - dist / radius) * 0.9;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        }

        p.vx = p.baseVx * 0.96 + ax;
        p.vy = p.baseVy * 0.96 + ay;
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const nearPointer =
          pointer.active && Math.hypot(p.x - pointer.x, p.y - pointer.y) < radius;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, p.alpha * (nearPointer ? 1.4 : 1));
        ctx.arc(p.x, p.y, p.r * (nearPointer ? 1.45 : 1), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[15] h-full w-full opacity-50"
      aria-hidden="true"
    />
  );
}
