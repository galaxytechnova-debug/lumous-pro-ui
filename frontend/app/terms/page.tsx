import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Terms of Service | LumosUI",
  description: "Terms for using the LumosUI website and materials.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">Legal</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: April 19, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-400 md:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Agreement</h2>
            <p>
              By accessing or using the LumosUI website, demos, and any downloadable or copyable materials made
              available here, you agree to these terms. If you do not agree, do not use the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Use of the site</h2>
            <p>
              You agree to use the site only for lawful purposes and not to attempt to disrupt, scrape, or overload
              our systems beyond normal browsing. Component previews and code snippets are provided as-is for
              evaluation and integration in your own projects according to any license stated alongside those
              materials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Intellectual property</h2>
            <p>
              Branding, design, text, and code organization on this site are owned by LumosUI or its licensors unless
              otherwise noted. Free and Pro tiers may carry different usage rules; where Pro content is gated, you
              must not circumvent access controls.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Disclaimer</h2>
            <p>
              The site and all materials are provided &quot;as is&quot; without warranties of any kind. We are not
              liable for any damages arising from your use of the site or reliance on any example code or design.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Changes</h2>
            <p>
              We may modify these terms at any time. Continued use after changes constitutes acceptance of the updated
              terms.
            </p>
          </section>

          <p className="pt-4">
            <Link href="/" className="text-indigo-400 hover:text-indigo-300">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
