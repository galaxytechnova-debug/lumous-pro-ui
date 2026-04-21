"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { categories, allComponents } from "@/lib/components-data";
import { Layers, LayoutGrid, LayoutTemplate, CreditCard, Sparkles, Users } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const navigate = (path: string) => {
    router.push(path);
    onOpenChange(false);
    setSearch("");
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border border-white/10 bg-[#0a0a0f]">
        <CommandInput
          placeholder="Search components..."
          value={search}
          onValueChange={setSearch}
          className="border-b border-white/10"
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty className="py-6 text-center text-gray-400">
            No results found.
          </CommandEmpty>

          {/* Pages */}
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => navigate("/")}>
              <Sparkles className="mr-2 h-4 w-4" />
              Home
            </CommandItem>
            <CommandItem onSelect={() => navigate("/components")}>
              <Layers className="mr-2 h-4 w-4" />
              Components
            </CommandItem>
            <CommandItem onSelect={() => navigate("/templates")}>
              <LayoutTemplate className="mr-2 h-4 w-4" />
              Templates
            </CommandItem>
            <CommandItem onSelect={() => navigate("/pricing")}>
              <CreditCard className="mr-2 h-4 w-4" />
              Pricing
            </CommandItem>
            <CommandItem onSelect={() => navigate("/waitlist")}>
              <Users className="mr-2 h-4 w-4" />
              Join Waitlist
            </CommandItem>
          </CommandGroup>

          {/* Components */}
          <CommandGroup heading="Components">
            {allComponents.slice(0, 10).map((component) => (
              <CommandItem
                key={component.slug}
                onSelect={() => navigate(`/components/${component.slug}`)}
              >
                <Layers className="mr-2 h-4 w-4" />
                {component.name}
                {component.isPro && (
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/20 text-amber-400 rounded">
                    Pro
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Categories */}
          <CommandGroup heading="Categories">
            {categories.map((category) => (
              <CommandItem
                key={category.slug}
                onSelect={() => navigate(`/components?category=${category.slug}`)}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                {category.name}
                <span className="ml-auto text-xs text-gray-500">{category.count}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
