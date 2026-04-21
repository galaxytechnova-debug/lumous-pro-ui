"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { templatesGatePasswordMatches, unlockTemplatesGate } from "@/lib/templates-gate";

export function Footer() {
  const [gateOpen, setGateOpen] = useState(false);
  const [gatePassword, setGatePassword] = useState("");
  const [gateError, setGateError] = useState("");

  const submitGate = () => {
    if (templatesGatePasswordMatches(gatePassword)) {
      unlockTemplatesGate();
      setGatePassword("");
      setGateError("");
      setGateOpen(false);
    } else {
      setGateError("Incorrect password.");
    }
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#030308]">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-lg">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <Image src="/lumouslogo.png" alt="LumosUI logo" width={36} height={36} className="h-9 w-9" />
              <span className="text-base font-semibold text-white">LumosUI</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500">
              Animated interface blocks for teams who want marketing pages to feel as considered as the product.
            </p>
          </div>

          <div className="shrink-0 md:pt-0.5 md:text-right">
            <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-2.5 text-sm text-zinc-500 md:ml-auto md:inline-block md:text-right">
              <li>
                <Link href="/components" className="transition hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/waitlist" className="transition hover:text-white">
                  Waitlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-sm text-zinc-500 md:mt-12 md:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <button
              type="button"
              aria-label="Open access code"
              onClick={() => {
                setGateError("");
                setGateOpen(true);
              }}
              className="inline-flex h-8 w-8 shrink-0 !cursor-default items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-sm text-zinc-400 focus:outline-none"
            >
              ©
            </button>
            <span>
              {new Date().getFullYear()} LumosUI. All rights reserved.
            </span>
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <Dialog
        open={gateOpen}
        onOpenChange={(open) => {
          setGateOpen(open);
          if (!open) {
            setGatePassword("");
            setGateError("");
          }
        }}
      >
        <DialogContent className="border-white/10 bg-zinc-950 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access code</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter the password to enable template management on the Templates page.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <label htmlFor="templates-gate-password" className="text-xs font-medium text-zinc-400">
              Password
            </label>
            <Input
              id="templates-gate-password"
              type="password"
              autoComplete="off"
              value={gatePassword}
              onChange={(e) => {
                setGatePassword(e.target.value);
                setGateError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitGate();
              }}
              className="border-white/10 bg-black/40 text-white placeholder:text-zinc-600"
              placeholder="Password"
            />
            {gateError ? <p className="text-xs text-red-400">{gateError}</p> : null}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" className="rounded-full text-zinc-400" onClick={() => setGateOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="rounded-full bg-violet-600 text-white hover:bg-violet-500" onClick={submitGate}>
              Unlock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
