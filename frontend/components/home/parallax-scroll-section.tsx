"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowRight, Sparkles } from "lucide-react";
import GridGlowBackground from "@/components/ui/grid-glow-background";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "./reveal-on-scroll";

const layers = [
  {
    title: "Scroll-linked depth",
    copy: "Parallax glows, floating gradients, and staged reveals that track progress without overwhelming readers.",
  },
  {
    title: "Brand-grade polish",
    copy: "Glass shells, hairline borders, and balanced typography defaults so marketing pages feel intentional.",
  },
  {
    title: "Launch velocity",
    copy: "Swap copy, tune colors, ship. Spend less time inventing motion curves and more time validating the story.",
  },
];

export function ParallaxScrollSection() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const yOne = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -180]);
  const yTwo = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -110]);
  const yThree = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -70]);
  const rotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -8]);
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.08]);

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#020208] px-4 py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.18), transparent 55%), radial-gradient(circle at 20% 70%, rgba(99,102,241,0.12), transparent 40%)",
        }}
      />
      <motion.div className="pointer-events-none absolute inset-0 opacity-50" style={{ y: yOne }}>
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-500/15 blur-[140px]" />
      </motion.div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-blue-100/90 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-sky-300" />
            All your sections, connected
          </div>
          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Give your interface launch superpowers
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-zinc-400 md:text-lg">
            Mirror the way great product sites layer story: hero tension, proof, depth, and conversion—wired
            together with motion that respects attention.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div style={{ y: yTwo }} className="relative">
            <motion.div style={{ rotate, scale }} className="mx-auto max-w-3xl">
              <GridGlowBackground
                glowCount={9}
                backgroundColor="#05060f"
                gridColor="rgba(255,255,255,0.06)"
                className="overflow-hidden rounded-[2rem] border border-white/10 min-h-[420px]"
              >
                <div className="relative flex w-full max-w-3xl flex-col gap-5 p-4 md:p-5">
                  <motion.div
                    style={{ y: yThree }}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0c1020]/85 p-5 backdrop-blur-xl"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Illustration</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">Layered marketing layout</h3>
                      </div>
                      <div className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
                        Demo only
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-sm text-zinc-300">Motion layers</span>
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.65)]" />
                        </div>
                        <div className="grid grid-cols-3 gap-2.5">
                          {[
                            { label: "Hero", value: "Glow" },
                            { label: "Scroll", value: "Depth" },
                            { label: "CTA", value: "Lift" },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="rounded-xl border border-white/10 bg-black/25 px-2.5 py-2"
                            >
                              <p className="text-[10px] uppercase tracking-wide text-zinc-500">{item.label}</p>
                              <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="h-2.5 w-full rounded-full bg-white/10" />
                          <div className="h-2.5 w-4/5 rounded-full bg-gradient-to-r from-blue-400/60 to-violet-400/60" />
                          <div className="h-2.5 w-3/5 rounded-full bg-white/15" />
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Example sections</p>
                        <div className="mt-3 space-y-2.5">
                          {[
                            "Hero with motion",
                            "Social proof strip",
                            "Pricing comparison",
                            "FAQ + footer",
                          ].map((event, index) => (
                            <div key={event} className="flex items-center gap-3">
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  index === 3 ? "bg-emerald-400" : "bg-violet-300/80"
                                }`}
                              />
                              <p className="text-xs text-zinc-300">{event}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    style={{ y: yOne }}
                    className="ml-auto w-full max-w-xl rounded-[1.4rem] border border-white/10 bg-[#070a14]/90 p-4 backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Composition</p>
                        <p className="mt-2 text-lg font-medium text-white">Conversion rhythm</p>
                      </div>
                      <Activity className="h-5 w-5 text-violet-300" />
                    </div>
                    <div className="mt-4 space-y-2.5">
                      {[
                        { label: "Hero message", score: "Motion tuned" },
                        { label: "Social proof", score: "Glass + type" },
                        { label: "Pricing clarity", score: "Readable density" },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-3 py-2"
                        >
                          <p className="text-xs text-zinc-300">{row.label}</p>
                          <p className="text-xs font-medium text-violet-200">{row.score}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </GridGlowBackground>
            </motion.div>
          </motion.div>

          <RevealOnScroll className="space-y-4" delayMs={120}>
            {layers.map((layer, index) => (
              <div
                key={layer.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
                style={{
                  transform: prefersReducedMotion ? "none" : `translate3d(0, ${index * 8}px, 0)`,
                }}
              >
                <p className="text-sm font-medium text-indigo-300">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{layer.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">{layer.copy}</p>
              </div>
            ))}

            <div className="pt-4">
              <Link href="/components">
                <Button size="lg" className="rounded-xl bg-indigo-600 text-white hover:bg-indigo-500">
                  Explore the gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
