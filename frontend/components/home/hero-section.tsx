"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Search, Command } from "lucide-react";
import { TubesCursor } from "@/components/ui/tube-cursor";
import { RevealOnScroll } from "./reveal-on-scroll";

interface HeroSectionProps {
  totalComponents: number;
  freeComponents: number;
}

export function HeroSection({ totalComponents, freeComponents }: HeroSectionProps) {
  const particlesRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 72; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-white/25 pointer-events-none";
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 55}%`;
      particle.style.animation = `float ${Math.random() * 7 + 5}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.opacity = `${Math.random() * 0.45 + 0.12}`;
      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[min(100vh,920px)] overflow-hidden border-b border-white/[0.06] bg-[#050008] pb-6 pt-6 md:pb-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(88,28,135,0.35), transparent 55%), radial-gradient(circle at 20% 30%, rgba(99,102,241,0.12), transparent 40%), radial-gradient(circle at 85% 20%, rgba(168,85,247,0.1), transparent 42%)",
        }}
      />
      {prefersReducedMotion !== true ? (
        <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block">
          <TubesCursor
            embedded
            className="h-full min-h-[min(100vh,920px)] w-full opacity-[0.38]"
            title=""
            subtitle=""
            caption=""
            enableRandomizeOnClick={false}
            initialColors={["#a855f7", "#6366f1", "#ec4899"]}
            lightColors={["#c4b5fd", "#22d3ee", "#f472b6", "#818cf8"]}
            lightIntensity={180}
          />
        </div>
      ) : null}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-[2]" />
      <div className="hero-orbit-ring pointer-events-none z-[3] scale-[0.72]" aria-hidden />
      <div className="hero-orbit-ring pointer-events-none z-[3] scale-[0.92] opacity-30" aria-hidden />
      <div className="hero-horizon-glow pointer-events-none z-[3]" aria-hidden />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[58%] z-[3] h-[min(70vw,520px)] w-[min(95vw,900px)] -translate-x-1/2 rounded-[100%] border border-white/[0.07] opacity-40"
        animate={
          prefersReducedMotion
            ? undefined
            : { rotate: [0, 360], transition: { duration: 120, repeat: Infinity, ease: "linear" } }
        }
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-4 pt-20 md:pt-24">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/35 bg-purple-500/[0.12] px-4 py-2 text-sm text-purple-100/95 shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-purple-300" />
            Ship interfaces that feel alive
          </motion.div>
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Think in motion with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-indigo-200">
              LumosUI
            </span>
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-2xl text-pretty text-base text-zinc-400 md:text-lg"
          >
            Production-ready animated UI blocks for Next.js—build stunning landing pages with glass, motion, and depth in minutes. Generate full frontend websites with powerful prompts and advanced component blocks.
          </motion.p>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link href="/components">
              <Button
                size="lg"
                className="rounded-xl border border-white/10 bg-white px-8 text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-zinc-100"
              >
                Browse components
              </Button>
            </Link>
            <Link href="/waitlist">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-purple-500/40 bg-purple-500/[0.08] text-white backdrop-blur-md hover:bg-purple-500/15 hover:text-white"
              >
                Join the waitlist
              </Button>
            </Link>
          </motion.div>
        </RevealOnScroll>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-14 w-full max-w-5xl md:mt-20"
        >
          <div className="absolute inset-x-8 -bottom-6 h-24 rounded-[100%] bg-purple-600/25 blur-3xl md:inset-x-16" aria-hidden />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-950/55 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl md:rounded-3xl">
            <div className="grid min-h-[220px] grid-cols-1 border-b border-white/[0.06] md:grid-cols-[220px_1fr_200px] md:min-h-[260px]">
              <div className="hidden flex-col gap-3 border-r border-white/[0.06] p-4 md:flex">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <div className="rounded-lg border border-white/[0.08] bg-black/30 py-2.5 pl-9 pr-3 text-xs text-zinc-500">
                    Search components…
                  </div>
                  <span className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 lg:flex">
                    <Command className="h-3 w-3" />K
                  </span>
                </div>
                <div className="space-y-1 text-xs text-zinc-400">
                  {["Backgrounds", "Cards", "Cursor", "Text"].map((label) => (
                    <div
                      key={label}
                      className="flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/[0.04]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400/80" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Today</p>
                <p className="mt-1 text-sm text-zinc-300">Ship a homepage that matches premium SaaS launches.</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  <li className="flex gap-2">
                    <span className="text-violet-300">•</span>
                    Layered hero glows, starfields, and scroll-linked depth—ready to paste.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-300">•</span>
                    Built on Tailwind CSS, React, and Framer Motion primitives you already use.
                  </li>
                </ul>
              </div>
              <div className="hidden border-l border-white/[0.06] p-4 md:block">
                <p className="text-center text-xs font-medium text-zinc-500">April 2026</p>
                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-500">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={`${d}-${i}`}>{d}</span>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1 text-[10px] text-zinc-500">
                  {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1;
                    return (
                      <span
                        key={day}
                        className={`rounded py-1 ${day === 16 ? "bg-violet-500/25 text-white ring-1 ring-violet-400/40" : ""}`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-black/25 px-4 py-2 text-[11px] text-zinc-500 md:px-5">
              <span>LumosUI preview</span>
              <span className="hidden sm:inline">Framer Motion · Tailwind v4</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
