import SectionHeading from "@/components/ui/SectionHeading";
import MapEmbed from "@/components/ui/MapEmbed";
import Reveal from "@/components/ui/Reveal";
import { brand, home } from "@/lib/copy";

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="uppercase text-ivory/60 mb-2"
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.25em",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <p className="text-ivory font-sans">{children}</p>
    </div>
  );
}

export default function VisitSection() {
  return (
    <section className="relative bg-charcoal py-20 md:py-32 border-t border-line-soft">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={home.visit.eyebrow}>
              {home.visit.title.before}
              <em style={{ fontStyle: "italic", fontWeight: 500 }}>
                {home.visit.title.italic}
              </em>
              {home.visit.title.after}
            </SectionHeading>

            <div className="mt-12 flex flex-col gap-8">
              <Detail label="Address">
                {brand.address}
                <br />
                New York, NY
              </Detail>
              <Detail label="Hours">{brand.hours}</Detail>
              <Detail label="Phone">
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="hover:text-gold transition-colors duration-250"
                >
                  {brand.phone}
                </a>
              </Detail>
              <Detail label="Email">
                <a
                  href={`mailto:${brand.email}`}
                  className="hover:text-gold transition-colors duration-250"
                >
                  {brand.email}
                </a>
              </Detail>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <MapEmbed height="560px" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
