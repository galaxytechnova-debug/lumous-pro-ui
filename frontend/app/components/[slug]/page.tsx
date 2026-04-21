"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ProCodeGate } from "@/components/pro-code-gate";
import { ComponentsSidebar } from "@/components/components-sidebar";
import { getComponentBySlug, allComponents, categories } from "@/lib/components-data";
import { previewComponents } from "@/components/live-previews";
import { stripTypeScriptForDisplay } from "@/lib/strip-typescript";
import { Check, Copy, ChevronRight, Eye, Code, Lock, Terminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ComponentDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const component = getComponentBySlug(slug);

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  if (!component) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Component not found</h1>
            <p className="text-gray-400 mb-4">The component you are looking for does not exist.</p>
            <Link href="/components" className="text-indigo-400 hover:text-indigo-300">
              Back to components
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === component.category);
  const PreviewComponent = previewComponents[slug];

  const rawCode = component.code;

  const isProLocked = component.isPro;
  const displayCode = isProLocked ? "" : stripTypeScriptForDisplay(rawCode);

  const copyCode = async () => {
    if (isProLocked) return;
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get related components from the same category
  const relatedComponents = allComponents
    .filter((c) => c.category === component.category && c.slug !== component.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <ComponentsSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/components" className="hover:text-white transition-colors">
              Components
            </Link>
            <ChevronRight className="w-4 h-4" />
            {category && (
              <>
                <Link
                  href={`/components?category=${category.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {category.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-white">{component.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold text-white">{component.name}</h1>
              <div className="flex items-center gap-2">
                {component.isPro ? (
                  <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-full">
                    <Lock className="w-3 h-3" />
                    Pro
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-400 rounded-full">
                    Free
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-400">{component.description}</p>
          </div>

          {/* Preview / Code Tabs */}
          <div className="rounded-xl border border-white/10 overflow-hidden mb-8">
            {/* Tab Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0f] border-b border-white/10">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === "preview"
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === "code"
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Code className="w-4 h-4" />
                  Code
                </button>
              </div>

              {/* Copy Button — disabled for Pro (source not exposed) */}
              <button
                type="button"
                onClick={copyCode}
                disabled={isProLocked}
                title={
                  isProLocked
                    ? "Pro component — join the waitlist to unlock source and copy"
                    : undefined
                }
                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                  isProLocked
                    ? "cursor-not-allowed text-zinc-600"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {isProLocked ? (
                  <>
                    <Lock className="w-4 h-4 text-amber-500/80" />
                    <span>Code locked</span>
                  </>
                ) : copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            {/* Content */}
            <div className="bg-[#0f0f1a]">
              {activeTab === "preview" ? (
                <div className="h-[400px]">
                  {PreviewComponent ? (
                    <div className="flex h-full min-h-0 w-full flex-col [&>div]:!h-full [&>div]:!min-h-0 [&>div]:!rounded-none">
                      <PreviewComponent />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500/40 to-purple-500/40" />
                        </div>
                        <p className="text-gray-400">Live preview</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : isProLocked ? (
                <ProCodeGate componentName={component.name} />
              ) : (
                <div className="max-h-[600px] overflow-auto">
                  <SyntaxHighlighter
                    language="jsx"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      padding: "1.5rem",
                      background: "transparent",
                      fontSize: "0.875rem",
                      lineHeight: "1.7",
                    }}
                    codeTagProps={{
                      style: {
                        background: "transparent",
                      }
                    }}
                    showLineNumbers
                  >
                    {displayCode}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </div>

          {/* Installation */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Installation</h2>
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-[#0f0f1a] border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium text-white">
                    1
                  </div>
                  <span className="text-white font-medium">Install dependencies</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg font-mono text-sm">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  <code className="text-cyan-400">npm install framer-motion</code>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-[#0f0f1a] border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium text-white">
                    2
                  </div>
                  <span className="text-white font-medium">
                    {isProLocked ? "Get the Pro source" : "Copy the component code"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  {isProLocked ? (
                    <>
                      This Pro component&apos;s source is not available in the browser.{" "}
                      <Link href="/waitlist" className="text-indigo-400 hover:text-indigo-300">
                        Join the waitlist
                      </Link>{" "}
                      for full access, upcoming premium kits, and early Pro drops.
                    </>
                  ) : (
                    <>Copy the code from the Code tab above and paste it into your project.</>
                  )}
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-[#0f0f1a] border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium text-white">
                    3
                  </div>
                  <span className="text-white font-medium">Import and use</span>
                </div>
                <div className="p-3 bg-black/30 rounded-lg font-mono text-sm overflow-x-auto">
                  <code className="text-gray-300">
                    <span className="text-purple-400">import</span>{" "}
                    {"{"} {component.name.replace(/\s+/g, "")} {"}"}{" "}
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-emerald-400">{`"@/components/${slug}"`}</span>
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Related Components */}
          {relatedComponents.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Related Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedComponents.map((related) => {
                  const RelatedPreview = previewComponents[related.slug];
                  return (
                    <Link
                      key={related.slug}
                      href={`/components/${related.slug}`}
                      className="group p-4 rounded-xl bg-[#0f0f1a] border border-white/10 hover:border-indigo-500/50 transition-colors"
                    >
                      <div className="h-24 mb-3 rounded-lg bg-[#0a0a0f] overflow-hidden">
                        {RelatedPreview ? (
                          <div className="flex h-full min-h-0 w-full scale-[0.6] origin-center [&>*]:!h-full [&>*]:!min-h-0 [&>*]:!rounded-none">
                            <RelatedPreview />
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/40 to-purple-500/40" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                        {related.name}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
