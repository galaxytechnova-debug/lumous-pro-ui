"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";

export function AiMotionSection() {
  const prefersReducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const ry = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#04040a] px-4 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 12%, rgba(76,29,149,0.35), transparent 42%), radial-gradient(circle at 50% 88%, rgba(99,102,241,0.2), transparent 50%)",
        }}
      />
      <div className="perspective-grid-floor" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[min(70vh,520px)] w-[120px] -translate-x-1/2 rounded-full bg-gradient-to-b from-fuchsia-400/35 via-violet-500/25 to-transparent blur-2xl md:w-[180px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.55, 0.9, 0.55], scaleY: [0.95, 1.05, 0.95] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <RevealOnScroll>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-100 backdrop-blur-md">
            Lumos motion
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Components with choreography built in
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-zinc-400 md:text-lg">
            Every block ships with tasteful defaults—hover lifts, scroll reveals, and ambient glow—so your
            marketing surfaces feel considered on day one.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100} className="mt-12 [perspective:1200px]">
          <motion.div
            style={{
              rotateX: prefersReducedMotion ? 0 : ry,
              rotateY: prefersReducedMotion ? 0 : rx,
              transformStyle: "preserve-3d",
            }}
            className="mx-auto max-w-xl rounded-2xl border border-white/[0.1] bg-zinc-950/60 p-6 text-left shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">How we tune motion for launches</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Opinionated curves, reduced-motion fallbacks, and layered lighting.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-300 to-violet-300 bg-clip-text text-sm font-medium text-transparent">
                <Sparkles className="h-4 w-4 text-fuchsia-300" />
                Hover to feel depth
              </span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-zinc-400">
              <li className="flex gap-2">
                <span className="text-violet-300">•</span>
                What should ease, what should snap, and where glow belongs in the stack.
              </li>
              <li className="flex gap-2">
                <span className="text-violet-300">•</span>
                Pairing typography rhythm with scroll-linked transforms for cinematic sections.
              </li>
            </ul>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
