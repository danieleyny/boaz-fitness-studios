"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Monogram from "@/components/brand/Monogram";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Reveal from "@/components/ui/Reveal";
import { members } from "@/lib/copy";
import { images } from "@/lib/images";

export default function MembersPortal() {
  const [demoed, setDemoed] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDemoed(true);
  }

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden bg-obsidian"
      style={{ minHeight: "100vh" }}
    >
      <Image
        src={images.membersBackground.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.9) 80%)",
        }}
      />
      <GrainOverlay />

      <Reveal className="relative z-[3] w-full max-w-[420px] px-6 py-32">
        <div className="flex flex-col items-center">
          <Monogram size={56} />

          <div className="mt-10 text-center">
            <Eyebrow tone="gold" className="mx-auto">
              {members.eyebrow}
            </Eyebrow>
            <h1
              className="font-display text-ivory mt-6"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                fontWeight: 500,
              }}
            >
              {members.title.before}
              <em style={{ fontStyle: "italic", fontWeight: 500 }}>
                {members.title.italic}
              </em>
              {members.title.after}
            </h1>
          </div>

          <form onSubmit={onSubmit} className="mt-12 w-full flex flex-col gap-6">
            <div>
              <label
                htmlFor="email"
                className="block uppercase text-ivory/70 mb-2"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.25em",
                  fontWeight: 500,
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="input-line"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block uppercase text-ivory/70 mb-2"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.25em",
                  fontWeight: 500,
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="input-line"
              />
            </div>
            <div className="mt-4">
              <Button type="submit" variant="primary" fullWidth>
                {members.cta}
              </Button>
            </div>

            {demoed && (
              <p
                className="text-center uppercase text-gold mt-2"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.25em",
                  fontWeight: 500,
                }}
              >
                {members.note}
              </p>
            )}
          </form>

          <Link
            href="/contact"
            className="mt-12 menu-link uppercase text-ivory/70 hover:text-ivory"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              fontWeight: 500,
            }}
          >
            {members.invite} →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
