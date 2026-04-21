"use client";

interface ExplosiveLetterBurstProps {
  /** When true, fills a fixed-height preview frame instead of using min-h-screen. */
  embed?: boolean;
}

export function ExplosiveLetterBurst({ embed = false }: ExplosiveLetterBurstProps) {
  return (
    <div
      className={`flex items-center justify-center bg-[#1a1a1a] ${
        embed ? "h-full min-h-0 w-full" : "min-h-screen"
      }`}
    >
      <div className="relative inline-block">
        <h1
          className={`explosive-text text-white tracking-widest relative inline-block transition-transform duration-300 ease-out hover:scale-110 ${
            embed ? "text-2xl" : "text-5xl"
          }`}
        >
          Hover Over Me
        </h1>
      </div>

      <style jsx>{`
        .explosive-text:hover::before,
        .explosive-text:hover::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          height: 200%;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: burst 0.8s ease-out forwards;
        }

        .explosive-text:hover::before {
          background: radial-gradient(circle, rgba(255, 0, 150, 0.6), transparent);
          z-index: -1;
        }

        .explosive-text:hover::after {
          background: radial-gradient(circle, rgba(0, 200, 255, 0.6), transparent);
          z-index: -2;
        }

        @keyframes burst {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
