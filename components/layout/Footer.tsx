import Link from "next/link";
import Wordmark from "@/components/brand/Wordmark";
import Monogram from "@/components/brand/Monogram";

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
              [Street Address Placeholder]
              <br />
              New York, NY
              <br />
              Mon–Sun 5:00 — 23:00
            </address>
          </div>

          <div>
            <Label>Connect</Label>
            <ul className="text-ivory/80 text-sm space-y-2">
              <li>
                <a
                  href="https://instagram.com/boazfitnessstudios"
                  className="hover:text-gold transition-colors duration-250"
                >
                  @boazfitnessstudios
                </a>
              </li>
              <li>
                <a
                  href="mailto:boaz@boazstudios.com"
                  className="hover:text-gold transition-colors duration-250"
                >
                  boaz@boazstudios.com
                </a>
              </li>
              <li>
                <a
                  href="tel:9178060484"
                  className="hover:text-gold transition-colors duration-250"
                >
                  917.806.0484
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
