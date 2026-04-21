"use client";

import { useRef, useEffect, useMemo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_GLOW_COLORS = ["#4A00E0", "#8E2DE2", "#4A00E0"];

export interface GridGlowBackgroundProps {
  children: ReactNode;
  backgroundColor?: string;
  gridColor?: string;
  gridSize?: number;
  glowColors?: string[];
  glowCount?: number;
  className?: string;
}

export default function GridGlowBackground({
  children,
  backgroundColor = "#0a0a0a",
  gridColor = "rgba(255, 255, 255, 0.05)",
  gridSize = 50,
  glowColors = DEFAULT_GLOW_COLORS,
  glowCount = 10,
  className,
}: GridGlowBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowPalette = useMemo(() => [...glowColors], [glowColors.join("|")]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let glows: Glow[] = [];
    let frameId: number;

    class Glow {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      radius: number;
      speed: number;
      color: string;
      alpha: number;

      constructor() {
        const w = canvas!.width || 400;
        const h = canvas!.height || 300;
        const gs = gridSize;
        this.x = Math.floor(Math.random() * (w / gs)) * gs;
        this.y = Math.floor(Math.random() * (h / gs)) * gs;
        this.targetX = this.x;
        this.targetY = this.y;
        this.radius = Math.random() * 80 + 40;
        this.speed = Math.random() * 0.015 + 0.01;
        this.color =
          glowPalette[Math.floor(Math.random() * glowPalette.length)] ?? "#4A00E0";
        this.alpha = 0;
        this.setNewTarget();
      }

      setNewTarget() {
        const w = canvas!.width || 400;
        const h = canvas!.height || 300;
        const gs = gridSize;
        this.targetX = Math.floor(Math.random() * (w / gs)) * gs;
        this.targetY = Math.floor(Math.random() * (h / gs)) * gs;
      }

      update() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;

        if (
          Math.abs(this.targetX - this.x) < 1 &&
          Math.abs(this.targetY - this.y) < 1
        ) {
          this.setNewTarget();
        }
        if (this.alpha < 1) this.alpha += 0.01;
      }

      draw() {
        ctx!.globalAlpha = this.alpha;
        const grad = ctx!.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, "transparent");
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
      glows = Array.from({ length: glowCount }, () => new Glow());
    };

    const drawGrid = () => {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      glows.forEach((g) => {
        g.update();
        g.draw();
      });
      frameId = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(container);
    resize();
    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [gridColor, gridSize, glowCount, glowPalette]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full min-h-[240px] w-full", className)}
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full opacity-50"
      />
      <div className="relative z-10 flex h-full min-h-[inherit] items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
}
