interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  tone?: "ivory" | "gold";
}

export default function Eyebrow({
  children,
  className = "",
  tone = "ivory",
}: EyebrowProps) {
  const color = tone === "gold" ? "var(--gold)" : "var(--ivory)";
  return (
    <div
      className={`inline-flex items-center gap-4 ${className}`}
      style={{ color }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "24px",
          height: "1px",
          background: "var(--gold)",
        }}
      />
      <span
        className="uppercase"
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.25em",
          fontWeight: 500,
        }}
      >
        {children}
      </span>
    </div>
  );
}
