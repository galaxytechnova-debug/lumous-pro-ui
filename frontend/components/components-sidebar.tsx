"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/components-data";
import { ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_EXPANDED_KEY = "lumous-sidebar-expanded-categories";

export function ComponentsSidebar() {
  const pathname = usePathname();
  // Always start collapsed so SSR and the first client render match; restore from
  // localStorage after mount to avoid hydration mismatches.
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [sidebarHydrated, setSidebarHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SIDEBAR_EXPANDED_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        if (Array.isArray(parsed)) setExpandedCategories(parsed);
      }
    } catch {
      // ignore invalid JSON
    }
    setSidebarHydrated(true);
  }, []);

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  useEffect(() => {
    if (!sidebarHydrated) return;
    window.localStorage.setItem(
      SIDEBAR_EXPANDED_KEY,
      JSON.stringify(expandedCategories)
    );
  }, [expandedCategories, sidebarHydrated]);

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-background overflow-y-auto h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4">
        {/* Categories */}
        <nav className="space-y-1">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.slug);

            return (
              <div key={category.slug}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.slug)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                    />
                    {category.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </button>

                {/* Category Items */}
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {category.items.map((item) => {
                      const isActive = pathname === `/components/${item.slug}`;

                      return (
                        <Link
                          key={item.slug}
                          href={`/components/${item.slug}`}
                          className={cn(
                            "flex items-center justify-between px-3 py-1.5 text-sm rounded-lg transition-colors",
                            isActive
                              ? "bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <span className="truncate">{item.name}</span>
                          <span className="flex items-center gap-1">
                            {item.isPro && (
                              <Lock className="w-3 h-3 text-amber-400" />
                            )}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
