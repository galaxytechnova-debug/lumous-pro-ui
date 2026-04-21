"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/components-data";
import { previewComponents } from "@/components/live-previews";
import { RevealOnScroll } from "./reveal-on-scroll";
import { TiltCard } from "./tilt-card";

const showcaseCategories = [
  { id: "backgrounds", label: "Backgrounds" },
  { id: "cards", label: "Cards" },
  { id: "cursor", label: "Cursor" },
  { id: "text", label: "Text" },
  { id: "buttons", label: "Buttons" },
  { id: "loaders", label: "Loaders" },
];

export function ComponentShowcase() {
  const [activeCategory, setActiveCategory] = useState("backgrounds");
  const prefersReducedMotion = useReducedMotion();

  const currentCategory = categories.find((c) => c.slug === activeCategory);
  const components = currentCategory?.items.slice(0, 4) || [];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#04040a] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.14),transparent_45%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <RevealOnScroll className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">Gallery</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Pick a category, preview the motion
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-zinc-400">
            LumosUI groups animated primitives so you can scan fast, copy the block you need, and keep your
            design system cohesive.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mb-12 flex flex-wrap justify-center gap-2" delayMs={80}>
          {showcaseCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-violet-600 text-white shadow-[0_0_30px_rgba(139,92,246,0.35)]"
                  : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:border-violet-400/30 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </RevealOnScroll>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {components.map((component, index) => {
            const Preview = previewComponents[component.slug];
            return (
              <RevealOnScroll key={component.slug} delayMs={index * 70}>
                <TiltCard className="h-full">
                  <Link
                    href={`/components/${component.slug}`}
                    className="group relative block h-full rounded-2xl border border-white/[0.08] bg-zinc-950/55 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-violet-400/35"
                  >
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { y: [0, -3, 0] }
                      }
                      transition={
                        prefersReducedMotion
                          ? undefined
                          : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                      }
                    >
                      <div className="mb-4 flex h-32 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-black/40">
                        {Preview ? (
                          <div className="flex h-full min-h-0 w-full flex-col pointer-events-none [&>*]:!h-full [&>*]:!min-h-0 [&>*]:!rounded-none">
                            <Preview />
                          </div>
                        ) : (
                          <div className="h-16 w-16 animate-pulse rounded-lg bg-gradient-to-br from-violet-500/40 to-indigo-500/40" />
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white transition-colors group-hover:text-violet-200">
                            {component.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-2">
                            <span
                              className={
                                component.isPro
                                  ? "rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-200 ring-1 ring-amber-400/25"
                                  : "rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-400/25"
                              }
                            >
                              {component.isPro ? "Pro" : "Free"}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-violet-200" />
                      </div>
                    </motion.div>
                  </Link>
                </TiltCard>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="text-center" delayMs={160}>
          <Link href="/components">
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-white/15 bg-white/[0.03] text-white hover:border-violet-400/40 hover:bg-white/[0.06]"
            >
              View all components
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
