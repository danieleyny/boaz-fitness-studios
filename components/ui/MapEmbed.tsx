interface MapEmbedProps {
  className?: string;
  title?: string;
  height?: string;
}

export default function MapEmbed({
  className = "",
  title = "Map showing location on the Upper East Side, New York",
  height = "480px",
}: MapEmbedProps) {
  // Upper East Side centered around 40.7736, -73.9566
  const src =
    "https://www.google.com/maps?q=40.7736,-73.9566&z=15&output=embed";

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ border: "1px solid var(--line)", height }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          filter: "grayscale(0.5) contrast(1.05) brightness(0.92)",
        }}
        allowFullScreen
      />
    </div>
  );
}
