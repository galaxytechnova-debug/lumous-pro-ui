export type SavedTemplate = {
  id: string;
  name: string;
  html: string;
  prompt: string;
  updatedAt: number;
  createdAt?: number;
};

export const SAVED_TEMPLATES_CHANGED_EVENT = "lumosui:saved-templates-changed";
const TEMPLATES_API_URL = process.env.NEXT_PUBLIC_WAITLIST_API_URL?.replace(/\/$/, "") || "http://localhost:4000";
const LEGACY_STORAGE_KEY = "lumosui-saved-templates-v1";
const LEGACY_MIGRATION_DONE_KEY = "lumosui-saved-templates-migrated-v1";

type TemplateListResponse = {
  ok: boolean;
  data?: SavedTemplate[];
  message?: string;
};

type TemplateSingleResponse = {
  ok: boolean;
  data?: SavedTemplate;
  message?: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isLegacyTemplate(v: unknown): v is {
  name: string;
  html: string;
  prompt: string;
} {
  if (!isRecord(v)) return false;
  return typeof v.name === "string" && typeof v.html === "string" && typeof v.prompt === "string";
}

function notifyTemplatesChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SAVED_TEMPLATES_CHANGED_EVENT));
}

async function parseErrorMessage(response: Response): Promise<string> {
  const body = (await response.json().catch(() => null)) as { message?: string } | null;
  return body?.message || "Failed to complete templates request.";
}

async function templatesFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${TEMPLATES_API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as T;
}

function loadLegacyLocalTemplates(): Array<{ name: string; html: string; prompt: string }> {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isLegacyTemplate);
  } catch {
    return [];
  }
}

async function migrateLegacyTemplatesIfNeeded(currentServerTemplates: SavedTemplate[]): Promise<SavedTemplate[] | null> {
  if (typeof window === "undefined") return null;
  if (currentServerTemplates.length > 0) {
    window.localStorage.setItem(LEGACY_MIGRATION_DONE_KEY, "1");
    return null;
  }
  if (window.localStorage.getItem(LEGACY_MIGRATION_DONE_KEY) === "1") return null;

  const legacyTemplates = loadLegacyLocalTemplates();
  if (legacyTemplates.length === 0) {
    window.localStorage.setItem(LEGACY_MIGRATION_DONE_KEY, "1");
    return null;
  }

  for (const item of legacyTemplates) {
    await templatesFetch<TemplateSingleResponse>("/api/v1/templates", {
      method: "POST",
      body: JSON.stringify(item),
    });
  }

  window.localStorage.setItem(LEGACY_MIGRATION_DONE_KEY, "1");
  const refreshed = await templatesFetch<TemplateListResponse>("/api/v1/templates");
  return refreshed.ok && Array.isArray(refreshed.data) ? refreshed.data : [];
}

export async function loadTemplates(): Promise<SavedTemplate[]> {
  const result = await templatesFetch<TemplateListResponse>("/api/v1/templates");
  if (!result.ok || !Array.isArray(result.data)) {
    return [];
  }
  const migrated = await migrateLegacyTemplatesIfNeeded(result.data);
  if (migrated) return migrated;
  return result.data;
}

export async function upsertTemplate(entry: Omit<SavedTemplate, "id" | "updatedAt" | "createdAt">): Promise<SavedTemplate> {
  const result = await templatesFetch<TemplateSingleResponse>("/api/v1/templates", {
    method: "POST",
    body: JSON.stringify({
      name: entry.name.trim(),
      html: entry.html,
      prompt: entry.prompt,
    }),
  });

  if (!result.ok || !result.data) {
    throw new Error(result.message || "Failed to save template.");
  }

  notifyTemplatesChanged();
  return result.data;
}

export async function getTemplateById(id: string): Promise<SavedTemplate | undefined> {
  if (!id) return undefined;
  try {
    const result = await templatesFetch<TemplateSingleResponse>(`/api/v1/templates/${id}`);
    if (!result.ok || !result.data) return undefined;
    return result.data;
  } catch {
    return undefined;
  }
}

export async function deleteTemplateById(id: string): Promise<void> {
  if (!id) return;
  await templatesFetch<{ ok: boolean; message?: string }>(`/api/v1/templates/${id}`, {
    method: "DELETE",
  });
  notifyTemplatesChanged();
}

export async function deleteTemplatesByIds(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  await templatesFetch<{ ok: boolean; message?: string }>("/api/v1/templates/bulk-delete", {
    method: "POST",
    body: JSON.stringify({ ids }),
  });
  notifyTemplatesChanged();
}
