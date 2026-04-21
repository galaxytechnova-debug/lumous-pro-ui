"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Network } from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";

const items = [
  {
    title: "Next.js App Router",
    description: "Drop components into route segments, layouts, and streaming shells without rewiring styles.",
    className: "md:col-start-1 md:row-start-1",
  },
  {
    title: "Tailwind CSS v4",
    description: "Tokens, gradients, and blur utilities align with the design language we ship in every block.",
    className: "md:col-start-3 md:row-start-1",
  },
  {
    title: "Framer Motion",
    description: "Springs, layout transitions, and scroll hooks are first-class—not bolted-on afterthoughts.",
    className: "md:col-start-1 md:row-start-3",
  },
  {
    title: "Radix + shadcn patterns",
    description: "Composable primitives that feel familiar if you already build with accessible UI kits.",
    className: "md:col-start-3 md:row-start-3",
  },
];

export function IntegrationsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#05050a] px-4 py-24 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.18),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <RevealOnScroll>
          <div className="mb-4 inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-100">
            Stack fit
          </div>
          <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">Use LumosUI with your stack</h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            Opinionated motion, flexible implementation. Bring your framework conventions—we bring the sparkle.
          </p>
        </RevealOnScroll>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[min(110%,720px)] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[min(420px,55vh)] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent md:block" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-3 md:gap-6">
            {items.map((item, index) => (
              <RevealOnScroll
                key={item.title}
                delayMs={index * 70}
                className={`rounded-2xl border border-white/[0.08] bg-zinc-950/55 p-6 text-left shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-violet-400/35 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.25)] ${item.className}`}
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </RevealOnScroll>
            ))}

            <div className="flex items-center justify-center py-4 md:col-start-2 md:row-start-2 md:py-0">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: [1, 1.04, 1],
                        boxShadow: [
                          "0 0 40px rgba(139,92,246,0.35)",
                          "0 0 70px rgba(139,92,246,0.45)",
                          "0 0 40px rgba(139,92,246,0.35)",
                        ],
                      }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-24 w-24 items-center justify-center rounded-full border border-violet-400/40 bg-gradient-to-br from-violet-600/80 to-indigo-700/80 text-white shadow-[0_0_60px_rgba(99,102,241,0.45)]"
              >
                <Network className="h-10 w-10" strokeWidth={1.25} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
