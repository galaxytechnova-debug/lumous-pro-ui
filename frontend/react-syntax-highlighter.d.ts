declare module "react-syntax-highlighter" {
  import * as React from "react";
  export const Prism: React.ComponentType<any>;
  const SyntaxHighlighter: React.ComponentType<any>;
  export default SyntaxHighlighter;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  const styles: Record<string, unknown>;
  export const oneDark: Record<string, unknown>;
  export default styles;
}

