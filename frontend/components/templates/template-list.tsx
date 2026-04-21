"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HtmlPreviewIframe } from "@/components/templates/html-preview-iframe";
import { cn } from "@/lib/utils";
import type { FileTemplate } from "@/lib/file-templates";

type TemplateListProps = {
  templates: FileTemplate[];
};

export function TemplateList({ templates }: TemplateListProps) {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        {templates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
            <p className="text-sm text-zinc-400">No templates yet.</p>
            <p className="mt-2 text-xs text-zinc-500">
              Add template files under <code className="font-mono">frontend/templates/&lt;slug&gt;/</code>.
            </p>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => {
              const previewBlock = (
                <>
                  <div className="relative mb-4 h-40 overflow-hidden rounded-lg bg-zinc-950">
                    <HtmlPreviewIframe
                      thumbnail
                      html={t.html}
                      title={`Preview: ${t.name}`}
                      className="h-full min-h-0"
                      interactive={false}
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <h3
                      className={cn(
                        "font-medium text-white transition-colors",
                        "group-hover:text-indigo-400"
                      )}
                    >
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {"Preview & full screen. Design prompts are Pro — join the waitlist."}
                    </p>
                  </div>
                </>
              );

              return (
                <li key={t.id}>
                  <Link
                    href={`/templates/${t.id}`}
                    className="group block overflow-hidden rounded-xl border border-white/10 bg-[#0f0f1a] p-4 card-hover"
                  >
                    {previewBlock}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
