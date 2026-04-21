"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import GridGlowBackground from "@/components/ui/grid-glow-background";
import { TubesCursor } from "@/components/ui/tube-cursor";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { ExplosiveLetterBurst } from "@/components/ui/explosive-letter-burst";
import { ShadowDanceLumous } from "@/components/ui/shadow-dance-lumous";
import { MeltingTextLumous } from "@/components/ui/melting-text-lumous";
import { MatrixLumous } from "@/components/ui/matrix-lumous";
import { Spin3DLumous } from "@/components/ui/spin-3d-lumous";
import { ConjoinedLumous } from "@/components/ui/split-text-lumous";
import { Glow3DLumous } from "@/components/ui/glow-3d-lumous";

// Sparkles Preview Component
export function SparklesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-indigo-400 pointer-events-none";
      particle.style.width = `${Math.random() * 4 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = "0";
      particle.style.animation = `sparkle ${Math.random() * 2 + 1}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg overflow-hidden">
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-medium">Sparkles Effect</span>
      </div>
    </div>
  );
}

// Aurora Background Preview
export function AuroraPreview() {
  return (
    <div className="relative w-full h-full min-h-64 bg-[#050505] rounded-lg overflow-hidden">
      <div
        className="absolute w-48 h-48 rounded-full blur-[60px] opacity-50 animate-aurora"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          top: "10%",
          left: "20%",
        }}
      />
      <div
        className="absolute w-40 h-40 rounded-full blur-[50px] opacity-40 animate-aurora"
        style={{
          background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
          top: "30%",
          right: "15%",
          animationDelay: "-5s",
        }}
      />
      <div
        className="absolute w-56 h-56 rounded-full blur-[70px] opacity-30 animate-aurora"
        style={{
          background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
          bottom: "10%",
          left: "30%",
          animationDelay: "-10s",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-medium relative z-10">Aurora Background</span>
      </div>
    </div>
  );
}

// Grid Background Preview
export function GridPreview() {
  return (
    <div className="relative w-full h-full min-h-64 bg-[#050505] rounded-lg overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-medium relative z-10">Grid Background</span>
      </div>
    </div>
  );
}

// Spotlight Preview
export function SpotlightPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
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
      className="relative w-full h-full min-h-64 bg-[#050505] rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.5,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.2), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-medium relative z-10">Hover to see spotlight</span>
      </div>
    </div>
  );
}

// Gradient Animation Preview
export function GradientAnimationPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden">
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: "linear-gradient(-45deg, #6366f1, #a855f7, #22d3ee, #10b981)",
          backgroundSize: "400% 400%",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-medium drop-shadow-lg">Gradient Animation</span>
      </div>
    </div>
  );
}

// 3D Card Preview
export function Card3DPreview() {
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
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div
        ref={cardRef}
        className="w-48 h-32 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 p-4 transition-transform duration-200 ease-out cursor-pointer"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-8 h-8 rounded-lg bg-white/20 mb-2" />
        <div className="h-2 w-24 bg-white/40 rounded" />
        <div className="h-2 w-16 bg-white/20 rounded mt-2" />
      </div>
    </div>
  );
}

// Glare Card Preview
export function GlareCardPreview() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
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
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div
        ref={cardRef}
        className="relative w-48 h-32 rounded-xl bg-[#0f0f1a] border border-white/10 p-4 overflow-hidden cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 mb-2" />
        <div className="h-2 w-24 bg-white/20 rounded" />
        <div className="h-2 w-16 bg-white/10 rounded mt-2" />
      </div>
    </div>
  );
}

// Focus Cards Preview
export function FocusCardsPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cards = [
    { title: "Card 1", desc: "Description" },
    { title: "Card 2", desc: "Description" },
    { title: "Card 3", desc: "Description" },
  ];

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="flex gap-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg bg-[#0f0f1a] border border-white/10 transition-all duration-300 ${
              hoveredIndex !== null && hoveredIndex !== index
                ? "blur-sm scale-95 opacity-50"
                : "blur-0 scale-100 opacity-100"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="w-12 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-500 mb-2" />
            <div className="text-xs text-white">{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Card Spotlight Preview
export function CardSpotlightPreview() {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0f0f1a] p-6 w-48 cursor-pointer"
      >
        <div
          className="pointer-events-none absolute -inset-px transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(99,102,241,.2), transparent 40%)`,
          }}
        />
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 mb-3" />
        <div className="h-2 w-full bg-white/20 rounded mb-2" />
        <div className="h-2 w-2/3 bg-white/10 rounded" />
      </div>
    </div>
  );
}

// Text Generate Preview
export function TextGeneratePreview() {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const words = "Ship interfaces that feel alive.".split(" ");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedWords(words.slice(0, index + 1));
        index++;
      } else {
        setDisplayedWords([]);
        index = 0;
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="text-xl font-bold text-white px-4 text-center">
        {words.map((word, idx) => (
          <span
            key={idx}
            className={`inline-block mr-2 transition-all duration-300 ${
              idx < displayedWords.length
                ? "opacity-100 blur-0"
                : "opacity-0 blur-sm"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

// Typewriter Preview
export function TypewriterPreview() {
  const words = ["developers", "designers", "creators"];
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
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="text-xl font-bold text-white">
        Built for{" "}
        <span className="text-gradient">{currentText}</span>
        <span className="animate-pulse">|</span>
      </div>
    </div>
  );
}

// Flip Words Preview
export function FlipWordsPreview() {
  const words = ["amazing", "beautiful", "powerful"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="text-xl font-bold text-white">
        Create{" "}
        <span
          className={`inline-block text-gradient transition-all duration-300 ${
            isFlipping
              ? "transform -translate-y-4 opacity-0"
              : "transform translate-y-0 opacity-100"
          }`}
        >
          {words[currentIndex]}
        </span>{" "}
        interfaces
      </div>
    </div>
  );
}

// Gradient Text Preview
export function GradientTextPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <span className="text-3xl font-bold text-gradient-animated">
        Gradient Text
      </span>
    </div>
  );
}

// Moving Border Button Preview
export function MovingBorderPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6366f1_0%,#a855f7_50%,#22d3ee_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Moving Border
        </span>
      </button>
    </div>
  );
}

// Glow Button Preview
export function GlowButtonPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <button className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] active:scale-95">
        Glow Button
      </button>
    </div>
  );
}

// Shimmer Button Preview
export function ShimmerButtonPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <button className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-[#0f0f1a] border border-white/10 rounded-lg overflow-hidden group">
        <span className="relative z-10">Shimmer Effect</span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </button>
    </div>
  );
}

// Animated Tabs Preview
export function AnimatedTabsPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Tab 1", "Tab 2", "Tab 3"];

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="relative flex bg-[#0f0f1a] rounded-lg p-1">
        <div
          className="absolute top-1 bottom-1 bg-indigo-600 rounded-md transition-all duration-300 ease-out"
          style={{
            left: `calc(${activeTab} * (100% / 3) + 4px)`,
            width: `calc(100% / 3 - 8px)`,
          }}
        />
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === idx ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

// Spinner Preview
export function SpinnerPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="flex gap-4 items-center">
        <div className="w-4 h-4 border-2 rounded-full border-indigo-600 border-t-transparent animate-spin" />
        <div className="w-8 h-8 border-3 rounded-full border-indigo-600 border-t-transparent animate-spin" />
        <div className="w-12 h-12 border-4 rounded-full border-indigo-600 border-t-transparent animate-spin" />
      </div>
    </div>
  );
}

// Multi Step Loader Preview
export function MultiStepLoaderPreview() {
  const [step, setStep] = useState(0);
  const steps = ["Loading...", "Processing...", "Almost done..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-64 flex flex-col items-center justify-center bg-[#0a0a0f] rounded-lg gap-4">
      <div className="w-8 h-8 border-3 rounded-full border-indigo-600 border-t-transparent animate-spin" />
      <div className="flex flex-col items-center gap-1">
        {steps.map((label, idx) => (
          <span
            key={idx}
            className={`text-sm transition-all duration-300 ${
              idx === step ? "text-white font-medium" : "text-gray-500"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Vanish Input Preview
export function VanishInputPreview() {
  const [value, setValue] = useState("");
  const placeholders = ["Search...", "Type here...", "Enter text..."];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          className="w-full px-4 py-3 bg-[#0f0f1a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all text-sm"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-600 text-white text-xs rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
}

// Animated Tooltip Preview
export function AnimatedTooltipPreview() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <button className="px-4 py-2 bg-[#0f0f1a] border border-white/10 rounded-lg text-white text-sm">
          Hover me
        </button>
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-sm text-white bg-black rounded-lg whitespace-nowrap transition-all duration-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          Tooltip content
        </div>
      </div>
    </div>
  );
}

// Infinite Moving Cards Preview
export function InfiniteCardsPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="relative overflow-hidden w-full">
        <div
          className="flex gap-3"
          style={{ animation: "marquee 10s linear infinite" }}
        >
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-32 p-3 rounded-lg bg-[#0f0f1a] border border-white/10"
            >
              <div className="h-2 w-full bg-white/20 rounded mb-2" />
              <div className="h-2 w-2/3 bg-white/10 rounded" />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

// Bento Grid Preview
export function BentoGridPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
        <div className="col-span-2 p-3 rounded-lg bg-[#0f0f1a] border border-white/10">
          <div className="h-2 w-full bg-white/20 rounded mb-2" />
          <div className="h-2 w-2/3 bg-white/10 rounded" />
        </div>
        <div className="p-3 rounded-lg bg-[#0f0f1a] border border-white/10">
          <div className="w-6 h-6 rounded bg-indigo-500/30" />
        </div>
        <div className="p-3 rounded-lg bg-[#0f0f1a] border border-white/10">
          <div className="w-6 h-6 rounded bg-cyan-500/30" />
        </div>
        <div className="col-span-2 p-3 rounded-lg bg-[#0f0f1a] border border-white/10">
          <div className="h-2 w-full bg-white/20 rounded mb-2" />
          <div className="h-2 w-1/2 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}

// ============ NEW COMPONENT PREVIEWS ============

// Magnetic Button Preview
export function MagneticButtonPreview() {
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
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <button
        ref={buttonRef}
        className="px-6 py-3 bg-white text-black font-medium rounded-full transition-transform duration-200"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        Magnetic
      </button>
    </div>
  );
}

// Ripple Button Preview
export function RippleButtonPreview() {
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
  };

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <button
        onClick={handleClick}
        className="relative px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg overflow-hidden"
      >
        Click me
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
    </div>
  );
}

// Neon Glow Card Preview
export function NeonGlowCardPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="relative p-6 rounded-xl bg-[#0f0f1a] border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-shadow">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 mb-3" />
        <div className="h-2 w-24 bg-cyan-500/30 rounded mb-2" />
        <div className="h-2 w-16 bg-cyan-500/20 rounded" />
      </div>
    </div>
  );
}

// Glassmorphism Card Preview
export function GlassmorphismCardPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg p-4">
      <div className="relative overflow-hidden w-full max-w-xs p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_45px_-20px_rgba(99,102,241,0.45)]">
        <div className="absolute -top-14 -right-10 h-28 w-28 rounded-full bg-indigo-400/30 blur-2xl" />
        <div className="absolute -bottom-14 -left-10 h-28 w-28 rounded-full bg-fuchsia-400/25 blur-2xl" />
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
            alt="Modern office building"
            className="h-28 w-full rounded-xl object-cover border border-white/20"
          />
          <div className="mt-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-200/80">Design System</p>
              <h3 className="mt-1 text-sm font-semibold text-white">Premium Product Card</h3>
              <p className="mt-1 text-xs text-white/75">Frosted layers with image and metadata.</p>
            </div>
            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated Border Preview
export function AnimatedBorderPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="relative p-[2px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#6366f1,#a855f7,#22d3ee,#6366f1)] animate-spin-slow" />
        <div className="relative p-6 rounded-xl bg-[#0f0f1a]">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 mb-3" />
          <div className="h-2 w-24 bg-white/20 rounded mb-2" />
          <div className="h-2 w-16 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}

// Morphing Shape Preview
export function MorphingShapePreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <style>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
      `}</style>
      <div
        className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500"
        style={{ animation: "morph 8s ease-in-out infinite" }}
      />
    </div>
  );
}

// Floating Elements Preview
export function FloatingElementsPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-8 h-8 rounded-lg bg-indigo-500/30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      <span className="text-white font-medium z-10">Floating Elements</span>
    </div>
  );
}

// Pulse Ring Preview
export function PulseRingPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-indigo-500/30 animate-ping animation-delay-150" />
        <div className="relative w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

// Scroll Reveal Preview
export function ScrollRevealPreview() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div
        className={`p-6 rounded-xl bg-[#0f0f1a] border border-white/10 transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 mb-3" />
        <div className="h-2 w-24 bg-white/20 rounded mb-2" />
        <div className="h-2 w-16 bg-white/10 rounded" />
      </div>
    </div>
  );
}

// Staggered List Preview
export function StaggeredListPreview() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="flex flex-col gap-2" key={key}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-3 rounded-lg bg-[#0f0f1a] border border-white/10 w-40 opacity-0 translate-x-[-20px]"
            style={{
              animation: "slideIn 0.5s ease forwards",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div className="h-2 w-full bg-white/20 rounded" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// Counter Animation Preview
export function CounterAnimationPreview() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 1000;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="text-center">
        <span className="text-5xl font-bold text-white tabular-nums">{count.toLocaleString()}</span>
        <p className="text-gray-400 mt-2">Total Users</p>
      </div>
    </div>
  );
}

// Progress Bar Preview
export function ProgressBarPreview() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-8">
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-[#0f0f1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// Skeleton Loader Preview
export function SkeletonLoaderPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="space-y-3 w-full max-w-xs">
        <div className="h-10 w-10 rounded-full bg-white/10 animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-white/10 animate-pulse" />
        <div className="h-20 w-full rounded bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}

// Toggle Switch Preview
export function ToggleSwitchPreview() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <button
        onClick={() => setIsOn(!isOn)}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
          isOn ? "bg-indigo-600" : "bg-gray-600"
        }`}
      >
        <div
          className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
            isOn ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

// Accordion Preview
export function AccordionPreview() {
  const [open, setOpen] = useState(0);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="w-full max-w-xs space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-[#0f0f1a] border border-white/10 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full px-4 py-3 text-left text-white text-sm flex justify-between items-center"
            >
              Item {i + 1}
              <span className={`transition-transform ${open === i ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`px-4 overflow-hidden transition-all duration-300 ${
                open === i ? "max-h-20 pb-3" : "max-h-0"
              }`}
            >
              <p className="text-gray-400 text-xs">Content for item {i + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Notification Toast Preview
export function NotificationToastPreview() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0f0f1a] border border-white/10 transition-all duration-300 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <span className="text-emerald-500">✓</span>
        </div>
        <div>
          <p className="text-white text-sm font-medium">Success!</p>
          <p className="text-gray-400 text-xs">Action completed</p>
        </div>
      </div>
    </div>
  );
}

// Avatar Stack Preview
export function AvatarStackPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="flex -space-x-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full border-2 border-[#0a0a0f]"
            style={{
              background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))`,
            }}
          />
        ))}
        <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] bg-[#0f0f1a] flex items-center justify-center text-white text-xs">
          +12
        </div>
      </div>
    </div>
  );
}

// Badge Preview
export function BadgePreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <div className="flex flex-wrap gap-2 justify-center">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
          New
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Active
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
          Pending
        </span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
          Error
        </span>
      </div>
    </div>
  );
}

// Breadcrumb Preview
export function BreadcrumbPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg">
      <nav className="flex items-center gap-2 text-sm">
        <span className="text-gray-400 hover:text-white cursor-pointer">Home</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400 hover:text-white cursor-pointer">Products</span>
        <span className="text-gray-600">/</span>
        <span className="text-white">Details</span>
      </nav>
    </div>
  );
}

// Command Menu Preview
export function CommandMenuPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="w-full max-w-xs rounded-xl bg-[#0f0f1a] border border-white/10 overflow-hidden">
        <div className="p-3 border-b border-white/10">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
            <span className="text-gray-400">⌘</span>
            <span className="text-gray-400 text-sm">Search commands...</span>
          </div>
        </div>
        <div className="p-2">
          {["New File", "Open Project", "Settings"].map((item, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer flex items-center gap-2"
            >
              <span className="text-gray-400 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Pricing Card Preview
export function PricingCardPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="relative w-full max-w-xs overflow-hidden p-5 rounded-2xl bg-[#0f0f1a] border border-indigo-500/50 shadow-[0_20px_45px_-24px_rgba(99,102,241,0.85)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-indigo-500/20 to-transparent" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full">
          Popular
        </div>
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80"
          alt="Dashboard analytics"
          className="relative h-20 w-full rounded-xl object-cover border border-white/10 mb-3"
        />
        <h3 className="text-lg font-bold text-white">Pro</h3>
        <div className="mt-2 mb-4">
          <span className="text-3xl font-bold text-white">$29</span>
          <span className="text-gray-400">/mo</span>
        </div>
        <div className="space-y-2 mb-4">
          {["Feature 1", "Feature 2", "Feature 3"].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-emerald-500">✓</span> {f}
            </div>
          ))}
        </div>
        <button className="w-full py-2 bg-indigo-600 text-white text-sm rounded-lg">
          Get Started
        </button>
      </div>
    </div>
  );
}

// Testimonial Card Preview
export function TestimonialCardPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="p-4 rounded-2xl bg-[#0f0f1a] border border-white/10 max-w-xs shadow-[0_18px_40px_-30px_rgba(56,189,248,0.8)]">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80"
          alt="Team collaboration"
          className="h-20 w-full rounded-xl object-cover border border-white/10 mb-3"
        />
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">&ldquo;This product transformed our workflow and helped us ship faster with better design consistency.&rdquo;</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
          <div>
            <p className="text-white text-sm font-medium">John Doe</p>
            <p className="text-gray-400 text-xs">CEO, Company</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[10px] text-emerald-400 font-medium">+47% conversion</p>
            <p className="text-[10px] text-gray-500">after 3 weeks</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Preview
export function StatCardPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Users", value: "12.5K", trend: "+12%" },
          { label: "Revenue", value: "$45K", trend: "+8%" },
          { label: "Orders", value: "1.2K", trend: "+23%" },
          { label: "Growth", value: "89%", trend: "+5%" },
        ].map((stat, i) => (
          <div key={i} className="p-3 rounded-lg bg-[#0f0f1a] border border-white/10">
            <p className="text-gray-400 text-xs">{stat.label}</p>
            <p className="text-white text-lg font-bold">{stat.value}</p>
            <p className="text-emerald-400 text-xs">{stat.trend}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Feature Card Preview
export function FeatureCardPreview() {
  return (
    <div className="w-full h-full min-h-64 flex items-center justify-center bg-[#0a0a0f] rounded-lg p-4">
      <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 max-w-xs">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
          <span className="text-2xl">⚡</span>
        </div>
        <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
        <p className="text-gray-400 text-sm">
          Optimized for speed and performance across all devices.
        </p>
      </div>
    </div>
  );
}

export function ParticleTextEffectPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg overflow-hidden">
      <ParticleTextEffect
        words={["LUMOS UI", "TEXT EFFECT", "ANIMATE", "CREATE", "DEPLOY"]}
        fill
        showFooter={false}
        className="w-full h-full"
      />
    </div>
  );
}

export function ExplosiveLetterBurstPreview() {
  return (
    <div className="h-full min-h-0 w-full overflow-hidden rounded-lg">
      <ExplosiveLetterBurst embed />
    </div>
  );
}

export function DancingShadowTextPreview() {
  return (
    <div className="h-full min-h-0 w-full overflow-hidden rounded-lg">
      <ShadowDanceLumous embed />
    </div>
  );
}

export function MeltingTextPreview() {
  return (
    <div className="h-full min-h-0 w-full overflow-hidden rounded-lg">
      <MeltingTextLumous embed />
    </div>
  );
}

export function MatrixTextPreview() {
  return (
    <div className="h-full min-h-0 w-full overflow-hidden rounded-lg">
      <MatrixLumous embed />
    </div>
  );
}

export function Spin3DTextPreview() {
  return (
    <div className="h-full min-h-0 w-full overflow-hidden rounded-lg">
      <Spin3DLumous embed />
    </div>
  );
}

export function SplitTextRevealPreview() {
  return (
    <div className="h-full min-h-0 w-full overflow-hidden rounded-lg">
      <ConjoinedLumous embed />
    </div>
  );
}

export function Glowing3DTextPreview() {
  return (
    <div className="h-full min-h-0 w-full overflow-hidden rounded-lg">
      <Glow3DLumous embed />
    </div>
  );
}

// AI Copilot Panel Preview
export function AICopilotPanelPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg p-4 flex items-center justify-center overflow-hidden bg-[#090910]">
      <div className="pointer-events-none absolute -top-16 -left-8 h-36 w-36 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-16 -right-8 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse [animation-delay:400ms]" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-xs rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#121222]/95 to-[#0d0d17]/95 shadow-[0_0_50px_-24px_rgba(99,102,241,0.9)] backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 p-3 border-b border-white/10">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <span className="text-white text-xs">✨</span>
          </div>
          <span className="text-white text-sm font-medium tracking-wide">AI Copilot</span>
          <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="p-3 space-y-2.5">
          <motion.div
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex gap-2"
          >
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">🤖</span>
            </div>
            <div className="bg-white/6 p-2 rounded-lg text-xs text-gray-300 border border-white/10">
              I found 3 improvements for your landing page copy.
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="flex gap-2 flex-row-reverse"
          >
            <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">👤</span>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg text-xs text-white shadow-md shadow-indigo-700/40">
              Generate a more premium CTA variation.
            </div>
          </motion.div>
        </div>
        <div className="p-3 border-t border-white/10">
          <div className="flex gap-2">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg h-8" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-white text-xs">➤</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// AI Chat Interface Preview
export function AIChatInterfacePreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xs bg-gradient-to-b from-[#10101d] to-[#0b0b14] border border-cyan-500/20 rounded-xl overflow-hidden shadow-[0_0_40px_-20px_rgba(34,211,238,0.9)]"
      >
        <div className="flex items-center gap-2 p-3 border-b border-white/10 bg-[#0a0a0f]/80">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-xs">🤖</span>
          </div>
          <div>
            <span className="text-white text-sm font-medium block">AI Assistant</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-gray-400">Realtime</span>
            </div>
          </div>
        </div>
        <div className="p-3 space-y-3">
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">🤖</span>
            </div>
            <div className="bg-white/5 p-2 rounded-xl rounded-tl-sm text-xs text-gray-200 max-w-[80%] border border-white/10">
              Shared a performance audit for your React app.
            </div>
          </div>
          <div className="flex gap-2 flex-row-reverse">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">👤</span>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-2 rounded-xl rounded-tr-sm text-xs text-white max-w-[80%]">
              Give me a step-by-step optimization plan.
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">🤖</span>
            </div>
            <div className="bg-white/5 p-2 rounded-xl rounded-tl-sm text-xs text-gray-200 max-w-[80%] border border-white/10">
              Running analysis...
              <span className="inline-block w-1.5 h-3 bg-cyan-300 ml-1 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-xs text-gray-500">Type a message...</span>
            <span className="ml-auto text-cyan-400 text-xs animate-pulse">●</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// AI Command Center Preview
export function AICommandCenterPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <motion.div
        whileHover={{ y: -2 }}
        className="w-full max-w-xs bg-gradient-to-b from-[#10101d] to-[#0e0e19] border border-white/10 rounded-xl p-4 space-y-3 shadow-[0_16px_40px_-28px_rgba(129,140,248,0.8)]"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-lg">🧠</span>
          </div>
          <div>
            <span className="text-white text-sm font-medium block">AI Command Center</span>
            <span className="text-gray-400 text-xs">Operations dashboard</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["💬", "💻", "📄", "🌐"].map((icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-2 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center gap-1"
            >
              <span className="text-lg">{icon}</span>
              <span className="text-[10px] text-gray-400">{["Chat", "Code", "Doc", "Search"][i]}</span>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Requests", value: "2.8M", trend: "+12%" },
            { label: "Latency", value: "234ms", trend: "-8%" },
          ].map((stat, i) => (
            <div key={i} className="p-2 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-gray-400 text-[10px] block">{stat.label}</span>
              <div className="flex items-end justify-between">
                <span className="text-white text-sm font-bold">{stat.value}</span>
                <span className="text-emerald-400 text-[10px]">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {[
            { name: "GPT-4 Turbo", status: "Active", latency: "245ms" },
            { name: "Claude 3", status: "Active", latency: "189ms" },
          ].map((model, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-gray-300 text-xs">{model.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">{model.status}</span>
                <span className="text-gray-400 text-xs">{model.latency}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// AI Form Autofill Preview
export function AIFormAutofillPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-gradient-to-b from-[#0f0f1a] to-[#0c0c15] border border-white/10 rounded-xl p-4 space-y-3 shadow-[0_0_35px_-20px_rgba(129,140,248,0.9)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white">🪄</span>
          </div>
          <span className="text-white text-sm font-medium">AI Form Assistant</span>
        </div>
        <div className="space-y-2">
          <div>
            <label className="text-gray-400 text-[10px] block mb-1">Company Name</label>
            <div className="relative">
              <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs">
                Acme Technologies Inc.
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-emerald-400">
                <span>✓</span>
                <span>Filled</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-[10px] block mb-1">Email</label>
            <div className="relative">
              <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-xs">
                Enter business email...
              </div>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] rounded animate-pulse">
                <span>✨</span>
                <span>Apply AI</span>
              </button>
            </div>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-lg hover:shadow-md hover:shadow-indigo-600/40 transition-all">
          <span>✨</span>
          <span>Auto Fill All</span>
        </button>
      </div>
    </div>
  );
}

// AI Data Insights Panel Preview
export function AIDataInsightsPanelPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-gradient-to-b from-[#0f0f1a] to-[#0b0b13] border border-white/10 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <span className="text-white">🧠</span>
            </div>
            <span className="text-white text-sm font-medium">AI Insights</span>
          </div>
          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-full animate-pulse">Live</span>
        </div>
        <div className="space-y-2">
          <motion.div
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2.3, repeat: Infinity }}
            className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-emerald-400 text-xs">📈</span>
              <span className="text-emerald-400 text-xs font-medium">Revenue Growth</span>
            </div>
            <p className="text-gray-400 text-[10px]">Q4 trending 23% above forecast</p>
          </motion.div>
          <motion.div
            animate={{ opacity: [1, 0.85, 1] }}
            transition={{ duration: 1.9, repeat: Infinity }}
            className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-rose-400 text-xs">⚠️</span>
              <span className="text-rose-400 text-xs font-medium">Churn Spike</span>
            </div>
            <p className="text-gray-400 text-[10px]">Increased 15% in last 7 days</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// AI Content Generator Preview
export function AIContentGeneratorPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-gradient-to-b from-[#0f0f1a] to-[#0c0c16] border border-white/10 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <span className="text-white">🪄</span>
          </div>
          <span className="text-white text-sm font-medium">AI Content</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {["📝", "#️⃣", "✉️", "📢"].map((icon, i) => (
            <div key={i} className={`p-2 rounded-lg flex flex-col items-center border ${i === 0 ? "bg-indigo-500/20 border-indigo-500/30 ring-1 ring-indigo-500/70" : "bg-white/5 border-white/10"}`}>
              <span className="text-sm">{icon}</span>
            </div>
          ))}
        </div>
        <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-gray-400 text-xs">Write about AI in modern development...</p>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-lg hover:brightness-110 transition-all">
          <span className="animate-pulse">✨</span>
          <span>Generate</span>
        </button>
      </div>
    </div>
  );
}

// AI Code Assistant Preview
export function AICodeAssistantPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-gradient-to-b from-[#0f0f1a] to-[#0a0f14] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 p-3 border-b border-white/10">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
            <span className="text-white text-xs">💻</span>
          </div>
          <span className="text-white text-sm font-medium">Code Assistant</span>
          <div className="ml-auto flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-gray-400">Online</span>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">💻</span>
            </div>
            <div className="bg-white/5 p-2 rounded-lg text-xs text-gray-200 border border-white/10">
              Generated an optimized utility with strict validation.
            </div>
          </div>
          <div className="p-2 bg-[#050505] border border-emerald-500/20 rounded-lg font-mono text-[10px] text-emerald-400">
            function optimize(arr) {'{'}<br/>
            &nbsp;&nbsp;return arr.filter(x =&gt; x.active)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;.map(x =&gt; ({'{'}...x, done: true{'}'}));<br/>
            {'}'}
          </div>
        </div>
        <div className="flex gap-2 p-3 border-t border-white/10">
          <div className="flex-1 px-3 py-1.5 bg-white/5 rounded-lg text-gray-500 text-xs">Ask about code...</div>
          <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-700/40">
            <span className="text-white text-xs">➤</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// AI Search Preview
export function AISearchPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs space-y-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <span className="text-gray-400 text-sm">🔍</span>
          </div>
          <div className="w-full pl-10 pr-4 py-3 bg-[#0f0f1a] border border-white/10 rounded-2xl text-white text-sm shadow-[0_0_24px_-16px_rgba(99,102,241,1)]">
            React hooks guide
          </div>
        </div>
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-indigo-400 text-xs animate-pulse">✨</span>
            <span className="text-indigo-400 text-xs font-medium">AI Summary</span>
          </div>
          <p className="text-gray-300 text-xs">Found 3 highly relevant results</p>
        </div>
        <div className="space-y-2">
          {[
            { title: "Complete React Hooks Guide", match: "98%" },
            { title: "useEffect Best Practices", match: "95%" },
          ].map((result, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01, x: 2 }}
              className="flex items-center justify-between p-3 bg-[#0f0f1a] border border-white/10 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📄</span>
                <span className="text-white text-xs">{result.title}</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-full">{result.match}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// AI Summarizer Preview
export function AISummarizerPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <span className="text-white">📝</span>
          </div>
          <span className="text-white text-sm font-medium">AI Summarizer</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
            <span className="text-gray-400 text-[10px] block">Original</span>
            <span className="text-white text-xs">87 words</span>
          </div>
          <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
            <span className="text-gray-400 text-[10px] block">Summary</span>
            <span className="text-white text-xs">22 words (25%)</span>
          </div>
        </div>
        <div className="flex gap-1">
          {["Brief", "Standard", "Detailed"].map((label, i) => (
            <button key={label} className={`flex-1 py-1.5 text-xs rounded-lg ${i === 1 ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400'}`}>
              {label}
            </button>
          ))}
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs rounded-lg">
          <span>✨</span>
          <span>Summarize</span>
        </button>
      </div>
    </div>
  );
}

// AI Recommendation Engine Preview
export function AIRecommendationEnginePreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <span className="text-white">✨</span>
          </div>
          <span className="text-white text-sm font-medium">AI Recommendations</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-400 text-xs font-bold">96%</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-xs font-medium">Advanced React</span>
                <span className="px-1.5 py-0.5 bg-rose-500/20 text-rose-400 text-[10px] rounded-full">🔥 Trending</span>
              </div>
              <p className="text-gray-400 text-[10px] mt-0.5">Based on your recent projects</p>
            </div>
            <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">➤</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-400 text-xs font-bold">91%</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-white text-xs font-medium block">System Design</span>
              <p className="text-gray-400 text-[10px] mt-0.5">Popular among seniors</p>
            </div>
            <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">➤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Data Grid Pro Preview
export function DataGridProPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 p-3 border-b border-white/10">
          <div className="flex-1 px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-400">Search...</div>
          <div className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">Filter</div>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-white/5">
            <tr>
              <th className="p-2 text-left text-gray-400">☐</th>
              <th className="p-2 text-left text-gray-400">Name</th>
              <th className="p-2 text-left text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { name: "Alice J.", status: "Active", color: "emerald" },
              { name: "Bob S.", status: "Active", color: "emerald" },
              { name: "Carol W.", status: "Pending", color: "amber" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/5">
                <td className="p-2"><div className="w-3 h-3 border border-white/20 rounded" /></td>
                <td className="p-2 text-white">{row.name}</td>
                <td className="p-2">
                  <span className={`px-1.5 py-0.5 bg-${row.color}-500/20 text-${row.color}-400 rounded text-[10px]`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Dashboard Builder Preview
export function DashboardBuilderPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white text-sm font-medium">📊 Dashboard</span>
          <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] rounded">+ Widget</span>
        </div>
        <div className="grid grid-cols-3 gap-2 auto-rows-[50px]">
          <div className="p-2 bg-white/5 rounded-lg">
            <p className="text-[10px] text-gray-400">Revenue</p>
            <p className="text-xs text-white font-bold">$124K</p>
          </div>
          <div className="p-2 bg-white/5 rounded-lg">
            <p className="text-[10px] text-gray-400">Users</p>
            <p className="text-xs text-white font-bold">8.2K</p>
          </div>
          <div className="p-2 bg-white/5 rounded-lg">
            <p className="text-[10px] text-gray-400">Growth</p>
            <p className="text-xs text-emerald-400">+12%</p>
          </div>
          <div className="col-span-2 row-span-2 p-2 bg-white/5 rounded-lg flex items-end gap-1">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-500 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="row-span-2 p-2 bg-white/5 rounded-lg space-y-1">
            <p className="text-[10px] text-gray-400">Activity</p>
            {["New user", "Payment", "Order"].map((a, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="w-1 h-1 bg-indigo-500 rounded-full" />
                <span className="text-[10px] text-gray-300">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Workflow Builder Preview
export function WorkflowBuilderPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white text-sm font-medium">⚡ Workflow</span>
          <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] rounded flex items-center gap-1">
            ▶ Run
          </span>
        </div>
        <div className="relative h-32">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.5) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
          <svg className="absolute inset-0 w-full h-full">
            <line x1="30" y1="30" x2="90" y2="30" stroke="#6366f1" strokeWidth="2" />
            <line x1="110" y1="30" x2="170" y2="30" stroke="#6366f1" strokeWidth="2" />
            <line x1="110" y1="30" x2="170" y2="70" stroke="#6366f1" strokeWidth="2" />
          </svg>
          <div className="absolute left-2 top-4 flex items-center gap-2 px-3 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg">
            <span className="text-amber-400 text-xs">⚡</span>
            <span className="text-white text-xs">Trigger</span>
          </div>
          <div className="absolute left-24 top-4 flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
            <span className="text-purple-400 text-xs">🔀</span>
            <span className="text-white text-xs">Check</span>
          </div>
          <div className="absolute right-2 top-4 flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <span className="text-blue-400 text-xs">✉️</span>
            <span className="text-white text-xs">Email</span>
          </div>
          <div className="absolute right-2 bottom-4 flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <span className="text-blue-400 text-xs">💾</span>
            <span className="text-white text-xs">Save</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Live Collaboration Editor Preview
export function LiveCollaborationEditorPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <span className="text-white text-sm">📝 Document</span>
          <div className="flex items-center -space-x-1">
            {['#6366f1', '#ec4899', '#10b981'].map((color, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0f0f1a]" style={{ backgroundColor: color }}>
                <span className="text-white text-[10px] flex items-center justify-center h-full">{['Y', 'A', 'B'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative p-3 h-28">
          <p className="text-gray-300 text-xs leading-relaxed">
            Project Proposal<br/><br/>
            This is a collaborative document...
          </p>
          <div className="absolute left-20 top-10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ec4899">
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 00-.85.35z"/>
            </svg>
            <span className="absolute left-3 top-3 px-1 py-0.5 bg-[#ec4899] text-white text-[8px] rounded">Alice</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subscription Manager Preview
export function SubscriptionManagerPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white text-sm font-medium">💳 Subscription</p>
            <p className="text-gray-400 text-[10px]">Manage your plan</p>
          </div>
          <div className="flex p-0.5 bg-white/5 rounded-lg">
            <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] rounded">Mo</span>
            <span className="px-2 py-1 text-gray-400 text-[10px]">Yr</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: "Starter", price: "$29", popular: false },
            { name: "Pro", price: "$79", popular: true },
            { name: "Ent", price: "Custom", popular: false },
          ].map((plan, i) => (
            <div key={i} className={`p-2 rounded-lg border ${plan.popular ? 'bg-indigo-500/10 border-indigo-500' : 'bg-white/5 border-white/10'}`}>
              {plan.popular && <span className="text-[8px] text-indigo-400 block mb-1">Popular</span>}
              <p className="text-white text-xs font-medium">{plan.name}</p>
              <p className="text-white text-sm font-bold">{plan.price}</p>
              {plan.popular && <div className="mt-1 w-full py-1 bg-indigo-600 text-white text-[8px] text-center rounded">Current</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Role Permission Matrix Preview
export function RolePermissionMatrixPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-white text-sm font-medium">🛡️ Permissions</span>
        </div>
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-1 text-left text-gray-400">Action</th>
              <th className="p-1 text-center text-gray-400">👤</th>
              <th className="p-1 text-center text-gray-400">📝</th>
              <th className="p-1 text-center text-gray-400">👑</th>
            </tr>
          </thead>
          <tbody>
            {['View', 'Create', 'Edit', 'Delete'].map((action, i) => (
              <tr key={i}>
                <td className="p-1 text-gray-300">{action}</td>
                <td className="p-1 text-center">{i === 0 ? '✓' : '✗'}</td>
                <td className="p-1 text-center">{i < 3 ? '✓' : '✗'}</td>
                <td className="p-1 text-center">✓</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Form Builder Preview
export function FormBuilderPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex h-40">
          <div className="w-16 border-r border-white/10 p-2 space-y-1">
            <p className="text-[8px] text-gray-500">Fields</p>
            {['📝', '#️⃣', '✉️'].map((icon, i) => (
              <div key={i} className="p-1.5 bg-white/5 rounded hover:bg-white/10 cursor-pointer">
                <span className="text-xs">{icon}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 space-y-2">
            <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-[10px] text-gray-400">Full Name *</p>
              <div className="mt-1 px-2 py-1 bg-white/5 rounded text-[10px] text-gray-500">Enter name...</div>
            </div>
            <div className="p-2 bg-indigo-500/10 border border-indigo-500 rounded-lg">
              <p className="text-[10px] text-gray-400">Email *</p>
              <div className="mt-1 px-2 py-1 bg-white/5 rounded text-[10px] text-gray-500">Enter email...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// File Manager Preview
export function FileManagerPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-gray-400">Home</span>
            <span className="text-gray-500">/</span>
            <span className="text-white">Assets</span>
          </div>
          <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] rounded">⬆ Upload</span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          {[
            { icon: '📁', name: 'Designs', color: 'amber' },
            { icon: '🖼️', name: 'hero.jpg', color: 'purple' },
            { icon: '📄', name: 'doc.pdf', color: 'blue' },
          ].map((file, i) => (
            <div key={i} className="p-2 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-lg">{file.icon}</span>
              <p className="text-[10px] text-gray-300 truncate mt-1">{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Global Command Palette Preview
export function GlobalCommandPalettePreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs bg-[#0f0f1a] border border-white/10 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-400 text-lg">⌘</span>
          <span className="text-white text-sm">Command Palette</span>
        </div>
        <div className="space-y-1">
          {[
            { icon: '📊', title: 'Go to Dashboard', key: '⌘D' },
            { icon: '⚙️', title: 'Open Settings', key: '⌘,' },
            { icon: '📁', title: 'Search Files...', key: '⌘P' },
          ].map((cmd, i) => (
            <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${i === 0 ? 'bg-indigo-500/20' : 'hover:bg-white/5'}`}>
              <div className="flex items-center gap-2">
                <span className="text-sm">{cmd.icon}</span>
                <span className="text-xs text-gray-300">{cmd.title}</span>
              </div>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-gray-400">{cmd.key}</kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Global Search Preview
export function GlobalSearchPreview() {
  return (
    <div className="w-full h-full min-h-64 bg-[#0a0a0f] rounded-lg p-4 flex items-center justify-center">
      <div className="w-full max-w-xs space-y-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <div className="w-full pl-10 pr-4 py-3 bg-[#0f0f1a] border border-white/10 rounded-2xl text-white text-sm">
            Search files, people...
          </div>
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white/10 rounded text-[10px] text-gray-400">
            ⌘K
          </kbd>
        </div>
        <div className="flex gap-1">
          {['All 156', 'Files 89', 'People 23'].map((filter, i) => (
            <span key={i} className={`px-3 py-1 rounded-lg text-[10px] ${i === 0 ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-gray-400'}`}>
              {filter}
            </span>
          ))}
        </div>
        <div className="space-y-1">
          {[
            { icon: '📄', title: 'Dashboard Settings', desc: 'Configure preferences' },
            { icon: '👤', title: 'John Smith', desc: 'Product Designer' },
          ].map((result, i) => (
            <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl">
              <span className="text-sm">{result.icon}</span>
              <div>
                <p className="text-xs text-white">{result.title}</p>
                <p className="text-[10px] text-gray-500">{result.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Advanced Background Pro Previews
export function NeuralMeshPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#050509]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_55%_80%,rgba(168,85,247,0.18),transparent_45%)]" />
      <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 400 240" preserveAspectRatio="none">
        {[...Array(8)].map((_, i) => (
          <path key={i} d={`M0 ${20 + i * 28} Q 120 ${12 + i * 30} 240 ${24 + i * 26} T 400 ${20 + i * 28}`} stroke="rgba(99,102,241,0.3)" strokeWidth="1" fill="none" />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Neural Mesh</div>
    </div>
  );
}

export function LiquidGradientPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden">
      <div className="absolute inset-0 animate-gradient-shift" style={{ background: "linear-gradient(-45deg,#0f172a,#1d4ed8,#7c3aed,#06b6d4,#0f172a)", backgroundSize: "400% 400%" }} />
      <div className="absolute -left-10 top-8 w-44 h-44 rounded-full blur-3xl bg-cyan-400/30 animate-pulse" />
      <div className="absolute right-0 bottom-4 w-40 h-40 rounded-full blur-3xl bg-violet-400/30 animate-pulse" />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Liquid Gradient</div>
    </div>
  );
}

export function StarfieldWarpPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-black">
      {[...Array(45)].map((_, i) => (
        <span key={i} className="absolute bg-white rounded-full" style={{ width: 1 + (i % 3), height: 1 + (i % 3), left: `${(i * 17) % 100}%`, top: `${(i * 29) % 100}%`, opacity: 0.25 + (i % 4) * 0.15 }} />
      ))}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Starfield Warp</div>
    </div>
  );
}

export function NoiseVignettePreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#07070b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 0.8px, transparent 0.8px)", backgroundSize: "4px 4px" }} />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Noise Vignette</div>
    </div>
  );
}

export function MatrixRainPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-black">
      {[...Array(14)].map((_, i) => (
        <div key={i} className="absolute top-0 text-[10px] font-mono text-emerald-400/70" style={{ left: `${5 + i * 7}%`, animation: `meteor ${2 + (i % 4)}s linear infinite`, animationDelay: `${i * 0.12}s` }}>
          101001
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-emerald-200 text-sm font-medium">Matrix Rain</div>
    </div>
  );
}

export function PlasmaFieldPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#04040a]">
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#22d3ee55,#6366f155,#a855f755,#22d3ee55)] animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-6 rounded-full bg-[#04040a]/70 backdrop-blur-xl" />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Plasma Field</div>
    </div>
  );
}

export function RibbonFlowPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#06060c]">
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
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Ribbon Flow</div>
    </div>
  );
}

export function HalftoneWavePreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#07070f]">
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, rgba(99,102,241,0.4) 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-indigo-500/30 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Halftone Wave</div>
    </div>
  );
}

export function TopographicLinesPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#05050a]">
      <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 400 240" preserveAspectRatio="none">
        {[...Array(9)].map((_, i) => (
          <ellipse key={i} cx="200" cy="120" rx={40 + i * 22} ry={18 + i * 10} fill="none" stroke="rgba(34,211,238,0.35)" strokeWidth="1" />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-cyan-100 text-sm font-medium">Topographic Lines</div>
    </div>
  );
}

export function ParticleNetworkPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#040409]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="none">
        {[...Array(24)].map((_, i) => {
          const x = 20 + (i * 31) % 360;
          const y = 20 + (i * 47) % 200;
          return <circle key={`c${i}`} cx={x} cy={y} r="2.2" fill="rgba(99,102,241,0.8)" />;
        })}
        {[...Array(18)].map((_, i) => (
          <line key={`l${i}`} x1={20 + (i * 31) % 360} y1={20 + (i * 47) % 200} x2={20 + ((i + 5) * 31) % 360} y2={20 + ((i + 3) * 47) % 200} stroke="rgba(99,102,241,0.25)" strokeWidth="1" />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Particle Network</div>
    </div>
  );
}

export function AuroraMeshProPreview() {
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#04040a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(99,102,241,0.45),transparent_42%),radial-gradient(circle_at_75%_35%,rgba(168,85,247,0.35),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(34,211,238,0.35),transparent_45%)] animate-gradient-shift" style={{ backgroundSize: "240% 240%" }} />
      <div className="absolute inset-0 backdrop-blur-[40px]" />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Aurora Mesh Pro</div>
    </div>
  );
}

// Cursor Previews
export function CursorTrailPreview() {
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = idRef.current++;
    setDots((prev) => [...prev.slice(-10), { x, y, id }]);
  };

  return (
    <div className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#07070d]" onMouseMove={handleMove}>
      {dots.map((dot, idx) => (
        <span
          key={dot.id}
          className="absolute rounded-full bg-indigo-400/70 pointer-events-none"
          style={{ left: dot.x - 4, top: dot.y - 4, width: 8, height: 8, opacity: (idx + 1) / dots.length }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm">Move cursor</div>
    </div>
  );
}

export function MagneticCursorPreview() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <div className="relative w-full h-full min-h-64 rounded-lg bg-[#07070d] flex items-center justify-center">
      <button
        className="w-44 h-14 rounded-xl border border-indigo-400/40 bg-indigo-500/20 text-indigo-200 font-medium transition-transform duration-150"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
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
}

export function SpotlightCursorPreview() {
  const [point, setPoint] = useState({ x: 160, y: 120 });
  return (
    <div
      className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#06060b]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(180px circle at ${point.x}px ${point.y}px, rgba(99,102,241,0.35), transparent 55%)` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm">Spotlight Cursor</div>
    </div>
  );
}

export function GlowRingCursorPreview() {
  const [point, setPoint] = useState({ x: 160, y: 120 });
  return (
    <div
      className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#05050a]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="absolute w-10 h-10 rounded-full border border-cyan-300/70 shadow-[0_0_25px_rgba(34,211,238,0.6)] pointer-events-none transition-transform" style={{ transform: `translate(${point.x - 20}px, ${point.y - 20}px)` }} />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm">Glow Ring Cursor</div>
    </div>
  );
}

export function PixelCursorPreview() {
  const [point, setPoint] = useState({ x: 150, y: 110 });
  return (
    <div
      className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#08080d]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <div className="absolute w-4 h-4 bg-fuchsia-400 pointer-events-none" style={{ transform: `translate(${Math.floor(point.x / 18) * 18}px, ${Math.floor(point.y / 18) * 18}px)` }} />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm">Pixel Cursor</div>
    </div>
  );
}

export function CursorTextRevealPreview() {
  const [point, setPoint] = useState({ x: 160, y: 120 });
  return (
    <div
      className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#050509] flex items-center justify-center"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <h3 className="text-2xl font-bold text-white/20">LUMOS CURSOR FX</h3>
      <h3
        className="absolute text-2xl font-bold text-cyan-300"
        style={{
          clipPath: `circle(85px at ${point.x}px ${point.y}px)`,
        }}
      >
        LUMOS CURSOR FX
      </h3>
    </div>
  );
}

export function DistortionCursorPreview() {
  const [point, setPoint] = useState({ x: 160, y: 120 });
  return (
    <div
      className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#070711]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(99,102,241,0.18) 0px, rgba(99,102,241,0.18) 10px, transparent 10px, transparent 20px)" }} />
      <div className="absolute w-24 h-24 rounded-full border border-white/30 backdrop-blur-sm bg-white/10 pointer-events-none" style={{ transform: `translate(${point.x - 48}px, ${point.y - 48}px)` }} />
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm">Lens Distortion</div>
    </div>
  );
}

export function CursorGeistPreview() {
  const [point, setPoint] = useState({ x: 160, y: 120 });
  return (
    <div
      className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[radial-gradient(circle_at_center,#222,#000)]"
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
            background: `rgba(255,255,255,${0.95 - i * 0.045})`,
            left: point.x,
            top: point.y,
            filter: "blur(0.5px)",
          }}
          animate={{ x: Math.sin(i) * 8, y: Math.cos(i) * 6 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.8 + i * 0.04 }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-white/70 text-sm">
        Cursor Geist
      </div>
    </div>
  );
}

export function InkCursorPreview() {
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);
  return (
    <div
      className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#e0dad5] text-[#ee3d3d]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = idRef.current++;
        setDots((prev) => [...prev.slice(-18), { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ede8e5_2px,transparent_2px),linear-gradient(to_bottom,#ede8e5_2px,transparent_2px)] bg-[size:22vw_28vh]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="relative overflow-hidden border border-[#ee3d3d] px-8 py-3 text-3xl font-semibold tracking-wide"
        >
          <span className="relative z-10">Hover Me</span>
        </motion.button>
      </div>
      {dots.map((dot, idx) => (
        <span
          key={dot.id}
          className="absolute block rounded-full bg-white mix-blend-difference pointer-events-none"
          style={{
            left: dot.x - 13,
            top: dot.y - 13,
            width: 26,
            height: 26,
            opacity: (idx + 1) / dots.length,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}

export function NeonCursorTrailsPreview() {
  const [points, setPoints] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);
  return (
    <div
      className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-black"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = idRef.current++;
        setPoints((prev) => [...prev.slice(-36), { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <h3 className="text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">NEON<br />CURSOR</h3>
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
}

export function SpotlightCursorTextScreenPreview() {
  const [point, setPoint] = useState({ x: 160, y: 120 });
  return (
    <div
      className="relative w-full h-full min-h-64 rounded-lg overflow-hidden bg-[#2128bd]"
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
      <span
        className="absolute block h-5 w-5 rounded-full bg-[#2128bd] pointer-events-none"
        style={{ left: point.x - 10, top: point.y - 10 }}
      />
    </div>
  );
}

export function ShapeLandingHeroPreview() {
  return (
    <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-lg">
      <HeroGeometric
        className="!min-h-[280px] py-10"
        badge="LumosUI"
        title1="Elevate Your"
        title2="Digital Vision"
      />
    </div>
  );
}

export function GridGlowBackgroundPreview() {
  return (
    <div className="relative h-[min(22rem,50vh)] w-full overflow-hidden rounded-lg">
      <GridGlowBackground glowCount={8} className="min-h-[220px]">
        <div className="text-center">
          <p className="text-xs font-medium tracking-wide text-white/70">
            Grid Glow
          </p>
          <h2 className="mt-1 text-lg font-bold text-white md:text-xl">
            Canvas Hero
          </h2>
        </div>
      </GridGlowBackground>
    </div>
  );
}

export function TubeCursorPreview() {
  return (
    <div className="relative min-h-[280px] w-full overflow-hidden rounded-lg bg-black">
      <TubesCursor
        embedded
        title="Tubes"
        subtitle="Cursor"
        caption="Click to randomize"
        enableRandomizeOnClick
      />
    </div>
  );
}

export function PivotTablePreview() {
  return (
    <div className="w-full h-full min-h-64 rounded-lg bg-[#0a0a0f] p-4 flex items-center justify-center">
      <div className="w-full max-w-xs rounded-xl border border-white/10 bg-[#0f0f1a] p-3">
        <div className="mb-2 text-xs text-indigo-300">Pivot Table</div>
        <div className="grid grid-cols-3 gap-1 text-[10px]">
          {["Region", "Q1", "Q2", "Q3", "Q4", "Total"].map((h) => (
            <div key={h} className="rounded bg-white/5 px-2 py-1 text-gray-300">{h}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function KpiMonitorPreview() {
  return (
    <div className="w-full h-full min-h-64 rounded-lg bg-[#0a0a0f] p-4 flex items-center justify-center">
      <div className="w-full max-w-xs grid grid-cols-2 gap-2">
        {["MRR", "Churn", "CAC", "LTV"].map((kpi, i) => (
          <div key={kpi} className="rounded-lg border border-white/10 bg-[#0f0f1a] p-3">
            <p className="text-[10px] text-gray-400">{kpi}</p>
            <p className="text-sm font-semibold text-white">{["$48K", "2.1%", "$124", "$1,040"][i]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KanbanBoardAdvancedPreview() {
  return (
    <div className="w-full h-full min-h-64 rounded-lg bg-[#0a0a0f] p-4">
      <div className="grid grid-cols-3 gap-2 h-full">
        {["Backlog", "Doing", "Done"].map((col, i) => (
          <div key={col} className="rounded-lg border border-white/10 bg-[#0f0f1a] p-2">
            <p className="text-[10px] text-gray-400 mb-2">{col}</p>
            <div className={`h-8 rounded ${i === 1 ? "bg-indigo-500/30" : "bg-white/5"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PresenceIndicatorPreview() {
  return (
    <div className="w-full h-full min-h-64 rounded-lg bg-[#0a0a0f] p-4 flex items-center justify-center">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0f0f1a] p-4">
        {["A", "B", "C", "D"].map((u, i) => (
          <div key={u} className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs flex items-center justify-center">{u}</div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#0f0f1a] ${i < 3 ? "bg-emerald-400" : "bg-gray-500"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function UsageMeterPreview() {
  return (
    <div className="w-full h-full min-h-64 rounded-lg bg-[#0a0a0f] p-4 flex items-center justify-center">
      <div className="w-full max-w-xs rounded-xl border border-white/10 bg-[#0f0f1a] p-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>API Usage</span><span>72%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[72%] bg-gradient-to-r from-indigo-500 to-cyan-500" />
        </div>
      </div>
    </div>
  );
}

export function AuditLogViewerPreview() {
  return (
    <div className="w-full h-full min-h-64 rounded-lg bg-[#0a0a0f] p-4 flex items-center justify-center">
      <div className="w-full max-w-xs rounded-xl border border-white/10 bg-[#0f0f1a] p-3 space-y-2">
        {["Role changed", "API key created", "User invited"].map((item) => (
          <div key={item} className="flex items-center justify-between rounded-lg bg-white/5 px-2 py-1.5">
            <span className="text-[10px] text-gray-300">{item}</span>
            <span className="text-[10px] text-gray-500">2m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageBuilderPreview() {
  return (
    <div className="w-full h-full min-h-64 rounded-lg bg-[#0a0a0f] p-4 flex items-center justify-center">
      <div className="w-full max-w-xs rounded-xl border border-white/10 bg-[#0f0f1a] p-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="h-12 rounded bg-indigo-500/30" />
          <div className="col-span-2 h-12 rounded bg-white/10" />
          <div className="col-span-3 h-10 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export function MediaLibraryPreview() {
  return (
    <div className="w-full h-full min-h-64 rounded-lg bg-[#0a0a0f] p-4 flex items-center justify-center">
      <div className="w-full max-w-xs grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square rounded-lg border border-white/10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
        ))}
      </div>
    </div>
  );
}

export function ApiKeyManagerPreview() {
  return (
    <div className="w-full h-full min-h-64 rounded-lg bg-[#0a0a0f] p-4 flex items-center justify-center">
      <div className="w-full max-w-xs rounded-xl border border-white/10 bg-[#0f0f1a] p-3 space-y-2">
        {["pk_live_**********A12", "pk_test_**********F93"].map((key) => (
          <div key={key} className="rounded-lg bg-white/5 px-3 py-2 text-[10px] text-gray-300 font-mono">
            {key}
          </div>
        ))}
      </div>
    </div>
  );
}

// Map slug to preview component
export const previewComponents: Record<string, React.ComponentType> = {
  // Backgrounds
  "sparkles": SparklesPreview,
  "aurora-background": AuroraPreview,
  "grid-background": GridPreview,
  "shape-landing-hero": ShapeLandingHeroPreview,
  "grid-glow-background": GridGlowBackgroundPreview,
  "spotlight": SpotlightPreview,
  "gradient-animation": GradientAnimationPreview,
  // Cards
  "3d-card": Card3DPreview,
  "glare-card": GlareCardPreview,
  "focus-cards": FocusCardsPreview,
  "card-spotlight": CardSpotlightPreview,
  // Text
  "text-generate": TextGeneratePreview,
  "typewriter": TypewriterPreview,
  "flip-words": FlipWordsPreview,
  "gradient-text": GradientTextPreview,
  "particle-text-effect": ParticleTextEffectPreview,
  "explosive-letter-burst": ExplosiveLetterBurstPreview,
  "dancing-shadow-text": DancingShadowTextPreview,
  "melting-text": MeltingTextPreview,
  "matrix-text": MatrixTextPreview,
  "spin-3d-text": Spin3DTextPreview,
  "split-text-reveal": SplitTextRevealPreview,
  "glowing-3d-text": Glowing3DTextPreview,
  // Buttons
  "moving-border": MovingBorderPreview,
  "glow-button": GlowButtonPreview,
  "shimmer-button": ShimmerButtonPreview,
  "magnetic-button": MagneticButtonPreview,
  "ripple-button": RippleButtonPreview,
  // Navigation
  "animated-tabs": AnimatedTabsPreview,
  "breadcrumb": BreadcrumbPreview,
  "command-menu": CommandMenuPreview,
  // Loaders
  "spinner": SpinnerPreview,
  "multi-step-loader": MultiStepLoaderPreview,
  "skeleton-loader": SkeletonLoaderPreview,
  "progress-bar": ProgressBarPreview,
  // Scroll
  "scroll-reveal": ScrollRevealPreview,
  // Inputs
  "vanish-input": VanishInputPreview,
  "toggle-switch": ToggleSwitchPreview,
  // Overlays
  "animated-tooltip": AnimatedTooltipPreview,
  "notification-toast": NotificationToastPreview,
  // Carousels
  "infinite-cards": InfiniteCardsPreview,
  // Layout
  "bento-grid": BentoGridPreview,
  "staggered-list": StaggeredListPreview,
  // New Components
  "neon-glow-card": NeonGlowCardPreview,
  "glassmorphism-card": GlassmorphismCardPreview,
  "animated-border": AnimatedBorderPreview,
  "morphing-shape": MorphingShapePreview,
  "floating-elements": FloatingElementsPreview,
  "pulse-ring": PulseRingPreview,
  "counter-animation": CounterAnimationPreview,
  "accordion": AccordionPreview,
  "avatar-stack": AvatarStackPreview,
  "badge": BadgePreview,
  "pricing-card": PricingCardPreview,
  "testimonial-card": TestimonialCardPreview,
  "stat-card": StatCardPreview,
  "feature-card": FeatureCardPreview,
  // AI Components
  "ai-copilot-panel": AICopilotPanelPreview,
  "ai-chat-interface": AIChatInterfacePreview,
  "ai-command-center": AICommandCenterPreview,
  "ai-form-autofill": AIFormAutofillPreview,
  "ai-data-insights-panel": AIDataInsightsPanelPreview,
  "ai-content-generator": AIContentGeneratorPreview,
  "ai-code-assistant": AICodeAssistantPreview,
  "ai-search": AISearchPreview,
  "ai-summarizer": AISummarizerPreview,
  "ai-recommendation-engine": AIRecommendationEnginePreview,
  // Data & Analytics Pro
  "data-grid-pro": DataGridProPreview,
  "dashboard-builder": DashboardBuilderPreview,
  "pivot-table": PivotTablePreview,
  "kpi-monitor": KpiMonitorPreview,
  // Workflow & Automation
  "workflow-builder": WorkflowBuilderPreview,
  "kanban-board-advanced": KanbanBoardAdvancedPreview,
  // Collaboration
  "live-collaboration-editor": LiveCollaborationEditorPreview,
  "presence-indicator": PresenceIndicatorPreview,
  // Billing & SaaS
  "subscription-manager": SubscriptionManagerPreview,
  "usage-meter": UsageMeterPreview,
  // Admin & Security
  "role-permission-matrix": RolePermissionMatrixPreview,
  "audit-log-viewer": AuditLogViewerPreview,
  // No-Code Builders
  "form-builder": FormBuilderPreview,
  "page-builder": PageBuilderPreview,
  // File & Media
  "file-manager": FileManagerPreview,
  "media-library": MediaLibraryPreview,
  // Developer Tools
  "global-command-palette": GlobalCommandPalettePreview,
  "api-key-manager": ApiKeyManagerPreview,
  // Search & Discovery
  "global-search": GlobalSearchPreview,
  // Cursor
  "cursor-trail": CursorTrailPreview,
  "magnetic-cursor": MagneticCursorPreview,
  "spotlight-cursor": SpotlightCursorPreview,
  "glow-ring-cursor": GlowRingCursorPreview,
  "pixel-cursor": PixelCursorPreview,
  "cursor-text-reveal": CursorTextRevealPreview,
  "distortion-cursor": DistortionCursorPreview,
  "cursor-geist": CursorGeistPreview,
  "ink-cursor": InkCursorPreview,
  "neon-cursor-trails": NeonCursorTrailsPreview,
  "spotlight-cursor-screen": SpotlightCursorTextScreenPreview,
  "tube-cursor": TubeCursorPreview,
  // Advanced Background Pro
  "neural-mesh-background": NeuralMeshPreview,
  "liquid-gradient-background": LiquidGradientPreview,
  "starfield-warp-background": StarfieldWarpPreview,
  "matrix-rain-background": MatrixRainPreview,
  "plasma-field-background": PlasmaFieldPreview,
  "ribbon-flow-background": RibbonFlowPreview,
  "halftone-wave-background": HalftoneWavePreview,
  "topographic-lines-background": TopographicLinesPreview,
  "particle-network-background": ParticleNetworkPreview,
  "aurora-mesh-pro": AuroraMeshProPreview,
};
