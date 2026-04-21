"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Lock, Wand2, Layers3, Rocket, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitWaitlist } from "@/lib/waitlist-api";
import { trackWaitlistSubmitted } from "@/lib/analytics";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WaitlistAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistAccessDialog({ open, onOpenChange }: WaitlistAccessDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setErrorMessage("");

    try {
      const startedAt = Date.now();
      await submitWaitlist({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        projectType: projectType.trim(),
        source: "header-popup",
      });
      const elapsedMs = Date.now() - startedAt;
      const remainingMs = Math.max(0, 1000 - elapsedMs);
      if (remainingMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingMs));
      }
      setShowSuccessAlert(true);
      trackWaitlistSubmitted("header-popup");
      setName("");
      setEmail("");
      setProjectType("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to join waitlist.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-white/10 bg-[#0f0f1a] text-white">
        <DialogHeader>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
            <Lock className="h-3.5 w-3.5" />
            Pro Access
          </div>
          <DialogTitle className="mt-3 text-2xl">Unlock Pro Design Skills</DialogTitle>
          <DialogDescription className="text-gray-400">
            Join the waitlist to get early access to premium frontend resources for advanced animation websites.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-white/10 bg-[#0a0a12] p-4">
            <p className="text-sm font-medium text-gray-200">What you get</p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 text-indigo-400" />
                <span>20+ Claude-powered frontend design skills</span>
              </div>
              <div className="flex items-start gap-2">
                <Layers3 className="mt-0.5 h-4 w-4 text-cyan-400" />
                <span>Upcoming premium components and cursor effects</span>
              </div>
              <div className="flex items-start gap-2">
                <Wand2 className="mt-0.5 h-4 w-4 text-violet-400" />
                <span>Advanced motion patterns and animation recipes</span>
              </div>
              <div className="flex items-start gap-2">
                <Rocket className="mt-0.5 h-4 w-4 text-emerald-400" />
                <span>Priority access to new features before public release</span>
              </div>
            </div>
            <Link href="/waitlist" onClick={() => onOpenChange(false)} className="inline-block pt-1 text-xs text-indigo-300 hover:text-indigo-200">
              View full waitlist details
            </Link>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0a0a12] p-4">
            {errorMessage && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-xs text-gray-300">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-[#090912] px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-white/10 bg-[#090912] px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-300">Project type (optional)</label>
                <input
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  placeholder="SaaS, portfolio, agency site..."
                  className="w-full rounded-lg border border-white/10 bg-[#090912] px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Join Waitlist"
                )}
              </Button>
            </form>
          </div>
        </div>

        {showSuccessAlert && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-sm rounded-2xl border border-emerald-500/30 bg-[#0f0f1a] p-6 shadow-[0_20px_80px_rgba(16,185,129,0.2)]">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-center text-lg font-semibold text-white">Waitlist Joined</h3>
              <p className="mt-2 text-center text-sm text-gray-300">
                Thanks for joining. We will contact you if your profile is eligible for early Pro access.
              </p>
              <Button
                type="button"
                className="mt-5 w-full bg-emerald-600 text-white hover:bg-emerald-500"
                onClick={() => {
                  setShowSuccessAlert(false);
                  onOpenChange(false);
                }}
              >
                Okay
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

