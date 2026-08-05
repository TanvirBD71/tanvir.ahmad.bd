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
  glow: boolean;
};

const HERO_COLORS = [
  "rgba(13, 148, 136, 0.7)",
  "rgba(20, 184, 166, 0.55)",
  "rgba(249, 115, 22, 0.4)",
  "rgba(251, 113, 133, 0.35)",
  "rgba(30, 41, 59, 0.35)",
  "rgba(204, 251, 241, 0.85)",
];

const FOOTER_COLORS = [
  "rgba(45, 212, 191, 0.75)",
  "rgba(94, 234, 212, 0.55)",
  "rgba(251, 146, 60, 0.45)",
  "rgba(255, 255, 255, 0.35)",
  "rgba(13, 148, 136, 0.55)",
  "rgba(204, 251, 241, 0.7)",
];

function createParticles(
  width: number,
  height: number,
  count: number,
  colors: string[],
): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const vx = (Math.random() - 0.5) * 0.35;
    const vy = (Math.random() - 0.5) * 0.32;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: i % 7 === 0 ? 3.5 + Math.random() * 3.5 : 1.4 + Math.random() * 2.8,
      vx,
      vy,
      baseVx: vx,
      baseVy: vy,
      alpha: 0.35 + Math.random() * 0.55,
      color: colors[Math.floor(Math.random() * colors.length)],
      glow: i % 5 === 0,
    };
  });
}

type SpecialParticlesProps = {
  variant?: "hero" | "footer";
};

/** Rich interactive particles: glow orbs, cursor links, pointer response. */
export default function HeroSpecialParticles({
  variant = "hero",
}: SpecialParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const palette = variant === "footer" ? FOOTER_COLORS : HERO_COLORS;

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
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(110, Math.max(55, Math.floor((width * height) / 9000)));
      particles = createParticles(width, height, count, palette);

      if (reduceMotion) {
        paintStatic();
      }
    };

    const paintStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        drawParticle(p, false);
      }
    };

    const drawParticle = (p: Particle, near: boolean) => {
      const r = p.r * (near ? 1.55 : 1);
      if (p.glow || near) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        g.addColorStop(0, p.color);
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.globalAlpha = near ? 0.4 : 0.22;
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(1, p.alpha * (near ? 1.15 : 0.85));
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const updatePointerFromEvent = (clientX: number, clientY: number, active: boolean) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      pointerRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        active,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerFromEvent(e.clientX, e.clientY, true);
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      updatePointerFromEvent(e.touches[0].clientX, e.touches[0].clientY, true);
    };
    const onTouchEnd = () => {
      pointerRef.current.active = false;
    };

    resize();

    const parent = canvas.parentElement;

    if (reduceMotion) {
      window.addEventListener("resize", resize);
      return () => {
        disposed = true;
        window.removeEventListener("resize", resize);
      };
    }

    parent?.addEventListener("pointermove", onPointerMove);
    parent?.addEventListener("pointerleave", onPointerLeave);
    parent?.addEventListener("touchmove", onTouchMove, { passive: true });
    parent?.addEventListener("touchend", onTouchEnd);
    parent?.addEventListener("touchcancel", onTouchEnd);

    const linkDist = 120;
    const pushRadius = Math.min(200, Math.max(130, width * 0.22));

    const tick = () => {
      if (disposed) return;
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;

      for (const p of particles) {
        let ax = 0;
        let ay = 0;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < pushRadius) {
            const force = (1 - dist / pushRadius) * 1.15;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        }

        p.vx = p.baseVx * 0.97 + ax;
        p.vy = p.baseVy * 0.97 + ay;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;
        if (p.y < -12) p.y = height + 12;
        if (p.y > height + 12) p.y = -12;
      }

      // Soft connection lines near pointer / between nearby particles
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;

          const nearCursor =
            pointer.active &&
            Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) <
              pushRadius * 1.1;

          if (!nearCursor && dist > linkDist * 0.55) continue;

          ctx.beginPath();
          ctx.strokeStyle = nearCursor
            ? "rgba(13, 148, 136, 0.35)"
            : "rgba(13, 148, 136, 0.1)";
          ctx.globalAlpha = 1 - dist / linkDist;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Cursor ring
      if (pointer.active) {
        const ring = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          pushRadius,
        );
        ring.addColorStop(0, "rgba(13, 148, 136, 0.12)");
        ring.addColorStop(0.55, "rgba(249, 115, 22, 0.06)");
        ring.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.fillStyle = ring;
        ctx.globalAlpha = 1;
        ctx.arc(pointer.x, pointer.y, pushRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of particles) {
        const near =
          pointer.active &&
          Math.hypot(p.x - pointer.x, p.y - pointer.y) < pushRadius;
        drawParticle(p, near);
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
      parent?.removeEventListener("pointermove", onPointerMove);
      parent?.removeEventListener("pointerleave", onPointerLeave);
      parent?.removeEventListener("touchmove", onTouchMove);
      parent?.removeEventListener("touchend", onTouchEnd);
      parent?.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [reduceMotion, palette]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-[2] h-full w-full ${
        variant === "footer" ? "opacity-70" : "opacity-50"
      }`}
      aria-hidden="true"
    />
  );
}
