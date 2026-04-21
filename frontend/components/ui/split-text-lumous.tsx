"use client";

import { motion } from "framer-motion";

interface ConjoinedLumousProps {
  embed?: boolean;
}

export function ConjoinedLumous({ embed = false }: ConjoinedLumousProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-[#07070c] px-6 ${
        embed ? "h-full min-h-0 w-full" : "min-h-screen"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute -top-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-24 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />

        <div className="relative flex items-center overflow-hidden">
          <motion.span
            initial={{ x: "-220%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`select-none font-black uppercase tracking-[0.35em] text-white ${
              embed ? "text-3xl sm:text-4xl" : "text-5xl sm:text-6xl md:text-7xl"
            }`}
          >
            CON
          </motion.span>

          <motion.span
            initial={{ x: "220%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`select-none font-black uppercase tracking-[0.35em] text-white ${
              embed ? "text-3xl sm:text-4xl" : "text-5xl sm:text-6xl md:text-7xl"
            }`}
          >
            JOINED
          </motion.span>

          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.08),transparent_55%)]" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className={`mt-5 text-center font-medium tracking-[0.45em] text-white/60 ${
            embed ? "text-[10px] sm:text-xs" : "text-sm sm:text-base"
          }`}
        >
          LUMOUS UI • SPLIT REVEAL
        </motion.p>
      </div>
    </div>
  );
}
