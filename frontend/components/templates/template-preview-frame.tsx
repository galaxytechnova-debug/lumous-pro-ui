"use client";

import { HtmlPreviewIframe } from "@/components/templates/html-preview-iframe";
import { cn } from "@/lib/utils";

type TemplatePreviewFrameProps = {
  html: string;
  title: string;
  className?: string;
  iframeClassName?: string;
  interactive?: boolean;
  /**
   * When true, the iframe grows to fill a flex parent (`flex-1 min-h-0` on ancestors).
   * Use for workbench layouts; cards/detail inline previews should omit this.
   */
  fillHeight?: boolean;
};

export function TemplatePreviewFrame({
  html,
  title,
  className,
  iframeClassName,
  interactive = true,
  fillHeight = false,
}: TemplatePreviewFrameProps) {
  if (fillHeight) {
    return (
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
          className
        )}
      >
        <div className="relative min-h-0 flex-1">
          <HtmlPreviewIframe
            html={html}
            title={title}
            interactive={interactive}
            className={cn("absolute inset-0 h-full w-full border-0", iframeClassName)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <HtmlPreviewIframe
        html={html}
        title={title}
        interactive={interactive}
        className={cn("h-[min(70vh,560px)] border-0", iframeClassName)}
      />
    </div>
  );
}
