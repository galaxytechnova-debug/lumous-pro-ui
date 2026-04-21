"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HtmlPreviewIframe } from "@/components/templates/html-preview-iframe";
import { TemplatePreviewFrame } from "@/components/templates/template-preview-frame";
import { TemplatePromptProGate } from "@/components/templates/template-prompt-pro-gate";
import type { FileTemplate } from "@/lib/file-templates";
import { ArrowLeft, Lock, Maximize2, Sparkles, X } from "lucide-react";

type TemplateDetailViewProps = {
  template: FileTemplate;
};

export function TemplateDetailView({ template }: TemplateDetailViewProps) {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!fullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="mt-0.5 shrink-0 rounded-full text-zinc-400 hover:text-white"
            >
              <Link href="/templates" aria-label="Back to templates">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{template.name}</h1>
            </div>
          </div>
        </div>

        <Tabs defaultValue="preview" className="mx-auto flex max-w-4xl flex-col gap-3">
          <TabsList className="h-9 w-full justify-start rounded-full border border-white/[0.08] bg-white/[0.04] p-1 sm:w-auto">
            <TabsTrigger value="preview" className="rounded-full px-4 text-xs sm:text-sm">
              Preview
            </TabsTrigger>
            <TabsTrigger value="prompt" className="gap-1.5 rounded-full px-4 text-xs sm:text-sm">
              <Lock className="h-3 w-3 text-amber-400/90" aria-hidden />
              <Sparkles className="h-3.5 w-3.5 opacity-80" aria-hidden />
              Design prompt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-0">
            <div className="mb-3 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full border-white/15 bg-zinc-900/50 text-xs text-zinc-100 shadow-none hover:border-white/35 hover:bg-white/12 hover:text-white dark:border-white/15 dark:bg-zinc-900/50 dark:hover:border-white/35 dark:hover:bg-white/12 dark:hover:text-white"
                onClick={() => setFullscreen(true)}
              >
                <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
                Full screen
              </Button>
            </div>
            <TemplatePreviewFrame html={template.html} title={`Template: ${template.name}`} />
          </TabsContent>

          <TabsContent value="prompt" className="mt-0">
            <TemplatePromptProGate templateName={template.name} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />

      {fullscreen ? (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <span className="truncate text-sm font-medium text-zinc-200">{template.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-full text-zinc-300 hover:bg-white/10 hover:text-white"
              onClick={() => setFullscreen(false)}
            >
              <X className="mr-1.5 h-4 w-4" />
              Close
            </Button>
          </div>
          <HtmlPreviewIframe html={template.html} title={`Full screen: ${template.name}`} className="min-h-0 flex-1 border-0" />
        </div>
      ) : null}
    </div>
  );
}
