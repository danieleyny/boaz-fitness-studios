"use client";

import { useState, useId } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";

interface Service {
  name: string;
  description: string;
  details?: string;
  highlights?: string[];
  session?: string;
}

interface ServicesPillarProps {
  number: string;
  name: string;
  intro: string;
  items: Service[];
  image: { src: string; alt: string };
  dark?: boolean;
}

export default function ServicesPillar({
  number,
  name,
  intro,
  items,
  image,
  dark = false,
}: ServicesPillarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pillarId = useId();

  return (
    <section
      className={`relative ${dark ? "bg-charcoal" : "bg-obsidian"} border-t border-line-soft`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p
                className="font-display italic text-gold"
                style={{ fontSize: "1.5rem", fontWeight: 500 }}
              >
                {number}
              </p>
              <h2
                className="font-display text-ivory mt-4"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.015em",
                  fontWeight: 500,
                }}
              >
                {name}
              </h2>
              <p className="mt-8 text-ivory/75 font-sans leading-loose max-w-sm">
                {intro}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="flex flex-col" role="list">
              {items.map((item, i) => (
                <Reveal key={item.name} as="li" delay={i * 0.04}>
                  <AccordionRow
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={() =>
                      setOpenIndex((cur) => (cur === i ? null : i))
                    }
                    panelId={`${pillarId}-panel-${i}`}
                    buttonId={`${pillarId}-button-${i}`}
                  />
                </Reveal>
              ))}
              <li
                aria-hidden="true"
                style={{ borderTop: "1px solid var(--line-soft)" }}
              />
            </ul>

            <Reveal className="mt-16">
              <EditorialImage
                src={image.src}
                alt={image.alt}
                aspect="landscape"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionRow({
  item,
  index,
  isOpen,
  onToggle,
  panelId,
  buttonId,
}: {
  item: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
  buttonId: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div style={{ borderTop: "1px solid var(--line-soft)" }}>
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`group block w-full text-left px-4 md:px-6 py-8 transition-colors duration-250 ${
          isOpen ? "bg-mist/60" : "hover:bg-mist"
        }`}
      >
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-baseline gap-4">
              <span
                className="font-display italic text-gold/70 tabular-nums"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={`font-display transition-colors duration-250 ${
                  isOpen ? "text-gold" : "text-ivory group-hover:text-gold"
                }`}
                style={{
                  fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                  lineHeight: 1.15,
                  fontWeight: 500,
                }}
              >
                {item.name}
              </h3>
            </div>
            <p className="mt-3 pl-10 text-ivory/70 font-sans leading-relaxed max-w-prose">
              {item.description}
            </p>
          </div>
          <span
            className={`shrink-0 mt-2 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
              isOpen
                ? "border-gold/60 bg-gold/10 text-gold rotate-45"
                : "border-ivory/20 text-ivory/60 group-hover:border-gold/50 group-hover:text-gold"
            }`}
            aria-hidden="true"
          >
            <Plus size={16} strokeWidth={1.25} />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduce ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
            transition={{
              duration: reduce ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ overflow: "hidden" }}
          >
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: 4 }}
              transition={{
                duration: reduce ? 0 : 0.45,
                delay: reduce ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="px-4 md:px-6 pb-10 md:pl-16"
            >
              <span
                aria-hidden="true"
                className="block h-px w-10 bg-gold/60 mb-8"
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
                {item.details && (
                  <p
                    className="md:col-span-3 font-display text-ivory/90"
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: 1.7,
                      fontWeight: 400,
                    }}
                  >
                    {item.details}
                  </p>
                )}

                <div className="md:col-span-2 flex flex-col gap-6">
                  {item.highlights && item.highlights.length > 0 && (
                    <div>
                      <p
                        className="uppercase text-gold mb-4"
                        style={{
                          fontSize: "0.625rem",
                          letterSpacing: "0.35em",
                          fontWeight: 500,
                        }}
                      >
                        Experience
                      </p>
                      <ul className="flex flex-col gap-3">
                        {item.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex gap-3 text-ivory/75 font-sans leading-relaxed"
                            style={{ fontSize: "0.9375rem" }}
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.55em] h-px w-4 shrink-0 bg-gold/60"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.session && (
                    <div>
                      <p
                        className="uppercase text-gold mb-2"
                        style={{
                          fontSize: "0.625rem",
                          letterSpacing: "0.35em",
                          fontWeight: 500,
                        }}
                      >
                        Session
                      </p>
                      <p
                        className="font-display italic text-ivory/85"
                        style={{ fontSize: "1rem", fontWeight: 500 }}
                      >
                        {item.session}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
