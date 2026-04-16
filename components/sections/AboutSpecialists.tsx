import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { about } from "@/lib/copy";
import { images } from "@/lib/images";

export default function AboutSpecialists() {
  return (
    <section className="relative bg-obsidian py-20 md:py-32 border-t border-line-soft">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="max-w-2xl mb-20">
          <SectionHeading eyebrow={about.specialists.eyebrow}>
            {about.specialists.title.before}
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>
              {about.specialists.title.italic}
            </em>
            {about.specialists.title.after}
          </SectionHeading>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {about.specialists.people.map((person, i) => {
            const img = images.specialists[i];
            return (
              <Reveal
                key={person.name}
                delay={i * 0.08}
                className="group flex flex-col"
              >
                <span
                  aria-hidden="true"
                  className="block w-full"
                  style={{
                    height: "1px",
                    background: "var(--line)",
                    marginBottom: "1.25rem",
                  }}
                />
                <div className="relative aspect-square overflow-hidden bg-mist">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-all duration-500 ease-out group-hover:saturate-50 group-hover:brightness-90"
                  />
                  <GrainOverlay />
                </div>
                <div className="mt-6">
                  <h3
                    className="font-display text-ivory transition-colors duration-300 group-hover:text-gold"
                    style={{ fontSize: "1.5rem", fontWeight: 500 }}
                  >
                    {person.name}
                  </h3>
                  <p
                    className="mt-2 uppercase text-ivory/60"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.25em",
                      fontWeight: 500,
                    }}
                  >
                    {person.role}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
