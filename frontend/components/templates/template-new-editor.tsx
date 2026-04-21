"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HtmlPreviewIframe } from "@/components/templates/html-preview-iframe";
import { TemplatePreviewFrame } from "@/components/templates/template-preview-frame";
import { upsertTemplate } from "@/lib/saved-templates";
import { ArrowLeft, Check, Copy, Lock, Maximize2, Save, Sparkles, X } from "lucide-react";

export function TemplateNewEditor() {
  const router = useRouter();
  const [html, setHtml] = useState("");
  const [prompt, setPrompt] = useState("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (saveOpen) setFullscreen(false);
  }, [saveOpen]);

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

  const copyPromptDraft = async () => {
    const text = prompt.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setPromptCopied(true);
      window.setTimeout(() => setPromptCopied(false), 2000);
    } catch {
      setPromptCopied(false);
    }
  };

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    setSaveError(null);
    try {
      await upsertTemplate({ name: trimmed, html, prompt });
      setSaveOpen(false);
      router.push("/templates");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Failed to save template.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 min-h-0 flex-col gap-2 overflow-hidden px-4 py-3 md:gap-3 md:px-6 md:py-4">
        <div className="flex shrink-0 flex-row items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
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
            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">New template</h1>
              <p className="mt-0.5 line-clamp-2 text-xs text-zinc-400 sm:text-sm md:text-base">
                HTML and preview scroll inside this view. Full screen preview when you need the whole canvas.
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => setSaveOpen(true)}
            className="shrink-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500"
            aria-label="Save template"
          >
            <Save className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Save template</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 lg:grid-cols-[minmax(220px,0.32fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-6">
          <section className="flex h-full min-h-0 min-w-0 flex-col gap-2">
            <label htmlFor="template-html" className="shrink-0 text-sm font-medium text-zinc-200">
              HTML source
            </label>
            <Textarea
              id="template-html"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
              className="[field-sizing:fixed] min-h-0 flex-1 resize-none self-stretch overflow-y-auto font-mono text-xs leading-relaxed text-zinc-200"
              placeholder="Paste a full HTML document or a fragment — the Preview tab updates as you type."
            />
            <p className="shrink-0 text-xs text-zinc-500">
              Prefer a full document for the most accurate preview. Scripts run in a sandboxed iframe.
            </p>
          </section>

          <section className="flex h-full min-h-0 min-w-0 flex-col gap-2">
            <Tabs defaultValue="preview" className="flex h-full min-h-0 flex-1 flex-col gap-2">
              <TabsList className="h-9 w-full shrink-0 justify-start rounded-full border border-white/[0.08] bg-white/[0.04] p-1 sm:w-auto">
                <TabsTrigger value="preview" className="rounded-full px-4 text-xs sm:text-sm">
                  Preview
                </TabsTrigger>
                <TabsTrigger value="prompt" className="gap-1.5 rounded-full px-4 text-xs sm:text-sm">
                  <Lock className="h-3 w-3 text-amber-400/80" aria-hidden />
                  <Sparkles className="h-3.5 w-3.5 opacity-80" aria-hidden />
                  Design prompt
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="preview"
                className="mt-0 flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-hidden data-[state=inactive]:hidden"
              >
                <div className="flex shrink-0 justify-end">
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
                <TemplatePreviewFrame
                  fillHeight
                  html={html}
                  title="New template preview"
                  className="min-h-0 flex-1 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                />
              </TabsContent>

              <TabsContent
                value="prompt"
                className="mt-0 flex min-h-0 flex-1 flex-col gap-2 overflow-hidden data-[state=inactive]:hidden"
              >
                <div className="flex shrink-0 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!prompt.trim()}
                    title={prompt.trim() ? "Copy entire prompt" : "Nothing to copy yet"}
                    className="rounded-full border-white/15 bg-zinc-900/50 text-xs text-zinc-100 shadow-none hover:border-white/35 hover:bg-white/12 hover:text-white disabled:opacity-40 dark:border-white/15 dark:bg-zinc-900/50 dark:hover:border-white/35 dark:hover:bg-white/12 dark:hover:text-white"
                    onClick={() => void copyPromptDraft()}
                  >
                    {promptCopied ? (
                      <>
                        <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" aria-hidden />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                        Copy prompt
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  spellCheck={false}
                  placeholder="Paste your design or implementation prompt here…"
                  className="[field-sizing:fixed] min-h-0 flex-1 resize-none self-stretch overflow-y-auto text-sm leading-relaxed text-zinc-200"
                />
                <p className="shrink-0 text-xs text-zinc-500">
                  Saved with the template. On the detail page, design prompts are shown as Pro (waitlist); you can
                  still author and save them here.
                </p>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>

      {fullscreen ? (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-3 py-2">
            <span className="truncate text-sm font-medium text-zinc-200">New template · preview</span>
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
          <div className="relative min-h-0 flex-1 bg-zinc-950">
            <HtmlPreviewIframe
              html={html}
              title="New template full screen preview"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      ) : null}

      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent className="border-white/10 bg-zinc-950 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save template</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Choose a display name. It appears on your template gallery card.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <label htmlFor="template-name" className="text-xs font-medium text-zinc-400">
              Name
            </label>
            <Input
              id="template-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Marketing hero"
              className="border-white/10 bg-black/30 text-white placeholder:text-zinc-600"
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleSave();
              }}
            />
            {saveError ? <p className="text-xs text-red-300">{saveError}</p> : null}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" className="rounded-full text-zinc-400" onClick={() => setSaveOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!name.trim() || saving}
              className="rounded-full bg-violet-600 text-white hover:bg-violet-500"
              onClick={() => void handleSave()}
            >
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
