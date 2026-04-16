import Eyebrow from "./Eyebrow";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg";
}

export default function SectionHeading({
  eyebrow,
  children,
  align = "left",
  className = "",
  size = "md",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "";
  const sizeStyle =
    size === "lg"
      ? {
          fontSize: "clamp(3rem, 7vw, 5rem)",
          lineHeight: 1.02,
          letterSpacing: "-0.015em",
        }
      : {
          fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
        };

  return (
    <div className={`flex flex-col gap-6 ${alignClass} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className="font-display text-ivory"
        style={{ fontWeight: 500, ...sizeStyle }}
      >
        {children}
      </h2>
    </div>
  );
}
