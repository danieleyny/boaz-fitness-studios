import Image from "next/image";
import GrainOverlay from "./GrainOverlay";

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: "square" | "portrait" | "landscape" | "auto";
  priority?: boolean;
  sizes?: string;
  vignette?: boolean;
}

const aspectClass: Record<NonNullable<EditorialImageProps["aspect"]>, string> =
  {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    landscape: "aspect-[16/10]",
    auto: "",
  };

export default function EditorialImage({
  src,
  alt,
  className = "",
  aspect = "landscape",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  vignette = false,
}: EditorialImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-mist ${aspectClass[aspect]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {vignette && <span className="hero-vignette" aria-hidden="true" />}
      <GrainOverlay />
    </div>
  );
}
