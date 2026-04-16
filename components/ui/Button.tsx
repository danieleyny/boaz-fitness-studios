import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type Variant = "primary" | "secondary";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

const baseClasses =
  "group inline-flex items-center justify-center gap-2 uppercase transition-all duration-250 ease-out";

const styles: Record<Variant, string> = {
  primary:
    "bg-gold text-obsidian hover:bg-[var(--gold-soft)] hover:text-obsidian",
  secondary:
    "bg-transparent border border-ivory text-ivory hover:border-gold hover:text-gold",
};

function Inner({
  children,
  variant,
}: {
  children: ReactNode;
  variant: Variant;
}) {
  return (
    <>
      <span>{children}</span>
      <ArrowUpRight
        size={14}
        strokeWidth={1.25}
        className="transition-transform duration-250 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        aria-hidden="true"
      />
    </>
  );
}

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const style = {
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    fontWeight: 500,
    padding: "0.95rem 1.5rem",
  } as const;

  const classes = `${baseClasses} ${styles[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        <Inner variant={variant}>{children}</Inner>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={style}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
