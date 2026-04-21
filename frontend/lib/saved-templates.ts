export type SavedTemplate = {
  id: string;
  name: string;
  html: string;
  prompt: string;
  updatedAt: number;
};

export const SAVED_TEMPLATES_STORAGE_KEY = "lumosui-saved-templates-v1";

/** Fired in the active tab when templates are written (localStorage does not fire `storage` in the same tab). */
export const SAVED_TEMPLATES_CHANGED_EVENT = "lumosui:saved-templates-changed";

function notifyTemplatesChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SAVED_TEMPLATES_CHANGED_EVENT));
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isSavedTemplate(v: unknown): v is SavedTemplate {
  if (!isRecord(v)) return false;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.html === "string" &&
    typeof v.prompt === "string" &&
    typeof v.updatedAt === "number"
  );
}

export function loadTemplates(): SavedTemplate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_TEMPLATES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedTemplate);
  } catch {
    return [];
  }
}

export function saveTemplatesAll(list: SavedTemplate[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVED_TEMPLATES_STORAGE_KEY, JSON.stringify(list));
  notifyTemplatesChanged();
}

export function upsertTemplate(entry: Omit<SavedTemplate, "id" | "updatedAt"> & { id?: string }): SavedTemplate {
  const id = entry.id ?? crypto.randomUUID();
  const record: SavedTemplate = {
    id,
    name: entry.name.trim(),
    html: entry.html,
    prompt: entry.prompt,
    updatedAt: Date.now(),
  };
  const list = loadTemplates().filter((t) => t.id !== id);
  saveTemplatesAll([record, ...list]);
  return record;
}

export function getTemplateById(id: string): SavedTemplate | undefined {
  return loadTemplates().find((t) => t.id === id);
}

export function deleteTemplateById(id: string): void {
  const list = loadTemplates().filter((t) => t.id !== id);
  saveTemplatesAll(list);
}

export function deleteTemplatesByIds(ids: string[]): void {
  if (ids.length === 0) return;
  const remove = new Set(ids);
  const list = loadTemplates().filter((t) => !remove.has(t.id));
  saveTemplatesAll(list);
}
