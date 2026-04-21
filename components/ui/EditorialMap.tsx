"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/lib/copy";

/**
 * An illustrated Upper East Side map rendered as SVG.
 * Clicking the whole surface opens Google Maps directions with the destination
 * pre-filled; Google auto-detects the user's current location as origin
 * (with their permission).
 *
 * Geometry is stylized, not surveyed — proportions are tuned for legibility,
 * with Central Park on the left and the avenue/street grid on the right.
 * The Boaz marker sits at the intersection of 5th/Madison and 73rd Street.
 */

const V = {
  width: 900,
  height: 560,
  // Avenues (vertical)
  avenues: [
    { x: 310, name: "5th Ave" },
    { x: 400, name: "Madison Ave" },
    { x: 500, name: "Park Ave" },
    { x: 610, name: "Lexington Ave" },
    { x: 720, name: "3rd Ave" },
    { x: 830, name: "2nd Ave" },
  ],
  // Streets (horizontal) — running E/W
  streets: [
    { y: 120, name: "75th St" },
    { y: 200, name: "74th St" },
    { y: 280, name: "73rd St" },
    { y: 360, name: "72nd St" },
    { y: 440, name: "71st St" },
  ],
  // Boaz marker: between 5th and Madison, on 73rd Street
  marker: { x: 355, y: 280 },
};

export default function EditorialMap({
  height = "560px",
  className = "",
}: {
  height?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const anim = (delay: number) =>
    reduce
      ? { initial: {}, animate: {}, transition: { duration: 0 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: {
            duration: 1.1,
            delay,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  return (
    <a
      href={brand.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block w-full overflow-hidden bg-obsidian ${className}`}
      style={{ height, border: "1px solid var(--line)" }}
      aria-label={`Open Google Maps directions to ${brand.addressFull}`}
    >
      <svg
        viewBox={`0 0 ${V.width} ${V.height}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="parkFill" cx="0.4" cy="0.5" r="0.7">
            <stop offset="0%" stopColor="rgba(243,255,251,0.07)" />
            <stop offset="100%" stopColor="rgba(243,255,251,0.015)" />
          </radialGradient>
          <radialGradient id="markerPulse" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(240,188,0,0.55)" />
            <stop offset="60%" stopColor="rgba(240,188,0,0.1)" />
            <stop offset="100%" stopColor="rgba(240,188,0,0)" />
          </radialGradient>
          <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Vignette */}
        <rect
          x="0"
          y="0"
          width={V.width}
          height={V.height}
          fill="var(--obsidian)"
        />

        {/* Central Park — irregular organic shape on the left */}
        <motion.path
          d="
            M 0 20
            C 90 30, 160 40, 250 60
            C 300 80, 300 180, 290 250
            C 288 320, 300 400, 260 500
            C 190 540, 110 530, 30 540
            L 0 540
            Z
          "
          fill="url(#parkFill)"
          stroke="rgba(240,188,0,0.28)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.1)}
        />
        <text
          x={120}
          y={300}
          fill="rgba(243,255,251,0.45)"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize={28}
          fontWeight={500}
          letterSpacing={2}
        >
          Central Park
        </text>

        {/* Avenues — vertical hairlines */}
        {V.avenues.map((a, i) => (
          <g key={a.name}>
            <motion.line
              x1={a.x}
              y1={0}
              x2={a.x}
              y2={V.height}
              stroke="rgba(240,188,0,0.22)"
              strokeWidth={1}
              {...anim(0.25 + i * 0.06)}
            />
            <text
              x={a.x + 6}
              y={28}
              fill="rgba(243,255,251,0.45)"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={10}
              fontWeight={500}
              letterSpacing={2}
              style={{ textTransform: "uppercase" }}
            >
              {a.name}
            </text>
          </g>
        ))}

        {/* Streets — horizontal hairlines (only east of the park) */}
        {V.streets.map((s, i) => (
          <g key={s.name}>
            <motion.line
              x1={300}
              y1={s.y}
              x2={V.width}
              y2={s.y}
              stroke="rgba(243,255,251,0.1)"
              strokeWidth={1}
              {...anim(0.55 + i * 0.05)}
            />
            <text
              x={V.width - 12}
              y={s.y - 6}
              textAnchor="end"
              fill="rgba(243,255,251,0.35)"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={10}
              fontWeight={500}
              letterSpacing={2}
              style={{ textTransform: "uppercase" }}
            >
              {s.name}
            </text>
          </g>
        ))}

        {/* Boaz Studios marker — pulsing gold dot with label */}
        <g transform={`translate(${V.marker.x}, ${V.marker.y})`}>
          {/* Outer pulse */}
          {!reduce && (
            <motion.circle
              r={38}
              fill="url(#markerPulse)"
              animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.7, 0.15, 0.7] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {/* Mid ring */}
          <motion.circle
            r={14}
            fill="none"
            stroke="var(--gold)"
            strokeWidth={1}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Core dot with glow */}
          <circle r={8} fill="var(--gold)" filter="url(#markerGlow)" opacity={0.55} />
          <circle r={3.5} fill="var(--gold)" />
          {/* Label hairline */}
          <motion.line
            x1={14}
            y1={0}
            x2={52}
            y2={0}
            stroke="var(--gold)"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
          <motion.g
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <text
              x={60}
              y={-4}
              fill="var(--ivory)"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize={22}
              fontWeight={500}
              letterSpacing={1}
            >
              Boaz Studios
            </text>
            <text
              x={60}
              y={16}
              fill="rgba(240,188,0,0.85)"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={10}
              fontWeight={500}
              letterSpacing={2}
              style={{ textTransform: "uppercase" }}
            >
              29 East 73rd
            </text>
          </motion.g>
        </g>

        {/* Compass rose — top-right corner */}
        <g transform={`translate(${V.width - 52}, ${V.height - 52})`} opacity={0.55}>
          <circle r={18} fill="none" stroke="rgba(240,188,0,0.35)" strokeWidth={1} />
          <line x1={0} y1={-22} x2={0} y2={-10} stroke="var(--gold)" strokeWidth={1} />
          <text
            x={0}
            y={-24}
            textAnchor="middle"
            fill="var(--gold)"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize={9}
            fontWeight={500}
            letterSpacing={1}
          >
            N
          </text>
        </g>

        {/* Scale bar */}
        <g transform={`translate(32, ${V.height - 36})`} opacity={0.55}>
          <line x1={0} y1={0} x2={80} y2={0} stroke="rgba(243,255,251,0.5)" strokeWidth={1} />
          <line x1={0} y1={-3} x2={0} y2={3} stroke="rgba(243,255,251,0.5)" strokeWidth={1} />
          <line x1={80} y1={-3} x2={80} y2={3} stroke="rgba(243,255,251,0.5)" strokeWidth={1} />
          <text
            x={0}
            y={18}
            fill="rgba(243,255,251,0.5)"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize={9}
            fontWeight={500}
            letterSpacing={2}
            style={{ textTransform: "uppercase" }}
          >
            200 ft
          </text>
        </g>
      </svg>

      {/* Overlay: bottom-left caption + CTA */}
      <div className="absolute inset-0 pointer-events-none flex items-end p-6 md:p-10">
        <div className="flex items-end justify-between w-full">
          <div>
            <p
              className="uppercase text-gold"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.35em",
                fontWeight: 500,
              }}
            >
              Upper East Side · NYC
            </p>
            <p
              className="font-display text-ivory mt-2"
              style={{ fontSize: "1.125rem", fontWeight: 500 }}
            >
              {brand.address}
            </p>
          </div>

          <div
            className="inline-flex items-center gap-2 text-ivory/80 group-hover:text-gold transition-colors duration-250 uppercase"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.3em",
              fontWeight: 500,
            }}
          >
            Get Directions
            <ArrowUpRight
              size={12}
              strokeWidth={1.25}
              className="transition-transform duration-250 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </div>
        </div>
      </div>

      {/* Subtle grain */}
      <span className="grain-overlay" aria-hidden="true" />
    </a>
  );
}
