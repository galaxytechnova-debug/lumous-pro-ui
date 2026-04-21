import { allComponents } from "@/lib/components-data";

/** Derived counts — import only from Server Components to avoid bloating client bundles. */
export function getComponentCounts() {
  const total = allComponents.length;
  const free = allComponents.filter((c) => !c.isPro).length;
  return { total, free, pro: total - free };
}
