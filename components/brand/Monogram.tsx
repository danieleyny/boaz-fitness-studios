interface MonogramProps {
  size?: number;
  className?: string;
  title?: string;
}

export default function Monogram({
  size = 48,
  className = "",
  title = "Boaz monogram",
}: MonogramProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <circle
        cx="24"
        cy="24"
        r="23"
        stroke="var(--gold)"
        strokeWidth="1"
        fill="transparent"
      />
      <text
        x="24"
        y="32"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="600"
        fontSize="22"
        fill="var(--ivory)"
        style={{ letterSpacing: "0.02em" }}
      >
        B
      </text>
    </svg>
  );
}
