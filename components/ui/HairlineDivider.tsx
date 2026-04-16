interface HairlineDividerProps {
  tone?: "gold" | "ivory";
  className?: string;
  length?: string;
}

export default function HairlineDivider({
  tone = "ivory",
  className = "",
  length = "100%",
}: HairlineDividerProps) {
  const bg = tone === "gold" ? "var(--line)" : "var(--line-soft)";
  return (
    <span
      aria-hidden="true"
      className={`block ${className}`}
      style={{
        width: length,
        height: "1px",
        background: bg,
      }}
    />
  );
}
