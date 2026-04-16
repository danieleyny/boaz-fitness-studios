import Reveal from "@/components/ui/Reveal";
import NumberedMarker from "@/components/ui/NumberedMarker";
import SectionHeading from "@/components/ui/SectionHeading";
import { about } from "@/lib/copy";

export default function AboutTenets() {
  return (
    <section className="relative bg-charcoal py-20 md:py-32 border-t border-line-soft">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="max-w-2xl mb-20">
          <SectionHeading eyebrow={about.tenets.eyebrow}>
            {about.tenets.title.before}
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>
              {about.tenets.title.italic}
            </em>
            {about.tenets.title.after}
          </SectionHeading>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {about.tenets.items.map((tenet, i) => (
            <Reveal
              key={tenet.number}
              delay={i * 0.08}
              className="flex flex-col gap-6"
            >
              <NumberedMarker
                number={tenet.number}
                label={tenet.label}
              />
              <h3
                className="font-display text-ivory"
                style={{
                  fontSize: "1.875rem",
                  lineHeight: 1.15,
                  fontWeight: 500,
                }}
              >
                {tenet.label}
              </h3>
              <p className="text-ivory/75 font-sans leading-loose">
                {tenet.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
