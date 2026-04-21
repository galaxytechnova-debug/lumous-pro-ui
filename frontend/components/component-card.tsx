"use client";

import Link from "next/link";
import type { ComponentItem } from "@/lib/components-data";
import { previewComponents } from "@/components/live-previews";

interface ComponentCardProps {
  component: ComponentItem;
}

export function ComponentCard({ component }: ComponentCardProps) {
  const PreviewComponent = previewComponents[component.slug];

  return (
    <Link
      href={`/components/${component.slug}`}
      className="group relative block p-4 rounded-xl bg-[#0f0f1a] border border-white/10 card-hover"
    >
      {/* Preview Thumbnail */}
      <div className="relative h-40 mb-4 rounded-lg bg-[#050505] overflow-hidden">
        {/* Live Preview */}
        {PreviewComponent ? (
          <div className="flex h-full w-full min-h-0 flex-col pointer-events-none [&>*]:!h-full [&>*]:!min-h-0 [&_>_div]:rounded-none">
            <PreviewComponent />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-indigo-500/40 to-purple-500/40" />
          </div>
        )}

      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white group-hover:text-indigo-400 transition-colors">
            {component.name}
          </h3>
          <div className="flex items-center gap-1.5">
            {component.isPro ? (
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/20 text-amber-400 rounded">
                Pro
              </span>
            ) : (
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-emerald-500/20 text-emerald-400 rounded">
                Free
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2">
          {component.description}
        </p>
      </div>
    </Link>
  );
}
