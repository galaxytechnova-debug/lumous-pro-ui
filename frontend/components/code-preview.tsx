"use client";

import { useState } from "react";
import { Check, Copy, Eye, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { stripTypeScriptForDisplay } from "@/lib/strip-typescript";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodePreviewProps {
  code: string;
  preview: React.ReactNode;
  className?: string;
}

export function CodePreview({ code, preview, className }: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const displayCode = stripTypeScriptForDisplay(code);

  const copyCode = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-xl border border-white/10 overflow-hidden", className)}>
      {/* Tabs */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0f] border-b border-white/10">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors",
              activeTab === "preview"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors",
              activeTab === "code"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            <Code className="w-4 h-4" />
            Code
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyCode}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="bg-[#0f0f1a]">
        {activeTab === "preview" ? (
          <div className="min-h-[400px] p-8 flex items-center justify-center">
            {preview}
          </div>
        ) : (
          <div className="max-h-[500px] overflow-auto">
            <SyntaxHighlighter
              language="jsx"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                background: "transparent",
                fontSize: "0.875rem",
              }}
              showLineNumbers
            >
              {displayCode}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
}
