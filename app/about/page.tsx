import type { Metadata } from "next";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Reveal from "@/components/ui/Reveal";
import AboutLetter from "@/components/sections/AboutLetter";
import AboutTenets from "@/components/sections/AboutTenets";
import AboutSpecialists from "@/components/sections/AboutSpecialists";
import { about } from "@/lib/copy";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About — Boaz Fitness Studios",
  description:
    "The philosophy behind Boaz: discretion, mastery, and community on the Upper East Side.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero — 60vh */}
      <section className="relative w-full overflow-hidden bg-obsidian" style={{ minHeight: "60vh" }}>
        <Image
          src={images.aboutHero.src}
          alt={images.aboutHero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <span className="hero-vignette" aria-hidden="true" />
        <GrainOverlay />
        <div className="relative z-[3] max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40 flex flex-col justify-end" style={{ minHeight: "60vh" }}>
          <Eyebrow className="mb-8">{about.hero.eyebrow}</Eyebrow>
          <h1
            className="font-display text-ivory max-w-3xl"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            {about.hero.title.before}
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>
              {about.hero.title.italic}
            </em>
            {about.hero.title.after}
          </h1>
        </div>
      </section>

      <AboutLetter />
      <AboutTenets />
      <AboutSpecialists />

      {/* Closing CTA */}
      <section className="relative bg-obsidian py-20 md:py-28 border-t border-line-soft">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2
              className="font-display text-ivory"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                fontWeight: 500,
              }}
            >
              {about.cta.title.before}
              <em style={{ fontStyle: "italic", fontWeight: 500 }}>
                {about.cta.title.italic}
              </em>
              {about.cta.title.after}
            </h2>
            <div className="mt-10 flex justify-center">
              <Button href="/contact" variant="primary">
                {about.cta.button}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
