"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  // The component sits in the root layout, so it remounts only on a full page
  // load (initial visit, hard refresh). Client-side route changes preserve this
  // instance, so in-memory state alone is enough — no sessionStorage needed.
  useEffect(() => {
    setMounted(true);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const total = reduce ? 900 : 4200;
    const id = window.setTimeout(() => {
      setVisible(false);
    }, total);

    const skip = () => setVisible(false);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("click", skip, { once: true });

    return () => {
      clearTimeout(id);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [visible, reduce]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-obsidian overflow-hidden flex items-center justify-center"
          aria-hidden="true"
          role="presentation"
        >
          {/* Radial breathing glow behind */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.7, 0.35, 0.6, 0], scale: [0.4, 1, 1.1, 1.2, 1.4] }}
            transition={{ duration: 4.2, ease: "easeInOut", times: [0, 0.25, 0.55, 0.8, 1] }}
            className="absolute"
            style={{
              width: "60vmax",
              height: "60vmax",
              background:
                "radial-gradient(circle, rgba(240,188,0,0.35) 0%, rgba(240,188,0,0.12) 30%, rgba(0,0,0,0) 65%)",
              filter: "blur(20px)",
            }}
          />

          {/* Horizontal beam — sweeps left to right */}
          <motion.div
            initial={{ x: "-120vw", opacity: 0 }}
            animate={{
              x: ["-120vw", "0vw", "120vw"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.5, 1],
              delay: 0.1,
            }}
            className="absolute top-1/2 left-0 w-full h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(240,188,0,0) 30%, rgba(240,188,0,1) 50%, rgba(240,188,0,0) 70%, transparent 100%)",
              boxShadow: "0 0 40px rgba(240,188,0,0.6)",
            }}
          />

          {/* Ambient sparkle points */}
          {!reduce &&
            SPARKLES.map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, s.o, 0] }}
                transition={{
                  duration: 2.4,
                  delay: 1.2 + s.d,
                  ease: "easeOut",
                }}
                className="absolute rounded-full"
                style={{
                  width: s.size,
                  height: s.size,
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  background: "var(--gold)",
                  boxShadow: "0 0 8px rgba(240,188,0,0.8)",
                }}
              />
            ))}

          <div className="relative z-10 flex flex-col items-center">
            {/* Top hairline */}
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reduce ? 0.2 : 1.0,
                delay: reduce ? 0 : 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
              style={{
                width: "clamp(240px, 36vw, 520px)",
                height: "1px",
                background: "var(--gold)",
                marginBottom: "clamp(2.5rem, 5vw, 4.5rem)",
                transformOrigin: "center",
                boxShadow: "0 0 24px rgba(240,188,0,0.5)",
              }}
            />

            {/* BOAZ — letter-by-letter */}
            <div className="flex items-end" aria-label="Boaz">
              {"BOAZ".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 60, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: reduce ? 0.25 : 0.9,
                    delay: reduce ? 0 : 1.5 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display text-ivory"
                  style={{
                    fontSize: "clamp(3.5rem, 12vw, 9rem)",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    lineHeight: 1,
                    paddingLeft: "0.18em",
                    textShadow: "0 2px 60px rgba(240,188,0,0.25)",
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* STUDIOS */}
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? 0.25 : 0.9,
                delay: reduce ? 0.1 : 2.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="uppercase text-gold mt-6"
              style={{
                fontSize: "clamp(0.7rem, 1.1vw, 0.875rem)",
                letterSpacing: "0.55em",
                fontWeight: 500,
                paddingLeft: "0.55em",
              }}
            >
              Studios
            </motion.span>

            {/* Bottom hairline */}
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reduce ? 0.2 : 1.0,
                delay: reduce ? 0.1 : 2.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
              style={{
                width: "clamp(120px, 18vw, 220px)",
                height: "1px",
                background: "var(--ivory)",
                opacity: 0.8,
                marginTop: "clamp(2rem, 4vw, 3.5rem)",
                transformOrigin: "center",
              }}
            />

            {/* Small caption */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{
                duration: reduce ? 0.2 : 0.8,
                delay: reduce ? 0.1 : 3.2,
              }}
              className="uppercase text-ivory mt-4"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.4em",
                fontWeight: 500,
              }}
            >
              New York · Est. 2026
            </motion.span>
          </div>

          {/* Skip hint */}
          <motion.button
            onClick={() => setVisible(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="absolute bottom-8 right-8 uppercase text-ivory hover:text-gold transition-colors duration-250"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.35em",
              fontWeight: 500,
            }}
            aria-label="Skip intro"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const SPARKLES = [
  { x: 12, y: 24, size: 2, o: 0.8, d: 0.0 },
  { x: 86, y: 18, size: 3, o: 0.6, d: 0.2 },
  { x: 22, y: 76, size: 2, o: 0.7, d: 0.4 },
  { x: 78, y: 72, size: 2, o: 0.5, d: 0.6 },
  { x: 50, y: 14, size: 3, o: 0.9, d: 0.1 },
  { x: 46, y: 84, size: 2, o: 0.7, d: 0.8 },
  { x: 8, y: 52, size: 3, o: 0.5, d: 0.5 },
  { x: 92, y: 48, size: 2, o: 0.6, d: 0.3 },
  { x: 34, y: 32, size: 2, o: 0.8, d: 0.7 },
  { x: 66, y: 68, size: 2, o: 0.6, d: 0.2 },
];
