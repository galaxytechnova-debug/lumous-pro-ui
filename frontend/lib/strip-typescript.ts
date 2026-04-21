"use client";

/**
 * TypeScript -> JavaScript formatter for snippet display.
 * Keeps runtime code intact and only transforms the shown/copied code text.
 */
export function stripTypeScriptForDisplay(code: string): string {
  // Prefer real TS->JS transpilation so all TS syntax is removed reliably.
  // This only affects the displayed/copyable snippet text.
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ts = require("typescript") as typeof import("typescript");
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2017,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.ReactJSX,
        removeComments: true,
      },
      reportDiagnostics: false,
    });
    return (result.outputText || "").trim();
  } catch {
    // Fallback to best-effort regex stripping.
    let output = removeTypeDeclarations(code);

    // Remove type-only imports.
    output = output.replace(/^\s*import\s+type\s+.*$/gm, "");

    // Remove call generics (best-effort; nested generics may remain in fallback mode).
    output = output.replace(/([A-Za-z_$][\w$]*)<[^>\n()]+>\(/g, "$1(");

    // Remove variable annotations: const x: Type = ... -> const x = ...
    output = output.replace(
      /\b(const|let|var)\s+([A-Za-z_$][\w$]*)\s*:\s*[^=;\n]+([=;])/g,
      "$1 $2 $3"
    );

    // Remove return type annotations (best-effort).
    output = output.replace(/\)\s*:\s*[^={\n]+(\s*=>)/g, ")$1");
    output = output.replace(/\)\s*:\s*[^={\n]+(\s*\{)/g, ")$1");

    // Remove TS assertions (best-effort).
    output = output.replace(/\s+as\s+[A-Za-z_$][\w$<>{}\[\]\s|,]*/g, "");

    // Tidy excessive blank lines.
    output = output.replace(/\n{3,}/g, "\n\n");

    return output.trim();
  }
}

function stripParamTypes(params: string): string {
  return params
    .split(",")
    .map((chunk) => chunk.replace(/([A-Za-z_$][\w$]*)\s*:\s*[^=]+(?==|$)/, "$1"))
    .join(",");
}

function removeTypeDeclarations(code: string): string {
  const lines = code.split("\n");
  const kept: string[] = [];

  let skipMode: "interface" | "type" | null = null;
  let braceDepth = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!skipMode) {
      const isInterface =
        trimmed.startsWith("interface ") ||
        trimmed.startsWith("export interface ");
      const isTypeAlias =
        trimmed.startsWith("type ") || trimmed.startsWith("export type ");

      if (isInterface || isTypeAlias) {
        skipMode = isInterface ? "interface" : "type";
        braceDepth += (line.match(/\{/g) || []).length;
        braceDepth -= (line.match(/\}/g) || []).length;

        // Single-line type aliases without braces.
        if (skipMode === "type" && braceDepth === 0 && trimmed.endsWith(";")) {
          skipMode = null;
        }
        continue;
      }

      kept.push(line);
      continue;
    }

    braceDepth += (line.match(/\{/g) || []).length;
    braceDepth -= (line.match(/\}/g) || []).length;

    if (braceDepth <= 0 && (skipMode === "interface" || trimmed.endsWith(";"))) {
      skipMode = null;
      braceDepth = 0;
    }
  }

  return kept.join("\n");
}

