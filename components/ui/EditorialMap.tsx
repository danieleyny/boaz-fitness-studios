"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/lib/copy";

/**
 * An illustrated Upper East Side map rendered as SVG.
 * Clicking the surface opens Google Maps directions with the destination
 * pre-filled; Google auto-detects the user's current location as origin
 * (with their permission).
 *
 * Geometry is stylized, not surveyed — proportions are tuned for legibility.
 * The map reads as a dense NYC street-plan: Central Park on the left, the
 * avenue/street grid filled with building-block tiles in between, and the
 * East River skirting the right edge. The Boaz marker sits between 5th and
 * Madison on 73rd.
 */

const V = {
  width: 1000,
  height: 600,
  avenues: [
    { x: 305, name: "5th Ave" },
    { x: 390, name: "Madison" },
    { x: 480, name: "Park Ave" },
    { x: 570, name: "Lexington" },
    { x: 660, name: "3rd Ave" },
    { x: 750, name: "2nd Ave" },
    { x: 840, name: "1st Ave" },
  ],
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
  // Boaz marker — between 5th and Madison, on 73rd Street
  marker: { x: 347, y: 330 },
  // Park extends from 0 → ~290 horizontally across full height
  parkRightEdge: 290,
  riverLeftEdge: 905,
  // Virtual top/bottom so edge rows have a clean boundary
  topEdge: 0,
  bottomEdge: 600,
};

// Small deterministic PRNG so building subdivisions don't shift across
// re-renders or server/client boundaries (would cause hydration mismatches).
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Enumerate every block cell (between adjacent avenues × adjacent streets,
// plus the top and bottom edge rows). Dropping the sliver east of 1st Ave
// since that's essentially FDR territory, not city blocks.
function buildBlocks() {
  const cols: { x1: number; x2: number }[] = [];
  for (let i = 0; i < V.avenues.length - 1; i++) {
    cols.push({ x1: V.avenues[i].x, x2: V.avenues[i + 1].x });
  }
  const rows: { y1: number; y2: number }[] = [];
  rows.push({ y1: V.topEdge, y2: V.streets[0].y });
  for (let i = 0; i < V.streets.length - 1; i++) {
    rows.push({ y1: V.streets[i].y, y2: V.streets[i + 1].y });
  }
  rows.push({ y1: V.streets[V.streets.length - 1].y, y2: V.bottomEdge });
  const out: {
    key: string;
    x: number;
    y: number;
    w: number;
    h: number;
    featured: boolean;
    lots: number[];
  }[] = [];
  cols.forEach((c, ci) => {
    rows.forEach((r, ri) => {
      // The marker block — between 5th (col 0) and Madison, 73rd–72nd
      // (streets[4] lies at y=330, which is rows[5] top). 73rd has index 4
      // in V.streets, so the block south of 73rd is rows[5].
      const featured = ci === 0 && ri === 5;
      const r1 = rng(ci * 100 + ri);
      const lotCount = 2 + Math.floor(r1() * 2); // 2–3 sub-lots
      const lots: number[] = [];
      for (let k = 1; k <= lotCount; k++) {
        lots.push(k / (lotCount + 1) + (r1() - 0.5) * 0.08);
      }
      out.push({
        key: `b-${ci}-${ri}`,
        x: c.x1 + 3,
        y: r.y1 + 3,
        w: c.x2 - c.x1 - 6,
        h: r.y2 - r.y1 - 6,
        featured,
        lots,
      });
    });
  });
  return out;
}

const BLOCKS = buildBlocks();

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
          transition: {
            duration: 0.9,
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

        <rect x="0" y="0" width={V.width} height={V.height} fill="var(--obsidian)" />

        {/* ─── Central Park (shape only, unlabeled) ─────────────────── */}
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
        <motion.path
          d="M 0 420 C 60 380, 120 360, 180 320 S 240 240, 270 180"
          fill="none"
          stroke="rgba(243,255,251,0.12)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.55)}
        />
        <motion.path
          d="M 20 120 C 80 140, 140 180, 200 220 S 260 320, 270 400"
          fill="none"
          stroke="rgba(243,255,251,0.08)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.65)}
        />
        <motion.path
          d="M 40 540 C 110 480, 190 440, 250 380"
          fill="none"
          stroke="rgba(243,255,251,0.08)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.7)}
        />
        {/* Lake — unlabeled water body */}
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
        {/* Small reservoir hint — upper left */}
        <motion.path
          d="M 60 90 C 50 70, 90 64, 140 70 C 200 80, 230 110, 210 140 C 180 165, 120 160, 90 140 C 65 122, 62 108, 60 90 Z"
          fill="url(#lakeFill)"
          stroke="rgba(104,144,176,0.35)"
          strokeWidth={0.6}
          {...anim(0.85)}
        />

        {/* ─── City blocks (stylized building tiles) ────────────────── */}
        <motion.g {...fade(0.2)}>
          {BLOCKS.map((b) => (
            <g key={b.key}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                fill={
                  b.featured
                    ? "rgba(240,188,0,0.06)"
                    : "rgba(243,255,251,0.022)"
                }
                stroke={
                  b.featured
                    ? "rgba(240,188,0,0.45)"
                    : "rgba(240,188,0,0.08)"
                }
                strokeWidth={b.featured ? 0.8 : 0.5}
              />
              {/* Lot subdivisions — thin vertical strokes suggesting buildings */}
              {b.lots.map((f, i) => (
                <line
                  key={i}
                  x1={b.x + b.w * f}
                  x2={b.x + b.w * f}
                  y1={b.y + 3}
                  y2={b.y + b.h - 3}
                  stroke={
                    b.featured
                      ? "rgba(240,188,0,0.18)"
                      : "rgba(243,255,251,0.05)"
                  }
                  strokeWidth={0.5}
                />
              ))}
              {/* Mid-block service mews — horizontal hairline */}
              <line
                x1={b.x + 4}
                x2={b.x + b.w - 4}
                y1={b.y + b.h / 2}
                y2={b.y + b.h / 2}
                stroke={
                  b.featured
                    ? "rgba(240,188,0,0.14)"
                    : "rgba(243,255,251,0.03)"
                }
                strokeWidth={0.5}
              />
            </g>
          ))}
        </motion.g>

        {/* ─── Avenues (vertical streets) ──────────────────────────── */}
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
              fill="rgba(243,255,251,0.42)"
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

        {/* ─── Streets (horizontal) ─────────────────────────────── */}
        {V.streets.map((s, i) => (
          <g key={s.name}>
            <motion.line
              x1={V.parkRightEdge}
              y1={s.y}
              x2={V.riverLeftEdge}
              y2={s.y}
              stroke={
                s.highlight
                  ? "rgba(240,188,0,0.35)"
                  : "rgba(243,255,251,0.14)"
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

        {/* ─── East River hatch (unlabeled) ───────────────────────── */}
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

        {/* ─── Boaz Studios marker ───────────────────────────────── */}
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
