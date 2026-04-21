"use client";

import { motion } from "framer-motion";

const layers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface Glow3DLumousProps {
  embed?: boolean;
}

const frontGlowKeyframes = [
  "0 0 2px #fff, 0 0 14px #fff, 0 0 28px #22d3ee, 0 0 52px #a855f7, 0 0 80px rgba(255,77,109,0.45)",
  "0 0 2px #fff, 0 0 16px #fef3c7, 0 0 32px #ff4d6d, 0 0 56px #2dd4bf, 0 0 84px rgba(56,189,248,0.5)",
  "0 0 2px #fff, 0 0 14px #e0f2fe, 0 0 30px #38bdf8, 0 0 54px #f472b6, 0 0 78px rgba(168,85,247,0.45)",
  "0 0 2px #fff, 0 0 14px #fff, 0 0 28px #22d3ee, 0 0 52px #a855f7, 0 0 80px rgba(255,77,109,0.45)",
];

export function Glow3DLumous({ embed = false }: Glow3DLumousProps) {
  const depth = embed ? 6 : 8;

  return (
    <div
      className={`flex flex-col items-center justify-center overflow-hidden bg-[#05050a] px-4 [perspective:1400px] sm:px-6 ${
        embed ? "h-full min-h-0 w-full gap-5 py-4" : "min-h-screen gap-10 py-12"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(ellipse_60%_45%_at_70%_60%,rgba(168,85,247,0.2),transparent_50%)]" />

      <div className="relative flex w-full max-w-5xl flex-col items-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(100%,28rem)] w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(90%,24rem)] w-[min(90%,24rem)] translate-x-[12%] translate-y-[8%] rounded-full bg-fuchsia-500/25 blur-3xl" />

        <motion.figure
          animate={{
            rotateX: embed ? [32, 38, 32, 28, 32] : [40, 46, 40, 34, 40],
            rotateY: embed ? [32, 28, 32, 38, 32] : [40, 34, 40, 46, 40],
            rotateZ: [0, 1.2, 0, -1.2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`relative mx-auto flex items-center justify-center [transform-style:preserve-3d] ${
            embed ? "min-h-[7.5rem] sm:min-h-[9rem]" : "min-h-[14rem] sm:min-h-[16rem]"
          }`}
        >
          {layers.map((layer) => {
            const isFront = layer === 0;
            const backStroke = isFront
              ? "1.5px rgba(255,255,255,0.45)"
              : `${layer < 5 ? 1.5 : 2}px rgba(129, 220, 255, ${0.32 + layer * 0.05})`;

            return (
              <motion.h1
                key={layer}
                initial={{ opacity: 0 }}
                animate={
                  isFront
                    ? {
                        opacity: 1,
                        textShadow: frontGlowKeyframes,
                      }
                    : {
                        opacity: Math.max(0.4, 0.9 - layer * 0.05),
                      }
                }
                transition={
                  isFront
                    ? {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { duration: 0.45, ease: "easeOut" }
                }
                className={`absolute left-1/2 top-1/2 w-[110%] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 select-none text-center font-black uppercase ${
                  embed
                    ? "text-3xl tracking-[0.16em] sm:text-4xl sm:tracking-[0.2em] md:text-5xl"
                    : "text-4xl tracking-[0.18em] sm:text-6xl sm:tracking-[0.22em] md:text-7xl md:tracking-[0.24em] lg:text-8xl"
                } ${isFront ? "text-white" : "text-[#18182a]"}`}
                style={{
                  transform: `translate(-50%, -50%) translateZ(${layer * depth}px)`,
                  WebkitTextStroke: backStroke,
                  paintOrder: "stroke fill",
                  filter: isFront
                    ? "drop-shadow(0 4px 24px rgba(34, 211, 238, 0.35))"
                    : `drop-shadow(0 0 ${6 + layer}px rgba(168, 85, 247, ${0.15 + layer * 0.03}))`,
                }}
              >
                LUMOUS UI
              </motion.h1>
            );
          })}
        </motion.figure>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`relative z-20 text-center font-semibold uppercase tracking-[0.42em] text-cyan-100/90 ${
            embed ? "mt-1 text-[10px] sm:text-xs" : "mt-4 text-xs sm:text-sm"
          }`}
        >
          3D GLOW EFFECT
        </motion.p>
      </div>
    </div>
  );
}
