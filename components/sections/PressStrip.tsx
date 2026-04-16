import Reveal from "@/components/ui/Reveal";
import { home } from "@/lib/copy";

export default function PressStrip() {
  return (
    <section className="relative bg-obsidian py-20 border-t border-line-soft">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <p
            className="uppercase text-ivory/40 text-center mb-10"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.3em",
              fontWeight: 500,
            }}
          >
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            {home.press.map((name) => (
              <span
                key={name}
                className="font-display text-ivory/40 hover:text-ivory/70 transition-colors duration-250"
                style={{
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  letterSpacing: "0.02em",
                  fontWeight: 500,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
