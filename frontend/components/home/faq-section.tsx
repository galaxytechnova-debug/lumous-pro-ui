"use client";

import { RevealOnScroll } from "./reveal-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What technologies are the components built with?",
    answer:
      "Gallery blocks are built with React, Tailwind CSS v4, and Framer Motion. They are written for Next.js App Router style client components but can be adapted for other React setups.",
  },
  {
    question: "Can I use free components in commercial projects?",
    answer:
      "Check each component page for its license note. Paid Special Access (see /pricing) is described as including a commercial license for client work; until you purchase, rely on the terms shown with the free source you copy.",
  },
  {
    question: "Do I need extra dependencies?",
    answer:
      "Most listings expect Tailwind and Framer Motion. A few backgrounds or effects pull in additional packages—those imports are visible in the code panel on the component detail page.",
  },
  {
    question: "What does Pro or Special Access change?",
    answer:
      "Pro-gated listings hide full source behind a waitlist gate until you have access. Free listings show the full snippet immediately. Pricing waves for lifetime access are listed on /pricing.",
  },
  {
    question: "Is there a refund policy for paid access?",
    answer:
      "Waitlist signup is free and does not charge you. Paid Special Access is offered in release waves, and any billing terms are shown clearly at checkout before you purchase.",
  },
  {
    question: "How do I suggest a new component?",
    answer:
      "Use the waitlist and pricing flows linked in the header for now. There is no public GitHub or Discord linked from this marketing site yet—do not expect those channels until we publish them.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 px-4 bg-[#050505]">
      <div className="container mx-auto max-w-3xl">
        <RevealOnScroll className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Straight answers tied to what this repository actually ships today.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-white/10 bg-[#0f0f1a] px-6 data-[state=open]:border-indigo-500/50 data-[state=open]:shadow-[0_16px_48px_rgba(99,102,241,0.12)]"
              >
                <AccordionTrigger className="py-4 text-white hover:text-indigo-400 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </div>
    </section>
  );
}
