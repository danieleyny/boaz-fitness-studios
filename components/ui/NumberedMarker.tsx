interface NumberedMarkerProps {
  number: string;
  label: string;
  className?: string;
}

export default function NumberedMarker({
  number,
  label,
  className = "",
}: NumberedMarkerProps) {
  return (
    <div className={`inline-flex items-center gap-4 ${className}`}>
      <span
        className="font-display italic text-gold"
        style={{ fontSize: "1.25rem", fontWeight: 500 }}
      >
        {number}
      </span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "28px",
          height: "1px",
          background: "var(--gold)",
        }}
      />
      <span
        className="uppercase text-ivory/85"
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.25em",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}
