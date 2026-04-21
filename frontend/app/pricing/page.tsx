"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, X, Sparkles } from "lucide-react";
import { allComponents } from "@/lib/components-data";

const galleryTotal = allComponents.length;
const galleryFree = allComponents.filter((c) => !c.isPro).length;
const galleryPro = galleryTotal - galleryFree;

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started and exploring components",
    features: [
      { text: `${galleryFree} components with full source in the gallery`, included: true },
      { text: `${galleryTotal} listings browsable (Pro source gated until access)`, included: true },
      { text: "Copy-paste code from free listings", included: true },
      { text: "Dark & light mode", included: true },
      { text: "Framer Motion animations", included: true },
      { text: "Waitlist updates", included: true },
      { text: "Advanced categories", included: false },
      { text: "Advanced pro sections", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started",
    href: "/components",
    highlighted: false,
  },
  {
    name: "Special Access",
    price: "$25",
    period: "limited",
    description: "First 150 users · $25 lifetime, then $45, then $175",
    features: [
      { text: `All ${galleryTotal} gallery listings with full source`, included: true },
      { text: "All advanced categories", included: true },
      { text: "Advanced pro sections", included: true },
      { text: "First 150 users: $25 lifetime access", included: true },
      { text: "Next 250 users: $45 lifetime access", included: true },
      { text: "Then pricing becomes $175 lifetime", included: true },
      { text: "Copy-paste code", included: true },
      { text: "Dark & light mode", included: true },
      { text: "Priority support", included: true },
      { text: "Lifetime updates", included: true },
      { text: "Commercial license", included: true },
    ],
    cta: "Join Waitlist",
    href: "/waitlist",
    highlighted: true,
  },
];

const comparisonRows: Array<{
  feature: string;
  free: boolean | string;
  pro: boolean | string;
}> = [
  { feature: "Gallery listings (browse + preview)", free: String(galleryTotal), pro: String(galleryTotal) },
  { feature: "Listings with full source", free: String(galleryFree), pro: String(galleryTotal) },
  { feature: "Pro-only source unlocked", free: false, pro: true },
  { feature: "Advanced categories", free: false, pro: true },
  { feature: "Advanced Pro sections", free: false, pro: true },
  { feature: "First 150 users", free: false, pro: "$25 lifetime" },
  { feature: "Next 250 users", free: false, pro: "$45 lifetime" },
  { feature: "After early access", free: false, pro: "$175 lifetime" },
  { feature: "Framer Motion", free: true, pro: true },
  { feature: "Dark/Light Mode", free: true, pro: true },
  { feature: "Commercial License", free: false, pro: true },
  { feature: "Lifetime Updates", free: false, pro: true },
  { feature: "Priority Support", free: false, pro: true },
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Payments are securely processed through Stripe.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes! We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, contact us within 30 days for a full refund.",
  },
  {
    question: "What does lifetime access mean?",
    answer: "Lifetime access means one payment for permanent access. Current waves: first 150 users at $25 lifetime, next 250 users at $45 lifetime, then $175 lifetime.",
  },
  {
    question: "Can I use components in client projects?",
    answer: "Yes! Special Access is described as including a commercial license for unlimited personal and client projects once billing is live.",
  },
  {
    question: "Do I need to attribute LumosUI?",
    answer: "No attribution is required for Special Access. For free components, a mention is appreciated but not mandatory.",
  },
  {
    question: "How do I get support?",
    answer: "Until we publish a community link, use the waitlist flow for Pro questions and the contact options we provide after purchase. Free users can still browse every listing and preview animations in the gallery.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-white">
            <span className="font-medium">Special offer:</span> First 150 users{" "}
            <span className="font-semibold text-emerald-200">$25 lifetime</span>, next 250{" "}
            <span className="font-semibold text-sky-200">$45 lifetime</span>, then{" "}
            <span className="font-semibold text-amber-200">$175 lifetime</span>.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-400">Waitlist now open</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get access to <span className="text-gradient">everything</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Join the waitlist to lock your wave. Each tier is lifetime access—pricing steps up as spots fill.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border ${
                plan.highlighted
                  ? "bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f] border-indigo-500/50"
                  : "bg-[#0f0f1a] border-white/10"
              }`}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-medium bg-indigo-600 text-white rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Glow effect */}
              {plan.highlighted && (
                <div className="absolute inset-0 rounded-2xl glow-primary opacity-20 pointer-events-none" />
              )}

              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.highlighted ? "bg-indigo-500/20" : "bg-white/10"
                        }`}>
                          <Check className={`w-3 h-3 ${
                            plan.highlighted ? "text-indigo-400" : "text-emerald-400"
                          }`} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/5">
                          <X className="w-3 h-3 text-gray-500" />
                        </div>
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-500"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white animate-pulse-glow"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Compare Plans
          </h2>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0a0a0f]">
                  <th className="text-left p-4 text-gray-400 font-medium">Feature</th>
                  <th className="text-center p-4 text-gray-400 font-medium">Free</th>
                  <th className="text-center p-4 text-indigo-400 font-medium">Special Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="bg-[#0f0f1a]">
                    <td className="p-4 text-gray-300">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-500 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-300">{row.free}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="w-5 h-5 text-indigo-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-500 mx-auto" />
                        )
                      ) : (
                        <span className="text-indigo-400 font-medium">{row.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 rounded-xl px-6 bg-[#0f0f1a] data-[state=open]:border-indigo-500/50"
              >
                <AccordionTrigger className="text-white hover:text-indigo-400 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Final CTA */}
        <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Get in the queue before early-access slots fill up.
          </p>
          <Link href="/waitlist">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white animate-pulse-glow">
              Join Waitlist
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
