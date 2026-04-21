"use client";

import { EMPTY_PREVIEW_FALLBACK } from "@/lib/default-template-html";
import { cn } from "@/lib/utils";

type HtmlPreviewIframeProps = {
  html: string;
  title: string;
  className?: string;
  /** When false, iframe ignores pointer events (e.g. card thumbnails). */
  interactive?: boolean;
  /**
   * Gallery card: clip a slightly wider iframe so common body/scrollbar gutters
   * and narrow layouts do not show as a dark strip on the right.
   */
  thumbnail?: boolean;
};

export function HtmlPreviewIframe({
  html,
  title,
  className,
  interactive = true,
  thumbnail = false,
}: HtmlPreviewIframeProps) {
  const srcDoc = html.trim() ? html : EMPTY_PREVIEW_FALLBACK;

  if (thumbnail) {
    return (
      <div className={cn("relative min-h-0 min-w-0 overflow-hidden", className)}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <iframe
            title={title}
            sandbox="allow-scripts allow-forms allow-popups allow-modals"
            srcDoc={srcDoc}
            className={cn(
              "absolute left-1/2 top-0 block h-full min-h-0 w-[min(135%,calc(100%+28px))] max-w-none -translate-x-1/2 border-0 bg-zinc-950 will-change-transform",
              !interactive && "pointer-events-none"
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <iframe
      title={title}
      className={cn(
        "block min-h-0 w-full border-0 bg-zinc-950 align-top",
        !interactive && "pointer-events-none",
        className
      )}
      sandbox="allow-scripts allow-forms allow-popups allow-modals"
      srcDoc={srcDoc}
    />
  );
}
