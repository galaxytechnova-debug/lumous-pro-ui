"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LayoutGrid, FileCode2, Palette, Sparkles } from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";

const cards = (total: number, free: number, pro: number) =>
  [
    {
      icon: LayoutGrid,
      title: "Component gallery",
      body: `Browse ${total} blocks across backgrounds, heroes, cards, text, and more—with search, filters, and live previews on each page.`,
    },
    {
      icon: FileCode2,
      title: "Copy-paste source",
      body: "Every listing includes the React + Tailwind source so you can drop it into a Next.js route and adjust copy, tokens, and motion.",
    },
    {
      icon: Palette,
      title: "Free and Pro tiers",
      body: `Today there are ${free} free components and ${pro} Pro-gated blocks. Pro pages show a waitlist path instead of full source until you have access.`,
    },
    {
      icon: Sparkles,
      title: "Templates workspace",
      body: "Save HTML templates with live preview and fullscreen view from the Templates area—useful when you want to iterate outside the main gallery.",
    },
  ] as const;

interface PlatformHighlightsSectionProps {
  totalComponents: number;
  freeComponents: number;
  proComponents: number;
}

export function PlatformHighlightsSection({
  totalComponents,
  freeComponents,
  proComponents,
}: PlatformHighlightsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const items = cards(totalComponents, freeComponents, proComponents);

  return (
    <section className="relative overflow-hidden bg-[#050008] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(88,28,135,0.22),transparent_50%)]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <RevealOnScroll className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-100">
            What you get today
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            Built around the real LumosUI workflow
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-zinc-400">
            No invented quotes—just what this site actually ships right now. Explore the{" "}
            <Link href="/components" className="text-violet-300 hover:text-violet-200">
              gallery
            </Link>
            , check{" "}
            <Link href="/pricing" className="text-violet-300 hover:text-violet-200">
              pricing
            </Link>
            , or join the{" "}
            <Link href="/waitlist" className="text-violet-300 hover:text-violet-200">
              waitlist
            </Link>{" "}
            for Pro access.
          </p>
        </RevealOnScroll>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.title} delayMs={index * 60}>
                <motion.div
                  whileHover={
                    prefersReducedMotion ? undefined : { y: -3, borderColor: "rgba(167,139,250,0.35)" }
                  }
                  className="h-full rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                >
                  <Icon className="h-6 w-6 text-violet-300" strokeWidth={1.25} />
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
