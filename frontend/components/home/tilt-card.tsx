"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glareClassName?: string;
  maxTilt?: number;
  scale?: number;
}

export function TiltCard({
  children,
  className,
  glareClassName,
  maxTilt = 10,
  scale = 1.01,
  ...props
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<CSSProperties>({
    opacity: 0,
    background:
      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 28%, transparent 62%)",
  });

  const content = useMemo(() => {
    const childArray = Children.toArray(children);
    if (childArray.length === 1 && isValidElement(childArray[0])) {
      const child = childArray[0] as ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(child.props.className, "relative z-10"),
      });
    }
    return <div className="relative z-10">{children}</div>;
  }, [children]);

  const reset = () => {
    setInteractive(false);
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const disabled = Boolean(prefersReducedMotion);

  return (
    <div
      className={cn("relative [transform-style:preserve-3d]", className)}
      onPointerMove={(event) => {
        if (disabled || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * maxTilt * 2;
        const rotateX = (0.5 - y) * maxTilt * 2;

        setInteractive(true);
        setStyle({
          transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`,
        });
        setGlareStyle({
          opacity: 1,
          background: `radial-gradient(circle at ${Math.round(x * 100)}% ${Math.round(y * 100)}%, rgba(255,255,255,0.32), rgba(255,255,255,0.08) 30%, transparent 65%)`,
        });
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          interactive && "shadow-[0_18px_70px_rgba(0,0,0,0.34)]"
        )}
        style={disabled ? undefined : style}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300",
            glareClassName
          )}
          style={disabled ? { opacity: 0 } : glareStyle}
        />
        {content}
      </div>
    </div>
  );
}

