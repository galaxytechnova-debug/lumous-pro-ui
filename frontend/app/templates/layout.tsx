import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Templates — LumosUI",
  description:
    "Browse saved HTML templates with live previews and fullscreen. Design prompts are Pro — join the waitlist for access.",
};

export default function TemplatesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
