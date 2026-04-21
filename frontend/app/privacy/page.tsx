import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Privacy Policy | LumosUI",
  description: "How LumosUI handles information when you use the site.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">Legal</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: April 19, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-400 md:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Overview</h2>
            <p>
              LumosUI (&quot;we&quot;, &quot;us&quot;) operates this marketing and documentation site. This policy
              describes what information may be collected when you browse lumosui.dev (or our deployed domain) and
              how it is used.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Information we collect</h2>
            <p>
              We may collect basic technical data typical of static and hosted sites, such as IP address, browser
              type, and pages viewed, through our hosting or analytics providers if enabled. Waitlist or contact
              forms, when present, collect only the fields you submit (for example name and email) to respond or
              notify you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Use of information</h2>
            <p>
              Information is used to operate and improve the site, measure aggregate traffic, and communicate with you
              when you have opted in (for example waitlist confirmations). We do not sell your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Cookies</h2>
            <p>
              We may use cookies or similar technologies for preferences, analytics, or sessions where applicable. You
              can control cookies through your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Changes</h2>
            <p>
              We may update this policy from time to time. The &quot;Last updated&quot; date at the top will change
              when we do.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p>
              Questions about this policy can be sent through the channels listed on the site, if any, or via your
              hosting contact for this deployment.
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
