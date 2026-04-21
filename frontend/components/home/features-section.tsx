"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CloudUpload,
  Crosshair,
  Smartphone,
  Lock,
  CalendarDays,
  MousePointerClick,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";

const buildFeatures = (totalComponents: number) =>
  [
    {
      icon: CloudUpload,
      title: "Built for speed",
      description: "Copy a block, paste into your route, and keep shipping—no bespoke animation setup.",
    },
    {
      icon: Crosshair,
      title: "Layered composition",
      description: "Hero, grid, pricing, and FAQ pieces snap together with shared motion language.",
    },
    {
      icon: Smartphone,
      title: "Responsive motion",
      description: "Breakpoints tuned so parallax, glow, and glass stay legible from phone to desktop.",
    },
    {
      icon: Lock,
      title: "Reduced-motion safe",
      description: "Sensible fallbacks so accessibility stays intact while the UI still feels premium.",
    },
    {
      icon: CalendarDays,
      title: "Launch-ready sections",
      description: "Changelog, roadmap, and timeline motifs you can drop into marketing pages today.",
    },
    {
      icon: MousePointerClick,
      title: "Publishing polish",
      description: "Micro-interactions on CTAs, cards, and navigation that match modern SaaS benchmarks.",
    },
    {
      icon: Sparkles,
      title: "Source on every page",
      description:
        "Each of the gallery listings includes the full component source—copy it from the code panel after you pick a block.",
    },
    {
      icon: ScanSearch,
      title: "Find blocks fast",
      description: `Search and category filters on /components, plus the Ctrl/⌘ + K command palette in the navbar, help you move across ${totalComponents} entries quickly.`,
    },
  ] as const;

interface FeaturesSectionProps {
  totalComponents: number;
}

export function FeaturesSection({ totalComponents }: FeaturesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(88,28,135,0.2),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <RevealOnScroll className="mb-14 text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            Everything you need to ship a cinematic homepage
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-zinc-400">
            LumosUI is a curated kit of animated interface patterns—optimized for dark-first marketing sites,
            product launches, and portfolio-grade storytelling.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 border-t border-l border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {buildFeatures(totalComponents).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <RevealOnScroll key={feature.title} delayMs={index * 45} className="h-full">
                <motion.div
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { backgroundColor: "rgba(255,255,255,0.03)" }
                  }
                  className="group relative flex h-full flex-col border-r border-b border-white/[0.08] bg-transparent p-6 transition-colors md:p-8"
                >
                  <div className="mb-5 text-white/90 transition-transform duration-300 group-hover:scale-[1.06]">
                    <Icon className="h-7 w-7" strokeWidth={1.25} />
                  </div>
                  <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{feature.description}</p>
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,40%),rgba(139,92,246,0.12),transparent_45%)]" />
                  </div>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
