"use client";

import { motion } from "framer-motion";

interface MatrixLumousProps {
  embed?: boolean;
}

export function MatrixLumous({ embed = false }: MatrixLumousProps) {
  const rainDrops = Array.from({ length: 28 }, (_, i) => i);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[#05080a] px-6 ${
        embed ? "h-full min-h-0 w-full" : "min-h-screen"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,140,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_22px] opacity-20" />

      <div className="matrix-container relative flex flex-col items-center justify-center">
        <motion.h1
          data-text="LUMOUS"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`matrix-text relative select-none text-center font-black tracking-[0.4em] text-[#7CFF9B] ${
            embed ? "text-4xl sm:text-5xl" : "text-6xl sm:text-7xl md:text-8xl"
          }`}
        >
          LUMOUS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`mt-5 text-center font-medium tracking-[0.45em] text-[#7CFF9B]/70 ${
            embed ? "text-[10px] sm:text-xs" : "text-sm sm:text-base"
          }`}
        >
          LIVE. GLITCH. REACT.
        </motion.p>

        <div className="rain pointer-events-none absolute inset-0 overflow-hidden">
          {rainDrops.map((drop) => (
            <span
              key={drop}
              className="absolute top-0 block h-[120%] w-px bg-[#7CFF9B]/35 blur-[0.2px]"
              style={{
                left: `${(drop * 100) / rainDrops.length}%`,
                animationDelay: `${(drop % 10) * 0.18}s`,
                animationDuration: `${2.8 + (drop % 5) * 0.45}s`,
                opacity: 0.15 + (drop % 5) * 0.08,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .matrix-text {
          animation: glitch 2.2s infinite linear;
          text-shadow:
            0 0 10px rgba(124, 255, 155, 0.35),
            0 0 24px rgba(124, 255, 155, 0.2);
        }

        .matrix-text::before,
        .matrix-text::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .matrix-text::before {
          color: rgba(0, 255, 145, 0.75);
          z-index: -1;
          transform: translate(-3px, -1px);
          animation: glitch 2.2s infinite linear reverse;
        }

        .matrix-text::after {
          color: rgba(0, 200, 255, 0.55);
          z-index: -2;
          transform: translate(3px, 1px);
          animation: glitch 2.2s infinite linear;
        }

        .rain span {
          animation-name: rain;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes rain {
          0% {
            transform: translateY(-110%);
          }
          100% {
            transform: translateY(110vh);
          }
        }

        @keyframes glitch {
          0%,
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
            transform: translate(0);
          }
          33% {
            clip-path: polygon(0 0, 100% 0, 100% 15%, 0 15%);
            transform: translate(-4px, -3px);
          }
          66% {
            clip-path: polygon(0 85%, 100% 85%, 100% 100%, 0 100%);
            transform: translate(4px, 3px);
          }
        }
      `}</style>
    </div>
  );
}
