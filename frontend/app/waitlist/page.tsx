"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Layers3, Rocket, Wand2, CheckCircle2, Loader2 } from "lucide-react";
import { submitWaitlist } from "@/lib/waitlist-api";
import { trackWaitlistSubmitted } from "@/lib/analytics";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        source: "waitlist-page",
      });
      const elapsedMs = Date.now() - startedAt;
      const remainingMs = Math.max(0, 1000 - elapsedMs);
      if (remainingMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingMs));
      }
      setShowSuccessAlert(true);
      trackWaitlistSubmitted("waitlist-page");
      setName("");
      setEmail("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to join waitlist.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <main className="container mx-auto max-w-2xl px-4 py-5 md:py-6">
        <div className="rounded-2xl border border-white/10 bg-[#0f0f1a] p-4 md:p-5">
          <div className="mb-5">
            <span className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
              Pro Access Waitlist
            </span>
            <h1 className="mt-3 text-2xl font-bold text-white md:text-3xl">Get Early Access to Pro Features</h1>
            <p className="mt-2 text-gray-400">
              First 150 users get <span className="text-emerald-300 font-medium">$25 lifetime access</span>. Next 250
              users get <span className="text-sky-300 font-medium">$45 lifetime access</span>. Then pricing moves to{" "}
              <span className="text-amber-300 font-medium">$175 lifetime</span>.
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              On <span className="font-medium text-indigo-300">12 May 2026</span>, we are publishing detailed prompts to help you build complete websites with the polished, production-grade UI feel of work crafted by an experienced developer. This will be available only to Pro users, so join the waitlist to get access.
            </p>
          </div>

          <div className="mb-4 rounded-xl border border-white/10 bg-[#0a0a12] p-3 md:p-3.5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-300">What you get with Pro Access</h2>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <Sparkles className="mt-0.5 h-4 w-4 text-indigo-400" />
                <span>20+ Claude-powered frontend design skills</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <Layers3 className="mt-0.5 h-4 w-4 text-cyan-400" />
                <span>Upcoming premium components and cursor effects</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <Wand2 className="mt-0.5 h-4 w-4 text-violet-400" />
                <span>Advanced animation patterns and production-ready snippets</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <Rocket className="mt-0.5 h-4 w-4 text-emerald-400" />
                <span>Priority access to upcoming features before public release</span>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-white/10 bg-[#090912] px-3 py-2 text-white outline-none transition focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-white/10 bg-[#090912] px-3 py-2 text-white outline-none transition focus:border-indigo-500"
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
      </main>
      <Footer />

      {showSuccessAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-[#0f0f1a] p-6 shadow-[0_20px_80px_rgba(16,185,129,0.2)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-center text-xl font-semibold text-white">Waitlist Joined</h3>
            <p className="mt-2 text-center text-sm text-gray-300">
              Thanks for joining. We will contact you if your profile is eligible for early Pro access.
            </p>
            <Button
              type="button"
              className="mt-5 w-full bg-emerald-600 text-white hover:bg-emerald-500"
              onClick={() => setShowSuccessAlert(false)}
            >
              Okay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
