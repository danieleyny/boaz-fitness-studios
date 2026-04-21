"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Wordmark from "@/components/brand/Wordmark";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Membership" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // Focus trap
    const node = containerRef.current;
    if (node) {
      const focusables = node.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      focusables[0]?.focus();
    }

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] bg-obsidian flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-line-soft">
            <Link href="/" onClick={onClose} aria-label="Home">
              <Wordmark variant="light" />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="text-ivory hover:text-gold transition-colors duration-250"
            >
              <X size={22} strokeWidth={1} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 gap-8">
            {NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="menu-link font-display text-5xl text-ivory hover:text-ivory"
                  style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="px-8 pb-10 pt-6 border-t border-line-soft">
            <p
              className="uppercase text-ivory/60"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                fontWeight: 500,
              }}
            >
              Inquiries
            </p>
            <p className="font-display text-2xl mt-2 text-ivory">
              boaz@boazstudios.com
            </p>
            <p className="font-display text-2xl text-ivory/80">
              917.806.0484
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
