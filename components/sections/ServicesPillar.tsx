import { ArrowUpRight } from "lucide-react";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";

interface Service {
  name: string;
  description: string;
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
            <ul className="flex flex-col">
              {items.map((item, i) => (
                <Reveal key={item.name} as="li" delay={i * 0.04}>
                  <a
                    href="#"
                    className="group block px-4 md:px-6 py-8 transition-colors duration-250 hover:bg-mist"
                    style={{
                      borderTop: "1px solid var(--line-soft)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex-1">
                        <h3
                          className="font-display text-ivory group-hover:text-gold transition-colors duration-250"
                          style={{
                            fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                            lineHeight: 1.15,
                            fontWeight: 500,
                          }}
                        >
                          {item.name}
                        </h3>
                        <p className="mt-3 text-ivory/70 font-sans leading-relaxed max-w-prose">
                          {item.description}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={22}
                        strokeWidth={1}
                        className="shrink-0 mt-2 text-ivory/0 group-hover:text-gold transition-all duration-250 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                        aria-hidden="true"
                      />
                    </div>
                  </a>
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
