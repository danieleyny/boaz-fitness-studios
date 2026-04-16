"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { home } from "@/lib/copy";
import { images } from "@/lib/images";

export default function HomeHero() {
  const reduce = useReducedMotion();
  const initial = reduce ? {} : { opacity: 0, y: 24 };
  const animate = reduce ? {} : { opacity: 1, y: 0 };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden bg-obsidian">
      <Image
        src={images.homeHero.src}
        alt={images.homeHero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark tint — tames bright imagery so white copy stays legible */}
      <span
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <span className="hero-vignette" aria-hidden="true" />
      <GrainOverlay />

      <div className="relative z-[3] max-w-7xl w-full mx-auto px-6 md:px-12 pt-32 pb-32 md:pb-40">
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <Eyebrow tone="ivory" className="mb-8">
            {home.hero.eyebrow}
          </Eyebrow>

          <h1
            className="font-display text-ivory"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              textShadow: "0 2px 40px rgba(0,0,0,0.4)",
            }}
          >
            {home.hero.title.before}
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>
              {home.hero.title.italic}
            </em>
            {home.hero.title.after}
          </h1>

          <p
            className="mt-10 text-ivory/80 font-sans"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              maxWidth: "50ch",
              fontWeight: 300,
            }}
          >
            {home.hero.subhead}
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              {home.hero.primaryCta}
            </Button>
            <Button href="#the-club" variant="secondary">
              {home.hero.secondaryCta}
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3">
        <span
          className="uppercase text-ivory/60"
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.35em",
            fontWeight: 500,
          }}
        >
          Scroll
        </span>
        <span className="scroll-line" aria-hidden="true" />
      </div>
    </section>
  );
}
