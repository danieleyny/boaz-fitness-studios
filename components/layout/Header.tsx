"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import Wordmark from "@/components/brand/Wordmark";
import MobileMenu from "./MobileMenu";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/members", label: "Members" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ease-out ${
          scrolled
            ? "bg-obsidian border-b border-line-soft"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <Link href="/" aria-label="Boaz home" className="block shrink-0">
            <Wordmark variant="light" />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-10"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="menu-link font-sans uppercase text-ivory/85 hover:text-ivory transition-colors duration-250"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border border-ivory/80 hover:border-gold text-ivory hover:text-gold uppercase transition-all duration-250"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                fontWeight: 500,
                padding: "0.75rem 1.25rem",
              }}
            >
              Inquire
              <ArrowUpRight
                size={14}
                strokeWidth={1}
                className="transition-transform duration-250 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              />
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-ivory hover:text-gold transition-colors duration-250"
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1} />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
