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
 * Geometry is stylized, not surveyed — proportions are tuned for legibility.
 * Central Park sits on the left (with the Lake and winding paths), the
 * avenue/street grid fills the middle, and the East River with a hint of FDR
 * Drive skirts the right edge. The Boaz marker sits between 5th and Madison
 * on 73rd.
 */

const V = {
  width: 1000,
  height: 600,
  // Avenues (vertical) — Upper East Side sweep
  avenues: [
    { x: 305, name: "5th Ave" },
    { x: 390, name: "Madison" },
    { x: 480, name: "Park Ave" },
    { x: 570, name: "Lexington" },
    { x: 660, name: "3rd Ave" },
    { x: 750, name: "2nd Ave" },
    { x: 840, name: "1st Ave" },
  ],
  // Streets (horizontal)
  streets: [
    { y: 70, name: "77th St" },
    { y: 135, name: "76th St" },
    { y: 200, name: "75th St" },
    { y: 265, name: "74th St" },
    { y: 330, name: "73rd St", highlight: true },
    { y: 395, name: "72nd St" },
    { y: 460, name: "71st St" },
    { y: 525, name: "70th St" },
  ],
  // Boaz marker: between 5th and Madison, on 73rd
  marker: { x: 347, y: 330 },
  // Park extends from 0 → ~290 horizontally across full height
  parkRightEdge: 290,
  // East River begins at right edge
  riverLeftEdge: 905,
};

const LANDMARKS = [
  // Upper East Side institutions near the marker
  { x: 305, y: 525, label: "The Frick", caption: "70th & 5th" },
  { x: 570, y: 70, label: "6 Train", caption: "77th St" },
  { x: 660, y: 525, label: "Sotheby's", caption: "72nd & York" },
];

export default function EditorialMap({
  height = "620px",
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
  const fade = (delay: number) =>
    reduce
      ? { initial: {}, animate: {}, transition: { duration: 0 } }
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
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
          <radialGradient id="parkFill" cx="0.4" cy="0.5" r="0.8">
            <stop offset="0%" stopColor="rgba(122,168,112,0.18)" />
            <stop offset="60%" stopColor="rgba(122,168,112,0.08)" />
            <stop offset="100%" stopColor="rgba(122,168,112,0.02)" />
          </radialGradient>
          <linearGradient id="riverFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(104,144,176,0.02)" />
            <stop offset="40%" stopColor="rgba(104,144,176,0.12)" />
            <stop offset="100%" stopColor="rgba(104,144,176,0.22)" />
          </linearGradient>
          <radialGradient id="lakeFill" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(104,144,176,0.4)" />
            <stop offset="100%" stopColor="rgba(104,144,176,0.1)" />
          </radialGradient>
          <radialGradient id="markerPulse" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(240,188,0,0.55)" />
            <stop offset="60%" stopColor="rgba(240,188,0,0.1)" />
            <stop offset="100%" stopColor="rgba(240,188,0,0)" />
          </radialGradient>
          <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <pattern
            id="waveHatch"
            x="0"
            y="0"
            width="18"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 5 Q 4.5 0 9 5 T 18 5"
              fill="none"
              stroke="rgba(104,144,176,0.35)"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>

        {/* Base canvas */}
        <rect x="0" y="0" width={V.width} height={V.height} fill="var(--obsidian)" />

        {/* ─── Central Park — organic left mass ─────────────────────── */}
        <motion.path
          d="
            M 0 10
            C 70 18, 140 28, 210 46
            C 260 64, 288 120, 285 200
            C 282 280, 294 340, 286 420
            C 274 500, 230 560, 160 580
            C 100 592, 40 588, 0 592
            Z
          "
          fill="url(#parkFill)"
          stroke="rgba(240,188,0,0.32)"
          strokeWidth={1}
          strokeDasharray="3 5"
          {...anim(0.1)}
        />

        {/* Central Park label */}
        <motion.text
          x={90}
          y={240}
          fill="rgba(243,255,251,0.5)"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize={30}
          fontWeight={500}
          letterSpacing={2}
          {...fade(0.4)}
        >
          Central Park
        </motion.text>
        <motion.text
          x={94}
          y={262}
          fill="rgba(243,255,251,0.35)"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={9}
          fontWeight={500}
          letterSpacing={3}
          style={{ textTransform: "uppercase" }}
          {...fade(0.5)}
        >
          843 Acres · Est. 1858
        </motion.text>

        {/* Park paths — stylized, dashed hairlines */}
        <motion.path
          d="M 0 420 C 60 380, 120 360, 180 320 S 240 240, 270 180"
          fill="none"
          stroke="rgba(243,255,251,0.14)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.55)}
        />
        <motion.path
          d="M 20 120 C 80 140, 140 180, 200 220 S 260 320, 270 400"
          fill="none"
          stroke="rgba(243,255,251,0.1)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.65)}
        />
        <motion.path
          d="M 40 540 C 110 480, 190 440, 250 380"
          fill="none"
          stroke="rgba(243,255,251,0.1)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.7)}
        />

        {/* The Lake — kidney-shape water feature around 72nd–75th */}
        <motion.path
          d="
            M 80 340
            C 60 320, 70 290, 110 288
            C 160 284, 220 300, 240 338
            C 250 370, 220 392, 170 388
            C 120 384, 95 362, 80 340
            Z
          "
          fill="url(#lakeFill)"
          stroke="rgba(104,144,176,0.45)"
          strokeWidth={0.8}
          {...anim(0.8)}
        />
        <motion.text
          x={128}
          y={346}
          fill="rgba(200,220,240,0.55)"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize={13}
          fontWeight={500}
          letterSpacing={1}
          {...fade(1.0)}
        >
          The Lake
        </motion.text>

        {/* Bethesda Terrace tick */}
        <motion.g {...fade(1.1)}>
          <circle cx={255} cy={400} r={2} fill="rgba(240,188,0,0.6)" />
          <text
            x={262}
            y={403}
            fill="rgba(243,255,251,0.45)"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize={8}
            fontWeight={500}
            letterSpacing={2}
            style={{ textTransform: "uppercase" }}
          >
            Bethesda
          </text>
        </motion.g>

        {/* The Mall (tree-lined promenade) — two parallel dotted lines */}
        <motion.line
          x1={200}
          y1={440}
          x2={230}
          y2={560}
          stroke="rgba(243,255,251,0.2)"
          strokeWidth={1}
          strokeDasharray="1 3"
          {...anim(0.95)}
        />
        <motion.line
          x1={215}
          y1={438}
          x2={245}
          y2={558}
          stroke="rgba(243,255,251,0.2)"
          strokeWidth={1}
          strokeDasharray="1 3"
          {...anim(1.0)}
        />

        {/* ─── Street grid (east of park) ───────────────────────────── */}
        {V.avenues.map((a, i) => (
          <g key={a.name}>
            <motion.line
              x1={a.x}
              y1={0}
              x2={a.x}
              y2={V.height}
              stroke="rgba(240,188,0,0.22)"
              strokeWidth={1}
              {...anim(0.25 + i * 0.05)}
            />
            <text
              x={a.x + 5}
              y={22}
              fill="rgba(243,255,251,0.45)"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={9}
              fontWeight={500}
              letterSpacing={2}
              style={{ textTransform: "uppercase" }}
            >
              {a.name}
            </text>
          </g>
        ))}

        {V.streets.map((s, i) => (
          <g key={s.name}>
            <motion.line
              x1={V.parkRightEdge}
              y1={s.y}
              x2={V.riverLeftEdge}
              y2={s.y}
              stroke={
                s.highlight
                  ? "rgba(240,188,0,0.32)"
                  : "rgba(243,255,251,0.1)"
              }
              strokeWidth={s.highlight ? 1.2 : 1}
              {...anim(0.5 + i * 0.04)}
            />
            <text
              x={V.riverLeftEdge - 6}
              y={s.y - 5}
              textAnchor="end"
              fill={
                s.highlight
                  ? "rgba(240,188,0,0.75)"
                  : "rgba(243,255,251,0.35)"
              }
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={9}
              fontWeight={500}
              letterSpacing={2}
              style={{ textTransform: "uppercase" }}
            >
              {s.name}
            </text>
          </g>
        ))}

        {/* ─── East River — hatched water band on the right ─────────── */}
        <motion.rect
          x={V.riverLeftEdge}
          y={0}
          width={V.width - V.riverLeftEdge}
          height={V.height}
          fill="url(#riverFill)"
          {...fade(0.3)}
        />
        <motion.rect
          x={V.riverLeftEdge}
          y={0}
          width={V.width - V.riverLeftEdge}
          height={V.height}
          fill="url(#waveHatch)"
          {...fade(0.5)}
        />
        {/* FDR Drive — thin yellow highway line */}
        <motion.line
          x1={V.riverLeftEdge - 6}
          y1={0}
          x2={V.riverLeftEdge - 6}
          y2={V.height}
          stroke="rgba(240,188,0,0.18)"
          strokeWidth={1}
          strokeDasharray="6 3"
          {...anim(0.7)}
        />
        <motion.text
          x={V.riverLeftEdge - 10}
          y={V.height / 2}
          fill="rgba(240,188,0,0.45)"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={8}
          fontWeight={500}
          letterSpacing={3}
          textAnchor="end"
          style={{ textTransform: "uppercase" }}
          transform={`rotate(-90, ${V.riverLeftEdge - 10}, ${V.height / 2})`}
          {...fade(0.8)}
        >
          FDR Drive
        </motion.text>
        <motion.text
          x={V.width - 16}
          y={V.height / 2}
          fill="rgba(200,220,240,0.6)"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize={20}
          fontWeight={500}
          letterSpacing={2}
          textAnchor="end"
          transform={`rotate(-90, ${V.width - 16}, ${V.height / 2})`}
          {...fade(0.9)}
        >
          East River
        </motion.text>

        {/* ─── Landmarks ──────────────────────────────────────────── */}
        {LANDMARKS.map((lm, i) => (
          <motion.g key={lm.label} {...fade(1.3 + i * 0.12)}>
            <circle
              cx={lm.x}
              cy={lm.y}
              r={2.5}
              fill="rgba(240,188,0,0.7)"
              stroke="rgba(240,188,0,0.3)"
              strokeWidth={3}
            />
            <text
              x={lm.x + 8}
              y={lm.y - 2}
              fill="rgba(243,255,251,0.7)"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontStyle="italic"
              fontSize={13}
              fontWeight={500}
              letterSpacing={1}
            >
              {lm.label}
            </text>
            <text
              x={lm.x + 8}
              y={lm.y + 10}
              fill="rgba(243,255,251,0.35)"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={7.5}
              fontWeight={500}
              letterSpacing={2}
              style={{ textTransform: "uppercase" }}
            >
              {lm.caption}
            </text>
          </motion.g>
        ))}

        {/* ─── Boaz Studios marker ──────────────────────────────── */}
        <g transform={`translate(${V.marker.x}, ${V.marker.y})`}>
          {!reduce && (
            <motion.circle
              r={42}
              fill="url(#markerPulse)"
              animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.7, 0.15, 0.7] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.circle
            r={15}
            fill="none"
            stroke="var(--gold)"
            strokeWidth={1}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          />
          <circle r={9} fill="var(--gold)" filter="url(#markerGlow)" opacity={0.55} />
          <circle r={3.8} fill="var(--gold)" />
          <motion.line
            x1={15}
            y1={0}
            x2={58}
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
              x={66}
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
              x={66}
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

        {/* Compass rose */}
        <g transform={`translate(${V.width - 58}, ${V.height - 58})`} opacity={0.55}>
          <circle r={20} fill="none" stroke="rgba(240,188,0,0.35)" strokeWidth={1} />
          <line x1={0} y1={-24} x2={0} y2={-10} stroke="var(--gold)" strokeWidth={1} />
          <text
            x={0}
            y={-26}
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
            500 ft
          </text>
        </g>
      </svg>

      {/* Overlay: caption + CTA */}
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

      <span className="grain-overlay" aria-hidden="true" />
    </a>
  );
}
