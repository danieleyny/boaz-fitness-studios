import SectionHeading from "@/components/ui/SectionHeading";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";
import { home } from "@/lib/copy";
import { images } from "@/lib/images";

export default function HomeIntro() {
  return (
    <section
      id="the-club"
      className="relative bg-obsidian py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5 lg:col-start-1">
            <SectionHeading eyebrow={home.intro.eyebrow}>
              {home.intro.title.before}
              <em style={{ fontStyle: "italic", fontWeight: 500 }}>
                {home.intro.title.italic}
              </em>
              {home.intro.title.after}
            </SectionHeading>
            <p className="mt-10 text-ivory/80 font-sans max-w-prose leading-loose">
              {home.intro.body}
            </p>
          </Reveal>

          <Reveal
            className="lg:col-span-6 lg:col-start-7 lg:mt-24"
            delay={0.1}
          >
            <EditorialImage
              src={images.homeDetail.src}
              alt={images.homeDetail.alt}
              aspect="portrait"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
