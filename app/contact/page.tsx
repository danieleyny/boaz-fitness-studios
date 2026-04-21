import type { Metadata } from "next";
import { Instagram, Facebook } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import InquiryForm from "@/components/ui/InquiryForm";
import EditorialMap from "@/components/ui/EditorialMap";
import Reveal from "@/components/ui/Reveal";
import { brand, contact } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Inquire — Boaz Fitness Studios",
  description:
    "Begin a confidential conversation about membership at Boaz.",
};

function DetailLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="uppercase text-ivory/60 mb-3"
      style={{
        fontSize: "0.6875rem",
        letterSpacing: "0.25em",
        fontWeight: 500,
      }}
    >
      {children}
    </p>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero — 40vh */}
      <section
        className="relative bg-obsidian flex items-end"
        style={{ minHeight: "40vh" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full">
          <Eyebrow className="mb-8">{contact.hero.eyebrow}</Eyebrow>
          <h1
            className="font-display text-ivory max-w-3xl"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            {contact.hero.title.before}
            <em style={{ fontStyle: "italic", fontWeight: 500 }}>
              {contact.hero.title.italic}
            </em>
            {contact.hero.title.after}
          </h1>
          <p
            className="mt-8 text-ivory/80 font-sans max-w-xl leading-loose"
            style={{ fontWeight: 300 }}
          >
            {contact.hero.subhead}
          </p>
        </div>
      </section>

      {/* Two-column — form + contact details */}
      <section className="relative bg-obsidian pb-20 md:pb-32 border-t border-line-soft">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <InquiryForm />
            </Reveal>

            <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
              <div className="bg-charcoal p-10 md:p-12 flex flex-col gap-10">
                <div>
                  <DetailLabel>Direct</DetailLabel>
                  <p className="font-display text-ivory" style={{ fontSize: "1.5rem", fontWeight: 500 }}>
                    <a
                      href={`mailto:${brand.email}`}
                      className="hover:text-gold transition-colors duration-250"
                    >
                      {brand.email}
                    </a>
                  </p>
                  <p className="font-display text-ivory mt-2" style={{ fontSize: "1.5rem", fontWeight: 500 }}>
                    <a
                      href={`tel:${brand.phoneHref}`}
                      className="hover:text-gold transition-colors duration-250"
                    >
                      {brand.phone}
                    </a>
                  </p>
                </div>

                <div>
                  <DetailLabel>Visit</DetailLabel>
                  <address className="not-italic text-ivory font-sans leading-loose">
                    {brand.address}
                    <br />
                    New York, NY 10021
                    <br />
                    <span className="text-ivory/70">{brand.hours}</span>
                  </address>
                </div>

                <div>
                  <DetailLabel>Follow</DetailLabel>
                  <div className="flex flex-col gap-3">
                    <a
                      href={brand.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-ivory hover:text-gold transition-colors duration-250 font-sans"
                      style={{ fontSize: "1rem" }}
                    >
                      <Instagram size={18} strokeWidth={1} />
                      {brand.instagram}
                    </a>
                    <a
                      href={brand.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-ivory hover:text-gold transition-colors duration-250 font-sans"
                      style={{ fontSize: "1rem" }}
                    >
                      <Facebook size={18} strokeWidth={1} />
                      {brand.facebook}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Full-width map */}
      <section className="relative bg-obsidian border-t border-line-soft">
        <EditorialMap height="520px" />
      </section>
    </>
  );
}
