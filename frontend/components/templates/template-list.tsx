"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HtmlPreviewIframe } from "@/components/templates/html-preview-iframe";
import {
  deleteTemplatesByIds,
  loadTemplates,
  SAVED_TEMPLATES_CHANGED_EVENT,
  SAVED_TEMPLATES_STORAGE_KEY,
  type SavedTemplate,
} from "@/lib/saved-templates";
import {
  isTemplatesGateUnlocked,
  TEMPLATES_GATE_STORAGE_KEY,
  TEMPLATES_GATE_UNLOCKED_EVENT,
} from "@/lib/templates-gate";
import { cn } from "@/lib/utils";
import { CheckSquare, Plus, Trash2 } from "lucide-react";

export function TemplateList() {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [managerUnlocked, setManagerUnlocked] = useState(false);

  useEffect(() => {
    const refresh = () => setTemplates(loadTemplates());
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === SAVED_TEMPLATES_STORAGE_KEY) refresh();
      if (e.key === TEMPLATES_GATE_STORAGE_KEY) setManagerUnlocked(isTemplatesGateUnlocked());
    };
    const onLocalChange = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener(SAVED_TEMPLATES_CHANGED_EVENT, onLocalChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(SAVED_TEMPLATES_CHANGED_EVENT, onLocalChange);
    };
  }, []);

  useEffect(() => {
    const sync = () => setManagerUnlocked(isTemplatesGateUnlocked());
    sync();
    window.addEventListener(TEMPLATES_GATE_UNLOCKED_EVENT, sync);
    return () => window.removeEventListener(TEMPLATES_GATE_UNLOCKED_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!managerUnlocked) {
      setSelectionMode(false);
      setSelectedIds(new Set());
    }
  }, [managerUnlocked]);

  useEffect(() => {
    const valid = new Set(templates.map((t) => t.id));
    setSelectedIds((prev) => {
      const next = new Set([...prev].filter((id) => valid.has(id)));
      if (next.size === prev.size && [...prev].every((id) => next.has(id))) return prev;
      return next;
    });
  }, [templates]);

  useEffect(() => {
    if (templates.length === 0) {
      setSelectionMode(false);
      setSelectedIds(new Set());
    }
  }, [templates.length]);

  const someSelected = selectedIds.size > 0;
  const selectedTemplates = templates.filter((t) => selectedIds.has(t.id));

  const setOneSelected = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    deleteTemplatesByIds(Array.from(selectedIds));
    setSelectedIds(new Set());
    setBulkDeleteOpen(false);
    setSelectionMode(false);
  };

  const deleteSummary =
    selectedTemplates.length <= 3
      ? selectedTemplates.map((t) => t.name).join(", ")
      : `${selectedTemplates
          .slice(0, 3)
          .map((t) => t.name)
          .join(", ")} and ${selectedTemplates.length - 3} more`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-10 flex flex-row items-center justify-end gap-4">
          <h1 className="sr-only">Templates</h1>
          {managerUnlocked ? (
            <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              {selectionMode ? (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={exitSelectionMode}
                    className="rounded-full text-zinc-400 hover:bg-white/5 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!someSelected}
                    onClick={() => someSelected && setBulkDeleteOpen(true)}
                    className="rounded-full border-red-500/35 text-red-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-200 disabled:border-white/10 disabled:text-zinc-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap">
                      Delete{someSelected ? ` (${selectedIds.size})` : ""}
                    </span>
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectionMode(true)}
                  className="rounded-full border-white/15 text-zinc-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                >
                  <CheckSquare className="mr-2 h-4 w-4 shrink-0" />
                  Select
                </Button>
              )}
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500"
              >
                <Link href="/templates/new" className="inline-flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4 shrink-0" />
                  Add new template
                </Link>
              </Button>
            </div>
          ) : null}
        </div>

        {templates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
            <p className="text-sm text-zinc-400">No templates yet. Add one to see it here with a live thumbnail.</p>
            {managerUnlocked ? (
              <Button asChild className="mt-6 rounded-full" variant="outline">
                <Link href="/templates/new">Create your first template</Link>
              </Button>
            ) : null}
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => {
              const checked = selectedIds.has(t.id);
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
                        !selectionMode && "group-hover:text-indigo-400"
                      )}
                    >
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {selectionMode
                        ? "Tap card or checkbox to select."
                        : "Preview & full screen. Design prompts are Pro — join the waitlist."}
                    </p>
                  </div>
                </>
              );

              if (selectionMode) {
                return (
                  <li key={t.id}>
                    <div
                      role="button"
                      tabIndex={0}
                      aria-pressed={checked}
                      aria-label={`Select template ${t.name}`}
                      onClick={() => setOneSelected(t.id, !checked)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOneSelected(t.id, !checked);
                        }
                      }}
                      className={cn(
                        "flex w-full cursor-pointer gap-3 rounded-xl border bg-[#0f0f1a] p-4 text-left outline-none transition-colors card-hover focus-visible:ring-2 focus-visible:ring-violet-500/60",
                        checked ? "border-violet-500/45 ring-2 ring-violet-500/25" : "border-white/10"
                      )}
                    >
                      <div className="flex shrink-0 flex-col pt-1" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          id={`tpl-${t.id}`}
                          checked={checked}
                          onCheckedChange={(v) => setOneSelected(t.id, v === true)}
                          aria-label={`Select ${t.name}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">{previewBlock}</div>
                    </div>
                  </li>
                );
              }

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

      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent className="border-white/10 bg-zinc-950 text-white sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedIds.size === 1 ? "this template" : `${selectedIds.size} templates`}?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-left text-sm text-zinc-400">
                <p>The following will be removed from this browser. This cannot be undone.</p>
                <p className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-medium text-zinc-200">
                  {deleteSummary}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="rounded-full border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full border-0 bg-red-600 text-white hover:bg-red-500"
              onClick={handleBulkDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
