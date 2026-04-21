"use client";

import { motion } from "framer-motion";

interface Spin3DLumousProps {
  embed?: boolean;
}

export function Spin3DLumous({ embed = false }: Spin3DLumousProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#050508,#0b0b12_55%,#000)] px-6 [perspective:1000px] ${
        embed ? "h-full min-h-0 w-full" : "min-h-screen"
      }`}
    >
      <div
        className={`relative flex items-center justify-center ${
          embed ? "min-h-0 w-full flex-col gap-1" : ""
        }`}
      >
        <div className="absolute h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute h-64 w-64 translate-x-16 -translate-y-10 rounded-full bg-fuchsia-500/15 blur-3xl" />

        <motion.h1
          initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 360,
            rotateX: [8, -8, 8],
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`select-none text-center font-black uppercase tracking-[0.28em] text-white ${
            embed ? "text-3xl sm:text-4xl" : "text-5xl sm:text-6xl md:text-7xl"
          }`}
          style={{
            transformStyle: "preserve-3d",
            textShadow:
              "1px 1px 0px #22d3ee, 2px 2px 0px #a855f7, 3px 3px 0px #f472b6, 4px 4px 0px #f59e0b, 5px 5px 0px #60a5fa",
          }}
        >
          LUMOUS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={
            embed
              ? "text-center text-[10px] font-medium tracking-[0.35em] text-white/60 sm:text-xs"
              : "absolute -bottom-16 text-center text-sm font-medium tracking-[0.45em] text-white/60"
          }
        >
          3D SPIN EFFECT
        </motion.p>
      </div>
    </div>
  );
}
