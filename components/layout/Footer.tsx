import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import Wordmark from "@/components/brand/Wordmark";
import Monogram from "@/components/brand/Monogram";
import { brand } from "@/lib/copy";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="uppercase text-ivory/60 mb-5"
      style={{
        fontSize: "0.75rem",
        letterSpacing: "0.25em",
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative bg-obsidian border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Wordmark variant="light" />
            <p className="mt-8 text-ivory/70 max-w-xs leading-relaxed text-sm">
              A members-only club on the Upper East Side for training,
              recovery, and community.
            </p>
            <p
              className="mt-6 uppercase text-gold"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                fontWeight: 500,
              }}
            >
              Train · Recover · Socialize
            </p>
          </div>

          <div>
            <Label>Visit</Label>
            <address className="not-italic text-ivory/80 text-sm leading-loose">
              {brand.address}
              <br />
              New York, NY 10021
              <br />
              {brand.hours}
            </address>
            <a
              href={brand.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block uppercase text-gold hover:text-[var(--gold-soft)] transition-colors duration-250"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.25em",
                fontWeight: 500,
              }}
            >
              Get Directions →
            </a>
          </div>

          <div>
            <Label>Connect</Label>
            <ul className="text-ivory/80 text-sm space-y-3">
              <li>
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold transition-colors duration-250"
                >
                  <Instagram size={14} strokeWidth={1} />
                  {brand.instagram}
                </a>
              </li>
              <li>
                <a
                  href={brand.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold transition-colors duration-250"
                >
                  <Facebook size={14} strokeWidth={1} />
                  {brand.facebook}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="hover:text-gold transition-colors duration-250"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="hover:text-gold transition-colors duration-250"
                >
                  {brand.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <Label>Legal</Label>
            <ul className="text-ivory/80 text-sm space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-gold transition-colors duration-250"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gold transition-colors duration-250"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gold transition-colors duration-250"
                >
                  Membership Agreement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-20 pt-8 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--line-soft)" }}
        >
          <p
            className="text-ivory/50 uppercase"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              fontWeight: 500,
            }}
          >
            © {year} Boaz Fitness Studios. All rights reserved.
          </p>
          <Monogram size={32} />
        </div>
      </div>
    </footer>
  );
}
