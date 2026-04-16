import type { Metadata } from "next";
import Eyebrow from "@/components/ui/Eyebrow";
import ServicesPillar from "@/components/sections/ServicesPillar";
import MembershipBand from "@/components/sections/MembershipBand";
import { services } from "@/lib/copy";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Services — Boaz Fitness Studios",
  description:
    "Training, recovery, and community offerings at Boaz — curated for longevity.",
};

const pillarImages = [
  images.servicesTrain,
  images.servicesRecover,
  images.servicesSocialize,
];

export default function ServicesPage() {
  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-obsidian flex items-end"
        style={{ minHeight: "50vh" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40 w-full">
          <Eyebrow className="mb-8">{services.hero.eyebrow}</Eyebrow>
          <h1
            className="font-display text-ivory max-w-4xl"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            {services.hero.title.before}
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>
              {services.hero.title.italic}
            </em>
            {services.hero.title.after}
          </h1>
        </div>
      </section>

      {services.pillars.map((pillar, i) => (
        <ServicesPillar
          key={pillar.number}
          number={pillar.number}
          name={pillar.name}
          intro={pillar.intro}
          items={pillar.items}
          image={pillarImages[i]}
          dark={i % 2 === 1}
        />
      ))}

      <MembershipBand />
    </>
  );
}
