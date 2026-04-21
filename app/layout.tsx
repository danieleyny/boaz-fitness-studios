import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import IntroAnimation from "@/components/layout/IntroAnimation";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boaz Fitness Studios — Train. Recover. Socialize.",
  description:
    "A members-only club on the Upper East Side for world-class training, restorative recovery, and a discerning community.",
  icons: {
    icon: `${process.env.NODE_ENV === "production" ? "/boaz-fitness-studios" : ""}/favicon.svg`,
    apple: `${process.env.NODE_ENV === "production" ? "/boaz-fitness-studios" : ""}/apple-touch-icon.svg`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-obsidian text-ivory antialiased">
        <IntroAnimation />
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
