import {
  shapeLandingHeroCode,
  gridGlowBackgroundCode,
  tubeCursorCode,
} from "./component-code-snippets";
import {
  explosiveLetterBurstCode,
  shadowDanceLumousCode,
  meltingTextLumousCode,
  matrixLumousCode,
  spin3DLumousCode,
  splitTextLumousCode,
  glow3DLumousCode,
} from "./lumous-text-effect-codes";

export interface ComponentItem {
  name: string;
  slug: string;
  description: string;
  category: string;
  isPro: boolean;
  isNew: boolean;
  preview?: React.ComponentType;
  code: string;
}

export interface CategoryItem {
  name: string;
  slug: string;
  count: number;
  items: ComponentItem[];
}

const categorySeed: CategoryItem[] = [
  {
    name: "Backgrounds & Effects",
    slug: "backgrounds",
    count: 19,
    items: [
      {
        name: "Sparkles",
        slug: "sparkles",
        description: "Configurable glittering sparkles overlay effect",
        category: "backgrounds",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useEffect, useRef } from "react";

interface SparklesProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
}

export function Sparkles({
  className = "",
  particleCount = 50,
  particleColor = "#6366f1"
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = \`
        position: absolute;
        width: \${Math.random() * 4 + 2}px;
        height: \${Math.random() * 4 + 2}px;
        background: \${particleColor};
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: sparkle \${Math.random() * 2 + 1}s ease-in-out infinite;
        animation-delay: \${Math.random() * 2}s;
        left: \${Math.random() * 100}%;
        top: \${Math.random() * 100}%;
      \`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [particleCount, particleColor]);

  return (
    <>
      <style>{\`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      \`}</style>
      <div
        ref={containerRef}
        className={\`absolute inset-0 overflow-hidden \${className}\`}
      />
    </>
  );
}`
      },
      {
        name: "Aurora Background",
        slug: "aurora-background",
        description: "Soft aurora borealis color shifts for stunning hero sections",
        category: "backgrounds",
        isPro: false,
        isNew: true,
        code: `"use client";

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function AuroraBackground({
  className = "",
  children
}: AuroraBackgroundProps) {
  return (
    <div className={\`relative overflow-hidden bg-[#050505] \${className}\`}>
      <div className="absolute inset-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-50 animate-aurora"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            top: "10%",
            left: "20%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-40 animate-aurora"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            top: "30%",
            right: "15%",
            animationDelay: "-5s",
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-[140px] opacity-30 animate-aurora"
          style={{
            background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
            bottom: "10%",
            left: "30%",
            animationDelay: "-10s",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}`
      },
      {
        name: "Grid Background",
        slug: "grid-background",
        description: "Simple crisp dot or grid overlays",
        category: "backgrounds",
        isPro: false,
        isNew: false,
        code: `"use client";

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "grid" | "dots";
}

export function GridBackground({
  className = "",
  children,
  variant = "grid"
}: GridBackgroundProps) {
  return (
    <div className={\`relative w-full bg-[#050505] \${className}\`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            variant === "grid"
              ? \`linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)\`
              : \`radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)\`,
          backgroundSize: variant === "grid" ? "40px 40px" : "20px 20px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}`
      },
      {
        name: "Spotlight",
        slug: "spotlight",
        description: "Cursor-following radial spotlight effect",
        category: "backgrounds",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useRef, useState, useCallback } from "react";

interface SpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export function Spotlight({ className = "", children }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={\`relative overflow-hidden bg-[#050505] \${className}\`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, rgba(99, 102, 241, 0.15), transparent 40%)\`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}`
      },
      {
        name: "Gradient Animation",
        slug: "gradient-animation",
        description: "Full-page smooth shifting gradient background",
        category: "backgrounds",
        isPro: false,
        isNew: false,
        code: `"use client";

interface GradientAnimationProps {
  className?: string;
  children?: React.ReactNode;
}

export function GradientAnimation({
  className = "",
  children
}: GradientAnimationProps) {
  return (
    <div className={\`relative overflow-hidden \${className}\`}>
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: "linear-gradient(-45deg, #6366f1, #a855f7, #22d3ee, #10b981)",
          backgroundSize: "400% 400%",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}`
      },
      {
        name: "Floating Elements",
        slug: "floating-elements",
        description: "Animated floating shapes that drift across the background",
        category: "backgrounds",
        isPro: false,
        isNew: true,
        code: `"use client";

interface FloatingElementsProps {
  className?: string;
  children?: React.ReactNode;
  count?: number;
}

export function FloatingElements({
  className = "",
  children,
  count = 10
}: FloatingElementsProps) {
  return (
    <div className={\`relative overflow-hidden \${className}\`}>
      <style>{\`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      \`}</style>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-8 h-8 rounded-lg bg-indigo-500/10"
          style={{
            left: \`\${Math.random() * 100}%\`,
            top: \`\${Math.random() * 100}%\`,
            animation: \`float \${3 + Math.random() * 3}s ease-in-out infinite\`,
            animationDelay: \`\${Math.random() * 2}s\`,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}`
      },
      {
        name: "Morphing Shape",
        slug: "morphing-shape",
        description: "Continuously morphing blob shape animation",
        category: "backgrounds",
        isPro: false,
        isNew: true,
        code: `"use client";

interface MorphingShapeProps {
  className?: string;
  colors?: string[];
}

export function MorphingShape({
  className = "",
  colors = ["#6366f1", "#a855f7"]
}: MorphingShapeProps) {
  return (
    <>
      <style>{\`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
      \`}</style>
      <div
        className={\`w-64 h-64 \${className}\`}
        style={{
          background: \`linear-gradient(135deg, \${colors[0]}, \${colors[1]})\`,
          animation: "morph 8s ease-in-out infinite",
        }}
      />
    </>
  );
}`
      },
      {
        name: "Neural Mesh Background",
        slug: "neural-mesh-background",
        description: "Layered mesh lines with neural network ambience",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function NeuralMeshBackground() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#050509]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_55%_80%,rgba(168,85,247,0.18),transparent_45%)]" />
      <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 400 240" preserveAspectRatio="none">
        {[...Array(8)].map((_, i) => (
          <path key={i} d={\`M0 \${20 + i * 28} Q 120 \${12 + i * 30} 240 \${24 + i * 26} T 400 \${20 + i * 28}\`} stroke="rgba(99,102,241,0.3)" strokeWidth="1" fill="none" />
        ))}
      </svg>
    </div>
  );
}`
      },
      {
        name: "Liquid Gradient Background",
        slug: "liquid-gradient-background",
        description: "Fluid gradient blend inspired by Granim and Motion One",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function LiquidGradientBackground() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 animate-gradient-shift" style={{ background: "linear-gradient(-45deg,#0f172a,#1d4ed8,#7c3aed,#06b6d4,#0f172a)", backgroundSize: "400% 400%" }} />
      <div className="absolute -left-10 top-8 w-44 h-44 rounded-full blur-3xl bg-cyan-400/30 animate-pulse" />
      <div className="absolute right-0 bottom-4 w-40 h-40 rounded-full blur-3xl bg-violet-400/30 animate-pulse" />
    </div>
  );
}`
      },
      {
        name: "Starfield Warp Background",
        slug: "starfield-warp-background",
        description: "Deep-space warp lane with dense star particles",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function StarfieldWarpBackground() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black">
      {[...Array(45)].map((_, i) => (
        <span key={i} className="absolute bg-white rounded-full" style={{ width: 1 + (i % 3), height: 1 + (i % 3), left: \`\${(i * 17) % 100}%\`, top: \`\${(i * 29) % 100}%\`, opacity: 0.25 + (i % 4) * 0.15 }} />
      ))}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />
    </div>
  );
}`
      },
      {
        name: "Matrix Rain Background",
        slug: "matrix-rain-background",
        description: "Retro terminal rain effect inspired by cursor effects",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function MatrixRainBackground() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black">
      {[...Array(14)].map((_, i) => (
        <div key={i} className="absolute top-0 text-[10px] font-mono text-emerald-400/70" style={{ left: \`\${5 + i * 7}%\`, animation: \`meteor \${2 + (i % 4)}s linear infinite\`, animationDelay: \`\${i * 0.12}s\` }}>
          101001
        </div>
      ))}
    </div>
  );
}`
      },
      {
        name: "Plasma Field Background",
        slug: "plasma-field-background",
        description: "Conic plasma core inspired by shader and WebGL palettes",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function PlasmaFieldBackground() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#04040a]">
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#22d3ee55,#6366f155,#a855f755,#22d3ee55)] animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-6 rounded-full bg-[#04040a]/70 backdrop-blur-xl" />
    </div>
  );
}`
      },
      {
        name: "Ribbon Flow Background",
        slug: "ribbon-flow-background",
        description: "Multi-layer flowing ribbons with luminous gradients",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function RibbonFlowBackground() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#06060c]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="none">
        <path d="M-20 180 C80 100,140 220,260 140 S380 120,420 70" stroke="url(#ribbonA)" strokeWidth="24" fill="none" opacity="0.7" />
        <path d="M-20 90 C100 20,180 160,300 70 S390 40,420 10" stroke="url(#ribbonB)" strokeWidth="18" fill="none" opacity="0.6" />
        <defs>
          <linearGradient id="ribbonA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="ribbonB" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}`
      },
      {
        name: "Halftone Wave Background",
        slug: "halftone-wave-background",
        description: "Editorial-style halftone texture with depth wave",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function HalftoneWaveBackground() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#07070f]">
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, rgba(99,102,241,0.4) 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-indigo-500/30 to-transparent" />
    </div>
  );
}`
      },
      {
        name: "Topographic Lines Background",
        slug: "topographic-lines-background",
        description: "Contour-inspired line rings for map-like depth",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function TopographicLinesBackground() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#05050a]">
      <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 400 240" preserveAspectRatio="none">
        {[...Array(9)].map((_, i) => (
          <ellipse key={i} cx="200" cy="120" rx={40 + i * 22} ry={18 + i * 10} fill="none" stroke="rgba(34,211,238,0.35)" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}`
      },
      {
        name: "Particle Network Background",
        slug: "particle-network-background",
        description: "Connected particle graph inspired by tsParticles networks",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function ParticleNetworkBackground() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#040409]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="none">
        {[...Array(24)].map((_, i) => {
          const x = 20 + (i * 31) % 360;
          const y = 20 + (i * 47) % 200;
          return <circle key={\`c\${i}\`} cx={x} cy={y} r="2.2" fill="rgba(99,102,241,0.8)" />;
        })}
        {[...Array(18)].map((_, i) => (
          <line key={\`l\${i}\`} x1={20 + (i * 31) % 360} y1={20 + (i * 47) % 200} x2={20 + ((i + 5) * 31) % 360} y2={20 + ((i + 3) * 47) % 200} stroke="rgba(99,102,241,0.25)" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}`
      },
      {
        name: "Shape Landing Hero",
        slug: "shape-landing-hero",
        description: "Framer Motion hero with floating gradient ellipse shapes and dual-line headline",
        category: "backgrounds",
        isPro: false,
        isNew: true,
        code: shapeLandingHeroCode,
      },
      {
        name: "Grid Glow Background",
        slug: "grid-glow-background",
        description: "Canvas grid with drifting radial glow orbs for a futuristic hero",
        category: "backgrounds",
        isPro: false,
        isNew: true,
        code: gridGlowBackgroundCode,
      },
      {
        name: "Aurora Mesh Pro",
        slug: "aurora-mesh-pro",
        description: "WebGL-style aurora mesh blend with heavy blur bloom",
        category: "backgrounds",
        isPro: true,
        isNew: true,
        code: `"use client";

export function AuroraMeshPro() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#04040a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(99,102,241,0.45),transparent_42%),radial-gradient(circle_at_75%_35%,rgba(168,85,247,0.35),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(34,211,238,0.35),transparent_45%)] animate-gradient-shift" style={{ backgroundSize: "240% 240%" }} />
      <div className="absolute inset-0 backdrop-blur-[40px]" />
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Card Components",
    slug: "cards",
    count: 10,
    items: [
      {
        name: "3D Card Effect",
        slug: "3d-card",
        description: "Mouse-parallax depth card tilt effect",
        category: "cards",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useRef, useState } from "react";

interface Card3DProps {
  className?: string;
  children?: React.ReactNode;
}

export function Card3D({ className = "", children }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setRotateX(-mouseY / 10);
    setRotateY(mouseX / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      className={\`relative transition-transform duration-200 ease-out \${className}\`}
      style={{
        transform: \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}`
      },
      {
        name: "Glare Card",
        slug: "glare-card",
        description: "Glare sheen effect on hover (Linear style)",
        category: "cards",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useRef, useState } from "react";

interface GlareCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlareCard({ className = "", children }: GlareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlarePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      className={\`relative overflow-hidden rounded-xl bg-[#0f0f1a] border border-white/10 \${className}\`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: \`radial-gradient(circle at \${glarePosition.x}% \${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)\`,
        }}
      />
      {children}
    </div>
  );
}`
      },
      {
        name: "Focus Cards",
        slug: "focus-cards",
        description: "Hover focuses one card, blurs others",
        category: "cards",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useState } from "react";

interface FocusCardProps {
  title: string;
  description: string;
}

interface FocusCardsProps {
  cards: FocusCardProps[];
  className?: string;
}

export function FocusCards({ cards, className = "" }: FocusCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={\`grid grid-cols-1 md:grid-cols-3 gap-4 \${className}\`}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={\`relative p-6 rounded-xl bg-[#0f0f1a] border border-white/10 transition-all duration-300 \${
            hoveredIndex !== null && hoveredIndex !== index
              ? "blur-sm scale-95 opacity-50"
              : "blur-0 scale-100 opacity-100"
          }\`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
          <p className="text-sm text-gray-400">{card.description}</p>
        </div>
      ))}
    </div>
  );
}`
      },
      {
        name: "Card Spotlight",
        slug: "card-spotlight",
        description: "Radial gradient follows cursor on card",
        category: "cards",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useRef, useState } from "react";

interface CardSpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardSpotlight({ className = "", children }: CardSpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={\`relative overflow-hidden rounded-xl border border-white/10 bg-[#0f0f1a] p-8 \${className}\`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, rgba(99,102,241,.15), transparent 40%)\`,
        }}
      />
      {children}
    </div>
  );
}`
      },
      {
        name: "Neon Glow Card",
        slug: "neon-glow-card",
        description: "Card with neon glow border effect",
        category: "cards",
        isPro: false,
        isNew: true,
        code: `"use client";

interface NeonGlowCardProps {
  className?: string;
  children?: React.ReactNode;
  glowColor?: string;
}

export function NeonGlowCard({
  className = "",
  children,
  glowColor = "rgba(34,211,238,0.5)"
}: NeonGlowCardProps) {
  return (
    <div
      className={\`p-6 rounded-xl bg-[#0f0f1a] border border-cyan-500/50 transition-shadow duration-300 hover:shadow-[0_0_40px_\${glowColor}] \${className}\`}
      style={{
        boxShadow: \`0 0 20px \${glowColor.replace('0.5', '0.3')}\`,
      }}
    >
      {children}
    </div>
  );
}`
      },
      {
        name: "Glassmorphism Card",
        slug: "glassmorphism-card",
        description: "Frosted glass effect with blur backdrop",
        category: "cards",
        isPro: false,
        isNew: true,
        code: `"use client";

interface GlassmorphismCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlassmorphismCard({
  className = "",
  children
}: GlassmorphismCardProps) {
  return (
    <div className={\`relative overflow-hidden p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_45px_-20px_rgba(99,102,241,0.45)] \${className}\`}>
      <div className="absolute -top-14 -right-10 h-28 w-28 rounded-full bg-indigo-400/30 blur-2xl" />
      <div className="absolute -bottom-14 -left-10 h-28 w-28 rounded-full bg-fuchsia-400/25 blur-2xl" />
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
          alt="Modern office building"
          className="h-36 w-full rounded-xl object-cover border border-white/20"
        />
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-indigo-200/80">Design System</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Premium Product Card</h3>
            <p className="mt-1 text-sm text-white/75">Beautiful frosted layers with image, metadata, and action states.</p>
          </div>
          <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-xs font-medium text-emerald-300">
            Live
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}`
      },
      {
        name: "Animated Border",
        slug: "animated-border",
        description: "Card with continuously rotating gradient border",
        category: "cards",
        isPro: false,
        isNew: true,
        code: `"use client";

interface AnimatedBorderProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedBorder({
  className = "",
  children
}: AnimatedBorderProps) {
  return (
    <div className={\`relative p-[2px] rounded-xl overflow-hidden \${className}\`}>
      <style>{\`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      \`}</style>
      <div
        className="absolute inset-0"
        style={{
          background: "conic-gradient(from 0deg, #6366f1, #a855f7, #22d3ee, #6366f1)",
          animation: "spin-slow 3s linear infinite",
        }}
      />
      <div className="relative p-6 rounded-xl bg-[#0f0f1a]">
        {children}
      </div>
    </div>
  );
}`
      },
      {
        name: "Pricing Card",
        slug: "pricing-card",
        description: "Feature-rich pricing card with highlights",
        category: "cards",
        isPro: false,
        isNew: true,
        code: `"use client";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export function PricingCard({
  title,
  price,
  period = "/mo",
  features,
  highlighted = false,
  buttonText = "Get Started",
  onButtonClick,
  className = ""
}: PricingCardProps) {
  return (
    <div
      className={\`relative overflow-hidden p-6 rounded-2xl \${
        highlighted
          ? "bg-[#0f0f1a] border-2 border-indigo-500 shadow-[0_20px_45px_-24px_rgba(99,102,241,0.85)]"
          : "bg-[#0f0f1a] border border-white/10"
      } \${className}\`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-indigo-500/20 to-transparent" />
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full">
          Popular
        </div>
      )}
      <div className="relative mb-4">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80"
          alt="Dashboard analytics"
          className="h-28 w-full rounded-xl object-cover border border-white/10"
        />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <div className="mt-4 mb-6">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-gray-400">{period}</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-emerald-500">✓</span> {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onButtonClick}
        className={\`w-full py-3 rounded-lg font-medium transition-colors \${
          highlighted
            ? "bg-indigo-600 text-white hover:bg-indigo-500"
            : "bg-white/10 text-white hover:bg-white/20"
        }\`}
      >
        {buttonText}
      </button>
    </div>
  );
}`
      },
      {
        name: "Testimonial Card",
        slug: "testimonial-card",
        description: "Customer testimonial card with avatar",
        category: "cards",
        isPro: false,
        isNew: true,
        code: `"use client";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatarUrl,
  className = ""
}: TestimonialCardProps) {
  return (
    <div className={\`p-6 rounded-2xl bg-[#0f0f1a] border border-white/10 shadow-[0_18px_40px_-30px_rgba(56,189,248,0.8)] \${className}\`}>
      <div className="mb-4">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80"
          alt="Team collaboration"
          className="h-28 w-full rounded-xl object-cover border border-white/10"
        />
      </div>
      <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img src={avatarUrl} alt={author} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
        )}
        <div>
          <p className="text-white font-medium">{author}</p>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-emerald-400 font-medium">+47% conversion</p>
          <p className="text-[11px] text-gray-500">after 3 weeks</p>
        </div>
      </div>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Text Components",
    slug: "text",
    count: 12,
    items: [
      {
        name: "Text Generate Effect",
        slug: "text-generate",
        description: "Words fade/blur in one by one with animation",
        category: "text",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useEffect, useState } from "react";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export function TextGenerateEffect({
  words,
  className = "",
}: TextGenerateEffectProps) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const wordsArray = words.split(" ");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (displayedWords.length < wordsArray.length) {
        setDisplayedWords(wordsArray.slice(0, displayedWords.length + 1));
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [displayedWords, wordsArray]);

  return (
    <div className={className}>
      {wordsArray.map((word, idx) => (
        <span
          key={idx}
          className={\`inline-block mr-2 transition-all duration-300 \${
            idx < displayedWords.length
              ? "opacity-100 blur-0"
              : "opacity-0 blur-sm"
          }\`}
        >
          {word}
        </span>
      ))}
    </div>
  );
}`
      },
      {
        name: "Typewriter Effect",
        slug: "typewriter",
        description: "Characters type onto screen with cursor blink",
        category: "text",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
}

export function TypewriterEffect({
  words,
  className = "",
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}`
      },
      {
        name: "Flip Words",
        slug: "flip-words",
        description: "Words flip/rotate through a list with spring animation",
        category: "text",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useEffect, useState } from "react";

interface FlipWordsProps {
  words: string[];
  className?: string;
  duration?: number;
}

export function FlipWords({
  words,
  className = "",
  duration = 3000,
}: FlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, 300);
    }, duration);
    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span
      className={\`inline-block transition-all duration-300 \${
        isFlipping
          ? "transform -translate-y-full opacity-0"
          : "transform translate-y-0 opacity-100"
      } \${className}\`}
    >
      {words[currentIndex]}
    </span>
  );
}`
      },
      {
        name: "Gradient Text",
        slug: "gradient-text",
        description: "Animated gradient text with color shifting",
        category: "text",
        isPro: false,
        isNew: false,
        code: `"use client";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className = "",
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={\`bg-clip-text text-transparent \${
        animate ? "text-gradient-animated" : "text-gradient"
      } \${className}\`}
    >
      {children}
    </span>
  );
}`
      },
      {
        name: "Particle Text Effect",
        slug: "particle-text-effect",
        description: "Canvas particle words that morph with interactive dispersion",
        category: "text",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useEffect, useRef } from "react";

class Particle {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.closeEnoughTarget = 100;
    this.maxSpeed = 1;
    this.maxForce = 0.1;
    this.particleSize = 10;
    this.isKilled = false;
    this.startColor = { r: 0, g: 0, b: 0 };
    this.targetColor = { r: 0, g: 0, b: 0 };
    this.colorWeight = 0;
    this.colorBlendRate = 0.01;
  }

  move() {
    let proximityMult = 1;
    const distance = Math.hypot(this.pos.x - this.target.x, this.pos.y - this.target.y);
    if (distance < this.closeEnoughTarget) proximityMult = distance / this.closeEnoughTarget;

    const towardsTarget = { x: this.target.x - this.pos.x, y: this.target.y - this.pos.y };
    const magnitude = Math.hypot(towardsTarget.x, towardsTarget.y);
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult;
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult;
    }

    const steer = { x: towardsTarget.x - this.vel.x, y: towardsTarget.y - this.vel.y };
    const steerMagnitude = Math.hypot(steer.x, steer.y);
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce;
      steer.y = (steer.y / steerMagnitude) * this.maxForce;
    }

    this.acc.x += steer.x;
    this.acc.y += steer.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx) {
    if (this.colorWeight < 1) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1);
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    };

    ctx.fillStyle = \`rgb(\${currentColor.r}, \${currentColor.g}, \${currentColor.b})\`;
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
  }
}

const DEFAULT_WORDS = ["LUMOS UI", "TEXT FX", "MOTION READY", "DARK EXPERIENCE", "CREATE FAST"];

export function ParticleTextEffect({ words = DEFAULT_WORDS, className = "" }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const frameCountRef = useRef(0);
  const wordIndexRef = useRef(0);

  const nextWord = (word, canvas) => {
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    const offscreenCtx = offscreenCanvas.getContext("2d");
    if (!offscreenCtx) return;

    offscreenCtx.fillStyle = "white";
    offscreenCtx.font = "bold 100px Arial";
    offscreenCtx.textAlign = "center";
    offscreenCtx.textBaseline = "middle";
    offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2);

    const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const particles = particlesRef.current;
    let particleIndex = 0;
    const newColor = { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255 };

    for (let i = 0; i < pixels.length; i += 24) {
      if (pixels[i + 3] <= 0) continue;
      const x = (i / 4) % canvas.width;
      const y = Math.floor(i / 4 / canvas.width);

      let particle;
      if (particleIndex < particles.length) {
        particle = particles[particleIndex];
        particle.isKilled = false;
        particleIndex++;
      } else {
        particle = new Particle();
        particle.pos.x = canvas.width / 2 + (Math.random() - 0.5) * (canvas.width + canvas.height);
        particle.pos.y = canvas.height / 2 + (Math.random() - 0.5) * (canvas.width + canvas.height);
        particle.maxSpeed = Math.random() * 6 + 4;
        particle.maxForce = particle.maxSpeed * 0.05;
        particle.colorBlendRate = Math.random() * 0.0275 + 0.0025;
        particles.push(particle);
      }

      particle.startColor = {
        r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
        g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
        b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
      };
      particle.targetColor = newColor;
      particle.colorWeight = 0;
      particle.target.x = x;
      particle.target.y = y;
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle) => {
      particle.move();
      particle.draw(ctx);
    });

    frameCountRef.current++;
    if (frameCountRef.current % 240 === 0) {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
      nextWord(words[wordIndexRef.current], canvas);
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1000;
    canvas.height = 500;
    nextWord(words[0], canvas);
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className={\`flex flex-col items-center justify-center bg-black p-4 \${className}\`}>
      <canvas ref={canvasRef} className="border border-gray-800 rounded-lg shadow-2xl max-w-full h-auto" />
      <div className="mt-4 text-white text-sm text-center max-w-md">
        <p className="mb-2">Lumos Particle Text</p>
        <p className="text-gray-400 text-xs">Words morph every 4 seconds with particle animation.</p>
      </div>
    </div>
  );
}`
      },
      {
        name: "Explosive Letter Burst",
        slug: "explosive-letter-burst",
        description: "Radial burst rings behind headline on hover with scale feedback",
        category: "text",
        isPro: false,
        isNew: true,
        code: explosiveLetterBurstCode,
      },
      {
        name: "Dancing Shadow Text",
        slug: "dancing-shadow-text",
        description: "Framer Motion headline with animated dual-color offset shadows",
        category: "text",
        isPro: false,
        isNew: true,
        code: shadowDanceLumousCode,
      },
      {
        name: "Melting Text",
        slug: "melting-text",
        description: "Gradient title with layered blur trails for a melt drip illusion",
        category: "text",
        isPro: false,
        isNew: true,
        code: meltingTextLumousCode,
      },
      {
        name: "Matrix Text",
        slug: "matrix-text",
        description: "Neon glitch headline with vertical code rain and scan-line vibe",
        category: "text",
        isPro: false,
        isNew: true,
        code: matrixLumousCode,
      },
      {
        name: "3D Spin Text",
        slug: "spin-3d-text",
        description: "Continuous Y-axis spin with layered extruded shadow colors",
        category: "text",
        isPro: false,
        isNew: true,
        code: spin3DLumousCode,
      },
      {
        name: "Split Text Reveal",
        slug: "split-text-reveal",
        description: "Two halves of a word slide in from opposite sides to meet",
        category: "text",
        isPro: false,
        isNew: true,
        code: splitTextLumousCode,
      },
      {
        name: "Glowing 3D Text",
        slug: "glowing-3d-text",
        description: "Stacked Z-depth text layers with cycling neon glow shadows",
        category: "text",
        isPro: false,
        isNew: true,
        code: glow3DLumousCode,
      },
    ]
  },
  {
    name: "Buttons",
    slug: "buttons",
    count: 5,
    items: [
      {
        name: "Moving Border Button",
        slug: "moving-border",
        description: "Gradient moves continuously around button perimeter",
        category: "buttons",
        isPro: false,
        isNew: false,
        code: `"use client";

interface MovingBorderButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MovingBorderButton({
  children,
  className = "",
  onClick,
}: MovingBorderButtonProps) {
  return (
    <button
      onClick={onClick}
      className={\`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-indigo-400 \${className}\`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6366f1_0%,#a855f7_50%,#22d3ee_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
}`
      },
      {
        name: "Glow Button",
        slug: "glow-button",
        description: "Button with pulsing glow effect on hover",
        category: "buttons",
        isPro: false,
        isNew: false,
        code: `"use client";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlowButton({
  children,
  className = "",
  onClick,
}: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={\`relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] active:scale-95 \${className}\`}
    >
      {children}
    </button>
  );
}`
      },
      {
        name: "Shimmer Button",
        slug: "shimmer-button",
        description: "Button with shimmer animation effect",
        category: "buttons",
        isPro: false,
        isNew: true,
        code: `"use client";

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  className = "",
  onClick,
}: ShimmerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={\`relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-[#0f0f1a] border border-white/10 rounded-lg overflow-hidden group \${className}\`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </button>
  );
}`
      },
      {
        name: "Magnetic Button",
        slug: "magnetic-button",
        description: "Button that follows cursor with magnetic pull effect",
        category: "buttons",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={\`px-6 py-3 bg-white text-black font-medium rounded-full transition-transform duration-200 \${className}\`}
      style={{ transform: \`translate(\${position.x}px, \${position.y}px)\` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}`
      },
      {
        name: "Ripple Button",
        slug: "ripple-button",
        description: "Button with ripple effect on click",
        category: "buttons",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function RippleButton({
  children,
  className = "",
  onClick,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={\`relative px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg overflow-hidden \${className}\`}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </button>
  );
}`
      },
    ]
  },
  {
    name: "Navigation",
    slug: "navigation",
    count: 3,
    items: [
      {
        name: "Animated Tabs",
        slug: "animated-tabs",
        description: "Animated tab switcher with sliding background",
        category: "navigation",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  className?: string;
  onChange?: (id: string) => void;
}

export function AnimatedTabs({ tabs, className = "", onChange }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className={\`relative flex bg-[#0f0f1a] rounded-lg p-1 \${className}\`}>
      <div
        className="absolute top-1 bottom-1 bg-indigo-600 rounded-md transition-all duration-300 ease-out"
        style={{
          left: \`calc(\${activeIndex} * (100% / \${tabs.length}) + 4px)\`,
          width: \`calc(100% / \${tabs.length} - 8px)\`,
        }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={\`relative z-10 flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors \${
            activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-white"
          }\`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}`
      },
      {
        name: "Breadcrumb",
        slug: "breadcrumb",
        description: "Navigation breadcrumb trail",
        category: "navigation",
        isPro: false,
        isNew: true,
        code: `"use client";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={\`flex items-center gap-2 text-sm \${className}\`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-600">/</span>}
          {item.href && index < items.length - 1 ? (
            <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
              {item.label}
            </a>
          ) : (
            <span className={index === items.length - 1 ? "text-white" : "text-gray-400"}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}`
      },
      {
        name: "Command Menu",
        slug: "command-menu",
        description: "Spotlight-style command palette",
        category: "navigation",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState, useEffect } from "react";

interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
}

interface CommandMenuProps {
  items: CommandItem[];
  placeholder?: string;
  className?: string;
}

export function CommandMenu({
  items,
  placeholder = "Search commands...",
  className = ""
}: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
      <div className={\`w-full max-w-lg rounded-xl bg-[#0f0f1a] border border-white/10 overflow-hidden \${className}\`}>
        <div className="p-4 border-b border-white/10">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onSelect?.();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-white/5 transition-colors"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Loaders",
    slug: "loaders",
    count: 4,
    items: [
      {
        name: "Spinner",
        slug: "spinner",
        description: "Minimal spinner loader with customizable size",
        category: "loaders",
        isPro: false,
        isNew: false,
        code: `"use client";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={\`rounded-full border-indigo-600 border-t-transparent animate-spin \${sizeClasses[size]} \${className}\`}
    />
  );
}`
      },
      {
        name: "Multi Step Loader",
        slug: "multi-step-loader",
        description: "Step-by-step progress loader with labels",
        category: "loaders",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useEffect, useState } from "react";

interface Step {
  label: string;
}

interface MultiStepLoaderProps {
  steps: Step[];
  loading?: boolean;
  className?: string;
}

export function MultiStepLoader({
  steps,
  loading = true,
  className = "",
}: MultiStepLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [loading, steps.length]);

  if (!loading) return null;

  return (
    <div className={\`flex flex-col items-center gap-4 \${className}\`}>
      <div className="w-8 h-8 rounded-full border-3 border-indigo-600 border-t-transparent animate-spin" />
      <div className="flex flex-col items-center gap-2">
        {steps.map((step, index) => (
          <span
            key={index}
            className={\`text-sm transition-all duration-300 \${
              index === currentStep
                ? "text-white font-medium"
                : "text-gray-500"
            }\`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}`
      },
      {
        name: "Skeleton Loader",
        slug: "skeleton-loader",
        description: "Pulsing placeholder skeleton for loading states",
        category: "loaders",
        isPro: false,
        isNew: true,
        code: `"use client";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string;
  height?: string;
}

export function SkeletonLoader({
  className = "",
  variant = "rectangular",
  width,
  height,
}: SkeletonLoaderProps) {
  const variantClasses = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div
      className={\`bg-white/10 animate-pulse \${variantClasses[variant]} \${className}\`}
      style={{ width, height }}
    />
  );
}`
      },
      {
        name: "Progress Bar",
        slug: "progress-bar",
        description: "Animated progress bar with percentage",
        category: "loaders",
        isPro: false,
        isNew: true,
        code: `"use client";

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={\`w-full \${className}\`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 bg-[#0f0f1a] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Scroll & Animations",
    slug: "scroll",
    count: 3,
    items: [
      {
        name: "Scroll Reveal",
        slug: "scroll-reveal",
        description: "Elements animate in as they enter viewport",
        category: "scroll",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={\`transition-all duration-700 \${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      } \${className}\`}
    >
      {children}
    </div>
  );
}`
      },
      {
        name: "Staggered List",
        slug: "staggered-list",
        description: "List items animate in with staggered delays",
        category: "scroll",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useEffect, useState } from "react";

interface StaggeredListProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function StaggeredList({
  children,
  className = "",
  staggerDelay = 100,
}: StaggeredListProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    children.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, index * staggerDelay);
    });
  }, [children.length, staggerDelay]);

  return (
    <div className={\`flex flex-col gap-2 \${className}\`}>
      {children.map((child, index) => (
        <div
          key={index}
          className={\`transition-all duration-500 \${
            visibleItems.includes(index)
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4"
          }\`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}`
      },
      {
        name: "Counter Animation",
        slug: "counter-animation",
        description: "Animated number counter with easing",
        category: "scroll",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useEffect, useState, useRef } from "react";

interface CounterAnimationProps {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function CounterAnimation({
  end,
  duration = 2000,
  className = "",
  prefix = "",
  suffix = "",
}: CounterAnimationProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const step = end / (duration / 16);
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= end) {
              setCount(end);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={\`tabular-nums \${className}\`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}`
      },
    ]
  },
  {
    name: "Inputs & Forms",
    slug: "inputs",
    count: 2,
    items: [
      {
        name: "Vanish Input",
        slug: "vanish-input",
        description: "Cycling placeholder + vanish on submit effect",
        category: "inputs",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState, useEffect } from "react";

interface VanishInputProps {
  placeholders: string[];
  onSubmit?: (value: string) => void;
  className?: string;
}

export function VanishInput({
  placeholders,
  onSubmit,
  className = "",
}: VanishInputProps) {
  const [value, setValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isVanishing, setIsVanishing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    
    setIsVanishing(true);
    setTimeout(() => {
      onSubmit?.(value);
      setValue("");
      setIsVanishing(false);
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className={\`relative \${className}\`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholders[placeholderIndex]}
        className={\`w-full px-4 py-3 bg-[#0f0f1a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all \${
          isVanishing ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }\`}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}`
      },
      {
        name: "Toggle Switch",
        slug: "toggle-switch",
        description: "Animated toggle switch component",
        category: "inputs",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";

interface ToggleSwitchProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function ToggleSwitch({
  defaultChecked = false,
  onChange,
  className = "",
}: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(defaultChecked);

  const toggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      onClick={toggle}
      className={\`relative w-14 h-8 rounded-full transition-colors duration-300 \${
        isOn ? "bg-indigo-600" : "bg-gray-600"
      } \${className}\`}
    >
      <div
        className={\`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 \${
          isOn ? "translate-x-7" : "translate-x-1"
        }\`}
      />
    </button>
  );
}`
      },
    ]
  },
  {
    name: "Overlays & Feedback",
    slug: "overlays",
    count: 3,
    items: [
      {
        name: "Animated Tooltip",
        slug: "animated-tooltip",
        description: "Hover tooltip that follows cursor with spring animation",
        category: "overlays",
        isPro: false,
        isNew: false,
        code: `"use client";

import { useState, useRef } from "react";

interface AnimatedTooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export function AnimatedTooltip({
  children,
  content,
  className = "",
}: AnimatedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 40,
    });
  };

  return (
    <div
      ref={ref}
      className={\`relative inline-block \${className}\`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <div
        className={\`absolute pointer-events-none px-3 py-1.5 text-sm text-white bg-black rounded-lg whitespace-nowrap transition-all duration-200 \${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }\`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translateX(-50%)",
        }}
      >
        {content}
      </div>
    </div>
  );
}`
      },
      {
        name: "Notification Toast",
        slug: "notification-toast",
        description: "Animated toast notification component",
        category: "overlays",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useEffect, useState } from "react";

interface NotificationToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

export function NotificationToast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: "bg-emerald-500/20 border-emerald-500/50 text-emerald-400",
    error: "bg-rose-500/20 border-rose-500/50 text-rose-400",
    warning: "bg-amber-500/20 border-amber-500/50 text-amber-400",
    info: "bg-indigo-500/20 border-indigo-500/50 text-indigo-400",
  };

  return (
    <div
      className={\`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border transition-all duration-300 \${
        typeStyles[type]
      } \${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}\`}
    >
      {message}
    </div>
  );
}`
      },
      {
        name: "Accordion",
        slug: "accordion",
        description: "Expandable accordion sections",
        category: "overlays",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={\`space-y-2 \${className}\`}>
      {items.map((item, index) => (
        <div key={index} className="rounded-lg bg-[#0f0f1a] border border-white/10 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-4 py-4 text-left text-white flex justify-between items-center"
          >
            {item.title}
            <span className={\`transition-transform \${openIndex === index ? "rotate-180" : ""}\`}>
              ▼
            </span>
          </button>
          <div
            className={\`px-4 overflow-hidden transition-all duration-300 \${
              openIndex === index ? "max-h-40 pb-4" : "max-h-0"
            }\`}
          >
            <div className="text-gray-400">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Carousels & Sliders",
    slug: "carousels",
    count: 1,
    items: [
      {
        name: "Infinite Moving Cards",
        slug: "infinite-cards",
        description: "Marquee-looping card strip that scrolls infinitely",
        category: "carousels",
        isPro: false,
        isNew: false,
        code: `"use client";

interface CardItem {
  quote: string;
  name: string;
  title: string;
}

interface InfiniteMovingCardsProps {
  items: CardItem[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  className = "",
}: InfiniteMovingCardsProps) {
  const speeds = { slow: "60s", normal: "40s", fast: "20s" };

  return (
    <div className={\`relative overflow-hidden \${className}\`}>
      <style>{\`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      \`}</style>
      <div
        className="flex gap-4"
        style={{
          animation: \`marquee \${speeds[speed]} linear infinite \${direction === "right" ? "reverse" : ""}\`,
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex-shrink-0 w-80 p-6 rounded-xl bg-[#0f0f1a] border border-white/10">
            <p className="text-gray-300 mb-4">&ldquo;{item.quote}&rdquo;</p>
            <div>
              <p className="font-medium text-white">{item.name}</p>
              <p className="text-sm text-gray-500">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Layout & Data Display",
    slug: "layout",
    count: 5,
    items: [
      {
        name: "Bento Grid",
        slug: "bento-grid",
        description: "Skewed asymmetric info grid layout",
        category: "layout",
        isPro: false,
        isNew: false,
        code: `"use client";

interface BentoItem {
  title: string;
  description: string;
  className?: string;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

export function BentoGrid({ items, className = "" }: BentoGridProps) {
  return (
    <div className={\`grid grid-cols-1 md:grid-cols-3 gap-4 \${className}\`}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={\`p-6 rounded-xl bg-[#0f0f1a] border border-white/10 card-hover \${item.className || ""}\`}
        >
          <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400 text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  );
}`
      },
      {
        name: "Avatar Stack",
        slug: "avatar-stack",
        description: "Overlapping avatar images in a row",
        category: "layout",
        isPro: false,
        isNew: true,
        code: `"use client";

interface Avatar {
  src?: string;
  alt?: string;
  fallback?: string;
}

interface AvatarStackProps {
  avatars: Avatar[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvatarStack({
  avatars,
  max = 5,
  size = "md",
  className = "",
}: AvatarStackProps) {
  const displayed = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };

  return (
    <div className={\`flex -space-x-3 \${className}\`}>
      {displayed.map((avatar, i) => (
        <div
          key={i}
          className={\`\${sizeClasses[size]} rounded-full border-2 border-[#0a0a0f] overflow-hidden\`}
        >
          {avatar.src ? (
            <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-sm"
              style={{ background: \`linear-gradient(135deg, hsl(\${i * 60}, 70%, 60%), hsl(\${i * 60 + 30}, 70%, 50%))\` }}
            >
              {avatar.fallback || avatar.alt?.[0] || "?"}
            </div>
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div className={\`\${sizeClasses[size]} rounded-full border-2 border-[#0a0a0f] bg-[#0f0f1a] flex items-center justify-center text-white text-xs\`}>
          +{remaining}
        </div>
      )}
    </div>
  );
}`
      },
      {
        name: "Badge",
        slug: "badge",
        description: "Status and label badge components",
        category: "layout",
        isPro: false,
        isNew: true,
        code: `"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    default: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    error: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    info: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  };

  return (
    <span className={\`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border \${variantClasses[variant]} \${className}\`}>
      {children}
    </span>
  );
}`
      },
      {
        name: "Stat Card",
        slug: "stat-card",
        description: "Statistics display card with trends",
        category: "layout",
        isPro: false,
        isNew: true,
        code: `"use client";

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({
  label,
  value,
  trend,
  trendUp = true,
  className = "",
}: StatCardProps) {
  return (
    <div className={\`p-6 rounded-xl bg-[#0f0f1a] border border-white/10 \${className}\`}>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
      {trend && (
        <p className={\`text-sm mt-2 \${trendUp ? "text-emerald-400" : "text-rose-400"}\`}>
          {trendUp ? "↑" : "↓"} {trend}
        </p>
      )}
    </div>
  );
}`
      },
      {
        name: "Feature Card",
        slug: "feature-card",
        description: "Feature highlight card with icon",
        category: "layout",
        isPro: false,
        isNew: true,
        code: `"use client";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <div className={\`p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 \${className}\`}>
      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "AI Components",
    slug: "ai",
    count: 10,
    items: [
      {
        name: "AI Copilot Panel",
        slug: "ai-copilot-panel",
        description: "Side panel with AI suggestions and contextual help",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Sparkles, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AICopilotPanelProps {
  className?: string;
  onClose?: () => void;
}

export function AICopilotPanel({ className = "", onClose }: AICopilotPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand you're asking about \"" + inputValue + "\". Let me help you with that...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg transition-all hover:scale-110 z-50"
      >
        <Sparkles className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className={\`fixed right-4 top-4 bottom-4 w-96 bg-[#0f0f1a] border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white">AI Copilot</span>
        </div>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex gap-3 \${
              message.role === "user" ? "flex-row-reverse" : ""
            }\`}
          >
            <div
              className={\`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 \${
                message.role === "assistant"
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                  : "bg-white/10"
              }\`}
            >
              {message.role === "assistant" ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <div
              className={\`max-w-[80%] p-3 rounded-xl text-sm \${
                message.role === "assistant"
                  ? "bg-white/5 text-gray-200"
                  : "bg-indigo-600 text-white"
              }\`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/5 p-3 rounded-xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-100" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-2">
          {["Summarize this", "Explain code", "Generate ideas", "Fix errors"].map(
            (suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInputValue(suggestion)}
                className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-300 rounded-full transition-colors"
              >
                {suggestion}
              </button>
            )
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}`
      },
      {
        name: "AI Chat Interface",
        slug: "ai-chat-interface",
        description: "Full-featured chat UI with streaming responses",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, MoreVertical, Bot, User } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface AIChatInterfaceProps {
  className?: string;
  title?: string;
}

export function AIChatInterface({
  className = "",
  title = "AI Assistant",
}: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm ready to help you with any questions or tasks. What would you like to discuss?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateStreaming = (fullText: string, messageId: string) => {
    setIsStreaming(true);
    let currentIndex = 0;
    const words = fullText.split(" ");

    const streamInterval = setInterval(() => {
      if (currentIndex >= words.length) {
        clearInterval(streamInterval);
        setIsStreaming(false);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, isStreaming: false } : m
          )
        );
        return;
      }

      const partialText = words.slice(0, currentIndex + 1).join(" ");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, content: partialText } : m
        )
      );
      currentIndex++;
    }, 50);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response with streaming
    const responseId = (Date.now() + 1).toString();
    const aiMessage: ChatMessage = {
      id: responseId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, aiMessage]);

    setTimeout(() => {
      simulateStreaming(
        "I'd be happy to help with that! This is a demonstration of streaming text that appears word by word, creating a natural typing effect similar to ChatGPT and other AI interfaces.",
        responseId
      );
    }, 500);
  };

  return (
    <div className={\`flex flex-col h-[600px] bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0f0f1a] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={\`flex gap-4 \${
              message.role === "user" ? "flex-row-reverse" : ""
            } \${index === 0 ? "" : "animate-in fade-in slide-in-from-bottom-2"}\`}
          >
            <div
              className={\`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 \${
                message.role === "assistant"
                  ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                  : "bg-white/10"
              }\`}
            >
              {message.role === "assistant" ? (
                <Bot className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            <div
              className={\`max-w-[70%] px-4 py-3 rounded-2xl \${
                message.role === "assistant"
                  ? "bg-white/5 text-gray-200 rounded-tl-sm"
                  : "bg-indigo-600 text-white rounded-tr-sm"
              }\`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              {message.isStreaming && (
                <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#0f0f1a] border-t border-white/10">
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Paperclip className="w-5 h-5 text-gray-400" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isStreaming && handleSend()}
            placeholder="Type a message..."
            disabled={isStreaming}
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none disabled:opacity-50"
          />
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Smile className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isStreaming}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          AI responses are generated for demonstration purposes
        </p>
      </div>
    </div>
  );
}`
      },
      {
        name: "AI Command Center",
        slug: "ai-command-center",
        description: "Dashboard-style AI control hub with status and actions",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import {
  Brain,
  Zap,
  MessageSquare,
  Code,
  Image,
  FileText,
  Globe,
  Settings,
  Activity,
  Cpu,
  Database,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  status: "active" | "idle" | "error";
  latency: string;
  requests: number;
  icon: React.ReactNode;
}

interface AICommandCenterProps {
  className?: string;
}

export function AICommandCenter({ className = "" }: AICommandCenterProps) {
  const [models] = useState<AIModel[]>([
    {
      id: "1",
      name: "GPT-4 Turbo",
      status: "active",
      latency: "245ms",
      requests: 1234,
      icon: <Brain className="w-5 h-5" />,
    },
    {
      id: "2",
      name: "Claude 3",
      status: "active",
      latency: "189ms",
      requests: 892,
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      id: "3",
      name: "Code Assistant",
      status: "idle",
      latency: "-",
      requests: 456,
      icon: <Code className="w-5 h-5" />,
    },
    {
      id: "4",
      name: "Image Gen",
      status: "active",
      latency: "1.2s",
      requests: 234,
      icon: <Image className="w-5 h-5" />,
    },
  ]);

  const actions = [
    { name: "Chat", icon: <MessageSquare className="w-4 h-4" />, color: "bg-blue-500" },
    { name: "Code", icon: <Code className="w-4 h-4" />, color: "bg-purple-500" },
    { name: "Analyze", icon: <FileText className="w-4 h-4" />, color: "bg-emerald-500" },
    { name: "Search", icon: <Globe className="w-4 h-4" />, color: "bg-orange-500" },
  ];

  const stats = [
    { label: "Total Requests", value: "2.8M", icon: <Activity className="w-4 h-4" />, trend: "+12%" },
    { label: "Avg Latency", value: "234ms", icon: <Zap className="w-4 h-4" />, trend: "-8%" },
    { label: "Success Rate", value: "99.9%", icon: <CheckCircle className="w-4 h-4" />, trend: "+0.1%" },
    { label: "Active Models", value: "4/4", icon: <Cpu className="w-4 h-4" />, trend: "stable" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />;
      case "idle":
        return <span className="w-2 h-2 bg-amber-500 rounded-full" />;
      case "error":
        return <span className="w-2 h-2 bg-rose-500 rounded-full" />;
      default:
        return null;
    }
  };

  return (
    <div className={\`p-6 bg-[#0a0a0f] border border-white/10 rounded-2xl \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Command Center</h2>
            <p className="text-sm text-gray-400">Manage your AI models and workloads</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {actions.map((action) => (
          <button
            key={action.name}
            className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-105"
          >
            <div className={\`w-10 h-10 \${action.color} rounded-lg flex items-center justify-center\`}>
              <span className="text-white">{action.icon}</span>
            </div>
            <span className="text-sm text-gray-300">{action.name}</span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400">{stat.icon}</span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span
                className={\`text-xs \${
                  stat.trend.startsWith("+") || stat.trend === "stable"
                    ? "text-emerald-400"
                    : "text-rose-400"
                }\`}
              >
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Models Status */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10">
          <h3 className="text-sm font-medium text-gray-300">Active Models</h3>
        </div>
        <div className="divide-y divide-white/10">
          {models.map((model) => (
            <div
              key={model.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400">
                  {model.icon}
                </div>
                <span className="text-white font-medium">{model.name}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  {getStatusIcon(model.status)}
                  <span className="capitalize text-gray-400">{model.status}</span>
                </div>
                <span className="text-gray-400 w-16">{model.latency}</span>
                <span className="text-gray-400 w-20 text-right">
                  {model.requests.toLocaleString()} req
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`
      },
      {
        name: "AI Form Autofill",
        slug: "ai-form-autofill",
        description: "Smart form with AI-powered field suggestions",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Sparkles, Check, Loader2, Wand2 } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  value: string;
  aiSuggestion?: string;
  confidence?: number;
  type?: "text" | "email" | "textarea" | "select";
  options?: string[];
}

interface AIFormAutofillProps {
  className?: string;
}

export function AIFormAutofill({ className = "" }: AIFormAutofillProps) {
  const [fields, setFields] = useState<FormField[]>([
    {
      id: "company",
      label: "Company Name",
      value: "",
      aiSuggestion: "Acme Technologies Inc.",
      confidence: 0.94,
      type: "text",
    },
    {
      id: "email",
      label: "Business Email",
      value: "",
      aiSuggestion: "contact@acmetech.com",
      confidence: 0.89,
      type: "email",
    },
    {
      id: "industry",
      label: "Industry",
      value: "",
      aiSuggestion: "Software Development",
      confidence: 0.92,
      type: "select",
      options: ["Software Development", "Finance", "Healthcare", "Retail", "Manufacturing"],
    },
    {
      id: "description",
      label: "Company Description",
      value: "",
      aiSuggestion: "Leading provider of innovative software solutions for enterprise businesses. Specializing in cloud-native applications and AI-powered tools.",
      confidence: 0.87,
      type: "textarea",
    },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [appliedFields, setAppliedFields] = useState<Set<string>>(new Set());

  const handleApplySuggestion = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (!field?.aiSuggestion) return;

    setFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, value: f.aiSuggestion || "" } : f))
    );
    setAppliedFields((prev) => new Set(prev).add(fieldId));
  };

  const handleAutoFillAll = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setFields((prev) =>
        prev.map((f) => ({ ...f, value: f.aiSuggestion || f.value }))
      );
      setAppliedFields(new Set(fields.map((f) => f.id)));
      setIsGenerating(false);
    }, 1500);
  };

  const handleChange = (fieldId: string, value: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, value } : f))
    );
  };

  return (
    <div className={\`p-6 bg-[#0a0a0f] border border-white/10 rounded-2xl \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Form Assistant</h3>
            <p className="text-sm text-gray-400">Smart autofill with AI suggestions</p>
          </div>
        </div>
        <button
          onClick={handleAutoFillAll}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-colors"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Filling...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Auto Fill All</span>
            </>
          )}
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">{field.label}</label>
              {field.confidence && (
                <span className="text-xs text-gray-500">
                  AI confidence: {Math.round(field.confidence * 100)}%
                </span>
              )}
            </div>

            <div className="relative">
              {field.type === "textarea" ? (
                <textarea
                  value={field.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder={\`Enter \${field.label.toLowerCase()}...\`}
                />
              ) : field.type === "select" ? (
                <select
                  value={field.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0a0a0f]">Select {field.label.toLowerCase()}...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0a0a0f]">
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  value={field.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  placeholder={\`Enter \${field.label.toLowerCase()}...\`}
                />
              )}

              {/* AI Suggestion Button */}
              {field.aiSuggestion && !appliedFields.has(field.id) && (
                <button
                  onClick={() => handleApplySuggestion(field.id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-xs rounded-lg transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Apply AI suggestion</span>
                </button>
              )}

              {appliedFields.has(field.id) && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-400 text-xs">
                  <Check className="w-4 h-4" />
                  <span>Filled</span>
                </div>
              )}
            </div>

            {/* Suggestion Preview */}
            {field.aiSuggestion && !appliedFields.has(field.id) && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Suggestion:</span>
                <span className="text-indigo-400 truncate max-w-md">
                  {field.aiSuggestion}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}`
      },
      {
        name: "AI Data Insights Panel",
        slug: "ai-data-insights-panel",
        description: "Smart data visualization with AI-generated insights",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface Insight {
  id: string;
  type: "trend" | "anomaly" | "suggestion" | "prediction";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  metric?: {
    value: string;
    change: number;
    label: string;
  };
}

interface AIDataInsightsPanelProps {
  className?: string;
}

export function AIDataInsightsPanel({ className = "" }: AIDataInsightsPanelProps) {
  const [insights] = useState<Insight[]>([
    {
      id: "1",
      type: "trend",
      title: "Revenue Growth Accelerating",
      description: "Q4 revenue is trending 23% above forecast, driven by enterprise tier upgrades.",
      impact: "high",
      metric: { value: "+23%", change: 23, label: "vs forecast" },
    },
    {
      id: "2",
      type: "anomaly",
      title: "Unusual Churn Spike Detected",
      description: "Customer churn increased 15% in the last 7 days, primarily in the SMB segment.",
      impact: "high",
      metric: { value: "+15%", change: -15, label: "churn rate" },
    },
    {
      id: "3",
      type: "suggestion",
      title: "Optimize Marketing Spend",
      description: "Shift 30% of social budget to content marketing for 2.3x better ROI.",
      impact: "medium",
    },
    {
      id: "4",
      type: "prediction",
      title: "Q1 Forecast Update",
      description: "AI models predict 18% growth with 94% confidence based on current pipeline.",
      impact: "medium",
      metric: { value: "+18%", change: 18, label: "predicted growth" },
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="w-4 h-4" />;
      case "anomaly":
        return <AlertTriangle className="w-4 h-4" />;
      case "suggestion":
        return <Lightbulb className="w-4 h-4" />;
      case "prediction":
        return <Brain className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trend":
        return "bg-emerald-500/20 text-emerald-400";
      case "anomaly":
        return "bg-rose-500/20 text-rose-400";
      case "suggestion":
        return "bg-amber-500/20 text-amber-400";
      case "prediction":
        return "bg-cyan-500/20 text-cyan-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: "bg-rose-500/20 text-rose-400",
      medium: "bg-amber-500/20 text-amber-400",
      low: "bg-blue-500/20 text-blue-400",
    };
    return (
      <span className={\`px-2 py-0.5 text-xs rounded-full \${colors[impact as keyof typeof colors]}\`}>
        {impact} impact
      </span>
    );
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4 text-rose-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className={\`p-6 bg-[#0a0a0f] border border-white/10 rounded-2xl \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Insights</h3>
            <p className="text-sm text-gray-400">Generated 2 minutes ago</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
          Live
        </span>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={\`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 \${getTypeColor(insight.type)}\`}>
                {getTypeIcon(insight.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-white">{insight.title}</h4>
                  {getImpactBadge(insight.impact)}
                </div>
                <p className="text-sm text-gray-400 mb-3">{insight.description}</p>

                {insight.metric && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                      {getChangeIcon(insight.metric.change)}
                      <span className="font-semibold text-white">{insight.metric.value}</span>
                      <span className="text-xs text-gray-500">{insight.metric.label}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Powered by AI analysis</span>
          <span>Last updated: Just now</span>
        </div>
      </div>
    </div>
  );
}`
      },
      {
        name: "AI Content Generator",
        slug: "ai-content-generator",
        description: "Interface for AI-powered text and content creation",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Wand2, Copy, Check, Download, RefreshCw, Sparkles, Type, FileText, MessageSquare, Hash } from "lucide-react";

interface Template {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface AIContentGeneratorProps {
  className?: string;
}

export function AIContentGenerator({ className = "" }: AIContentGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("blog");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);

  const templates: Template[] = [
    { id: "blog", name: "Blog Post", icon: <FileText className="w-4 h-4" />, description: "SEO-optimized articles" },
    { id: "social", name: "Social Media", icon: <Hash className="w-4 h-4" />, description: "Engaging posts" },
    { id: "email", name: "Email", icon: <MessageSquare className="w-4 h-4" />, description: "Professional emails" },
    { id: "copy", name: "Copywriting", icon: <Type className="w-4 h-4" />, description: "Marketing copy" },
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedContent("");

    // Simulate streaming generation
    const sampleText = selectedTemplate === "blog"
      ? "The Future of AI in Modern Development\\n\\nArtificial Intelligence has revolutionized how we approach software development. From intelligent code completion to automated testing, AI tools are becoming indispensable for developers worldwide.\\n\\nKey Benefits:\\n- Increased productivity through automation\\n- Smarter debugging and error detection\\n- Natural language interfaces for complex tasks\\n- Predictive analytics for performance optimization"
      : selectedTemplate === "social"
      ? "🚀 AI is changing the game! From smart assistants to predictive analytics, the future is here. What AI tool has transformed your workflow? Share below! 👇 #AI #Tech #Innovation"
      : selectedTemplate === "email"
      ? "Subject: Exciting Updates to Our Platform\\n\\nHi [Name],\\n\\nI hope this email finds you well. I'm excited to share some major updates we've been working on..."
      : "Transform Your Business with AI-Powered Solutions\\n\\nDiscover the power of intelligent automation. Our cutting-edge AI technology helps you work smarter, not harder. Start your free trial today!";

    let index = 0;
    const words = sampleText.split(" ");

    const interval = setInterval(() => {
      if (index >= words.length) {
        clearInterval(interval);
        setIsGenerating(false);
        return;
      }
      setGeneratedContent((prev) => prev + (index > 0 ? " " : "") + words[index]);
      index++;
    }, 30);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={\`p-6 bg-[#0a0a0f] border border-white/10 rounded-2xl \${className}\`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
          <Wand2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">AI Content Generator</h3>
          <p className="text-sm text-gray-400">Generate content with AI assistance</p>
        </div>
      </div>

      {/* Templates */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={\`p-3 border rounded-xl transition-all \${
              selectedTemplate === template.id
                ? "bg-indigo-500/20 border-indigo-500"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }\`}
          >
            <div className={\`mb-2 \${selectedTemplate === template.id ? "text-indigo-400" : "text-gray-400"}\`}>
              {template.icon}
            </div>
            <p className="text-sm font-medium text-white">{template.name}</p>
            <p className="text-xs text-gray-500">{template.description}</p>
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-300 mb-2 block">What would you like to create?</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={\`Describe the \${templates.find(t => t.id === selectedTemplate)?.name.toLowerCase() || "content"} you want to generate...\`}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-medium rounded-xl transition-all"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate Content</span>
          </>
        )}
      </button>

      {/* Output */}
      {generatedContent && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">Generated Content</span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 text-xs rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 text-xs rounded-lg transition-colors">
                <Download className="w-3 h-3" />
                Export
              </button>
            </div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{generatedContent}</p>
            {isGenerating && <span className="inline-block w-2 h-4 bg-indigo-400 ml-1 animate-pulse" />}
          </div>
        </div>
      )}
    </div>
  );
}`
      },
      {
        name: "AI Code Assistant",
        slug: "ai-code-assistant",
        description: "Code-aware AI interface for developers with syntax highlighting",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Code, Terminal, Play, Copy, Check, Sparkles, Bug, Lightbulb, RotateCcw, Send } from "lucide-react";

interface CodeMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  code?: string;
  language?: string;
  action?: "explain" | "fix" | "optimize" | "generate";
}

interface AICodeAssistantProps {
  className?: string;
}

export function AICodeAssistant({ className = "" }: AICodeAssistantProps) {
  const [messages, setMessages] = useState<CodeMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI code assistant. I can help you write, debug, and optimize code. What would you like to work on?",
      action: "generate",
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickActions = [
    { icon: <Bug className="w-4 h-4" />, label: "Debug", prompt: "Help me debug this code:" },
    { icon: <Lightbulb className="w-4 h-4" />, label: "Explain", prompt: "Explain how this works:" },
    { icon: <Sparkles className="w-4 h-4" />, label: "Optimize", prompt: "Optimize this code:" },
    { icon: <Code className="w-4 h-4" />, label: "Generate", prompt: "Generate code for:" },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: CodeMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: CodeMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Here's a solution using modern JavaScript with error handling and performance optimizations:",
        code: \`// Optimized solution with error handling
function processData(items) {
  if (!Array.isArray(items)) {
    throw new Error('Expected an array');
  }
  
  return items
    .filter(item => item.active)
    .map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }))
    .sort((a, b) => b.priority - a.priority);
}\`,
        language: "javascript",
        action: "optimize",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className={\`flex flex-col h-[500px] bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f1a] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white">Code Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={\`flex gap-3 \${message.role === "user" ? "flex-row-reverse" : ""}\`}>
            <div
              className={\`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 \${
                message.role === "assistant"
                  ? "bg-gradient-to-br from-emerald-500 to-cyan-600"
                  : "bg-white/10"
              }\`}
            >
              {message.role === "assistant" ? (
                <Terminal className="w-4 h-4 text-white" />
              ) : (
                <span className="text-xs text-white">You</span>
              )}
            </div>
            <div className={\`max-w-[85%] space-y-2 \${message.role === "user" ? "items-end" : ""}\`}>
              <div
                className={\`p-3 rounded-xl text-sm \${
                  message.role === "assistant"
                    ? "bg-white/5 text-gray-200"
                    : "bg-indigo-600 text-white"
                }\`}
              >
                {message.content}
              </div>
              {message.code && (
                <div className="relative group">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(message.id, message.code || "")}
                      className="flex items-center gap-1 px-2 py-1 bg-black/50 text-white text-xs rounded"
                    >
                      {copiedId === message.id ? (
                        <><Check className="w-3 h-3" /> Copied</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-[#050505] border border-white/10 rounded-xl overflow-x-auto">
                    <code className="text-sm text-emerald-400 font-mono">{message.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/5 p-3 rounded-xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-100" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-white/10">
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.prompt)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 text-xs rounded-lg transition-colors"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isProcessing && handleSend()}
            placeholder="Ask about code, debug issues, or request optimizations..."
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 disabled:opacity-50 font-mono text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="p-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}`
      },
      {
        name: "AI Search",
        slug: "ai-search",
        description: "Semantic search interface with AI-powered results",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Search, Sparkles, X, ArrowRight, Clock, TrendingUp, FileText, Image, Code, MessageSquare } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "doc" | "image" | "code" | "conversation";
  relevance: number;
  highlights?: string[];
}

interface AISearchProps {
  className?: string;
}

export function AISearch({ className = "" }: AISearchProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiSummary, setAiSummary] = useState("");

  const recentSearches = ["authentication best practices", "React hooks guide", "API rate limiting"];
  const trending = ["Next.js 14 features", "TypeScript 5.0", "AI integration patterns"];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "doc": return <FileText className="w-4 h-4" />;
      case "image": return <Image className="w-4 h-4" />;
      case "code": return <Code className="w-4 h-4" />;
      case "conversation": return <MessageSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      setAiSummary(\`Based on your search for "\${query}", here are the most relevant results from your knowledge base and connected sources:\`);
      setResults([
        {
          id: "1",
          title: "Complete Guide to " + query,
          description: "Comprehensive documentation covering all aspects with practical examples and best practices for implementation.",
          type: "doc",
          relevance: 0.98,
          highlights: ["Getting started", "Advanced patterns", "Common pitfalls"],
        },
        {
          id: "2",
          title: query + " Code Examples",
          description: "Production-ready code snippets and templates with detailed explanations and usage guidelines.",
          type: "code",
          relevance: 0.95,
          highlights: ["TypeScript", "React", "Node.js"],
        },
        {
          id: "3",
          title: "Team Discussion: " + query,
          description: "Recent team conversation about implementation strategies and lessons learned.",
          type: "conversation",
          relevance: 0.87,
          highlights: ["Architecture decisions", "Performance considerations"],
        },
      ]);
      setIsSearching(false);
    }, 1200);
  };

  const clearSearch = () => {
    setQuery("");
    setHasSearched(false);
    setResults([]);
    setAiSummary("");
  };

  return (
    <div className={\`w-full max-w-2xl mx-auto \${className}\`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {isSearching ? (
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search anything with AI..."
          className="w-full pl-12 pr-12 py-4 bg-[#0a0a0f] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {!hasSearched ? (
        /* Suggestions */
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-[#0a0a0f] border border-white/10 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Recent</span>
            </div>
            <div className="space-y-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => { setQuery(term); handleSearch(); }}
                  className="block text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 bg-[#0a0a0f] border border-white/10 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Trending</span>
            </div>
            <div className="space-y-2">
              {trending.map((term) => (
                <button
                  key={term}
                  onClick={() => { setQuery(term); handleSearch(); }}
                  className="block text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Results */
        <div className="mt-6 space-y-4">
          {aiSummary && (
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-400">AI Summary</span>
              </div>
              <p className="text-sm text-gray-300">{aiSummary}</p>
            </div>
          )}
          
          {results.map((result) => (
            <div
              key={result.id}
              className="p-4 bg-[#0a0a0f] border border-white/10 rounded-xl hover:border-white/20 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                  {getTypeIcon(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                      {result.title}
                    </h4>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                      {Math.round(result.relevance * 100)}% match
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{result.description}</p>
                  {result.highlights && (
                    <div className="flex flex-wrap gap-2">
                      {result.highlights.map((highlight) => (
                        <span key={highlight} className="px-2 py-0.5 bg-white/5 text-gray-500 text-xs rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`
      },
      {
        name: "AI Summarizer",
        slug: "ai-summarizer",
        description: "Text summarization interface with adjustable length",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { FileText, Sparkles, Clock, AlignLeft, AlignJustify, AlignRight, Copy, Check, RotateCcw } from "lucide-react";

interface AISummarizerProps {
  className?: string;
}

export function AISummarizer({ className = "" }: AISummarizerProps) {
  const [input, setInput] = useState(\`Artificial Intelligence (AI) has emerged as one of the most transformative technologies of the 21st century. From revolutionizing healthcare with predictive diagnostics to automating complex business processes, AI is reshaping virtually every industry. Machine learning algorithms can now process vast amounts of data to identify patterns that humans might miss, leading to breakthroughs in scientific research, financial modeling, and climate prediction. However, the rapid advancement of AI also raises important ethical questions about privacy, job displacement, and the need for responsible development practices. As we stand at the threshold of an AI-powered future, it's crucial that we balance innovation with thoughtful consideration of its societal impact.\`);
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [copied, setCopied] = useState(false);

  const lengthOptions = [
    { value: "short" as const, label: "Brief", icon: <AlignLeft className="w-4 h-4" />, percent: "10%" },
    { value: "medium" as const, label: "Standard", icon: <AlignJustify className="w-4 h-4" />, percent: "25%" },
    { value: "long" as const, label: "Detailed", icon: <AlignRight className="w-4 h-4" />, percent: "50%" },
  ];

  const sampleSummaries = {
    short: "AI is transforming industries through machine learning and data analysis, while raising ethical concerns about privacy and responsible development.",
    medium: "AI is revolutionizing healthcare, business, and scientific research through advanced data processing. Its rapid growth requires balancing innovation with ethical considerations around privacy and job displacement.",
    long: "AI has become a transformative 21st-century technology, revolutionizing healthcare with predictive diagnostics and automating complex business processes. Machine learning algorithms identify patterns in vast datasets, driving breakthroughs across industries. However, rapid AI advancement raises important ethical questions about privacy, employment, and responsible development that society must address.",
  };

  const handleSummarize = () => {
    if (!input.trim()) return;
    setIsSummarizing(true);
    setSummary("");

    // Simulate streaming
    const text = sampleSummaries[length];
    let index = 0;
    const words = text.split(" ");

    const interval = setInterval(() => {
      if (index >= words.length) {
        clearInterval(interval);
        setIsSummarizing(false);
        return;
      }
      setSummary((prev) => prev + (index > 0 ? " " : "") + words[index]);
      index++;
    }, 40);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = input.split(/\\s+/).filter(w => w.length > 0).length;
  const summaryWordCount = summary.split(/\\s+/).filter(w => w.length > 0).length;

  return (
    <div className={\`p-6 bg-[#0a0a0f] border border-white/10 rounded-2xl \${className}\`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">AI Summarizer</h3>
          <p className="text-sm text-gray-400">Transform long text into concise summaries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Original Text</label>
            <span className="text-xs text-gray-500">{wordCount} words</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Output */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Summary</label>
            <div className="flex items-center gap-3">
              {summary && (
                <span className="text-xs text-gray-500">
                  {summaryWordCount} words ({Math.round((summaryWordCount / wordCount) * 100)}%)
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <textarea
              value={summary}
              readOnly
              rows={10}
              placeholder="Summary will appear here..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 resize-none"
            />
            {summary && (
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">Length:</span>
          {lengthOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setLength(option.value)}
              className={\`flex items-center gap-2 px-4 py-2 rounded-xl transition-all \${
                length === option.value
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }\`}
            >
              {option.icon}
              <span className="text-sm">{option.label}</span>
              <span className="text-xs opacity-60">({option.percent})</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {summary && (
            <button
              onClick={() => { setSummary(""); }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
          <button
            onClick={handleSummarize}
            disabled={!input.trim() || isSummarizing}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 text-white font-medium rounded-xl transition-all"
          >
            {isSummarizing ? (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Summarizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Summarize</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}`
      },
      {
        name: "AI Recommendation Engine",
        slug: "ai-recommendation-engine",
        description: "Smart recommendations UI with personalization scores",
        category: "ai",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Sparkles, ThumbsUp, ThumbsDown, Eye, TrendingUp, Star, ArrowRight, RefreshCw } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  confidence: number;
  reason: string;
  rating?: number;
  views?: number;
  trending?: boolean;
}

interface AIRecommendationEngineProps {
  className?: string;
}

export function AIRecommendationEngine({ className = "" }: AIRecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "1",
      title: "Advanced React Patterns",
      description: "Learn compound components, render props, and custom hooks for scalable applications.",
      category: "Development",
      confidence: 0.96,
      reason: "Based on your recent React projects",
      rating: 4.8,
      views: 12400,
      trending: true,
    },
    {
      id: "2",
      title: "System Design Fundamentals",
      description: "Master the basics of designing scalable distributed systems and architectures.",
      category: "Architecture",
      confidence: 0.91,
      reason: "Popular among senior developers",
      rating: 4.9,
      views: 8900,
    },
    {
      id: "3",
      title: "AI Integration Workshop",
      description: "Hands-on workshop for integrating OpenAI and other AI APIs into your applications.",
      category: "AI/ML",
      confidence: 0.88,
      reason: "Matches your interest in AI tools",
      rating: 4.7,
      views: 5600,
      trending: true,
    },
    {
      id: "4",
      title: "TypeScript Best Practices",
      description: "Write type-safe code with advanced TypeScript patterns and type gymnastics.",
      category: "Development",
      confidence: 0.85,
      reason: "Complements your JavaScript skills",
      rating: 4.6,
      views: 7200,
    },
  ]);

  const [feedback, setFeedback] = useState<Record<string, "like" | "dislike">>({});

  const handleFeedback = (id: string, type: "like" | "dislike") => {
    setFeedback((prev) => ({ ...prev, [id]: type }));
  };

  const handleRefresh = () => {
    setRecommendations((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className={\`p-6 bg-[#0a0a0f] border border-white/10 rounded-2xl \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Recommendations</h3>
            <p className="text-sm text-gray-400">Personalized for you</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-400 text-sm rounded-xl transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="group p-4 bg-white/5 border border-white/10 rounded-xl hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Confidence Score */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-indigo-400">
                    {Math.round(rec.confidence * 100)}%
                  </span>
                </div>
                <span className="text-[10px] text-gray-500">match</span>
              </div>

              <div className="flex-1 min-w-0">
                {/* Title Row */}
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                    {rec.title}
                  </h4>
                  {rec.trending && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-rose-500/20 text-rose-400 text-xs rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-2">{rec.description}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="px-2 py-0.5 bg-white/5 rounded">{rec.category}</span>
                  {rec.rating && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" />
                      {rec.rating}
                    </span>
                  )}
                  {rec.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {rec.views.toLocaleString()}
                    </span>
                  )}
                  <span className="text-indigo-400">{rec.reason}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-2">
                <button className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleFeedback(rec.id, "like")}
                    className={\`p-1.5 rounded transition-colors \${
                      feedback[rec.id] === "like"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "hover:bg-white/10 text-gray-400"
                    }\`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleFeedback(rec.id, "dislike")}
                    className={\`p-1.5 rounded transition-colors \${
                      feedback[rec.id] === "dislike"
                        ? "bg-rose-500/20 text-rose-400"
                        : "hover:bg-white/10 text-gray-400"
                    }\`}
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
        <span>Powered by AI recommendation engine</span>
        <span>Updated daily based on your activity</span>
      </div>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Data & Analytics Pro",
    slug: "data-analytics",
    count: 11,
    items: [
      {
        name: "Data Grid Pro",
        slug: "data-grid-pro",
        description: "Virtualized editable data grid with sorting, filtering, and pagination",
        category: "data-analytics",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, Search, Filter, Download, MoreHorizontal } from "lucide-react";

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

interface DataGridProProps {
  className?: string;
}

export function DataGridPro({ className = "" }: DataGridProProps) {
  const columns: Column[] = [
    { key: "name", header: "Name", width: "200px", sortable: true },
    { key: "email", header: "Email", width: "250px", sortable: true },
    { key: "role", header: "Role", width: "120px", sortable: true },
    { key: "status", header: "Status", width: "100px", sortable: true },
    { key: "revenue", header: "Revenue", width: "120px", sortable: true },
  ];

  const [data] = useState([
    { name: "Alice Johnson", email: "alice@company.com", role: "Admin", status: "Active", revenue: "$45,000" },
    { name: "Bob Smith", email: "bob@company.com", role: "Editor", status: "Active", revenue: "$32,000" },
    { name: "Carol White", email: "carol@company.com", role: "Viewer", status: "Inactive", revenue: "$12,000" },
    { name: "David Brown", email: "david@company.com", role: "Admin", status: "Active", revenue: "$67,000" },
    { name: "Eve Davis", email: "eve@company.com", role: "Editor", status: "Pending", revenue: "$28,000" },
  ]);

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return sortedData;
    return sortedData.filter((row: any) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [sortedData, searchQuery]);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      return { key, direction: current.direction === "asc" ? "desc" : "asc" };
    });
  };

  const toggleRow = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden \${className}\`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="p-3 text-left w-12">
                <input
                  type="checkbox"
                  checked={selectedRows.size === filteredData.length}
                  onChange={() => {}}
                  className="rounded border-white/20 bg-white/5"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-3 text-left text-gray-400 text-sm font-medium whitespace-nowrap"
                  style={{ width: col.width }}
                >
                  <button
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={\`flex items-center gap-2 hover:text-white transition-colors \${
                      col.sortable ? "cursor-pointer" : ""
                    }\`}
                  >
                    {col.header}
                    {col.sortable && <ArrowUpDown className="w-3 h-3" />}
                  </button>
                </th>
              ))}
              <th className="p-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredData.map((row: any, index) => (
              <tr
                key={index}
                className={\`hover:bg-white/5 transition-colors \${
                  selectedRows.has(index) ? "bg-white/10" : ""
                }\`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(index)}
                    onChange={() => toggleRow(index)}
                    className="rounded border-white/20 bg-white/5"
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="p-3 text-white text-sm">
                    {col.key === "status" ? (
                      <span
                        className={\`px-2 py-1 rounded-full text-xs \${
                          row[col.key] === "Active"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : row[col.key] === "Inactive"
                            ? "bg-rose-500/20 text-rose-400"
                            : "bg-amber-500/20 text-amber-400"
                        }\`}
                      >
                        {row[col.key]}
                      </span>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
                <td className="p-3">
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-white/10 text-sm text-gray-400">
        <span>{selectedRows.size} of {filteredData.length} selected</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors" disabled>
            Previous
          </button>
          <span className="text-white">Page 1 of 1</span>
          <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}`
      },
      {
        name: "Dashboard Builder",
        slug: "dashboard-builder",
        description: "Drag-and-drop dashboard layout builder with widgets",
        category: "data-analytics",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { GripVertical, X, Plus, LayoutDashboard, BarChart3, LineChart, PieChart, Activity } from "lucide-react";

interface Widget {
  id: string;
  type: "stat" | "chart" | "list" | "activity";
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DashboardBuilderProps {
  className?: string;
}

export function DashboardBuilder({ className = "" }: DashboardBuilderProps) {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: "1", type: "stat", title: "Total Revenue", x: 0, y: 0, w: 1, h: 1 },
    { id: "2", type: "stat", title: "Active Users", x: 1, y: 0, w: 1, h: 1 },
    { id: "3", type: "stat", title: "Conversion Rate", x: 2, y: 0, w: 1, h: 1 },
    { id: "4", type: "chart", title: "Revenue Trend", x: 0, y: 1, w: 2, h: 2 },
    { id: "5", type: "activity", title: "Recent Activity", x: 2, y: 1, w: 1, h: 2 },
  ]);

  const [showAddMenu, setShowAddMenu] = useState(false);

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  const addWidget = (type: Widget["type"]) => {
    const newWidget: Widget = {
      id: Date.now().toString(),
      type,
      title: type === "stat" ? "New Metric" : type === "chart" ? "New Chart" : "New Widget",
      x: 0,
      y: Math.max(...widgets.map((w) => w.y + w.h), 0),
      w: type === "stat" ? 1 : 2,
      h: type === "stat" ? 1 : 2,
    };
    setWidgets((prev) => [...prev, newWidget]);
    setShowAddMenu(false);
  };

  const renderWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case "stat":
        return (
          <div className="p-4">
            <p className="text-2xl font-bold text-white">$124,500</p>
            <p className="text-emerald-400 text-sm">+12.5% from last month</p>
          </div>
        );
      case "chart":
        return (
          <div className="p-4 h-full flex items-end gap-2">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t"
                style={{ height: \`\${h}%\` }}
              />
            ))}
          </div>
        );
      case "activity":
        return (
          <div className="p-4 space-y-3">
            {["User signed up", "Payment received", "New order", "Comment posted"].map((act, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="text-gray-300 text-sm">{act}</span>
                <span className="text-gray-500 text-xs ml-auto">{i + 1}m ago</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-indigo-400" />
          <span className="text-white font-medium">Dashboard Builder</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Widget
          </button>
          {showAddMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f0f1a] border border-white/10 rounded-xl shadow-xl z-10">
              <button
                onClick={() => addWidget("stat")}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/5 text-gray-300 text-sm text-left"
              >
                <Activity className="w-4 h-4" />
                Stat Card
              </button>
              <button
                onClick={() => addWidget("chart")}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/5 text-gray-300 text-sm text-left"
              >
                <BarChart3 className="w-4 h-4" />
                Chart
              </button>
              <button
                onClick={() => addWidget("activity")}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/5 text-gray-300 text-sm text-left"
              >
                <LineChart className="w-4 h-4" />
                Activity Feed
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4 auto-rows-[120px]">
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className={\`bg-[#0f0f1a] border border-white/10 rounded-xl overflow-hidden group \${
              widget.w === 2 ? "col-span-2" : ""
            } \${widget.h === 2 ? "row-span-2" : ""}\`}
          >
            <div className="flex items-center justify-between p-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-500 cursor-move" />
                <span className="text-gray-300 text-sm font-medium">{widget.title}</span>
              </div>
              <button
                onClick={() => removeWidget(widget.id)}
                className="p-1 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="h-[calc(100%-44px)]">{renderWidgetContent(widget)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}`
      },
      {
        name: "Pivot Table",
        slug: "pivot-table",
        description: "Excel-style pivot table for data analysis",
        category: "data-analytics",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState, useMemo } from "react";
import { PivotTableProps } from "./types";

export function PivotTable({ className = "" }: PivotTableProps) {
  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      <p className="text-gray-400 text-sm">Pivot Table Component</p>
    </div>
  );
}`
      },
      {
        name: "KPI Monitor",
        slug: "kpi-monitor",
        description: "Real-time KPI monitoring with alerts",
        category: "data-analytics",
        isPro: true,
        isNew: true,
        code: `"use client";

interface KPIMonitorProps {
  className?: string;
}

export function KPIMonitor({ className = "" }: KPIMonitorProps) {
  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      <p className="text-gray-400 text-sm">KPI Monitor Component</p>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Workflow & Automation",
    slug: "workflow",
    count: 10,
    items: [
      {
        name: "Workflow Builder",
        slug: "workflow-builder",
        description: "Node-based visual workflow builder",
        category: "workflow",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState, useCallback } from "react";
import { Plus, Play, Settings, Trash2, GitBranch, Mail, Database, Webhook } from "lucide-react";

interface Node {
  id: string;
  type: "trigger" | "action" | "condition";
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  connections: string[];
}

interface WorkflowBuilderProps {
  className?: string;
}

export function WorkflowBuilder({ className = "" }: WorkflowBuilderProps) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", type: "trigger", label: "Webhook Trigger", icon: <Webhook className="w-4 h-4" />, x: 100, y: 200, connections: ["2"] },
    { id: "2", type: "condition", label: "Check Data", icon: <GitBranch className="w-4 h-4" />, x: 300, y: 200, connections: ["3", "4"] },
    { id: "3", type: "action", label: "Send Email", icon: <Mail className="w-4 h-4" />, x: 500, y: 100, connections: [] },
    { id: "4", type: "action", label: "Save to DB", icon: <Database className="w-4 h-4" />, x: 500, y: 300, connections: [] },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const addNode = (type: Node["type"]) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type,
      label: type === "trigger" ? "New Trigger" : type === "condition" ? "New Condition" : "New Action",
      icon: type === "trigger" ? <Webhook className="w-4 h-4" /> : type === "condition" ? <GitBranch className="w-4 h-4" /> : <Settings className="w-4 h-4" />,
      x: 400,
      y: 250,
      connections: [],
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const deleteNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    if (selectedNode === id) setSelectedNode(null);
  };

  const runWorkflow = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden \${className}\`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Workflow Builder</span>
          <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs rounded-full">Pro</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addNode("trigger")}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Trigger
          </button>
          <button
            onClick={() => addNode("condition")}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            Condition
          </button>
          <button
            onClick={() => addNode("action")}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm transition-colors"
          >
            <Settings className="w-4 h-4" />
            Action
          </button>
          <div className="w-px h-8 bg-white/10 mx-2" />
          <button
            onClick={runWorkflow}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm transition-colors"
          >
            <Play className={\`w-4 h-4 \${isRunning ? "animate-pulse" : ""}\`} />
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative h-[400px] bg-[#050505] overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: \`radial-gradient(circle, rgba(99,102,241,0.3) 1px, transparent 1px)\`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Connection Lines */}
        <svg className="absolute inset-0 pointer-events-none">
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const target = nodes.find((n) => n.id === targetId);
              if (!target) return null;
              return (
                <line
                  key={\`\${node.id}-\${targetId}\`}
                  x1={node.x + 64}
                  y1={node.y + 24}
                  x2={target.x}
                  y2={target.y + 24}
                  stroke={isRunning ? "#10b981" : "#6366f1"}
                  strokeWidth="2"
                  className={isRunning ? "animate-pulse" : ""}
                />
              );
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            onClick={() => setSelectedNode(node.id)}
            className={\`absolute flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all \${
              selectedNode === node.id
                ? "bg-indigo-500/20 border-indigo-500 ring-2 ring-indigo-500/30"
                : "bg-[#0f0f1a] border-white/10 hover:border-white/30"
            }\${
              isRunning && node.type === "trigger" ? "ring-2 ring-emerald-500 animate-pulse" : ""
            }\`}
            style={{ left: node.x, top: node.y }}
          >
            <div
              className={\`w-8 h-8 rounded-lg flex items-center justify-center \${
                node.type === "trigger"
                  ? "bg-amber-500/20 text-amber-400"
                  : node.type === "condition"
                  ? "bg-purple-500/20 text-purple-400"
                  : "bg-blue-500/20 text-blue-400"
              }\`}
            >
              {node.icon}
            </div>
            <span className="text-white text-sm font-medium">{node.label}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNode(node.id);
              }}
              className="ml-2 p-1 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`
      },
      {
        name: "Kanban Board Advanced",
        slug: "kanban-board-advanced",
        description: "Advanced kanban with swimlanes and wip limits",
        category: "workflow",
        isPro: true,
        isNew: true,
        code: `"use client";

interface KanbanBoardAdvancedProps {
  className?: string;
}

export function KanbanBoardAdvanced({ className = "" }: KanbanBoardAdvancedProps) {
  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      <p className="text-gray-400 text-sm">Advanced Kanban Component</p>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Collaboration",
    slug: "collaboration",
    count: 9,
    items: [
      {
        name: "Live Collaboration Editor",
        slug: "live-collaboration-editor",
        description: "Real-time collaborative text editor with cursors",
        category: "collaboration",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Users, Share2, History, MessageSquare } from "lucide-react";

interface User {
  id: string;
  name: string;
  color: string;
  cursor?: { x: number; y: number };
  isActive: boolean;
}

interface LiveCollaborationEditorProps {
  className?: string;
}

export function LiveCollaborationEditor({ className = "" }: LiveCollaborationEditorProps) {
  const [users] = useState<User[]>([
    { id: "1", name: "You", color: "#6366f1", isActive: true },
    { id: "2", name: "Alice", color: "#ec4899", cursor: { x: 200, y: 100 }, isActive: true },
    { id: "3", name: "Bob", color: "#10b981", cursor: { x: 350, y: 150 }, isActive: true },
    { id: "4", name: "Carol", color: "#f59e0b", isActive: false },
  ]);

  const [content, setContent] = useState(
    "Project Proposal\\n\\nThis is a collaborative document where multiple users can edit in real-time. You can see other users' cursors as they type.\\n\\nKey Features:\n- Real-time synchronization\\n- Cursor tracking\\n- Version history\\n- Comments and suggestions"
  );

  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">Project Proposal</span>
          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Saved</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Active Users */}
          <div className="flex items-center -space-x-2">
            {users.filter(u => u.isActive).map((user) => (
              <div
                key={user.id}
                className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center text-xs font-medium text-white"
                style={{ backgroundColor: user.color }}
                title={user.name}
              >
                {user.name[0]}
              </div>
            ))}
          </div>
          <span className="text-gray-400 text-sm">{users.filter(u => u.isActive).length} active</span>
          <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[300px] p-6 bg-[#050505] text-white resize-none focus:outline-none font-mono text-sm leading-relaxed"
          placeholder="Start typing..."
        />

        {/* Remote Cursors */}
        {users.map((user) =>
          user.cursor && user.isActive ? (
            <div
              key={user.id}
              className="absolute pointer-events-none transition-all duration-300"
              style={{ left: user.cursor.x, top: user.cursor.y }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 00-.85.35z"
                  fill={user.color}
                />
              </svg>
              <span
                className="absolute left-4 top-4 px-2 py-0.5 rounded text-[10px] font-medium text-white"
                style={{ backgroundColor: user.color }}
              >
                {user.name}
              </span>
            </div>
          ) : null
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-3 border-t border-white/10 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>Last edited just now</span>
          <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
            <History className="w-3 h-3" />
            Version history
          </button>
        </div>
        <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
          <MessageSquare className="w-3 h-3" />
          Comments
        </button>
      </div>
    </div>
  );
}`
      },
      {
        name: "Presence Indicator",
        slug: "presence-indicator",
        description: "Show who's online with activity status",
        category: "collaboration",
        isPro: true,
        isNew: true,
        code: `"use client";

interface PresenceIndicatorProps {
  className?: string;
}

export function PresenceIndicator({ className = "" }: PresenceIndicatorProps) {
  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      <p className="text-gray-400 text-sm">Presence Indicator Component</p>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Billing & SaaS",
    slug: "billing",
    count: 9,
    items: [
      {
        name: "Subscription Manager",
        slug: "subscription-manager",
        description: "Complete subscription management interface",
        category: "billing",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Check, X, Zap, Crown, Building2, CreditCard, Calendar, Download } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  unavailable: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

interface SubscriptionManagerProps {
  className?: string;
}

export function SubscriptionManager({ className = "" }: SubscriptionManagerProps) {
  const [currentPlan] = useState("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: billingCycle === "monthly" ? "$29" : "$290",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Perfect for individuals",
      icon: <Zap className="w-5 h-5" />,
      features: ["5 projects", "10GB storage", "Basic analytics", "Email support"],
      unavailable: ["Team collaboration", "API access", "Priority support"],
    },
    {
      id: "pro",
      name: "Pro",
      price: billingCycle === "monthly" ? "$79" : "$790",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Best for growing teams",
      icon: <Crown className="w-5 h-5" />,
      popular: true,
      features: ["Unlimited projects", "100GB storage", "Advanced analytics", "Priority support", "Team collaboration", "API access"],
      unavailable: [],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      icon: <Building2 className="w-5 h-5" />,
      features: ["Everything in Pro", "Unlimited storage", "Dedicated support", "Custom integrations", "SLA guarantee", "SSO & SAML"],
      unavailable: [],
    },
  ];

  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden \${className}\`}>
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Subscription</h2>
            <p className="text-gray-400 text-sm">Manage your plan and billing</p>
          </div>
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={\`px-4 py-2 rounded-lg text-sm transition-colors \${
                billingCycle === "monthly"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }\`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={\`px-4 py-2 rounded-lg text-sm transition-colors \${
                billingCycle === "yearly"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }\`}
            >
              Yearly
              <span className="ml-1 text-xs text-emerald-400">-20%</span>
            </button>
          </div>
        </div>

        {/* Current Plan Banner */}
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-medium">Current Plan: Pro</p>
                <p className="text-gray-400 text-sm">Renews on Dec 31, 2024</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
              <CreditCard className="w-4 h-4" />
              Update Payment
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={\`relative p-5 rounded-xl border \${
                currentPlan === plan.id
                  ? "bg-indigo-500/10 border-indigo-500"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              } transition-all\`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full">
                  Most Popular
                </div>
              )}
              <div className="flex items-center gap-2 mb-4">
                <div className={\`w-10 h-10 rounded-xl flex items-center justify-center \${
                  plan.popular ? "bg-indigo-500/20 text-indigo-400" : "bg-white/10 text-gray-400"
                }\`}>
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium">{plan.name}</h3>
                  <p className="text-gray-500 text-xs">{plan.description}</p>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    {feature}
                  </li>
                ))}
                {plan.unavailable.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                    <X className="w-4 h-4" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                disabled={currentPlan === plan.id}
                className={\`w-full py-2.5 rounded-lg font-medium transition-colors \${
                  currentPlan === plan.id
                    ? "bg-white/10 text-gray-400 cursor-default"
                    : plan.popular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }\`}
              >
                {currentPlan === plan.id ? "Current Plan" : plan.id === "enterprise" ? "Contact Sales" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="p-6 border-t border-white/10">
        <h3 className="text-white font-medium mb-4">Billing History</h3>
        <div className="space-y-2">
          {[
            { date: "Nov 1, 2024", amount: "$79.00", status: "Paid" },
            { date: "Oct 1, 2024", amount: "$79.00", status: "Paid" },
            { date: "Sep 1, 2024", amount: "$79.00", status: "Paid" },
          ].map((invoice, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{invoice.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">{invoice.amount}</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">{invoice.status}</span>
                <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`
      },
      {
        name: "Usage Meter",
        slug: "usage-meter",
        description: "Track resource usage with quota limits",
        category: "billing",
        isPro: true,
        isNew: true,
        code: `"use client";

interface UsageMeterProps {
  className?: string;
}

export function UsageMeter({ className = "" }: UsageMeterProps) {
  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      <p className="text-gray-400 text-sm">Usage Meter Component</p>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Admin & Security",
    slug: "admin-security",
    count: 9,
    items: [
      {
        name: "Role Permission Matrix",
        slug: "role-permission-matrix",
        description: "RBAC matrix for managing access control",
        category: "admin-security",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Shield, Check, X, User, UserCog, UserCheck, Crown } from "lucide-react";

interface Role {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface Permission {
  id: string;
  name: string;
  category: string;
}

interface RolePermissionMatrixProps {
  className?: string;
}

export function RolePermissionMatrix({ className = "" }: RolePermissionMatrixProps) {
  const roles: Role[] = [
    { id: "viewer", name: "Viewer", icon: <User className="w-4 h-4" />, color: "bg-gray-500" },
    { id: "editor", name: "Editor", icon: <UserCog className="w-4 h-4" />, color: "bg-blue-500" },
    { id: "admin", name: "Admin", icon: <UserCheck className="w-4 h-4" />, color: "bg-purple-500" },
    { id: "owner", name: "Owner", icon: <Crown className="w-4 h-4" />, color: "bg-amber-500" },
  ];

  const permissions: Permission[] = [
    { id: "view", name: "View Content", category: "Content" },
    { id: "create", name: "Create Content", category: "Content" },
    { id: "edit", name: "Edit Content", category: "Content" },
    { id: "delete", name: "Delete Content", category: "Content" },
    { id: "invite", name: "Invite Users", category: "Team" },
    { id: "manage", name: "Manage Team", category: "Team" },
    { id: "billing", name: "View Billing", category: "Admin" },
    { id: "settings", name: "Edit Settings", category: "Admin" },
    { id: "api", name: "API Access", category: "Advanced" },
    { id: "webhook", name: "Manage Webhooks", category: "Advanced" },
  ];

  const defaultMatrix: Record<string, Record<string, boolean>> = {
    viewer: { view: true, create: false, edit: false, delete: false, invite: false, manage: false, billing: false, settings: false, api: false, webhook: false },
    editor: { view: true, create: true, edit: true, delete: false, invite: true, manage: false, billing: false, settings: false, api: false, webhook: false },
    admin: { view: true, create: true, edit: true, delete: true, invite: true, manage: true, billing: true, settings: true, api: true, webhook: false },
    owner: { view: true, create: true, edit: true, delete: true, invite: true, manage: true, billing: true, settings: true, api: true, webhook: true },
  };

  const [matrix, setMatrix] = useState(defaultMatrix);

  const togglePermission = (roleId: string, permId: string) => {
    setMatrix((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permId]: !prev[roleId][permId],
      },
    }));
  };

  const categories = [...new Set(permissions.map((p) => p.category))];

  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden \${className}\`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-white font-medium">Role & Permission Matrix</h3>
          <p className="text-gray-400 text-sm">Manage access control for your team</p>
        </div>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="p-3 text-left text-gray-400 text-sm font-medium sticky left-0 bg-[#0a0a0f] z-10">
                Permission
              </th>
              {roles.map((role) => (
                <th key={role.id} className="p-3 text-center min-w-[100px]">
                  <div className="flex flex-col items-center gap-1">
                    <div className={\`w-8 h-8 \${role.color} rounded-lg flex items-center justify-center text-white\`}>
                      {role.icon}
                    </div>
                    <span className="text-gray-300 text-xs">{role.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <>
                <tr key={category}>
                  <td colSpan={roles.length + 1} className="p-2 bg-white/5">
                    <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">{category}</span>
                  </td>
                </tr>
                {permissions
                  .filter((p) => p.category === category)
                  .map((perm) => (
                    <tr key={perm.id} className="hover:bg-white/5">
                      <td className="p-3 text-gray-300 text-sm sticky left-0 bg-[#0a0a0f] z-10">
                        {perm.name}
                      </td>
                      {roles.map((role) => (
                        <td key={\`\${role.id}-\${perm.id}\`} className="p-3 text-center">
                          <button
                            onClick={() => togglePermission(role.id, perm.id)}
                            className={\`w-6 h-6 rounded flex items-center justify-center transition-colors \${
                              matrix[role.id][perm.id]
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-rose-500/20 text-rose-400"
                            }\`}
                          >
                            {matrix[role.id][perm.id] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`
      },
      {
        name: "Audit Log Viewer",
        slug: "audit-log-viewer",
        description: "View and filter system audit logs",
        category: "admin-security",
        isPro: true,
        isNew: true,
        code: `"use client";

interface AuditLogViewerProps {
  className?: string;
}

export function AuditLogViewer({ className = "" }: AuditLogViewerProps) {
  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      <p className="text-gray-400 text-sm">Audit Log Viewer Component</p>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "No-Code Builders",
    slug: "builders",
    count: 8,
    items: [
      {
        name: "Form Builder",
        slug: "form-builder",
        description: "Drag-and-drop form builder with field types",
        category: "builders",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Plus, GripVertical, Settings, Trash2, Type, Hash, CheckSquare, List, Calendar, Mail, Phone } from "lucide-react";

interface FieldType {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: string;
}

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
}

interface FormBuilderProps {
  className?: string;
}

export function FormBuilder({ className = "" }: FormBuilderProps) {
  const fieldTypes: FieldType[] = [
    { id: "text", label: "Text", icon: <Type className="w-4 h-4" />, category: "Basic" },
    { id: "number", label: "Number", icon: <Hash className="w-4 h-4" />, category: "Basic" },
    { id: "email", label: "Email", icon: <Mail className="w-4 h-4" />, category: "Basic" },
    { id: "phone", label: "Phone", icon: <Phone className="w-4 h-4" />, category: "Basic" },
    { id: "checkbox", label: "Checkbox", icon: <CheckSquare className="w-4 h-4" />, category: "Choice" },
    { id: "select", label: "Dropdown", icon: <List className="w-4 h-4" />, category: "Choice" },
    { id: "date", label: "Date", icon: <Calendar className="w-4 h-4" />, category: "Advanced" },
  ];

  const [fields, setFields] = useState<FormField[]>([
    { id: "1", type: "text", label: "Full Name", required: true, placeholder: "Enter your name" },
    { id: "2", type: "email", label: "Email Address", required: true, placeholder: "you@example.com" },
    { id: "3", type: "checkbox", label: "Subscribe to newsletter", required: false },
  ]);

  const [selectedField, setSelectedField] = useState<string | null>(null);

  const addField = (type: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: \`New \${type.charAt(0).toUpperCase() + type.slice(1)} Field\`,
      required: false,
      placeholder: type === "text" || type === "email" ? "Enter value..." : undefined,
    };
    setFields((prev) => [...prev, newField]);
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedField === id) setSelectedField(null);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const categories = [...new Set(fieldTypes.map((f) => f.category))];

  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden \${className}\`}>
      <div className="flex h-[500px]">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 p-4 overflow-y-auto">
          <h3 className="text-white font-medium mb-4">Field Types</h3>
          {categories.map((category) => (
            <div key={category} className="mb-4">
              <span className="text-gray-500 text-xs uppercase tracking-wider">{category}</span>
              <div className="mt-2 space-y-1">
                {fieldTypes
                  .filter((f) => f.category === category)
                  .map((field) => (
                    <button
                      key={field.id}
                      onClick={() => addField(field.id)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-lg text-gray-300 text-sm transition-colors"
                    >
                      {field.icon}
                      {field.label}
                      <Plus className="w-3 h-3 ml-auto" />
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-md mx-auto space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={\`group relative p-4 border rounded-xl transition-all cursor-pointer \${
                  selectedField === field.id
                    ? "bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/20"
                    : "bg-white/5 border-white/10 hover:border-white/30"
                }\`}
              >
                <div className="flex items-start gap-3">
                  <GripVertical className="w-4 h-4 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-gray-300 text-sm font-medium">
                        {field.label}
                        {field.required && <span className="text-rose-400 ml-1">*</span>}
                      </label>
                    </div>
                    {field.type !== "checkbox" ? (
                      <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 text-sm">
                        {field.placeholder || \`Enter \${field.label.toLowerCase()}...\`}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-white/20 rounded" />
                        <span className="text-gray-400 text-sm">Option</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                      <Settings className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeField(field.id);
                      }}
                      className="p-1.5 hover:bg-white/10 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => addField("text")}
              className="flex items-center justify-center gap-2 w-full p-4 border border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Field
            </button>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedField && (
          <div className="w-64 border-l border-white/10 p-4">
            <h3 className="text-white font-medium mb-4">Properties</h3>
            {(() => {
              const field = fields.find((f) => f.id === selectedField);
              if (!field) return null;
              return (
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">Label</label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">Placeholder</label>
                    <input
                      type="text"
                      value={field.placeholder || ""}
                      onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(field.id, { required: e.target.checked })}
                      className="rounded border-white/20 bg-white/5"
                    />
                    <span className="text-gray-300 text-sm">Required</span>
                  </label>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}`
      },
      {
        name: "Page Builder",
        slug: "page-builder",
        description: "Visual page builder with sections and components",
        category: "builders",
        isPro: true,
        isNew: true,
        code: `"use client";

interface PageBuilderProps {
  className?: string;
}

export function PageBuilder({ className = "" }: PageBuilderProps) {
  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      <p className="text-gray-400 text-sm">Page Builder Component</p>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "File & Media",
    slug: "file-media",
    count: 8,
    items: [
      {
        name: "File Manager",
        slug: "file-manager",
        description: "Drive-like file manager with folders and uploads",
        category: "file-media",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Folder, File, Image, FileText, MoreVertical, Grid, List, Upload, Search, ChevronRight } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "image" | "document" | "file";
  size?: string;
  modified: string;
  items?: number;
}

interface FileManagerProps {
  className?: string;
}

export function FileManager({ className = "" }: FileManagerProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPath, setCurrentPath] = useState(["Home", "Projects", "Assets"]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const files: FileItem[] = [
    { id: "1", name: "Design Assets", type: "folder", modified: "2 hours ago", items: 24 },
    { id: "2", name: "Marketing", type: "folder", modified: "Yesterday", items: 12 },
    { id: "3", name: "hero-banner.jpg", type: "image", size: "2.4 MB", modified: "3 days ago" },
    { id: "4", name: "logo-dark.png", type: "image", size: "156 KB", modified: "1 week ago" },
    { id: "5", name: "proposal.pdf", type: "document", size: "1.2 MB", modified: "2 weeks ago" },
    { id: "6", name: "README.md", type: "file", size: "4 KB", modified: "1 month ago" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="w-6 h-6 text-amber-400" />;
      case "image":
        return <Image className="w-6 h-6 text-purple-400" />;
      case "document":
        return <FileText className="w-6 h-6 text-blue-400" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden \${className}\`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-sm">
            {currentPath.map((path, i) => (
              <>
                <button
                  key={path}
                  onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
                  className={\`hover:text-white transition-colors \${
                    i === currentPath.length - 1 ? "text-white font-medium" : "text-gray-400"
                  }\`}
                >
                  {path}
                </button>
                {i < currentPath.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 w-48"
            />
          </div>
          <div className="flex items-center p-1 bg-white/5 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={\`p-2 rounded transition-colors \${
                viewMode === "grid" ? "bg-white/10 text-white" : "text-gray-400"
              }\`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={\`p-2 rounded transition-colors \${
                viewMode === "list" ? "bg-white/10 text-white" : "text-gray-400"
              }\`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>

      {/* Files */}
      <div className="p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => toggleSelection(file.id)}
                className={\`group relative p-4 border rounded-xl cursor-pointer transition-all \${
                  selectedItems.has(file.id)
                    ? "bg-indigo-500/10 border-indigo-500"
                    : "bg-white/5 border-white/10 hover:border-white/30"
                }\`}
              >
                <div className="flex items-start justify-between mb-3">
                  {getIcon(file.type)}
                  <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded transition-all">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <p className="text-white text-sm font-medium truncate">{file.name}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {file.type === "folder" ? \`\${file.items} items\` : file.size} • {file.modified}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-3 text-left text-gray-400 text-sm font-medium">Name</th>
                  <th className="p-3 text-left text-gray-400 text-sm font-medium">Size</th>
                  <th className="p-3 text-left text-gray-400 text-sm font-medium">Modified</th>
                  <th className="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {files.map((file) => (
                  <tr
                    key={file.id}
                    onClick={() => toggleSelection(file.id)}
                    className={\`hover:bg-white/5 cursor-pointer transition-colors \${
                      selectedItems.has(file.id) ? "bg-indigo-500/10" : ""
                    }\`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {getIcon(file.type)}
                        <span className="text-white text-sm">{file.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400 text-sm">{file.size || "-"}</td>
                    <td className="p-3 text-gray-400 text-sm">{file.modified}</td>
                    <td className="p-3">
                      <button className="p-1 hover:bg-white/10 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-white/10 text-sm text-gray-400">
        <span>{selectedItems.size} selected</span>
        <span>{files.length} items</span>
      </div>
    </div>
  );
}`
      },
      {
        name: "Media Library",
        slug: "media-library",
        description: "Organize and manage media assets",
        category: "file-media",
        isPro: true,
        isNew: true,
        code: `"use client";

interface MediaLibraryProps {
  className?: string;
}

export function MediaLibrary({ className = "" }: MediaLibraryProps) {
  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      <p className="text-gray-400 text-sm">Media Library Component</p>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Developer Tools",
    slug: "dev-tools",
    count: 9,
    items: [
      {
        name: "Global Command Palette",
        slug: "global-command-palette",
        description: "Spotlight-style command palette with actions",
        category: "dev-tools",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState, useEffect } from "react";
import { Search, Command, FileText, Settings, User, LogOut, Moon, Sun } from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  shortcut?: string;
  icon: React.ReactNode;
  category: string;
  action: () => void;
}

interface GlobalCommandPaletteProps {
  className?: string;
}

export function GlobalCommandPalette({ className = "" }: GlobalCommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    { id: "1", title: "Go to Dashboard", shortcut: "⌘D", icon: <Command className="w-4 h-4" />, category: "Navigation", action: () => {} },
    { id: "2", title: "Open Settings", shortcut: "⌘,", icon: <Settings className="w-4 h-4" />, category: "Navigation", action: () => {} },
    { id: "3", title: "Search Files...", shortcut: "⌘P", icon: <FileText className="w-4 h-4" />, category: "Navigation", action: () => {} },
    { id: "4", title: "View Profile", icon: <User className="w-4 h-4" />, category: "Account", action: () => {} },
    { id: "5", title: "Toggle Theme", shortcut: "⌘T", icon: <Moon className="w-4 h-4" />, category: "Preferences", action: () => {} },
    { id: "6", title: "Sign Out", icon: <LogOut className="w-4 h-4" />, category: "Account", action: () => {} },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={\`flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 transition-colors \${className}\`}
      >
        <Search className="w-4 h-4" />
        <span className="text-sm">Search...</span>
        <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-xl bg-[#0f0f1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
          />
          <kbd className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">ESC</kbd>
        </div>

        {/* Commands */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {Object.entries(groupedCommands).map(([category, items]) => (
            <div key={category} className="mb-4">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {category}
              </span>
              <div className="mt-1 space-y-1">
                {items.map((cmd, index) => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setIsOpen(false);
                    }}
                    className={\`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-left transition-colors \${
                      selectedIndex === index
                        ? "bg-indigo-500/20 text-white"
                        : "text-gray-300 hover:bg-white/5"
                    }\`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={selectedIndex === index ? "text-indigo-400" : "text-gray-400"}>
                        {cmd.icon}
                      </span>
                      <span className="font-medium">{cmd.title}</span>
                    </div>
                    {cmd.shortcut && (
                      <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↑↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd> to select
            </span>
          </div>
          <span>{filteredCommands.length} results</span>
        </div>
      </div>
    </div>
  );
}`
      },
      {
        name: "API Key Manager",
        slug: "api-key-manager",
        description: "Manage API keys with usage tracking",
        category: "dev-tools",
        isPro: true,
        isNew: true,
        code: `"use client";

interface APIKeyManagerProps {
  className?: string;
}

export function APIKeyManager({ className = "" }: APIKeyManagerProps) {
  return (
    <div className={\`bg-[#0a0a0f] border border-white/10 rounded-xl p-4 \${className}\`}>
      <p className="text-gray-400 text-sm">API Key Manager Component</p>
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Search & Discovery",
    slug: "search-discovery",
    count: 7,
    items: [
      {
        name: "Global Search",
        slug: "global-search",
        description: "Advanced search with filters and suggestions",
        category: "search-discovery",
        isPro: true,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { Search, X, Filter, Clock, Star, FileText, User, Settings } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  type: "file" | "user" | "setting" | "recent";
  description?: string;
  icon: React.ReactNode;
}

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className = "" }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const recentSearches = ["dashboard settings", "user permissions", "api documentation"];
  
  const filters = [
    { id: "all", label: "All", count: 156 },
    { id: "files", label: "Files", count: 89 },
    { id: "users", label: "People", count: 23 },
    { id: "settings", label: "Settings", count: 44 },
  ];

  const results: SearchResult[] = [
    { id: "1", title: "Dashboard Settings", type: "setting", description: "Configure your dashboard preferences", icon: <Settings className="w-4 h-4" /> },
    { id: "2", title: "API Documentation", type: "file", description: "Complete API reference guide", icon: <FileText className="w-4 h-4" /> },
    { id: "3", title: "John Smith", type: "user", description: "Product Designer", icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className={\`relative w-full max-w-2xl \${className}\`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search files, people, settings..."
          className="w-full pl-12 pr-12 py-3.5 bg-[#0a0a0f] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        {query ? (
          <button
            onClick={() => { setQuery(""); setIsOpen(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        ) : (
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0f0f1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          {/* Filters */}
          <div className="flex items-center gap-1 p-2 border-b border-white/10">
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id === activeFilter ? null : filter.id)}
                className={\`px-3 py-1.5 rounded-lg text-sm transition-colors \${
                  activeFilter === filter.id
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-gray-400 hover:bg-white/5"
                }\`}
              >
                {filter.label}
                <span className="ml-1.5 text-xs text-gray-500">{filter.count}</span>
              </button>
            ))}
          </div>

          {/* Recent Searches */}
          {!query && (
            <div className="p-2">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recent Searches
              </span>
              <div className="mt-1 space-y-1">
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => setQuery(search)}
                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-white/5 rounded-xl text-gray-300 text-sm transition-colors"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {query && (
            <div className="p-2">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Results
              </span>
              <div className="mt-1 space-y-1">
                {results.map((result) => (
                  <button
                    key={result.id}
                    className="flex items-center gap-3 w-full px-3 py-3 hover:bg-white/5 rounded-xl text-left transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-indigo-400 transition-colors">
                      {result.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium">{result.title}</p>
                      {result.description && (
                        <p className="text-gray-500 text-sm">{result.description}</p>
                      )}
                    </div>
                    <Star className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 ml-auto hover:text-amber-400 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}`
      },
    ]
  },
  {
    name: "Cursor Effects",
    slug: "cursor",
    count: 12,
    items: [
      {
        name: "Cursor Trail",
        slug: "cursor-trail",
        description: "Trailing particles that follow pointer movement",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useRef, useState } from "react";

export function CursorTrail() {
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);

  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-[#07070d]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = idRef.current++;
        setDots((prev) => [...prev.slice(-10), { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      }}
    >
      {dots.map((dot, idx) => (
        <span
          key={dot.id}
          className="absolute rounded-full bg-indigo-400/70 pointer-events-none"
          style={{ left: dot.x - 4, top: dot.y - 4, width: 8, height: 8, opacity: (idx + 1) / dots.length }}
        />
      ))}
    </div>
  );
}`
      },
      {
        name: "Magnetic Cursor",
        slug: "magnetic-cursor",
        description: "Button attraction effect with magnetic pull",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";

export function MagneticCursor() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-[#07070d]">
      <button
        className="h-14 w-44 rounded-xl border border-indigo-400/40 bg-indigo-500/20 text-indigo-200 font-medium transition-transform duration-150"
        style={{ transform: \`translate(\${offset.x}px, \${offset.y}px)\` }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
          setOffset({ x, y });
        }}
        onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      >
        Magnetic CTA
      </button>
    </div>
  );
}`
      },
      {
        name: "Spotlight Cursor",
        slug: "spotlight-cursor",
        description: "Cursor-driven radial spotlight reveal",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";

export function SpotlightCursor() {
  const [point, setPoint] = useState({ x: 160, y: 120 });

  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-[#06060b]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: \`radial-gradient(180px circle at \${point.x}px \${point.y}px, rgba(99,102,241,0.35), transparent 55%)\` }}
      />
    </div>
  );
}`
      },
      {
        name: "Glow Ring Cursor",
        slug: "glow-ring-cursor",
        description: "Neon ring cursor with smooth tracking",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";

export function GlowRingCursor() {
  const [point, setPoint] = useState({ x: 160, y: 120 });

  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-[#05050a]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div
        className="absolute h-10 w-10 rounded-full border border-cyan-300/70 shadow-[0_0_25px_rgba(34,211,238,0.6)] pointer-events-none transition-transform"
        style={{ transform: \`translate(\${point.x - 20}px, \${point.y - 20}px)\` }}
      />
    </div>
  );
}`
      },
      {
        name: "Pixel Cursor",
        slug: "pixel-cursor",
        description: "Grid-snapped retro pixel pointer",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";

export function PixelCursor() {
  const [point, setPoint] = useState({ x: 150, y: 110 });

  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-[#08080d]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
      />
      <div
        className="absolute h-4 w-4 bg-fuchsia-400 pointer-events-none"
        style={{ transform: \`translate(\${Math.floor(point.x / 18) * 18}px, \${Math.floor(point.y / 18) * 18}px)\` }}
      />
    </div>
  );
}`
      },
      {
        name: "Cursor Text Reveal",
        slug: "cursor-text-reveal",
        description: "Text reveal masked by cursor position",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";

export function CursorTextReveal() {
  const [point, setPoint] = useState({ x: 160, y: 120 });

  return (
    <div
      className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#050509]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <h3 className="text-2xl font-bold text-white/20">LUMOS CURSOR FX</h3>
      <h3 className="absolute text-2xl font-bold text-cyan-300" style={{ clipPath: \`circle(85px at \${point.x}px \${point.y}px)\` }}>
        LUMOS CURSOR FX
      </h3>
    </div>
  );
}`
      },
      {
        name: "Distortion Cursor Lens",
        slug: "distortion-cursor",
        description: "Glass-lens cursor with subtle distortion look",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";

export function DistortionCursor() {
  const [point, setPoint] = useState({ x: 160, y: 120 });

  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-[#070711]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(99,102,241,0.18) 0px, rgba(99,102,241,0.18) 10px, transparent 10px, transparent 20px)" }} />
      <div
        className="absolute h-24 w-24 rounded-full border border-white/30 backdrop-blur-sm bg-white/10 pointer-events-none"
        style={{ transform: \`translate(\${point.x - 48}px, \${point.y - 48}px)\` }}
      />
    </div>
  );
}`
      },
      {
        name: "Cursor Geist",
        slug: "cursor-geist",
        description: "Ghost-style layered cursor swarm with fluid motion",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function CursorGeist() {
  const [point, setPoint] = useState({ x: 160, y: 120 });

  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_center,#222,#000)]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 100 - i * 4,
            height: 100 - i * 4,
            marginLeft: -(100 - i * 4) / 2,
            marginTop: -(100 - i * 4) / 2,
            background: \`rgba(255,255,255,\${0.95 - i * 0.045})\`,
            left: point.x,
            top: point.y,
          }}
          animate={{ x: Math.sin(i) * 8, y: Math.cos(i) * 6 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.8 + i * 0.04 }}
        />
      ))}
    </div>
  );
}`
      },
      {
        name: "Ink Cursor",
        slug: "ink-cursor",
        description: "Gooey ink-like cursor blobs with editorial layout vibe",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useRef, useState } from "react";

export function InkCursor() {
  const [dots, setDots] = useState([]);
  const idRef = useRef(0);

  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-[#e0dad5]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = idRef.current++;
        setDots((prev) => [...prev.slice(-18), { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ede8e5_2px,transparent_2px),linear-gradient(to_bottom,#ede8e5_2px,transparent_2px)] bg-[size:22vw_28vh]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="border border-[#ee3d3d] px-8 py-3 text-3xl font-semibold text-[#ee3d3d]">Hover Me</button>
      </div>
      {dots.map((dot, idx) => (
        <span
          key={dot.id}
          className="absolute h-6 w-6 rounded-full bg-white mix-blend-difference pointer-events-none"
          style={{ left: dot.x - 12, top: dot.y - 12, opacity: (idx + 1) / dots.length }}
        />
      ))}
    </div>
  );
}`
      },
      {
        name: "Neon Cursor Trails",
        slug: "neon-cursor-trails",
        description: "Neon particle trails with glowing cursor paths",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function NeonCursorTrails() {
  const [points, setPoints] = useState([]);
  const idRef = useRef(0);

  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-black"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = idRef.current++;
        setPoints((prev) => [...prev.slice(-36), { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <h3 className="text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">NEON\\nCURSOR</h3>
      </div>
      {points.map((p, i) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x - 6,
            top: p.y - 6,
            width: 12,
            height: 12,
            background: i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a855f7" : "#6366f1",
            boxShadow: "0 0 18px currentColor",
            opacity: (i + 1) / points.length,
          }}
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}`
      },
      {
        name: "Spotlight Cursor Text Screen",
        slug: "spotlight-cursor-screen",
        description: "Layered spotlight cursor that reveals text and shapes",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: `"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function SpotlightCursorTextScreen() {
  const [point, setPoint] = useState({ x: 160, y: 120 });

  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-[#2128bd]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {[{ size: 220, color: "#005ffe" }, { size: 160, color: "#ffe5e3" }, { size: 96, color: "#ffcc57" }].map(
        (shape, i) => (
          <motion.div
            key={shape.color}
            className="absolute rounded-full"
            style={{
              width: shape.size,
              height: shape.size,
              background: shape.color,
              left: point.x - shape.size / 2,
              top: point.y - shape.size / 2,
              mixBlendMode: "screen",
            }}
            animate={{ x: i * 8, y: -i * 6 }}
            transition={{ duration: 0.5 + i * 0.15, ease: "easeOut" }}
          />
        )
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-white mix-blend-screen">
        <h3 className="text-3xl font-black text-black">Hello there!</h3>
      </div>
      <span className="absolute h-5 w-5 rounded-full bg-[#2128bd] pointer-events-none" style={{ left: point.x - 10, top: point.y - 10 }} />
    </div>
  );
}`
      },
      {
        name: "Tubes Cursor",
        slug: "tube-cursor",
        description: "WebGL tube light trails from threejs-components (CDN); click to randomize colors",
        category: "cursor",
        isPro: false,
        isNew: true,
        code: tubeCursorCode,
      },
    ]
  },
  {
    name: "Effects",
    slug: "effects",
    count: 1,
    items: [
      {
        name: "Pulse Ring",
        slug: "pulse-ring",
        description: "Pulsing concentric ring animation",
        category: "effects",
        isPro: false,
        isNew: true,
        code: `"use client";

interface PulseRingProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export function PulseRing({
  size = "md",
  color = "indigo",
  className = "",
}: PulseRingProps) {
  const sizeClasses = { sm: "w-12 h-12", md: "w-16 h-16", lg: "w-24 h-24" };

  return (
    <div className={\`relative \${className}\`}>
      <div className={\`absolute inset-0 rounded-full bg-\${color}-500/20 animate-ping\`} />
      <div className={\`absolute inset-2 rounded-full bg-\${color}-500/30 animate-ping animation-delay-150\`} />
      <div className={\`relative \${sizeClasses[size]} rounded-full bg-\${color}-600 flex items-center justify-center\`}>
        <div className="w-4 h-4 rounded-full bg-white" />
      </div>
    </div>
  );
}`
      },
    ]
  },
];

const MIN_PRO_PER_CATEGORY = 5;

/**
 * Ensures each category exposes at least `min(5, items.length)` Pro-marked components
 * (so the Pro filter surfaces every category). Categories with fewer than five items
 * become all-Pro unless excluded. Free items are promoted in list order only when needed.
 * Excluded: `cursor` / `text` (custom Pro lists), `buttons`, `navigation`, `loaders` (always free).
 */
/** Categories that never receive automatic Pro promotion (stay as in seed). */
const CATEGORIES_EXCLUDED_FROM_MIN_PRO_AUTOFILL = new Set([
  "cursor", // Pro list fixed by applyCursorProPolicy
  "text", // Pro list fixed by applyTextProPolicy
  "buttons",
  "navigation",
  "loaders",
]);

function ensureMinProPerCategory(data: CategoryItem[]): CategoryItem[] {
  return data.map((category) => {
    const items = category.items.map((item) => ({ ...item }));
    if (CATEGORIES_EXCLUDED_FROM_MIN_PRO_AUTOFILL.has(category.slug)) {
      return { ...category, items };
    }
    const target = Math.min(MIN_PRO_PER_CATEGORY, items.length);
    let proCount = items.filter((i) => i.isPro).length;
    if (proCount >= target) {
      return { ...category, items };
    }
    for (let i = 0; i < items.length && proCount < target; i++) {
      if (!items[i].isPro) {
        items[i] = { ...items[i], isPro: true };
        proCount++;
      }
    }
    return { ...category, items };
  });
}

/** Only these Cursor Effects are Pro; all others stay free. */
const CURSOR_PRO_SLUGS = new Set([
  "tube-cursor",
  "neon-cursor-trails",
  "ink-cursor",
  "cursor-text-reveal",
]);

function applyCursorProPolicy(data: CategoryItem[]): CategoryItem[] {
  return data.map((category) => {
    if (category.slug !== "cursor") return category;
    return {
      ...category,
      items: category.items.map((item) => ({
        ...item,
        isPro: CURSOR_PRO_SLUGS.has(item.slug),
      })),
    };
  });
}

/** Only these Text components are Pro; the rest stay free. */
const TEXT_PRO_SLUGS = new Set([
  "particle-text-effect",
  "explosive-letter-burst",
  "dancing-shadow-text",
  "melting-text",
  "matrix-text",
  "spin-3d-text",
  "split-text-reveal",
  "glowing-3d-text",
]);

function applyTextProPolicy(data: CategoryItem[]): CategoryItem[] {
  return data.map((category) => {
    if (category.slug !== "text") return category;
    return {
      ...category,
      items: category.items.map((item) => ({
        ...item,
        isPro: TEXT_PRO_SLUGS.has(item.slug),
      })),
    };
  });
}

const categorySeedHydrated: CategoryItem[] = categorySeed.map((category) => ({
  ...category,
  items: category.items.map((item) => ({ ...item })),
}));

export const categories: CategoryItem[] = applyTextProPolicy(
  applyCursorProPolicy(ensureMinProPerCategory(categorySeedHydrated))
);

// Flatten all components for easy access
export const allComponents: ComponentItem[] = categories.flatMap(cat => cat.items);

// Get component by slug
export function getComponentBySlug(slug: string): ComponentItem | undefined {
  return allComponents.find(c => c.slug === slug);
}

// Get category by slug
export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return categories.find(c => c.slug === slug);
}
