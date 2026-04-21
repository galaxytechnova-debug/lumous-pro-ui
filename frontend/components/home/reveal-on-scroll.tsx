"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  y?: number;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  delayMs = 0,
  y = 28,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(Boolean(prefersReducedMotion));

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity]",
        visible ? "translate-y-0 opacity-100 blur-0" : "opacity-0 blur-sm",
        className
      )}
      style={{
        transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

