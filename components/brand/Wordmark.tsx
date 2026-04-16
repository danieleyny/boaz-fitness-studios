import { CSSProperties } from "react";

type Variant = "light" | "dark";

interface WordmarkProps {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
}

export default function Wordmark({
  variant = "light",
  className = "",
  style,
}: WordmarkProps) {
  const mark = variant === "light" ? "var(--ivory)" : "var(--obsidian)";
  const sub =
    variant === "light" ? "rgba(243, 255, 251, 0.8)" : "rgba(0, 0, 0, 0.75)";

  return (
    <div
      className={`inline-flex flex-col items-center leading-none ${className}`}
      style={style}
      aria-label="Boaz Fitness Recovery Club"
    >
      <span
        className="font-display uppercase"
        style={{
          color: mark,
          fontWeight: 500,
          letterSpacing: "0.35em",
          fontSize: "1.1rem",
          paddingLeft: "0.35em",
        }}
      >
        Boaz
      </span>
      <span
        aria-hidden="true"
        style={{
          display: "block",
          height: "1px",
          width: "60%",
          marginTop: "0.55em",
          marginBottom: "0.55em",
          background: "var(--gold)",
        }}
      />
      <span
        className="font-sans uppercase"
        style={{
          color: sub,
          fontWeight: 500,
          letterSpacing: "0.3em",
          fontSize: "0.625rem",
          paddingLeft: "0.3em",
        }}
      >
        Fitness · Recovery · Club
      </span>
    </div>
  );
}
