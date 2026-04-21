"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_TUBE_COLORS = ["#f967fb", "#53bc28", "#6958d5"];
const DEFAULT_LIGHT_COLORS = ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"];

export type TubesCursorProps = {
  title?: string;
  subtitle?: string;
  caption?: string;
  initialColors?: string[];
  lightColors?: string[];
  lightIntensity?: number;
  titleSize?: string;
  subtitleSize?: string;
  captionSize?: string;
  enableRandomizeOnClick?: boolean;
  className?: string;
  /** Use fixed fullscreen canvas (default) or contained layout for previews */
  embedded?: boolean;
};

function randomColors(count: number) {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
}

export function TubesCursor({
  title = "Tubes",
  subtitle = "Cursor",
  caption = "WebGPU / WebGL",
  initialColors = DEFAULT_TUBE_COLORS,
  lightColors = DEFAULT_LIGHT_COLORS,
  lightIntensity = 200,
  titleSize = "text-[80px]",
  subtitleSize = "text-[60px]",
  captionSize = "text-base",
  enableRandomizeOnClick = true,
  className = "",
  embedded = false,
}: TubesCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<{
    tubes?: {
      setColors: (c: string[]) => void;
      setLightsColors: (c: string[]) => void;
    };
    dispose?: () => void;
  } | null>(null);

  const colorsKey = initialColors.join(",");
  const lightsKey = lightColors.join(",");

  const handleRandomize = useCallback(() => {
    const app = appRef.current;
    if (!app?.tubes) return;
    const colors = randomColors(initialColors.length);
    const lights = randomColors(lightColors.length);
    app.tubes.setColors(colors);
    app.tubes.setLightsColors(lights);
  }, [initialColors.length, lightColors.length]);

  useEffect(() => {
    let removeClick: (() => void) | null = null;
    let destroyed = false;

    void (async () => {
      const mod = await import(
        "threejs-components/build/cursors/tubes1.min.js"
      );
      const TubesCursorCtor = (mod as { default?: unknown }).default ?? mod;

      if (!canvasRef.current || destroyed) return;

      const ctor = TubesCursorCtor as (
        el: HTMLCanvasElement,
        opts: {
          tubes: {
            colors: string[];
            lights: { intensity: number; colors: string[] };
          };
        }
      ) => {
        tubes: {
          setColors: (c: string[]) => void;
          setLightsColors: (c: string[]) => void;
        };
        dispose?: () => void;
      };

      const app = ctor(canvasRef.current, {
        tubes: {
          colors: [...initialColors],
          lights: {
            intensity: lightIntensity,
            colors: [...lightColors],
          },
        },
      });

      appRef.current = app;

      if (enableRandomizeOnClick) {
        const attach = () => {
          const target = embedded ? wrapperRef.current : document.body;
          if (!target) return;
          const handler = () => handleRandomize();
          target.addEventListener("click", handler);
          removeClick = () => target.removeEventListener("click", handler);
        };
        queueMicrotask(attach);
      }
    })();

    return () => {
      destroyed = true;
      if (removeClick) removeClick();
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch {
        // ignore
      }
    };
  }, [
    colorsKey,
    lightsKey,
    lightIntensity,
    enableRandomizeOnClick,
    embedded,
    handleRandomize,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative w-full overflow-hidden",
        embedded ? "h-[min(22rem,70vh)]" : "h-screen min-h-[320px]",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "block h-full w-full",
          embedded ? "absolute inset-0" : "fixed inset-0"
        )}
      />

      {title || subtitle || caption ? (
        <div className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center gap-1 select-none md:gap-2">
          <h1
            className={cn(
              "m-0 p-0 font-bold uppercase leading-none text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]",
              embedded ? "text-3xl md:text-5xl" : titleSize
            )}
          >
            {title}
          </h1>
          <h2
            className={cn(
              "m-0 p-0 font-medium uppercase leading-none text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]",
              embedded ? "text-2xl md:text-4xl" : subtitleSize
            )}
          >
            {subtitle}
          </h2>
          <p
            className={cn(
              "m-0 p-0 leading-none text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]",
              embedded ? "text-xs md:text-sm" : captionSize
            )}
          >
            {caption}
          </p>
        </div>
      ) : null}
    </div>
  );
}
