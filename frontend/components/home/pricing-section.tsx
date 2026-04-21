"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Diamond } from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";
import { trackPricingCtaClick } from "@/lib/analytics";

const featuresLeft = (free: number, total: number) => [
  `${free} free components in the gallery today (${total} total listings)`,
  "Backgrounds, cards, cursor, text, heroes, and more",
  "Copy-paste React + Tailwind from each component page",
];

const featuresRight = [
  "Pro Access via the waitlist when you need gated source",
  "Commercial-friendly licensing on paid tiers (see /pricing)",
  "Templates workspace for saved HTML drafts",
];

interface PricingSectionProps {
  totalComponents: number;
  freeComponents: number;
}

export function PricingSection({ totalComponents, freeComponents }: PricingSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#050008] px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(88,28,135,0.25),transparent_50%)]" />
      <motion.div
        className="pointer-events-none absolute -bottom-[28%] left-1/2 h-[min(55vw,420px)] w-[min(140%,900px)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,181,253,0.45),rgba(109,40,217,0.25),transparent_70%)] blur-2xl"
        animate={prefersReducedMotion ? undefined : { opacity: [0.65, 0.95, 0.65], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <RevealOnScroll>
          <Link
            href="/waitlist"
            onClick={() => trackPricingCtaClick("hero-get-pro-access")}
            className="mb-6 inline-flex items-center rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-100 transition hover:border-violet-300/60 hover:bg-violet-500/15"
          >
            Get Pro access
          </Link>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            We like keeping pricing honest
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-zinc-400">
            Start free with the gallery, then unlock Pro Access for premium drops, skills, and launch-ready kits.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={90} className="mt-12">
          <div className="rounded-3xl border border-white/[0.08] bg-zinc-950/55 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-10">
            <div className="flex flex-wrap items-end justify-center gap-2">
              <span className="text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-fuchsia-200 md:text-6xl">
                $0
              </span>
              <span className="pb-2 text-left text-sm text-zinc-400">
                to explore
                <br />
                <span className="text-zinc-500">
                  Pro waves: <span className="text-zinc-400">$25</span> → <span className="text-zinc-400">$45</span> →{" "}
                  <span className="text-zinc-400">$175</span> lifetime
                </span>
              </span>
            </div>
            <p className="mt-3 text-center text-xs text-zinc-500">
              <Link
                href="/pricing"
                onClick={() => trackPricingCtaClick("full-tier-breakdown")}
                className="text-violet-300/90 underline-offset-2 hover:text-violet-200 hover:underline"
              >
                Full tier breakdown
              </Link>
            </p>

            <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 gap-3 text-left sm:grid-cols-2 sm:gap-x-8">
              <ul className="space-y-3">
                {featuresLeft(freeComponents, totalComponents).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Diamond className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                    {f}
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {featuresRight.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Diamond className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/components" className="w-full sm:w-auto">
                <Button
                  onClick={() => trackPricingCtaClick("start-with-free-blocks")}
                  size="lg"
                  className="w-full rounded-xl border border-transparent bg-violet-600 px-10 text-white shadow-[0_0_40px_rgba(139,92,246,0.35)] hover:bg-violet-500 sm:w-auto"
                >
                  Start with free blocks
                </Button>
              </Link>
              <Link href="/waitlist" className="w-full sm:w-auto">
                <Button
                  onClick={() => trackPricingCtaClick("join-waitlist")}
                  size="lg"
                  variant="outline"
                  className="w-full rounded-xl border-violet-400/40 bg-transparent text-white hover:bg-violet-500/10 hover:text-white sm:w-auto"
                >
                  Join the waitlist
                </Button>
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
