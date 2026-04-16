import Image from "next/image";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { home } from "@/lib/copy";
import { images } from "@/lib/images";

export default function MembershipBand() {
  return (
    <section className="relative overflow-hidden bg-obsidian py-32 md:py-48">
      <Image
        src={images.membershipBand.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 70%)",
        }}
      />
      <GrainOverlay />

      <div className="relative z-[3] max-w-3xl mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <Eyebrow tone="gold" className="mx-auto">
            {home.membership.eyebrow}
          </Eyebrow>
          <h2
            className="font-display text-ivory mt-6"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
          >
            {home.membership.title.before}
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>
              {home.membership.title.italic}
            </em>
            {home.membership.title.after}
          </h2>
          <p className="mt-8 text-ivory/80 font-sans leading-loose max-w-xl mx-auto">
            {home.membership.body}
          </p>
          <div className="mt-12">
            <Button href="/contact" variant="primary">
              {home.membership.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
