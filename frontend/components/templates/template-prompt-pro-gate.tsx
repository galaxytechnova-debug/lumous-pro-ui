"use client";

import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type TemplatePromptProGateProps = {
  templateName: string;
};

export function TemplatePromptProGate({ templateName }: TemplatePromptProGateProps) {
  return (
    <div className="relative flex min-h-[min(70vh,420px)] flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 px-6 py-12 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.2),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 flex max-w-md flex-col items-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-[0_0_40px_-8px_rgba(245,158,11,0.45)]">
          <Lock className="h-7 w-7 text-amber-300" aria-hidden />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90">Lumos Pro</p>
        <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Design prompt is locked</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          <span className="text-zinc-300">{templateName}</span> includes a production-style design prompt. Full prompt
          text for templates—single-page layouts today and multi-page kits as they ship—is reserved for Pro members and
          waitlist priority access.
        </p>
        <ul className="mt-5 w-full space-y-2 text-left text-sm text-zinc-400">
          <li className="flex gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" aria-hidden />
            <span>Copy-ready prompts aligned with each template’s look and structure</span>
          </li>
          <li className="flex gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" aria-hidden />
            <span>Early access as we expand from single-page drops to full multi-page site packs</span>
          </li>
        </ul>
        <Button
          asChild
          className="mt-8 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-white shadow-lg shadow-indigo-900/40 hover:from-indigo-500 hover:to-violet-500"
        >
          <Link href="/waitlist">
            Join the waitlist for prompt access
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
        <Link
          href="/pricing"
          className="mt-4 text-xs text-zinc-500 underline-offset-4 transition hover:text-zinc-300 hover:underline"
        >
          View pricing when available
        </Link>
      </div>
    </div>
  );
}
