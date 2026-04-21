"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Command, Lock } from "lucide-react";
import { CommandPalette } from "./command-palette";
import { trackPricingCtaClick } from "@/lib/analytics";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const centerLinks = [
    { href: "/components", label: "Components" },
    { href: "/templates", label: "Templates" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#050008]/75 backdrop-blur-2xl">
        <div className="relative flex h-16 w-full items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/lumouslogo.png" alt="LumosUI logo" width={36} height={36} className="h-9 w-9" priority />
            <span className="text-base font-semibold tracking-tight text-white">LumosUI</span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-1.5 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              {centerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/waitlist"
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Lock className="h-3.5 w-3.5" />
                Pro
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hidden h-9 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-xs text-zinc-400 transition hover:border-violet-400/30 hover:text-white md:flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="hidden items-center gap-0.5 rounded border border-white/10 bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 lg:inline-flex">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>

            <Link href="/waitlist" onClick={() => trackPricingCtaClick("navbar-join-waitlist")} className="hidden md:inline-flex">
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-violet-400/45 bg-transparent text-xs text-white hover:bg-violet-500/10 hover:text-white"
              >
                Join waitlist
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 hover:bg-white/[0.05] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-white/[0.06] bg-[#050008]/95 backdrop-blur-xl md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
              {centerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommandOpen(true);
                }}
                className="rounded-xl px-3 py-2.5 text-left text-sm text-zinc-300 hover:bg-white/[0.04]"
              >
                Search
              </button>
              <Link
                href="/waitlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-300 hover:bg-white/[0.04]"
              >
                <Lock className="h-4 w-4 shrink-0" />
                Pro
              </Link>
              <Link
                href="/waitlist"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackPricingCtaClick("mobile-navbar-join-waitlist");
                }}
                className="pt-2"
              >
                <Button className="w-full rounded-full bg-violet-600 text-white hover:bg-violet-500">Join waitlist</Button>
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
