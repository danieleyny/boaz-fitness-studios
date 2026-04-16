import EditorialImage from "@/components/ui/EditorialImage";
import NumberedMarker from "@/components/ui/NumberedMarker";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { home } from "@/lib/copy";
import { images } from "@/lib/images";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pillarImages = [
  images.pillarTrain,
  images.pillarRecover,
  images.pillarSocialize,
];

export default function PillarsSection() {
  return (
    <section className="relative bg-charcoal py-20 md:py-32 border-t border-line-soft">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="mb-20 md:mb-28 max-w-3xl">
          <SectionHeading eyebrow={home.pillars.eyebrow}>
            {home.pillars.title.before}
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>
              {home.pillars.title.italic}
            </em>
            {home.pillars.title.after}
          </SectionHeading>
        </Reveal>

        <div className="flex flex-col gap-24 md:gap-40">
          {home.pillars.items.map((pillar, i) => {
            const img = pillarImages[i];
            const reverse = i % 2 === 1;
            return (
              <Reveal
                key={pillar.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-6">
                  <EditorialImage
                    src={img.src}
                    alt={img.alt}
                    aspect="square"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                  <NumberedMarker
                    number={pillar.number}
                    label={pillar.label}
                  />
                  <h3
                    className="font-display text-ivory mt-8"
                    style={{
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      lineHeight: 1.1,
                      fontWeight: 500,
                    }}
                  >
                    {pillar.headline}
                  </h3>
                  <p className="mt-6 text-ivory/75 font-sans leading-loose max-w-prose">
                    {pillar.body}
                  </p>
                  <ul className="mt-10 flex flex-col">
                    {pillar.services.map((service) => (
                      <li
                        key={service}
                        className="py-4 text-ivory/90 font-sans"
                        style={{
                          borderTop: "1px solid var(--line-soft)",
                          fontSize: "0.9375rem",
                        }}
                      >
                        {service}
                      </li>
                    ))}
                    <li
                      aria-hidden="true"
                      style={{ borderTop: "1px solid var(--line-soft)" }}
                    />
                  </ul>
                  <Link
                    href="/services"
                    className="mt-8 inline-flex items-center gap-2 text-gold hover:text-[var(--gold-soft)] uppercase transition-colors duration-250"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.25em",
                      fontWeight: 500,
                    }}
                  >
                    Discover
                    <ArrowUpRight size={14} strokeWidth={1.25} />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
