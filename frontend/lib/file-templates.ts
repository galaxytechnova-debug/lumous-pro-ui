import { promises as fs } from "node:fs";
import path from "node:path";
import { unstable_cache } from "next/cache";

export type FileTemplate = {
  id: string;
  slug: string;
  name: string;
  html: string;
  prompt: string;
  updatedAt: number;
};

const TEMPLATE_ROOT = path.join(process.cwd(), "templates");
const MAX_HTML_BYTES = 1024 * 1024;
const MAX_PROMPT_BYTES = 512 * 1024;
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function extractTitleFromHtml(html: string, slug: string): string {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch?.[1]?.trim()) return titleMatch[1].trim();

  const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  if (ogTitleMatch?.[1]?.trim()) return ogTitleMatch[1].trim();

  const metaTitleMatch = html.match(/<meta[^>]+name=["']title["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  if (metaTitleMatch?.[1]?.trim()) return metaTitleMatch[1].trim();

  return slugToTitle(slug);
}

async function readTemplateFile(filePath: string, maxBytes: number): Promise<string> {
  const stat = await fs.stat(filePath);
  if (stat.size > maxBytes) {
    throw new Error(`Template file too large: ${path.basename(filePath)}`);
  }
  return fs.readFile(filePath, "utf8");
}

async function readTemplateBySlugInternal(slug: string): Promise<FileTemplate | null> {
  if (!isValidSlug(slug)) return null;

  const folderPath = path.join(TEMPLATE_ROOT, slug);
  const htmlPath = path.join(folderPath, `${slug}.html`);
  const promptPath = path.join(folderPath, `${slug}.prompt`);

  try {
    const [html, prompt, htmlStat, promptStat] = await Promise.all([
      readTemplateFile(htmlPath, MAX_HTML_BYTES),
      readTemplateFile(promptPath, MAX_PROMPT_BYTES),
      fs.stat(htmlPath),
      fs.stat(promptPath),
    ]);

    const updatedAt = Math.max(htmlStat.mtimeMs, promptStat.mtimeMs);

    return {
      id: slug,
      slug,
      name: extractTitleFromHtml(html, slug),
      html,
      prompt,
      updatedAt,
    };
  } catch {
    return null;
  }
}

async function getAllTemplatesInternal(): Promise<FileTemplate[]> {
  let dirEntries: Array<{ name: string; isDirectory: () => boolean }> = [];
  try {
    dirEntries = await fs.readdir(TEMPLATE_ROOT, { withFileTypes: true });
  } catch {
    return [];
  }

  const slugs = dirEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => isValidSlug(name));

  const records = await Promise.all(slugs.map((slug) => readTemplateBySlugInternal(slug)));
  return records
    .filter((record): record is FileTemplate => record !== null)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export const getAllFileTemplates = unstable_cache(getAllTemplatesInternal, ["file-templates:list"], {
  revalidate: 60,
});

export async function getFileTemplateBySlug(slug: string): Promise<FileTemplate | null> {
  if (!isValidSlug(slug)) return null;

  const all = await getAllFileTemplates();
  const fromCached = all.find((item) => item.slug === slug);
  if (fromCached) return fromCached;

  return readTemplateBySlugInternal(slug);
}

