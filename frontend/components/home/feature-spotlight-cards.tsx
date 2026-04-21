"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers, Search } from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";

const nodes = [
  { label: "Hero glow", color: "bg-fuchsia-400", shadow: "shadow-[0_0_30px_rgba(236,72,153,0.55)]" },
  { label: "Grid cards", color: "bg-teal-400", shadow: "shadow-[0_0_28px_rgba(45,212,191,0.5)]" },
  { label: "LumosUI", color: "bg-violet-400", shadow: "shadow-[0_0_32px_rgba(167,139,250,0.55)]" },
  { label: "Launch tips", color: "bg-sky-400", shadow: "shadow-[0_0_28px_rgba(56,189,248,0.5)]" },
  { label: "Web clips", color: "bg-amber-400", shadow: "shadow-[0_0_28px_rgba(251,191,36,0.45)]" },
];

const listRows = [
  { name: "Gallery", role: "Browse", time: "Step 1", title: "Pick a category" },
  { name: "Preview", role: "Inspect", time: "Step 2", title: "Open live demo" },
  { name: "Detail page", role: "Copy", time: "Step 3", title: "Grab React source", highlight: true },
  { name: "Your app", role: "Ship", time: "Step 4", title: "Paste into route" },
];

export function FeatureSpotlightCards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#030308] px-4 py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.08),transparent_35%)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <RevealOnScroll>
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950/60 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="relative min-h-[220px] flex-1 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.12),transparent_40%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)] p-6">
              <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
              <svg className="relative z-10 h-full w-full" viewBox="0 0 360 200" fill="none" aria-hidden>
                <path
                  d="M60 120 Q 120 40 180 100 T 300 80"
                  stroke="url(#g1)"
                  strokeWidth="1.2"
                  opacity="0.55"
                />
                <path
                  d="M80 150 Q 160 60 240 120 T 320 100"
                  stroke="url(#g1)"
                  strokeWidth="1"
                  opacity="0.35"
                />
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              {nodes.map((n, i) => (
                <motion.div
                  key={n.label}
                  className={`absolute h-3 w-3 rounded-full ${n.color} ${n.shadow}`}
                  style={{
                    left: `${18 + i * 16}%`,
                    top: `${32 + (i % 3) * 14}%`,
                  }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { y: [0, -6, 0], transition: { duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" } }
                  }
                />
              ))}
              {nodes.map((n, i) => (
                <span
                  key={`${n.label}-t`}
                  className="absolute z-20 rounded-md bg-black/50 px-2 py-1 text-[10px] text-zinc-200 ring-1 ring-white/10 backdrop-blur"
                  style={{ left: `${14 + i * 16}%`, top: `${46 + (i % 3) * 14}%` }}
                >
                  {n.label}
                </span>
              ))}
            </div>
            <div className="border-t border-white/[0.06] p-6 md:p-8">
              <Layers className="h-5 w-5 text-zinc-300" />
              <h3 className="mt-3 text-xl font-semibold text-white">Your sections, connected.</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Compose hero, social proof, pricing, and FAQ as linked patterns—reuse motion recipes without
                duplicating bespoke CSS each launch.
              </p>
            </div>
          </motion.div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={90}>
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950/60 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="relative min-h-[220px] flex-1 overflow-hidden p-5">
              <div className="space-y-2">
                {listRows.map((row) => (
                  <div
                    key={row.name}
                    className={`relative flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-xs ${
                      row.highlight
                        ? "border-white/20 bg-white/[0.06] text-white"
                        : "border-white/[0.05] bg-black/30 text-zinc-500"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-zinc-200">{row.name}</p>
                      <p className="text-[10px] text-zinc-500">{row.title}</p>
                    </div>
                    <div className="text-right text-[10px] text-zinc-500">
                      <p>{row.role}</p>
                      <p>{row.time}</p>
                    </div>
                    {row.highlight ? (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-28 w-28 rounded-full border border-white/25 bg-white/10 shadow-[0_0_60px_rgba(59,130,246,0.35)] backdrop-blur-md ring-1 ring-white/20" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/[0.06] p-6 md:p-8">
              <Search className="h-5 w-5 text-zinc-300" />
              <h3 className="mt-3 text-xl font-semibold text-white">Frictionless discovery.</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Category filters and search on the gallery, plus the Ctrl/⌘ + K command palette in the navbar, get you to
                the right component page before you paste anything into your route.
              </p>
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
