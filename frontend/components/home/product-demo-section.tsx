"use client";

import {
  CloudUpload,
  Crosshair,
  Smartphone,
  Lock,
} from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";

const quickFeatures = [
  {
    icon: CloudUpload,
    label: "Copy-paste fast",
    hint: "Drop-in sections",
  },
  {
    icon: Crosshair,
    label: "Composable layers",
    hint: "Hero, grid, motion",
  },
  {
    icon: Smartphone,
    label: "Responsive first",
    hint: "Mobile to ultra-wide",
  },
  {
    icon: Lock,
    label: "Pro-ready patterns",
    hint: "Polished defaults",
  },
];

export function ProductDemoSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#030308] px-4 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.12), transparent 45%), radial-gradient(circle at 80% 60%, rgba(168,85,247,0.08), transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <RevealOnScroll className="mb-10 text-center md:mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">Product tour</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            See how a LumosUI homepage comes together
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            A stylized shell that mirrors how you actually work: categories on the left, narrative in the center,
            and quick reference on the right—similar rhythm to the real /components gallery, not a separate product.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80}>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/70 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl md:rounded-3xl">
            <div className="grid min-h-[280px] grid-cols-1 md:grid-cols-[240px_1fr_220px] md:min-h-[320px]">
              <aside className="hidden border-r border-white/[0.06] p-4 md:block">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Library</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  {[
                    "Browse by category",
                    "Filter free vs Pro",
                    "Search by name or description",
                    "Open any block for live preview",
                    "Copy code from the detail page",
                    "Templates for saved HTML drafts",
                  ].map((item) => (
                    <li key={item} className="rounded-lg px-2 py-1.5 hover:bg-white/[0.04]">
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
              <main className="border-b border-white/[0.06] p-5 md:border-b-0 md:border-r md:p-6">
                <h3 className="text-lg font-semibold text-white">Why motion belongs in marketing UI</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Micro-interactions guide attention; parallax sells depth; glass keeps density readable. LumosUI
                  packages those decisions so you can stay in product mode—not animation research mode.
                </p>
                <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm text-zinc-400">
                  <li>Heroes, backgrounds, and cursor effects from the gallery</li>
                  <li>Cards, text motion, loaders, and buttons you can paste into routes</li>
                  <li>Waitlist-gated Pro source where each listing marks access clearly</li>
                </ul>
              </main>
              <aside className="p-4 md:p-5">
                <div className="rounded-xl border border-white/[0.08] bg-black/35 p-3">
                  <p className="text-center text-xs text-zinc-500">April 2026</p>
                  <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-500">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                      <span key={`h-${d}-${i}`}>{d}</span>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-600">
                    {Array.from({ length: 28 }, (_, i) => (
                      <span key={i} className="rounded py-1">
                        {i + 1}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-xs text-zinc-400">
                  <p className="font-medium text-zinc-200">Gallery shortcuts</p>
                  <p>Jump to /components for the full list</p>
                  <p>Use Ctrl/⌘ + K in the navbar for quick navigation</p>
                  <p>Visit /pricing for lifetime waves</p>
                </div>
              </aside>
            </div>

          </div>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-2 gap-0 border-t border-white/[0.08] md:grid-cols-4">
          {quickFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.label} delayMs={index * 70} className="relative">
                <div
                  className={`flex flex-col items-center px-4 py-8 text-center md:py-10 ${
                    index < quickFeatures.length - 1 ? "md:border-r md:border-white/[0.08]" : ""
                  } ${index === 1 || index === 3 ? "border-l border-white/[0.08] md:border-l-0" : ""}`}
                >
                  <Icon className="h-7 w-7 text-white/90" strokeWidth={1.25} />
                  <p className="mt-4 text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{item.hint}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
