"use client";

import { motion } from "framer-motion";

interface MeltingTextLumousProps {
  embed?: boolean;
}

export function MeltingTextLumous({ embed = false }: MeltingTextLumousProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-[#09090f] px-6 ${
        embed ? "h-full min-h-0 w-full" : "min-h-screen"
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute -top-20 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: [0, 18, 0],
              scaleY: [1, 1.04, 1],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className={`relative select-none text-center font-black uppercase tracking-[0.35em] ${
              embed ? "text-4xl sm:text-5xl" : "text-6xl sm:text-7xl md:text-8xl"
            }`}
          >
            <span className="bg-gradient-to-r from-[#ff6f61] via-[#ffbd44] to-[#ff6f61] bg-clip-text text-transparent">
              LUMOUS
            </span>

            <motion.span
              aria-hidden="true"
              animate={{
                y: [0, 8, 16, 24],
                opacity: [0.45, 0.4, 0.3, 0],
                scaleY: [1, 1.15, 1.35, 1.6],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="pointer-events-none absolute left-0 top-0 -z-10 bg-gradient-to-r from-[#ff6f61] via-[#ffbd44] to-[#ff6f61] bg-clip-text text-transparent blur-[1px]"
            >
              LUMOUS
            </motion.span>

            <motion.span
              aria-hidden="true"
              animate={{
                y: [0, 10, 20, 30],
                opacity: [0.28, 0.25, 0.15, 0],
                scaleY: [1, 1.2, 1.45, 1.7],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.15,
              }}
              className="pointer-events-none absolute left-0 top-0 -z-20 bg-gradient-to-r from-[#ff6f61] via-[#ffbd44] to-[#ff6f61] bg-clip-text text-transparent blur-xl"
            >
              LUMOUS
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className={`mt-5 text-center font-medium tracking-[0.45em] text-white/60 ${
              embed ? "text-[10px] sm:text-xs" : "text-sm sm:text-base"
            }`}
          >
            MELTING UI EFFECT
          </motion.p>
        </div>
      </div>
    </div>
  );
}
