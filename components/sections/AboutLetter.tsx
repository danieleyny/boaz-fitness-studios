import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { about } from "@/lib/copy";

export default function AboutLetter() {
  return (
    <section className="relative bg-obsidian py-20 md:py-32">
      <div className="max-w-letter mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow={about.letter.eyebrow} align="center">
            {about.letter.title.before}
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>
              {about.letter.title.italic}
            </em>
            {about.letter.title.after}
          </SectionHeading>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6">
          {about.letter.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-ivory/85 font-sans leading-loose">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={about.letter.paragraphs.length * 0.05}>
            <p
              className="font-display italic text-gold mt-8"
              style={{ fontSize: "1.75rem", fontWeight: 500 }}
            >
              {about.letter.signature}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
