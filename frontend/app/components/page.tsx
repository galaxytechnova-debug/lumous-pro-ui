"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { ComponentsSidebar } from "@/components/components-sidebar";
import { ComponentCard } from "@/components/component-card";
import { allComponents, categories } from "@/lib/components-data";
import { Search, ChevronDown } from "lucide-react";

type SortOption = "newest" | "popular" | "az";
type FilterOption = "all" | "free" | "pro";

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const filteredComponents = useMemo(() => {
    let result = [...allComponents];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Pro/Free filter
    if (filterBy === "free") {
      result = result.filter((c) => !c.isPro);
    } else if (filterBy === "pro") {
      result = result.filter((c) => c.isPro);
    }

    // Sort
    if (sortBy === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [searchQuery, sortBy, filterBy]);

  const groupedByCategory = useMemo(() => {
    return categories
      .map((category) => {
        const items = category.items.filter((item) =>
          filteredComponents.some((component) => component.slug === item.slug)
        );
        return { ...category, items };
      })
      .filter((category) => category.items.length > 0);
  }, [filteredComponents]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <ComponentsSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Components</h1>
            <p className="text-gray-400">
              Browse our collection of {allComponents.length}+ animated UI components.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0f0f1a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              {(["all", "free", "pro"] as FilterOption[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterBy(filter)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors capitalize ${
                    filterBy === filter
                      ? "bg-indigo-600 text-white"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none pl-4 pr-10 py-2 bg-[#0f0f1a] border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:border-indigo-500"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="az">A-Z</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-400 mb-6">
            Showing {filteredComponents.length} components
          </p>

          {/* Components By Category */}
          <div className="space-y-10">
            {groupedByCategory.map((category) => (
              <section key={category.slug} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">{category.name}</h2>
                  <span className="text-xs text-gray-500">
                    {category.items.length} component
                    {category.items.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((component) => (
                    <div
                      key={component.slug}
                      id={`component-${component.slug}`}
                      className="scroll-mt-24"
                    >
                      <ComponentCard component={component} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Empty State */}
          {filteredComponents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 mb-2">No components found.</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
