import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function NewTemplatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <h1 className="text-2xl font-semibold text-white md:text-3xl">Add template from files</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          Templates are file-based for production safety and version control. Create a folder in{" "}
          <code className="font-mono text-zinc-300">frontend/templates</code> with slug format and add:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-300">
          <li>
            <code className="font-mono">{`<slug>/<slug>.html`}</code>
          </li>
          <li>
            <code className="font-mono">{`<slug>/<slug>.prompt`}</code>
          </li>
        </ul>
        <p className="mt-4 text-sm text-zinc-500">
          The gallery and detail pages load these files automatically (server-side) and show the prompt behind the Pro
          lock screen.
        </p>
        <Button asChild className="mt-8 rounded-full">
          <Link href="/templates">Back to templates</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
