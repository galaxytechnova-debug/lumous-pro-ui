"use client";

import { motion } from "framer-motion";

interface ShadowDanceLumousProps {
  embed?: boolean;
}

export function ShadowDanceLumous({ embed = false }: ShadowDanceLumousProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-[#0b0b10] px-6 ${
        embed ? "h-full min-h-0 w-full" : "min-h-screen"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 -z-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute inset-0 -z-10 h-40 w-40 translate-x-14 translate-y-10 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <motion.h1
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            textShadow: [
              "5px 5px 0 #ff005e, 10px 10px 0 #00d4ff",
              "-5px -5px 0 #00d4ff, -10px -10px 0 #ff005e",
              "5px 5px 0 #ff005e, 10px 10px 0 #00d4ff",
            ],
            rotate: [0, 0.5, -0.5, 0],
          }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className={`select-none text-center font-black tracking-[0.35em] text-white ${
            embed ? "text-3xl sm:text-5xl" : "text-5xl sm:text-7xl md:text-8xl"
          }`}
          style={{
            textShadow: "5px 5px 0 #ff005e, 10px 10px 0 #00d4ff",
          }}
        >
          LUMOUS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className={`mt-5 text-center font-medium tracking-[0.45em] text-white/65 ${
            embed ? "text-[10px] sm:text-xs" : "text-sm sm:text-base"
          }`}
        >
          UI LIBRARY FOR DELIGHTFUL INTERFACES
        </motion.p>
      </div>
    </div>
  );
}
